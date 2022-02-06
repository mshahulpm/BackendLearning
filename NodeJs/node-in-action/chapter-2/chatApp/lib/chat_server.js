const socketIo = require('socket.io');
let io;
let guestNumber = 1;
let nickNames = {};
let namesUsed = [];
let currentRoom = {};

exports.listen = function (server) {

    io = socketIo(server);
    // io.set('log level', 1);

    io.sockets.on('connection', (socket) => {

        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);

        joinRoom(socket, 'Lobby')

        handleMessageBroadcasting(socket, nickNames)

        handleNameChangeAttempts(socket, nickNames, namesUsed)

        handleRoomJoining(socket)

        socket.on('rooms', () => {
            socket.emit('rooms', io.sockets.manager.rooms)
        })

        handleClientDisconnection(socket, nickNames, namesUsed)
    })
}


function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
    let name = `Guest ${guestNumber}`;
    nickNames[socket.id] = name;
    socket.emit('nameResult', {
        success: true,
        name: name
    })
    namesUsed.push(name);
    return guestNumber + 1;
}


function joinRoom(socket, room) {
    // noting that user is now in this room 
    socket.join(room);
    currentRoom[socket.id] = room
    socket.emit('joinResult', { room })
    // send message to everyone in the room that a new user has joined
    socket.broadcast.to(room).emit('message', {
        text: `${nickNames[socket.id]} has joined ${room}`
    })
    // if other user exists summarize them 
    let usersInRoom = io.sockets.adapter.rooms[room]
    let usersInRoomSummary;
    if (usersInRoom.length > 0) {
        usersInRoomSummary = 'Users currently in ' + room + ': ';
        for (let index in usersInRoom) {
            let userSocketId = usersInRoom[index].id;
            if (userSocketId != socket.id) {
                if (index > 0)
                    usersInRoomSummary += ', ';
            }
            usersInRoomSummary += nickNames[userSocketId];
        }
    }
    usersInRoomSummary += '.';
    socket.emit('message', {
        text: usersInRoomSummary
    })
}


function handleNameChangeAttempts(socket, nickNames, namesUsed) {

    //  listener for name change attempts 
    socket.on('nameAttempt', (name) => {
        // name can't start with Guest
        if (name.indexOf('Guest') === 0) {
            socket.emit('nameResult', {
                success: false,
                message: 'Name cannot begin with "Guest"'
            })
        } else {
            if (namesUsed.indexOf(name) === -1) {
                // name is unique, so we can use it
                let previousName = nickNames[socket.id];
                let previousNameIndex = namesUsed.indexOf(previousName);
                namesUsed.push(name);
                nickNames[socket.id] = name
                // remove previous name from namesUsed
                delete namesUsed[previousNameIndex];
                socket.emit('nameResult', {
                    success: true,
                    name: name
                })
                socket.broadcast.to(currentRoom[socket.id]).emit('message', {
                    text: `${previousName} has changed name to ${name}`
                })
            } else {
                //  name is already taken
                socket.emit('nameResult', {
                    success: false,
                    message: 'That name is already in use'
                })
            }
        }
    })

}


function handleMessageBroadcasting(socket) {
    //  listener for messages 
    socket.on('message', (message) => {
        //  send message to everyone in the room
        socket.broadcast.to(message.room).emit('message', {
            text: nickNames[socket.id] + ':' + message.text,
        })
    })
}

// join a room or create a new room 
function handleRoomJoining(socket) {

    socket.on('join', (room) => {
        //  join the room
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket, room.newRoom)
    })
}

//  client disconnects 
function handleClientDisconnection(socket) {
    socket.on('disconnect', () => {
        let nameIndex = namesUsed.indexOf(nickNames[socket.id]);
        delete namesUsed[nameIndex];
        delete nickNames[socket.id];
    })
}