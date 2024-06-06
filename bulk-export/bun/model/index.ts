import * as mongoose from 'mongoose'
mongoose.connect(process.env.DATABASE_URL!)
export * from './users'