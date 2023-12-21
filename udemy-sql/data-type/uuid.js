/**
 * UUID data type
 */

const { prisma, pgClient } = require("../db");


async function main() {

    console.log(
        await prisma.$queryRaw`
        ----------- create table with uuid and make it primary key ---------- 
        -- create table uuid (
        --     id uuid default uuid_generate_v4() primary key,
        --     name VARCHAR(10)
        -- )

        -- insert into uuid default values

        select * from uuid
        `
    );

    console.log(
        // (await pgClient.query(`select * from shifts`)).rows
    );

}


main()