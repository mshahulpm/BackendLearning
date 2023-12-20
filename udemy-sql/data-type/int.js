/**
 *  Integer data type 
 *  1. SMALLINT (2 bytes) -32,768 to +32,767
 *  2. INTEGER  (4 bytes) -2,147,483,648 to +2,147,483,647
 *  3. BIGINT   (8 bytes) -9,223,372,036,854,775,808 to +9,223,372,036,854,775,807
 */

const { prisma } = require("../db");



async function main() {

    console.log(
        await prisma.$queryRaw`
        ----------- create a table for int data type ----------
        -- create table int (
        --     id serial primary key,
        --     small_int smallint not null default 0,
        --     int int not null default 0,
        --     big_int bigint not null default 0,
        --     positive_small_int smallint not null default 1 check (positive_small_int > 0),
        --     non_negative_int int not null default 0 check (non_negative_int >= 0),
        --     negative_big_int bigint not null default -1 check (negative_big_int < 0)
        -- )


        ----------- Test small int -------------
        -- insert into int (small_int) values 
        -- (-32768),         -- lowest possible value
        -- (32767)           -- highest possible value
        -- (-32767n)         -- will throw error 
        -- (-32769)          -- will throw error 
        -- (32768)           -- will throw error
        
        ----------- Test int -------------
        -- insert into int (int) values 
        -- (-2147483648),         -- lowest possible value
        -- (2147483647)           -- highest possible value
        -- (${21474836n})         -- valid insert 
        -- (-2147483649)          -- will throw error 
        -- (${2147483650n})       -- will throw error 
        -- (2147483648)           -- will throw error
        
        ----------- Test bigint -------------
        -- insert into int (big_int) values 
        -- (-9223372036854775808),         -- lowest possible value
        -- (9223372036854775807)           -- highest possible value
        -- (-9223372036854775809)          -- will throw error 
        -- (9223372036854775808)           -- will throw error
        -- (${9223372036854775n})          -- a valid insert
        
        -- select int from int where int != 0

        ------------ testing check constraints --------------
        -- insert into int (positive_small_int) values (0) -- throw error
        -- insert into int (positive_small_int) values (1) -- valid insert
         
        -- insert into int (non_negative_int) values (-1) -- throw error
        -- insert into int (non_negative_int) values (0)  -- valid insert

        -- insert into int (negative_big_int) values (0)  -- throw error
        -- insert into int (negative_big_int) values (-1) -- valid insert

        
    `
    );

}

main()