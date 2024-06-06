/**
 * use this file to generate seed data and import this to mongodb
 */

import { writeFileSync } from 'fs'

let size = 2000000

const data = new Array(size)

for (let i = 0; i < size; i++) {

    data[i] = {
        firstName: `Full `,
        lastName: `Name ${i}`,
        email: `${i}@mail.com`,
        age: Math.floor(Math.random() * 100 + 1),
        place: `Place ${i}`
    }

}

writeFileSync(__dirname + '/users.json', JSON.stringify(data))