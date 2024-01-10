const { prisma, pgClient } = require("../db");

/*
  --- Notes 
  after grouping only grouped columns can be selected not other columns 

*/

async function main() {

    // console.log(
    //     await prisma.comments.groupBy({
    //         by: ['user_id'],
    //         _count: {
    //             id: true
    //         },
    //         where: {
    //             user_id: 1
    //         }
    //     })
    // );

    console.dir(
        [
            await prisma.$queryRaw`
                -- select count(user_id)::int,user_id from comments group by user_id 
                -- select sum(user_id)::int,user_id from comments group by user_id 
                -- select max(photo_id)::int,user_id from comments group by user_id 

                -- no of comments created by user 1 
                -- select count(id)::int as no_of_comments,user_id from comments where user_id = 1 group by user_id 

                -- select no of comments for each photo 
                -- select count(*)::int , photo_id from comments group by photo_id

                -- select photos where id < 5 and have more than 20 comments 
                -- select photo_id , count(*)::int from comments where photo_id < 5 group by photo_id having count(*) > 20

                -- select users who commented on first 50 photos and added more than 20 comments 
                select user_id,count(*)::int from comments where photo_id < 50 group by user_id having count(*) > 20  
            `,
            // await pgClient.query('select * from comments group by user_id')
            //     await prisma.$queryRaw`
            //     select id from users
            // `
        ]

        , { depth: null }
    );

}


main()