/**
 * Numeric data type 
 * NUMERIC(precision,scale)
 */

const { prisma, pgClient } = require("../db");


async function main() {

    await pgClient.connect()


    console.log(
        await prisma.$queryRaw`

            --  ------- create table for numeric ---------
            -- create table numeric (
            --     id serial primary key,
            --     price numeric(5,2),
            --     price2 numeric(5)
            -- )

            -- --------------- insert some sample values -------------------
            -- insert into numeric (price) values 
            -- (500.527)     -- will round to to 500.53 because scale is 2 
            -- (999.99),     -- max value this field can hold
            -- (-999.99)     -- min value this field can hold
            -- (1000)        -- will throw error
            -- (-1000)       -- will throw error

            -- insert into numeric (price2) values 
            -- (99999)      -- max eligible value 
            -- (-99999)     -- min eligible value 
            -- (100000)     -- will throw error 
            -- (1000.568)   -- will be rounded to 1001

            -------------- numeric field can hold NaN  ------------- 
            -- insert into numeric (price,price2) values ('NaN','NaN') -- prisma returns NaN as 0 

            ----------- NaN is bigger than any number ------------ 
            -- select * from numeric where price is not null order by price desc

            `
    );

    // pg client return Nan as string while prisma returns as 0
    const dataWithNan = (await pgClient.query(`select * from numeric where price = 'NaN'`)).rows

    console.log({ dataWithNan });

    pgClient.end()
}


main()