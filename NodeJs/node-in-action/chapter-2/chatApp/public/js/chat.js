class Chat {
    constructor(socket) {
        this.socket = socket
    }

    sendMessage(room, text) {
        let message = {
            text, room
        }
        this.socket.emit('message', message)
    }

    changeRoom(room) {
        this.socket.emit('join', {
            newRoom: room
        })
    }

    processCommand(command) {
        // getting command from  
        let words = command.split(' ')
        let command_2 = words[0].substring(1, words[0].length).toLowerCase()
        let message = false

        switch (command_2) {
            // handle join or change room 
            case 'join':
                words.shift()
                let room = words.join(' ')
                this.changeRoom(room)
                break
            // handle name change attempts
            case 'nick':
                words.shift()
                let name = words.join(' ')
                this.socket.emit('nameAttempt', name)
                break
            default:
                message = 'Unrecognized command'
                break
        }
        return message
    }
}

function divEscapedContentElement(message) {
    return $('<div></div>').text(message);
}
function divSystemContentElement(message) {
    return $('<div></div>').html('<i>' + message + '</i>');
}


//  process user input 
function processUserInput(chatApp, socket) {
    let message = $('#send-message').val();
    let systemMessage;
    if (message.charAt(0) == '/') {
        systemMessage = chatApp.processCommand(message);
        if (systemMessage) {
            $('#messages').append(divSystemContentElement(systemMessage))
        }
    } else {
        chatApp.sendMessage($('#room').text(), message)
        $('#messages').append(divEscapedContentElement(message))
        $('#messages').scrollTop($('#messages').prop('scrollHeight'))
    }
    $('#send-message').val('')
}

var socket = io.connect()
var chatApp;
$(document).ready(() => {
    chatApp = new Chat(socket)
    socket.on('nameResult', (result) => {
        let message;
        if (result.success) {
            message = 'you are now known as ' + result.name
        } else {
            message = result.message

        }
        $('#messages').append(divSystemContentElement(message))
    })

    socket.on('joinResult', (result) => {
        $('#room').text(result.room)
        $('#messages').append(divSystemContentElement('Room changed'))
    })

    socket.on('message', (message) => {
        let newElement = $('<div></div>').text(message.text)
        $('#messages').append(newElement)

    })

    socket.on('rooms', (rooms) => {
        $('#room-list').empty()
        for (var r in rooms) {
            let room = r.substring(1, r.length)
            if (room !== '') {
                $('#room-list').append(divEscapedContentElement(room))
            }
        }
        $('#room-list div').click(function () {
            chatApp.processCommand('/join ' + $(this).text())
            $('#send-message').focus()
        })
    })

    setInterval(() => {
        socket.emit('rooms')
    }, 1000)

    $('#send-message').focus()

    $('#send-form').submit(function () {
        processUserInput(chatApp, socket)
        return false
    })
})