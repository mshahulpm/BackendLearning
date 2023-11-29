const express = require('express')
const { drizzle } = require('drizzle-orm/node-postgres')
const { migrate } = require('drizzle-orm/node-postgres/migrator')
const { Client } = require('pg');
const { model } = require('./schema');
const schema = require('./schema');
const { eq } = require('drizzle-orm');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    log: ['query', 'info']
})

const client = new Client({
    connectionString: "postgres://postgres:123456@localhost:5432/drizzel",
});

const db = drizzle(client, { schema });

async function dbConnect() {

    await client.connect();

    const migrationResult = await migrate(db, { migrationsFolder: './drizzle/migrations' });
    console.log(migrationResult);

}

dbConnect()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/new-random-country', async (req, res) => {

    const dt = {
        name: `Name ${Math.random().toString().slice(2)}`
    }

    const country = await db.insert(schema.countries).values(dt).returning()
    const country_2 = await prisma.country.create({
        data: dt
    })

    res.json({ country, country_2 })

})

app.get('/all-countries', async (req, res) => {

    const _drizzle = await db.select().from(schema.countries)
        .leftJoin(schema.cities, eq(schema.countries.id, schema.cities.countryId))
        .leftJoin(schema.population, eq(schema.cities.id, schema.population.cityId))

    const _prisma = await prisma.country.findMany({
        include: {
            City: {
                include: {
                    Population: true
                }
            }
        },
        take: 2
    })

    const _pg = (await client.query(`select * from countries left join cities on countries.id = cities.country_id`)).rows

    res.json({ _drizzle, _pg, _prisma })
})

app.get('/new-random-city', async (req, res) => {

    const data = {
        countryId: 1,
        name: `Name ${Math.random().toString().slice(2)}`,
        popularity: 'known'
    }

    const city = await db.insert(schema.cities).values(data).returning()
    const city2 = await prisma.city.create({
        data
    })

    res.json({ city, city2 })

})

app.get('/all-cities', async (req, res) => {

    const cities = await db.query.cities.findMany()

    res.json(cities)
})

app.get('/add-population/:id', async (req, res) => {
    const id = +req.params.id
    const population = await prisma.population.create({
        data: {
            cilityId: id
        }
    })
    res.json(population)
})

app.listen(3005, () => console.log('server is running on port 3005'))

