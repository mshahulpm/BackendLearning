const { prisma } = require("../../db");

/**
 * 
 */

async function main() {

    console.dir(

        await prisma.$queryRaw`
        -- select greatest(10,2,3) --//? find greatest value from a set of values 
        -- select name,weight,greatest(30,2*weight) from products2
        -- select least(10,2,3) --//? find least value from a set of values 
        -- select name,price,least(price * .5,400)::float from products2
        -- //? CASE : using to generate another column conditionally 
        select name,price, 
        case 
           when price > 600 then 'high'
           when price > 300 then 'medium'
           else 'cheap'
        end 
        from products2
        `

        , { depth: null });

}

main()