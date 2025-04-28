const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient()


async function main() {

    const user = await prisma.user.create({
        data: {
            name: "user " + Math.random().toString().slice(6),
        }
    })

    const challenge = await prisma.challenge.create({
        data: {
            name: "challenge " + Date.now(),
        }
    })

    const checkpoints = await prisma.challenge_checkpoint.createMany({
        data: [
            { checkpoint_no: 1, challenge_id: challenge.challenge_id },
            { checkpoint_no: 2, challenge_id: challenge.challenge_id },
            { checkpoint_no: 3, challenge_id: challenge.challenge_id },
        ]
    })

    const submissions = await prisma.checkpoint_submission.createMany({
        data: [
            { challenge_id: challenge.challenge_id, checkpoint_no: 1, url: '', user_id: user.id },
            { challenge_id: challenge.challenge_id, checkpoint_no: 2, url: '', user_id: user.id },
            { challenge_id: challenge.challenge_id, checkpoint_no: 3, url: '', user_id: user.id },
        ]
    })

}

main()
    .then(async () => await prisma.$disconnect())