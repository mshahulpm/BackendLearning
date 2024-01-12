const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient()


async function main() {

    console.log(
        await prisma.kPI.createMany({
            data: [
                { id: 1, status_code: 'hey', time_limit: 30, time_type: 'week' },
                { id: 2, status_code: 'hoy', time_limit: 20, time_type: 'week' },
                { id: 3, status_code: 'hehe', time_limit: 45, time_type: 'week' },
            ]
        })
    );
    return
    console.log(
        await prisma.reminder.findMany({
            take: 2,
            orderBy: {
                time_limit: 'desc'
            }
        })
    );

    return

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