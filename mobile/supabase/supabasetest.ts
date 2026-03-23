import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const memoryStorage: Record<string, string> = {};
const nodeStorage = {
  getItem: (key: string) => Promise.resolve(memoryStorage[key] ?? null),
  setItem: (key: string, value: string) => { memoryStorage[key] = value; return Promise.resolve(); },
  removeItem: (key: string) => { delete memoryStorage[key]; return Promise.resolve(); },
};

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: nodeStorage,
      autoRefreshToken: false,
      persistSession: false, 
      detectSessionInUrl: false,
    },
  }
);