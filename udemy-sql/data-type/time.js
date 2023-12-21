/**
 * TIME data type
 */

const { prisma, pgClient } = require("../db");


async function main() {

    console.log(
        await prisma.$queryRaw`
        ------------ Create a table with time datatype --------------
        -- create table time (
        --     id serial primary key,
        --     time time default CURRENT_TIME,
        --     time2 time 
        -- )

        -- insert into time default values 

        -- select * from time 

        -- CREATE TABLE shifts (
        --   id serial PRIMARY KEY,
        --   shift_name VARCHAR NOT NULL,
        --   start_at TIME NOT NULL,
        --   end_at TIME NOT NULL
        -- );  
        
        -- INSERT INTO shifts(shift_name, start_at, end_at) VALUES
        -- ('Morning', '08:00:00', '12:00:00'),
        -- ('Afternoon', '13:00:00', '17:00:00'),
        -- ('Night', '18:00:00', '22:00:00');

        select * from shifts
        `
    );

    console.log(
        (await pgClient.query(`select * from shifts`)).rows
    );

}


main()