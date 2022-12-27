const express = require('express')
const app = express()



app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/home', async (req, res) => {
    res.json({ message: 'welcome home' })
})



app.listen(3000, () => {
    console.log('server is on port 3000')
})