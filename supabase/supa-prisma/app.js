const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()


async function main(){

    const post1 = await prisma.post.findFirst({
        where:{
post_id:2n
        },
        include:{
            users:true,
            Comments:true,
            Likes:true
        }
    })

    console.dir(post1,{depth:null})

}

main()