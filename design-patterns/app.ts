import express from 'express'
import mongoose from 'mongoose'
import { EventBus, EventBus2 } from './event-bus'
import { User } from './user.schema'
import { Log } from './log.schema'

await mongoose.connect("mongodb://127.0.0.1:27017/demo")

const eventBus = new EventBus()
const eventBus2 = new EventBus2()
const app = express()


app.get('/', async (req, res) => {

    const users = await User.find()
    // eventBus.highCompute()
    eventBus2.emit('log', { data: [] })
    res.json(users)
    console.log('response send');
})

app.get('/logs', async (req, res) => {

    const logs = await Log.find()
    // eventBus.highCompute()
    eventBus2.emit('log', { data: [] })
    res.json(logs)
    console.log('response send');
})


app.listen(4000, () => console.log("on port 4000"))