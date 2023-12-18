const { prisma } = require("../db")

let a = ''

let i = 0
while (true) {
    a += i
    i++
    if (i === 10000000) break;
}

async function main() {

    return
    // testing a column with more than 10000000 characters
    await prisma.$queryRaw`
      INSERT INTO "Post" (tag,title,description,content)
  values ('tag 6','Title 1','Description 1',${a});
    `

    return
    // inserting data to a table 
    await prisma.$queryRaw`
  INSERT INTO "Post" (tag,title,description,content)
  values ('tag 1','Title 1','Description 1','Content 1'),
   ('tag 2','Title 2','Description 2','Content 2'),
   ('tag 3','Title 3','Description 3','Content 3'),
   ('tag 4','Title 4','Description 4','Content 4'),
   ('tag 5','Title 5','Description 5','Content 5')
`

}


main()