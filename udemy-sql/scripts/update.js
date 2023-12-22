const { prisma } = require("../db");



async function main() {

    console.log(
        await prisma.$queryRaw`
        -- update cities set population = 39254562 where name = 'Tokio'
        
        select * from cities where name = 'Tokio';
        `,

    );

}


main()