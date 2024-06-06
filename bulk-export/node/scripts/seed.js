import { CommentModel } from "../model/comment.js";


await CommentModel.updateMany({}, {
    $unset: {
        movie_id: true
    }
})
// await CommentModel.updateMany({}, {
//     $set: {
//         field1: 'Field 1',
//         field2: 'Field 2',
//         field3: 'Field 3',
//         field4: 'Field 4',
//         field5: 'Field 5',
//         field6: 'Field 6',
//         field7: 'Field 7',
//         field8: 'Field 8',
//         field9: 'Field 9',
//         nestedField1: {
//             nested: 'Nested'
//         },
//     }
// })