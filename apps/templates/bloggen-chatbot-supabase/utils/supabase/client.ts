import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types_db';

// Create Supabase client dynamically to prevent build-time evaluation
export const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
};

// For backward compatibility - lazy initialization
let _supabase: ReturnType<typeof createBrowserClient<Database>> | null = null;

export const supabase = new Proxy({} as ReturnType<typeof createBrowserClient<Database>>, {
  get(target, prop) {
    if (!_supabase) {
      try {
        _supabase = getSupabaseClient();
      } catch (error) {
        // Return a mock object during build time
        return () => Promise.resolve({ data: null, error: null });
      }
    }
    return _supabase[prop as keyof typeof _supabase];
  }
});

  
  