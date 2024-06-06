import { config } from "dotenv";
import * as mongoose from "mongoose";
config()
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('db connected'))
    .catch(err => console.log(err.message))


const { Schema, model } = mongoose

export const UserModel = model('users', new Schema({}, { strict: false }))