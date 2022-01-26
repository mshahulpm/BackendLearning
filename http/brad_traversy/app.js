const express = require('express')
const path = require('path')


const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/public'))

//  allow cross origin requests (optional)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})
app.get('/test', (req, res) => {

    res.send({ name: 'hello' })
})

app.get('/a', (req, res) => {
    res.send(req.header('user-agent'))
})

app.get('/b', (req, res) => {
    res.send(req.rawHeaders)
})

app.post('/contact', (req, res) => {
    const { name } = req.body
    if (!name) return res.status(400).send('name is required')
    res.status(201).send(`${name} has been added`)
})

app.post('/login', (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.redirect('/error.html')
    if (username === 'admin' && password === 'admin') {
        res.setHeader('x-auth-token', '12345')
        res.cookie('x-auth-token', '12345', { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
        res.status(200).send(`${username} has been logged in`)
    } else {
        res.status(401).send('invalid credentials')
    }

})

app.get('/protected', (req, res) => {
    const token = req.header('cookie')?.split('=')[1]

    console.log(req.headers)
    if (!token) return res.status(401).send('access denied')
    if (token === '12345') {
        res.send({
            message: 'access granted',
            data: 'hello data 1',
            data2: 'hello data 2'
        })
    } else res.status(401).send('Invalid token')
})

app.post('/protected', (req, res) => {

    const token = req.header('x-auth-token')
    if (!token) return res.status(400).send('Please send a token')
    if (token !== '12345') return res.status(401).send('Invalid token')
    res.send('You are logged in')
})

app.put('/post/:id', (req, res) => {

    res.send({
        id: req.params.id,
        ...req.body
    })
})

app.delete('/post/:id', (req, res) => {
    res.send(`Post ${req.params.id} has been deleted`)
})

//  redirect status check 

app.get('/redirect', (req, res) => {
    res.redirect('/')
})

//  send file 
app.get('/invoice', (req, res) => {
    // res.setHeader('Content-Type', 'application/octet-stream')
    res.sendFile(path.join(__dirname, 'invoice.pdf'))
})

app.get('/invoice2', (req, res) => {
    res.setHeader('Content-Type', 'application/octet-stream')
    res.sendFile(path.join(__dirname, 'invoice.pdf'))
})


app.listen(3001, () => {
    console.log('Server is running on port 3001')
})