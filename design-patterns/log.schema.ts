import { model, Schema } from 'mongoose'

const logSchema = new Schema({
    log: String,
    time: Date
})

export const Log = model("Log", logSchema)