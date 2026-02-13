const { spawn } = require('child_process');

const num1 = 5;
const num2 = 10;

const pythonProcess = spawn('python', ['script.py', num1, num2]);

pythonProcess.stdout.on('data', (data) => {
    // Data received from the Python script's stdout
    try {
        const resultObj = JSON.parse(data.toString());
        console.log(`Python script output: ${resultObj.result}`);
    } catch (e) {
        console.error('Failed to parse JSON:', e);
    }
});

pythonProcess.stderr.on('data', (data) => {
    // Handle any errors from the Python script
    console.error(`Python script error: ${data.toString()}`);
});

pythonProcess.on('close', (code) => {
    console.log(`Child process closed with code ${code}`);
});

const addon = require('./addon/build/Release/addon.node');

console.log({
    sum: addon.add(num1, num2)
});
