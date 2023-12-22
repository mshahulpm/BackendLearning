/**
 * HSTORE data type
 */

const { prisma, pgClient } = require("../db");


async function main() {

    console.log(
        await prisma.$queryRaw`
        
        -- need to create extension before creating table 
        -- CREATE EXTENSION hstore;

        ----------- create table with hstore ------------
        -- CREATE TABLE books (
	    --    id serial primary key,
	    --    title VARCHAR (255),
	    --    attr hstore
        --  );

        -- INSERT INTO books (title, attr)
        -- VALUES
	    --     (
	    --     	'PostgreSQL Tutorial',
	    --     	'"paperback" => "243",
	    --          "publisher" => "postgresqltutorial.com",
	    --          "language"  => "English",
	    --          "ISBN-13"   => "978-1449370000",
	    --     	 "weight"    => "11.2 ounces"'
	    --     );

        -- select title,attr::text from books   -- prisma don't support hstore data type so need to type cast as string type

        -- select a single field from hstore 
        -- select attr -> 'ISBN-13' as isbn from books

        -- Convert hstore data to sets
        -- SELECT	title,	(EACH(attr) ).* FROM books;

        -- Convert hstore data to JSON
        -- SELECT title, hstore_to_json (attr) json FROM books;

        -- Get all values from an hstore column
        SELECT 	avals (attr) FROM books;

        `
    );

    // js also don't support hstore so it is casted as string
    console.log(
        // (await pgClient.query(`select * from books`)).rows
    );

}


main()