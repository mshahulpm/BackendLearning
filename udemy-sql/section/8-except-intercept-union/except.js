const { prisma } = require("../../db");

/**
  EXCEPT

  In SQL, the EXCEPT operator is used to retrieve the rows that are present in the result set of the first SELECT statement but not in the result set of the second SELECT statement. It is similar to the MINUS operator in some other database systems.

  Example Use Case: Suppose you have a list of active customers and a list of customers who made a purchase in the last month. You might want to find customers who were active but did not make a purchase recently.(CHATGPT)

  EXCEPT ALL

  In SQL, the EXCEPT ALL operator is used to retrieve all the rows that are present in the result set of the first SELECT statement but not in the result set of the second SELECT statement, including duplicates. It's similar to EXCEPT, but it retains all occurrences of rows, even if they are duplicates.

  Example Use Case: If you want to find values in the first set but not in the second and include all occurrences, you can use EXCEPT ALL. For instance, finding products in the first inventory but not in the second (CHATGPT)

 */

async function main() {

    console.dir(

        await prisma.$queryRaw`

--  problem select products from fist 4 highest expensive which does not exist in first 4 highest price/weight ratio products 

-- ( select name,price from products2 order by price desc limit 4 ) 
-- EXCEPT 
-- ( select name,price from products2 order by price/weight desc limit 4 ) 

-- except all 
( select name,price from products2 order by price desc limit 4 ) 
EXCEPT ALL
( select name,price from products2 order by price/weight desc limit 4 ) 

        `

        , { depth: null });

}

main()