const { integer, pgEnum, pgTable, serial, uniqueIndex, varchar } = require('drizzle-orm/pg-core')

// declaring enum in database
const popularityEnum = pgEnum('popularity', ['unknown', 'known', 'popular']);

const countries = pgTable('countries', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
}, (countries) => {
    return {
        nameIndex: uniqueIndex('name_idx').on(countries.name),
    }
});

const cities = pgTable('cities', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    countryId: integer('country_id').references(() => countries.id),
    popularity: popularityEnum('popularity'),
});


module.exports = {
    popularityEnum,
    cities,
    countries,
}