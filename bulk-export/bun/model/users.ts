import { Schema, model } from "mongoose";


export const UserModel = model('users', new Schema({}, { strict: false }))

