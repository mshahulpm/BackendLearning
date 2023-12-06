import { supabase } from "../supabase"


const loginForm  = document.getElementById('login-form')! as HTMLFormElement

loginForm.onsubmit = function(e){

    e.preventDefault()
    
    const data =new FormData(loginForm) 

   const email = data.get('email')  as string
   const password = data.get('password') as string
    
   supabase.auth.signInWithPassword({
    email,
    password
   })
    

}