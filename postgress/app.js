require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})
const { Client } = require('pg');

/*

 { table_name: 'settings' },
  { table_name: '_prisma_migrations' },
  { table_name: 'CardRequest' },
  { table_name: 'UserSession' },
  { table_name: 'Card' },
  { table_name: 'CardMetaData' }

*/


(async () => {
    const client = new Client({
        connectionString: process.env.DB_URL
    })
    await client.connect()

    const query = `SELECT 
    "public"."CardStatusHistory"."card_status",
     COUNT("public"."CardStatusHistory"."card_status") 
     FROM "public"."CardStatusHistory" 
     JOIN "public"."Card"
     ON "public"."CardStatusHistory"."card_id" = "public"."Card"."id" AND "public"."CardStatusHistory"."card_status" = "public"."Card"."card_status"
     group by "public"."CardStatusHistory"."card_status"`

    const query2 = `SELECT 
     "public"."Card"."card_status",
      COUNT("public"."Card"."card_status") 
      FROM "public"."Card" 
      JOIN "public"."CardStatusHistory" 
      ON "public"."CardStatusHistory"."card_id" = "public"."Card"."id" AND "public"."CardStatusHistory"."card_status" = "public"."Card"."card_status"
      GROUP BY "public"."Card"."card_status"`


    const query3 = 'SELECT "public"."Card"."card_status" FROM "public"."CardStatusHistory" JOIN "public"."Card" ON "public"."CardStatusHistory"."card_id" = "public"."Card"."id" AND "public"."CardStatusHistory"."card_status" = "public"."Card"."card_status" LIMIT 1'

    // client.query(query, (err, res) => {
    //     if (err) console.log(err)
    //     console.log(res?.rows) // Hello World!
    //     // client.end()
    // })
    // client.query(query2, (err, res) => {
    //     if (err) console.log(err)
    //     console.log(res?.rows) // Hello World!
    //     client.end()
    // })
    // return
    console.log(
        (await client.query(`SELECT * FROM "public"."CardStatusHistory" WHERE "public"."CardStatusHistory"."createdAt" < $1 AND "public"."CardStatusHistory"."createdAt" > $2 LIMIT 1`, [
            new Date(),
            new Date('1-1-2020')
        ])).rows,
        await prisma.cardStatusHistory.findFirst({
            where: {
                createdAt: {
                    lt: new Date(),
                    gt: new Date('1-1-2020')
                }
            }
        })
    )

})();

