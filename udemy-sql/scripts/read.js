const { prisma } = require("../db");



async function main() {

    // get current time from db
    console.log(
        await prisma.$queryRaw`
        SELECT header_text, document_id, cast (NOW() - posting_date as TIME) as diff from documents ;
        `
    );

    return
    console.log(
        await prisma.$queryRaw`
         SELECT * from documents;
        `
    );

}


main()