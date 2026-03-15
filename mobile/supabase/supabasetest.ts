import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

declare global {
    var __testStorage: Record<string, string> | undefined
}

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: {
            getItem: (key) => global.__testStorage?.[key] ?? null,
            setItem: (key, value) => { global.__testStorage = { ...global.__testStorage, [key]: value } },
            removeItem: (key) => { delete global.__testStorage?.[key] }
        }
    }
})