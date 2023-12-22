//  where filtering 

const { prisma, pgClient } = require("../db");


async function main() {

    console.log(
        await prisma.$queryRaw`

        -- insert into cities (name,country,population,area) values 
        -- ('Tokio','Japan',38000000,8235),
        -- ('Delhi','India',28000000,7235),
        -- ('London','UK',18000000,6789),
        -- ('Abudabi','UAE',15000000,5660)

        select * from ( select population / area as density from cities ) as t where density = 4614 

        `
    );

    console.log(
        // (await pgClient.query(`select * from ( (population / area) as density from cities ) as t where density = 4614 `)).rows
    );

}

main()