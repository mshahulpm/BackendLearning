const { prisma } = require("../db");


async function main() {


    return
    // create table without primary key
    console.log(
        await prisma.$queryRaw`
        CREATE TABLE cities (
            name VARCHAR (50) NOT NULL,
            country VARCHAR(255) NOT NULL,
            population INT NOT NULL,
            area INT NOT NULL
        )
        `
    );

    console.log(
        // create table with first letter capital
        await prisma.$queryRaw`
        CREATE TABLE "Post" (
            id serial PRIMARY KEY,
            tag CHAR (5) NOT NULL,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            content TEXT NOT NULL
        )
        `
    );

}

main()