import { supabase } from "../supabase";


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
            console.log('heheh');
            
            location.href = '/login'
        }
    }

   document.getElementById('user_name')!.innerHTML = data.user?.email ||'' 

}


main()