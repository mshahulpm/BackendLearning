/**
 *  TIMESTAMP Data type 
 *  1. TIMESTAMP   datetime without time zone
 *  2. TIMESTAMPTZ datetime with time zone
 */
const { prisma, pgClient } = require('../db')


async function main() {

    console.log(
        await prisma.$queryRaw`
        -- select typname,typlen from pg_type where  typname ~ '^timestamp'; 

        ----------- create a table for timestamp --------------
        -- create table timestamp (
        --     id serial primary key,
        --     ts  timestamp,
        --     tstz timestamptz 
        -- )

        -- insert some values 
        -- show timezone

        -- set timezone = 'America/Los_Angeles'
        -- set timezone = 'Asia/Calcutta'

--         INSERT INTO timestamp (ts, tstz)
-- VALUES('2016-06-22 19:10:25-07','2016-06-22 19:10:25-07');
        
        -- select * from timestamp

        ---- select current timestamp 
        -- select CURRENT_TIMESTAMP

        ---- current time without date 
        -- select CURRENT_TIME  -- prisma add some extra date to it 

        -- select TIMEOFDAY()  -- eg: 'Thu Dec 21 18:33:18.681878 2023 IST'

        


        `
    );

    console.log(
        (await pgClient.query(`select CURRENT_TIME`)).rows
    );

}


main()