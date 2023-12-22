/**
 * JSON data type
 */

const { prisma, pgClient } = require("../db");


async function main() {

    let expertise = [
        { name: 'JS', exp_in_years: 2 },
        { name: 'React', exp_in_years: 2 },
        { name: 'Node', exp_in_years: 2 },
        { name: 'Go', exp_in_years: 2 },
        { name: 'Python', exp_in_years: 2 },
    ]

    let sampleJson = [
        { name: 'shahul', age: 28, birth_date: new Date('02/25/95'), is_married: false, expertise: [expertise[0], expertise[1], expertise[2]] },
        { name: 'nazeem', age: 24, birth_date: new Date('02/25/99'), is_married: false, expertise },
        { name: 'ashique', age: 25, birth_date: new Date('02/25/98'), is_married: true, expertise: [expertise[0], expertise[1]] },
    ]

    console.dir(
        await prisma.$queryRaw`
        ----------- create table with json  ---------- 
        -- create table json (
        --     id serial  primary key,
        --     json json not null 
        -- )

        -- insert into json (json) values
        -- (${sampleJson[0]}),
        -- (${sampleJson[1]}),
        -- (${sampleJson[2]})


        -- select id,json as user from json 

        -- select one field from json as json type 
        -- select id, json -> 'name' as user_name, json -> 'expertise' as expertise  from json 

        -- select one field from json as text (all data type will be converted as string)
        -- select id, json ->> 'name' as user_name, json ->> 'expertise' as expertise,json ->> 'is_married' as is_married   from json 

        -- combining -> and ->> 
        select json -> 'expertise' ->> 'name' from json 

        `,
        { depth: null }
    );

    console.log(
        // (await pgClient.query(`select * from json`)).rows
    );

}


main()