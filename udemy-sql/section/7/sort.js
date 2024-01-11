const { prisma } = require("../../db")

/**
 * sort will happen according to first to last option 
 * eg :  order by name , price , weight  -- this will be sorted first by name then price , and then weight
 */


async function main() {

    console.dir(
        await prisma.$queryRaw`
        -- select name, price from products2 order by price 
        -- select name, price from products2 order by price desc -- descending order
        -- select name, price from products2 order by name 
        -- select name, price from products2 order by name  desc  -- descending order

        -- select name, price,weight from products2 order by name desc , price limit 6 -- descending order


        -- offset (skip)
        -- select name, price,weight from products2 order by name desc,price,weight limit 6 offset 20 -- descending order
        

        -- get 5 least expensive products 
        -- select name,price from products2 order by price limit 5

        -- get 5 most expensive products 
        select name,price from products2 order by price desc limit 5 offset 1

        `
        , { depth: null })

}


main()