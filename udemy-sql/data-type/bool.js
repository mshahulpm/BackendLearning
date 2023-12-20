const { prisma } = require("../db")



async function main() {


    //    true values  -> true , '1','t','yes','y'
    //    false values -> false , '0','no','f'


    console.log(

        await prisma.$queryRaw`
        -- ------------- select queries using valid boolean values -------------
        -- SELECT * from bool where is_ok = true -- true
        -- SELECT * from bool where is_ok = 'yes' -- true
        -- SELECT * from bool where is_ok = 'y' -- true
        -- SELECT * from bool where is_ok = '1' -- true
        -- SELECT * from bool where is_ok = false -- false
        -- SELECT * from bool where is_ok = 'no' -- false
        -- SELECT * from bool where is_ok = 'f' -- false
        -- SELECT * from bool where is_ok = '0' -- false

        -- SELECT * from bool where is_ok -- true
        -- SELECT * from bool where not is_ok -- true

        -- SELECT * from bool where is_ok is null -- null

        -- alter column set default value to false   
        -- alter table bool alter is_ok set default false 
        -- insert into bool (inserted_value) values ('nothing')
        -- select * from bool where inserted_value = 'nothing'

        -- ---------- insert null value after setting default value false ---------------
        -- insert into bool (is_ok,inserted_value) values (null,'nothing2')
        select * from bool where inserted_value = 'nothing2'
        
 
        `

    );

    // insert null to non null bool field 
    // await prisma.$queryRaw`
    // insert INTO non_null_bool (is_ok)
    // values (null) 
    // ` // throws error

    // inserting other values 
    // await prisma.$queryRaw`
    // INSERT INTO bool (is_ok,inserted_value)
    // values ('abc','abc') 
    // ` // - throws error

    return
    console.log(
        await prisma.$queryRaw`
        SELECT * from bool
        `
    );


    return
    await prisma.$queryRaw`
    INSERT INTO bool (is_ok,inserted_value)
    values 
    (true,'true'),
    (false,'false'),
    ('1','1'),
    ('0','0'),
    ('yes','yes'),
    ('no','no'),
    ('y','y'),
    ('t','t'),
    ('f','f'),
    (null,'null') 
    `

    return
    // create a table for boolean
    await prisma.$queryRaw`
    create table bool (
        id serial primary key,
        is_ok boolean ,
        inserted_value varchar(50)
    )
    `
    // create a non null bool field
    await prisma.$queryRaw`
create table non_null_bool (
    id serial primary key,
    is_ok boolean not null 
)
`

}


main()