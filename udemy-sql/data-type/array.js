/**
 * Array Data type
 */

const { prisma, pgClient } = require("../db");



async function main() {

    const some_json_array = [
        { name: 'shahul', age: 28 },
        { name: 'nazeem', age: 25 },
        { name: 'ashique', age: 24 },
    ]

    console.dir(

        await prisma.$queryRaw`
        -- create a table with array data type 
        -- create table _array (
        --     id serial primary key,
        --     text_array text[],
        --     char_array  char(1)[],
        --     num_array  int[],
        --     json_array json[]
        -- )

        -- insert some values 
        -- insert into _array (text_array,char_array,num_array) values 
        -- (
        --     ARRAY ['hey','hoy','how are you'],
        --     ARRAY ['A','B','C','D'],
        --     ARRAY [1,2,3,4,5]
        --     -- ARRAY [${some_json_array}] 
        -- )

        -- insert into _array (char_array) values 
        -- (ARRAY ['AB'])   -- will throw error

        -- insert into _array (num_array) values 
        -- (ARRAY ['AB'])   -- will throw error

        -- insert into _array (json_array) values 
        -- ( ${some_json_array})   

        select * from _array  
        `,
        { depth: null }

    );

    // console.log((await pgClient.query(`insert into _array (json_array) values ($1) returning id`, [some_json_array])).rows);

    // await prisma.array.create({
    //     data: {
    //         json_array: some_json_array
    //     }
    // })
    return
    console.dir(
        // await prisma.array.findMany({
        //     where: {
        //         id: 2
        //     },
        //     // select: {
        //     //     // id: true,
        //     //     // json_array: false,
        //     //     // char_array: true,
        //     //     // text_array: true,
        //     //     // num_array: true
        //     // }
        // }),
        (await pgClient.query(`select * from _array`)).rows,
        { depth: null }
    );

}


main()