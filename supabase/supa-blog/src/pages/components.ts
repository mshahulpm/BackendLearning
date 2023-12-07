import { supabase } from "../supabase";
import { Database } from "../types/supabase";


type ArgType = {
    data:Database['public']['Tables']['Post']['Row']|null,
    likes:Database['public']['Tables']['Likes']['Row'][]
}



export async function createPostCard({data,likes}:ArgType){

    if(!data) return ''


    const  isLogin = !!(await supabase.auth.getSession()).data.session
    const  isLiked = !!likes.find(lk=>lk.post_id===data.post_id)

    return `
    
<div class="block mx-3 my-2 min-w-[350px] max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
${data?.title} (${data.likes} likes)
</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">
${data.content.slice(0,30)}
</p>
${
    isLogin ? `
    <div class="mt-3">
    <button  class="bg-blue-500 text-white px-4 rounded">${isLiked?'Liked':'Like'}</button> 
     <button class="bg-cyan-700 text-white px-4 rounded">Comment</button>
    </div>
    
    ` :''
}
</div>

    
    `

}