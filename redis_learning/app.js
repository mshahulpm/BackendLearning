const express = require("express")
const axios = require("axios")
const redis = require("redis")
const morgan = require("morgan")

const DEFAULT_REDIS_EXP = 3600

const redisClient = redis.createClient()
redisClient.connect().then(() => console.log("redis connected"))

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

app.get("/photos", async (req, res) => {

    // handling cache 
    const cache = await redisClient.get("photos")
    if (cache) {
        console.log("reading from cache");
        return res.json(JSON.parse(cache))
    }
    const { data: photos } = await axios.get("https://jsonplaceholder.typicode.com/photos")
    await redisClient.setEx("photos", DEFAULT_REDIS_EXP, JSON.stringify(photos))
    res.json(photos)
})

app.get("/photos/:id", async (req, res) => {

    // handling cache 
    const cache_id = `photo-${req.params.id}`
    const cache = await redisClient.get(cache_id)
    if (cache) {
        console.log("reading from cache");
        return res.json(JSON.parse(cache))
    }
    const { data: photo } = await axios.get("https://jsonplaceholder.typicode.com/photos/" + req.params.id)
    await redisClient.setEx(cache_id, DEFAULT_REDIS_EXP, JSON.stringify(photo))
    res.json(photo)
})

app.listen(3000, () => {
    console.log("server is running on port 3000");
})