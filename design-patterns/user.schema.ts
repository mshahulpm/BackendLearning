import { model, Schema } from 'mongoose'

const userSchema = new Schema({
    name: String,
    age: String
})

export const User = model("User", userSchema)