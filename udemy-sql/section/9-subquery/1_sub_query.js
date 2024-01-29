const { prisma, pgClient } = require("../../db");

/**
    A subquery, also known as an inner query or nested query, is a query embedded within another query. It is used to retrieve data that will be used by the main query as a condition to further restrict the data to be retrieved or processed. In other words, a subquery is a query within another query, and it is enclosed in parentheses.

    There are two main types of subqueries:

    1.Single-row subquery: A subquery that returns only one row and one column. This type of subquery is often used with single-row operators like =, >, <, etc.

    Example:
    SELECT employee_name
    FROM employees
    WHERE employee_id = (SELECT manager_id FROM departments WHERE department_name = 'IT');

    2.Multiple-row subquery: A subquery that can return multiple rows of one or more columns. This type of subquery is typically used with multiple-row operators like IN, ANY, ALL, etc.

    Example:
    SELECT department_name
    FROM departments
    WHERE department_id IN (SELECT department_id FROM employees WHERE salary > 50000);

 */

async function main() {

    console.dir(

        await prisma.$queryRaw`

--> select name and price of all product which have higher price than highest priced product in Toys department 
-- select name,price from products2 where price > 
-- -- here is sub query
-- (
--     select max(price) from products2 where department = 'Toys' -- 947 is max price 
-- )
--> select name and price of all product , and also append max price of product to all product
-- select name,price, (select max(price) from products2)  from products2

--> above one but append price of product where id = 3 
-- select name,price,(select price from products2 where id = 3 ) as prod_3_price from products2  

-- select name,price, (price / (select max(price) from products2)) as price_ratio 

-- from products2

-- select * from (select max(price) from products2) as p 

-- ------------- sub query in from clause --------------------
-- select avg(order_count)::float from 
-- (
--     select user_id , count(*)::int as order_count from orders2 group by user_id
-- )as p 

-- ------------- sub query in  where claus --------------------
-- select id from orders2 where product_id in (
--     select id from products2 where price / weight > 450  
-- ) 

-- --> get name of all products where price greater than average price 
-- select name,price from products2 where price > (
--     select avg(price)::float from products2
-- )

-- >  select name and department from products where department should not contain products with price < 100 
-- select name,department,price from products2 where 
-- department not in (
--     select department from products2 where price < 100 
-- )

-- > select name and price of all product where it's price > than at least one of product in industrial department 

-- select name,price from products2 where price > some (
--     select price from products2 where department = 'Industrial'
-- )

-- > get most expensive products in every departments 

-- select name,price,department from products2 as p1 
-- where p1.price = (
--     select max(price) from products2 as p2 where p1.department = p2.department
-- )

-- select products and no of orders by sub query 
-- select name,price ,(
--     select count(*)::int from orders2 as o 
--     where o.product_id = p.id 
-- ) as order_count from products2 as p 
------------- select without from ---------------
select 
( select max(price)::float from products2),
( select min(price)::float from products2 ),
( select avg(price)::float from products2)
 ;
        `

        , { depth: null });

    // console.log(
    //     (await pgClient.query(`
    //     select 
    //         (   select max(price)::float from products2),
    //         ( select min(price)::float from products2 ),
    //         ( select avg(price)::float from products2)
    //          ;

    //     `)).rows
    // );

}

main()