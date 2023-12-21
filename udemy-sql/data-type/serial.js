/**
 *   SERIAL Datatype 
 */
const { prisma, pgClient } = require('../db')




async function main() {

    await prisma.table_name.delete({
        where: { id: 6 }
    })

}

main().catch(() => { })