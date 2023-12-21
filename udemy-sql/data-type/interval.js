/**
 * INTERVAL Datatype 
   eg 
      in postgres -> 6 years 5 months 4 days 3 hours 2 minutes 1 second
      in js       -> an object with 6 properties
   {
      years: 6,
      months: 5,
      days: 4,
      hours: 3,
      minutes: 2,
      seconds: 5
    }
 */

const { prisma, pgClient } = require("../db");


async function main() {

    console.log(
        await prisma.$queryRaw`
        -- example 
        -- SELECT
	    -- now(),
	    -- now() - INTERVAL '1 year 3 hours 20 minutes' AS "3 hours 20 minutes ago of last year";
        
        ----------- try to create a table with data type interval -------------
        -- create table interval (
        --     id serial primary key,
        --     name varchar(10),
        --     interval INTERVAL 
        -- )

        -- insert into interval (name,interval) values 
        -- ('interval 3','6 years 5 months 4 days 3 hours 2 minute 5 second')

        ------------ reading interval  
        -- select name,interval::text from interval  -- need to type cast as string for prisma 
        `
    );

    console.log(
        // (await pgClient.query('select * from interval')).rows,
        await prisma.interval.findMany()
    );
}


main()