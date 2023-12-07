import { supabase } from "../supabase"


const loginForm  = document.getElementById('login-form')! as HTMLFormElement

loginForm.onsubmit = async function(e){

    e.preventDefault()
    
    const data =new FormData(loginForm) 

   const email = data.get('email')  as string
   const password = data.get('password') as string
    
  const {error} = await supabase.auth.signInWithPassword({
    email,
    password
   })
    
   if(error) alert(error.message) 

   else location.href ='/'
}