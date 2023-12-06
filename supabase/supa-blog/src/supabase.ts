import { createClient } from '@supabase/supabase-js'
import { Database } from './types/supabase'
const supabaseUrl = 'https://cyvddptjmfaqcvppvnet.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

