const { prisma, pgClient } = require("../../db");

/**
 * 
 */

async function main() {

    console.dir(

        await prisma.$queryRaw`
        -- select 2.0::numeric  --//! some wired function returning
        -- select price,price2 from numeric
        `

        , { depth: null });

    console.dir(
        await prisma.numeric.findMany({
            select: { price: true, price2: true },
            take: 1
        }),
        { depth: null }
    )

    console.log(
        typeof (await pgClient.query('select 2.0::numeric')).rows[0].numeric // ! return type as string
    );

}

main()