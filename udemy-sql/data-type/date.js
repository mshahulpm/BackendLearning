/**
 *  DATE Datatype  postgres store date in yyyy-mm-dd format (prisma wil convert it to datetime format)
 *  max limit 5874897 AD ()
 */
const { prisma, pgClient } = require("../db");



async function main() {

    const bc_date = new Date()
    // bc_date.setFullYear(-2000)    // to set bc please comment out, commented due to prisma throw error 

    // inserting bc date using prisma   leads to error
    // console.log(await prisma.date.create({
    //     data: {
    //         date: bc_date
    //     }
    // }));


    // inserting using pg client bc date can be inserted using pg client 
    // console.log(
    // await pgClient.query(`insert into date (date) values ($1)`, [bc_date])
    // (await pgClient.query(`select * from date`)).rows
    // );


    console.log(
        await prisma.$queryRaw`

        ------------- create a table for date type --------------
        -- create table date (
        --     id serial primary key,
        --     date date not null default current_date 
        -- )

        ----------- insert some values ------------
        -- insert into date (date) values 
        -- ('2005-01-01'),   -- valid insert
        -- ('01-01-2005'),   -- I wonder it didn't throw error 
        -- ('40-40-200006')  -- throws error 
        -- ('01-2005-01')    -- throws error
        -- ('5874897-12-31') -- valid (maximum possible value) javascript can't hold it (09/13/275760) possible value
        -- ('5874898-01-01') -- throw error
        -- (${new Date()})   -- valid insert
        -- (${bc_date})      -- prisma error
        -- ('275760-09-12')  -- valid (max limit js can hold)

        -- select * from date where id = 4  -- invalid date causing error
        -- select * from date where id = 9  -- bc date converted to ad 
        -- select * from date where id = 10 -- max js date but prisma error  

        ------------- Create employee table ---------------
        -- create table employee (
        --     id serial primary key,
        --     name varchar(10),
        --     birth_date date not null,
        --     hire_date date not null 
        -- )

        -- insert some employees 
        -- insert into employee (name,birth_date,hire_date) values 
        -- ('shahul','1995-02-25','2021-06-20'),
        -- ('nazeem','1999-12-05','2021-03-02'),
        -- ('ashique','1998-07-18','2022-05-12'),
        -- ('nimmy','1979-11-28','2023-01-04')

        -- current date of database server
        -- select now()  
        -- select current_date
        -- select to_char(now()::date,'dd/mm/yyyy') -- format date 
        -- select to_char(now()::date,'dd/mm/yyyy') -- format date 
        -- select to_char(now()::date,'Mon day yyyy')  -- format date 

        -- select id, to_char(birth_date,'dd Mon yyyy') as birth_date,hire_date from employee

        -- interval b/w two date (prisma don't support this datatype so try to cast as string)
        -- select name, (now()-hire_date)::text as working_period from employee  

        -- calculate age of employees   age is also returned as interval need to cast as string
        -- select name, age(birth_date)::text from employee

        -- Extract year, quarter, month, week, day from a date value 
        select 
           name,
           extract(year from birth_date) as year, 
           extract(month from birth_date) as month, 
           extract(day from birth_date) as day 
        from employee
        
        `,

    );

    console.log(
        // postgres interval
        // (await pgClient.query(`select name, (now()-hire_date) as working_period from employee`)).rows

        // calculate age of employee
        // (await pgClient.query(`select name, age(birth_date) from employee`)).rows
    );

}

main()