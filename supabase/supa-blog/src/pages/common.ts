import { supabase } from "../supabase";
import { Database } from "../types/supabase";



export async function likePost(post?:Database['public']['Tables']['Post']['Row']) {

    if(!post) return

    const user_id = (await supabase.auth.getSession()).data.session?.user.id 

    if(!user_id) return 
 
    const {} = await supabase.from('Likes').insert({
        post_id:post.post_id,
        user_id,
    })

    await supabase.from('Post').update({
        likes:post.likes+1
    }).match({
        post_id:post.post_id
    })
}


const PROTECTED_ROUTES = [
    '/create-post',
    '/create-post.html',
]


document.getElementById('logout_btn')!.onclick = async function(e){
    await  supabase.auth.signOut()
   }

async function main(){

    const {data,error} = await supabase.auth.getUser()

    if(error) {
            console.log('heheh');
            const {pathname} = location
        if(PROTECTED_ROUTES.includes(pathname)) {

            return
             
            // location.href = '/login'
        }
    }

   document.getElementById('user_name')!.innerHTML = data.user?.email ||'' 

}


main()