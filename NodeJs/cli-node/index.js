#! /usr/bin/env node
const yargs = require('yargs')
const Table = require('cli-table');
const chalk = require('chalk')
const prompts = require('prompts')
const netrc = require('netrc')
const { apiCall } = require('./api')


yargs.option('endpoint', {
    alias: 'e',
    default: 'https://jsonplaceholder.typicode.com/posts',
    describe: 'Endpoint to use'
})
    .command(
        'list posts',
        'Get a list of posts',
        {
            tag: {
                alias: 't',
                describe: 'Filter posts by tag',
            },
            limit: {
                alias: 'l',
                type: 'number',
                default: 25,
                describe: 'Limit the number of results'
            },
            offset: {
                alias: 'o',
                type: 'number',
                default: 0,
                describe: 'Skip number of results'
            }
        },
        listPosts
    )
    .command(
        'get one post <id>',
        'Get a single post',
        {},
        getOnePost
    )
    .command(
        'login',
        'Login to the application',
        {},
        loginUser
    )
    .command(
        'logout',
        'Logout from the application',
        {},
        logoutApplication
    )
    .command(
        'whoami',
        'Get the current user',
        {},
        whoami
    )
    .help()
    .demandCommand(1, 'You need at least one command ')
    .parse()


async function listPosts(options) {

    const { username, password } = loadConfig()

    if (!username || !password) {
        const loggedIn = await loginUser()
        if (!loggedIn) return
    }

    try {
        const posts = await apiCall(options)
        const cols = process.stdout.columns - 10
        const colsId = 30
        const colsProp = Math.floor((cols - colsId) / 3)

        const table = new Table({
            head: ['Id', 'Title', 'Body'],
            colWidths: [4, 35, 40]
        })

        posts.forEach(post => {
            table.push([post.id, post.title, post.body])
        })

        console.log(table.toString())

    } catch (error) {
        console.log(error)
    }
}

async function getOnePost(options) {

    const { username, password } = loadConfig()

    if (!username || !password) {
        const loggedIn = await loginUser()
        if (!loggedIn) return
    }

    try {
        const post = await apiCall(options, true)
        const table = new Table({
            colWidths: [10, 65]
        })
        Object.keys(post).forEach(key => {
            table.push({ [key]: post[key] })
        })
        console.log(table.toString())
    } catch (error) {
        console.log(error)
    }
}

async function loginUser(options) {

    const { username: uname, password: pwd } = loadConfig()
    if (uname && pwd) {
        return console.log(chalk.red('You are already logged in'))
    }

    const { username, password } = await prompts([
        {
            name: 'username',
            message: chalk.gray('Please enter username'),
            type: 'text'
        },
        {
            name: 'password',
            message: chalk.gray('Please enter password'),
            type: 'password'
        }
    ])

    if (username === 'admin' && password === 'admin') {
        saveConfig(username, password)
        console.log(chalk.green('Login Successful'))
        return true
    } else {
        console.log(chalk.red('Login Failed'))
    }

}

function logoutApplication(options) {
    saveConfig()
    console.log(chalk.cyan('Logout Successful'))
}

function whoami(options) {
    const { username, password } = loadConfig()
    if (username && password) {
        console.log(chalk.green('You are logged in as ' + username))
    } else {
        console.log(chalk.red('You are not logged in'))
    }
}


function saveConfig(username, password) {
    const allConfig = netrc()
    allConfig.userNodeCLI = {
        username,
        password
    }
    netrc.save(allConfig)
}

function loadConfig() {
    const allConfig = netrc()
    return allConfig.userNodeCLI
}