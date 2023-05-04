import 'dotenv/config'
import adapter from "@lucia-auth/adapter-mongoose";
import { express } from "lucia-auth/middleware";
import lucia from "lucia-auth";
import mongoose from "mongoose";
import Express from 'express'



const User = mongoose.model(
    "auth_user",
    new mongoose.Schema(
        {
            _id: {
                type: String
            },
            name: {
                type: String
            }
        },
        { _id: false }
    )
);

const Session = mongoose.model(
    "auth_session",
    new mongoose.Schema(
        {
            _id: {
                type: String
            },
            user_id: {
                type: String,
                required: true
            },
            active_expires: {
                type: Number,
                required: true
            },
            idle_expires: {
                type: Number,
                required: true
            }
        },
        { _id: false }
    )
);

const Key = mongoose.model(
    "auth_key",
    new mongoose.Schema(
        {
            _id: {
                type: String
            },
            user_id: {
                type: String,
                required: true
            },
            hashed_password: String,
            primary_key: {
                type: Boolean,
                required: true
            },
            expires: Number
        },
        { _id: false }
    )
);

mongoose.connect(process.env.MONGO_URL)

const auth = lucia({
    env: 'DEV',
    adapter: adapter(mongoose),
    middleware: express()
});

const app = Express()

app.use((req, res, next) => {
    res.locals.auth = auth.handleRequest(req, res);
    next();
});


app.get('/', (req, res) => {
    res.json({ message: "Hello welcome" })
})


app.listen(3000, () => console.log('server running on port 3000'))
