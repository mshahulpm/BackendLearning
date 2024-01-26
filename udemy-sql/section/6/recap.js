const { prisma } = require("../../db");

/**
 * 
 */

async function main() {

    // let i = 0
    // while (i < 10) {
    //     await prisma.$queryRaw`
    //     select  nextval('order_no_2')::integer as order_no
    // `
    //     i++
    // }

    let res = await prisma.$queryRaw`
    select  nextval('order_no_2')::integer as order_no
    `

    console.log(

        // await prisma.$queryRaw`
        // create sequence order_no_2 as integer
        // `,

        res[0]?.order_no

        // , { depth: null }
    );

}

main()