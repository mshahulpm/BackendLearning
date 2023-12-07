import { supabase } from "../supabase"

const createForm  = document.getElementById('create-post-form')! as HTMLFormElement


createForm.onsubmit = async function(e){

    e.preventDefault()

    const data =new FormData(createForm) 

    const title = data.get('title') as string
    const content = data.get('content') as string

    const {data:{session}} = await supabase.auth.getSession()
    
    if(session) {
        await supabase.from('Post').insert({
            title,
            content,
            user_id: '1f1c306d-6818-4306-8a63-1a5dd33691b7' //session?.user.id
        })
    }

}