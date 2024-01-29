const { prisma } = require("../../db");

/**
 * DISTINCT : get distinct values from a columns
 */

async function main() {

    console.dir(

        await prisma.$queryRaw`
        -- select distinct department from products2
        -- select count(distinct department)::int from products2  --//? count of distinct value
        -- select distinct department,name from products2  -- //? combination of name and department distinct value
        -- select count(distinct department,name) from products2  -- // !Error count can't possible on multiple field

        `

        , { depth: null });

}

main()