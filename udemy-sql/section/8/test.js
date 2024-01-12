const { prisma } = require("../../db");


async function main() {


    // await prisma.company.createMany({
    //     data: [
    //         { name: 'company 1' },
    //         { name: 'company 2' },
    //         { name: 'company 3' },
    //     ]
    // })

    await prisma.employees.createMany({
        data: [
            // { company_id: 2, name: 'Name 2', is_owner: true },
            // {company_id:1,name:'Name 2', is_owner:false} ,
        ]
    })

    console.dir(
        await prisma.company.findMany({
            where: {
                employees: {
                    none: {
                        is_owner: false
                    }
                },
                OR: [
                    { name: 'company 1' },
                    { name: 'company 2' },
                ]
            },
            include: { employees: true }
        }),
        { depth: null }
    );
    return
    console.log(
        await prisma.$queryRaw`
        --  create table company(
        --     id serial PRIMARY key, 
        --     name VARCHAR(50)
        --  )

        -- create table employees (
        --     employee_id serial primary key,
        --     name VARCHAR(50),
        --     company_id integer references company(id),
        --     is_owner boolean default false 
        -- )
        `
    );

}

main()