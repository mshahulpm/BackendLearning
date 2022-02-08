//  A CLI to add tasks to a todo list. and list tasks.

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

const command = args.shift();

const taskDescription = args.join(',');

const file = path.join(process.cwd(), '/.tasks')

switch (command) {
    case 'list':
        listTask(file)
        break;
    case 'add':
        addTask(file, taskDescription)
        break;
    default:
        console.log(`Usage: ${process.argv[0]}  list|add [taskDescription]`)
}

// loading JSON-encoded data from a text file

function loadOrInitializeTaskArray(file, cb) {
    fs.exists(file, (exists) => {
        let tasks = []
        if (exists) {
            fs.readFile(file, 'utf-8', (err, data) => {
                if (err) throw err;
                data = data.toString();
                tasks = JSON.parse(data || '[]');
                cb(tasks)
            })
        } else {
            cb(tasks)
        }
    })
}


function listTask(file) {
    loadOrInitializeTaskArray(file, (tasks) => {
        console.log(`You have ${tasks.length} tasks`)
        tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`)
        })
    })
}

// helper function, storeTasks, to store JSON-serialized tasks into a file.
function storeTask(file, tasks) {
    fs.writeFile(file, JSON.stringify(tasks), 'utf-8', (err) => {
        if (err) throw err;
        console.log('Task saved')
    })
}


function addTask(file, newTask) {
    loadOrInitializeTaskArray(file, (tasks) => {
        tasks.push(newTask);
        storeTask(file, tasks)
    })
}