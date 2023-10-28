const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient()


async function main() {

    await prisma.author.createMany({
        data: [
            {
                content: 'hello 1',
                description: 'hehe',
                title: 'title 1'
            },
            {
                content: 'hello 2',
                description: 'hehe',
                title: 'title 3'
            }
        ]
    })

    const authors = await prisma.author.findMany()

    await prisma.user.createMany({
        data: [
            {
                email: 'hell@g.com',
                name: 'Name 1'
            },
            {
                email: 'hell@g.com',
                name: 'Name 1'
            }
        ]
    })

    const users = await prisma.user.findMany()

    await prisma.post.createMany({
        data: [
            {
                authorId: authors[0].id,
                content: 'hello 1',
                description: 'hehe',
                title: 'hrhrhr',
                userId: users[0].id,
            },
            {
                authorId: authors[1].id,
                content: 'hello 2',
                description: 'hehe',
                title: 'hrhrhr',
                userId: users[1].id,
            }
        ]
    })

    // const posts = await prisma.post.findMany()

    // console.log(authors, posts, users);

}

main()
    .then(async () => await prisma.$disconnect())