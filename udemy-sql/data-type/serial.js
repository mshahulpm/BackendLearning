/**
 *   SERIAL Datatype 
 */
const { prisma, pgClient } = require('../db')




async function main() {

    console.log(
        await prisma.$queryRaw`
    ------------- Create table for serial --------------
    -- create table serial (
    --     id serial not null primary key,
    --     small_serial SMALLSERIAL not null,
    --     big_serial BIGSERIAL not null
    -- )

    -- insert into serial default values        --- because no other columns available 
    -- select * from serial

    ------------ get serial sequence ----------------
    -- select currval(pg_get_serial_sequence('table_name','id'))
    `
    );

}

main().catch(() => { })