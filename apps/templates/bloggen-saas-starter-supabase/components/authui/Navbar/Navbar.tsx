import { createClient } from '@/utils/supabase/server';
import s from './Navbar.module.css';
import Navlinks from './Navlinks';
import type { User } from '@supabase/supabase-js';

export default async function Navbar() {
  const supabase = await  createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <nav className="bg-canvas-bg-subtle border-canvas-bg-hover sticky top-0 z-50 w-full border-b shadow-sm" role='banner'>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <Navlinks user={user} />
    </nav>
  );
}
