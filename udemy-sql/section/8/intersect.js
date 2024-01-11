const { prisma } = require("../../db");

/**
   INTERSECT 

   In SQL, the INTERSECT operator is used to combine the result sets of two SELECT statements while returning only the common rows between them. It is important to note that, like UNION, INTERSECT automatically removes duplicate rows from the combined result set.

   Example Use Case: Suppose you have two tables with a list of products, and you want to find the products that are common between both tables.(CHATGPT)

   INTERSECT ALL 
   In SQL, the INTERSECT operator by default removes duplicate rows from the result set. If you want to include all occurrences of rows, including duplicates, you can use the INTERSECT ALL operator.

   Example Use Case: If you want to find common values and include all occurrences, you can use INTERSECT ALL. For example, finding common products between two suppliers while considering multiple occurrences: (CHATGPT)
 */

async function main() {

    console.dir(

        await prisma.$queryRaw`

-- problem find common products which is present in 10 most priced product and 10 most highest price/weight ratio products 

-- (select name,price from products2 order by price desc limit 15) 
-- INTERSECT
-- (select name,price from products2 order by price/weight desc limit 15) 

-- intersect all 
-- (select name,price from products2 order by price desc limit 15) 
-- INTERSECT ALL
-- (select name,price from products2 order by price/weight desc limit 15) 

        `

        , { depth: null });

}

main()