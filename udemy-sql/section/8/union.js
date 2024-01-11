const { prisma } = require("../../db");

/**
 
   UNION 

   In SQL, the UNION operator is used to combine the result sets of two or more SELECT statements. It is important to note that the UNION operator removes duplicate rows from the combined result set. 

   Example Use Case: Suppose you have two tables, one containing customer information from an online store and another from an offline store. You might want to combine the lists of customers from both tables while ensuring there are no duplicates (CHATGPT)

   UNION ALL

   If you want to include duplicate rows, you can use the UNION ALL operator.

   Example Use Case: If you want to combine the results of two queries and include all occurrences, including duplicates, you might use UNION ALL. For instance, if you want a list of all orders from both online and offline stores: (CHATGPT)
 */

async function main() {

        console.dir(

                await prisma.$queryRaw`

-- problem 1 find 4 products with highest price and 4 products with highest price/weight ratio 

-- 4 products with highest price 
-- select name,price from products2 order by price desc limit 4 

-- 4 products with highest price 
-- select name,price,weight from products2 order by price/weight desc limit 4 

-- for to get both of them we use union (skip duplicate values,each union must have same no of columns)
-- (select name,price,weight from products2 order by price desc limit 4 )
-- union 
-- (select name,price,weight from products2 order by price/weight desc limit 4 ) 

-- to include duplicate values use union all 
(select name,price,weight from products2 order by price desc limit 4 )
union all
(select name,price,weight from products2 order by price/weight desc limit 4 ) 


        `

                , { depth: null });

}

main()