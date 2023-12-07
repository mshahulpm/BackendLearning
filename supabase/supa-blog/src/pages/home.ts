import { supabase } from "../supabase"
import { Database } from "../types/supabase"
import { createPostCard } from "./components"



async function homeMain(){

    const user_id = (await supabase.auth.getSession())?.data?.session?.user?.id

  const {data} =await    supabase.from('Post').select(`*`) 
  let likes = [] as Database['public']['Tables']['Likes']['Row'][]

  if(user_id) {

   likes =  (await supabase.from('Likes').select(`*`).filter('user_id','eq',user_id)).data || []


  }

  let app = document.getElementById('app')! 

  if(!data) return

  data?.map(async dt=>{

    const postCard = await createPostCard({data:dt,likes})

    app.innerHTML += postCard

  })
  

}


homeMain()