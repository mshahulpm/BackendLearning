const { PrismaClient } = require('@prisma/client')
const { Client } = require('pg')

const prisma = new PrismaClient({
    log: ['query']
})

const pgClient = new Client({
    host: 'localhost',
    port: 5432,
    database: 'udemy-sql',
    user: 'postgres',
    password: '123456',
})

pgClient.connect()

module.exports = {
    prisma,
    pgClient
}