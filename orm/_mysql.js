require('dotenv').config()
const mysql = require('mysql2')
const { Sequelize } = require('sequelize');

const connection = mysql.createConnection(process.env.DB_URL)
console.log('Connected to PlanetScale!')
connection.end()


// const sequelize = new Sequelize(process.env.DB_URL, {
//     dialect: 'mysql',
//     dialectOptions: {
//         ssl: {
//             rejectUnauthorized: true,
//         },
//     },
//     // ssl: `{rejectUnauthorized: true}`,
// });

// (async () => {
//     await sequelize.authenticate()
// })()
