import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const PUBLIC_SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL
const PUBLIC_SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
