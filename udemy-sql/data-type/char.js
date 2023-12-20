/**
 *   CHAR,VARCHAR,TEXT 
 * 
 *   1. CHAR(N)     - blank padded fixed length of string  
 *     -eg for CHAR(5)  ->  'ab   ' , '12345' '12345    '(truncate excess space) 
 *           '123456' => leads to error 
 *   2. VARCHAR(N)  - string with variable length max upto N numbers 
 *      -eg for VARCHAR(5)  ->  'ab' , '12345' '12345    '(truncate excess space) 
 *           '123456' => leads to error 
 *   3. TEXT        - string with variable length without limit 
 * 
 *   NB :
 *         - VARCHAR without limit will act as TEXT 
 *         - CHAR    without limit is equal to CHAR(1) 
 */

const { prisma } = require("../db");

let longText = '', i = 0;
// while (i < 10000000) {
//     longText += i
//     i++
// }

async function main() {

    console.log(
        await prisma.$queryRaw`
          
        --    ----- create table for char ----- 

        -- create table char (
        --     id serial primary key,
        --     char char(5),
        --     varchar varchar(10),
        --     text text,
        --     varchar_without_limit varchar, 
        --     char_without_limit char
        -- )

        --  -------- test CHAR ---------
        -- insert into char (char) values ('12345') -- length 5
        -- insert into char (char) values ('123') -- length less than 5
        -- insert into char (char) values ('12345        ') -- length more than 5 but spaces
        -- insert into char (char) values ('123456') -- length more than 5 -> will throw error

        --  --------- test VARCHAR ---------
        -- insert into char (varchar) values 
        -- ('123'),              -- less than 10 
        -- ('1234567890'),       -- 10
        -- ('1234567       ')    -- more than 10 but spaces 
        -- ('12345678901')       -- more than 10 will throw error 
       

        --  --------- test TEXT ---------
        -- insert into char (text) values 
        -- (''),
        -- ('1'),
        -- ('123456'),
        -- ('1234                 '),
        -- (${longText})

        --  --------- test VARCHAR without limit ---------
        -- insert into char (varchar_without_limit) values 
        -- (''),
        -- ('1'),
        -- ('123456'),
        -- ('1234                 '),
        -- (${longText})        

        --  -------- test CHAR ---------
        -- insert into char (char_without_limit) values ('1')              -- length 1
        -- insert into char (char_without_limit) values ('')               -- length less than 1
        -- insert into char (char_without_limit) values ('1        ')      -- length more than 1 but spaces
        -- insert into char (char_without_limit) values ('123456')         -- length more than 1 -> will throw error

        `
    );


}


main() 