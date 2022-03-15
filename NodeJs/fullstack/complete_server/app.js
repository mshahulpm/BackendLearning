const fs = require('fs').promises
const path = require('path')
const express = require('express')

const port = process.env.PORT || 3001

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})

app.use(express.static(path.join(__dirname, 'public')))

app.get('/error', (req, res) => {
    throw new Error('Something went wrong')
})
app.get('/products', listProducts)

app.use(handleError)
app.use(notFound)
app.listen(port, () =>
    console.log(`Server listening on port ${port}`)
)

async function listProducts(req, res) {

    console.log(req.headers.origin)

    const productsFile = path.join(__dirname, 'demodata/products.json')
    try {
        const data = await fs.readFile(productsFile)
        res.json(JSON.parse(data))
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

function handleError(err, req, res, next) {
    console.error({ err })
    if (res.headerSent) return next(err)
    res.status(500).json({ error: 'Internal Error' })
}

function notFound(req, res) {
    res.status(404).send('Not found')
}