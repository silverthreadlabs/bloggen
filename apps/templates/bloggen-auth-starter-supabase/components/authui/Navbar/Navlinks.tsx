'use client';

import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import Logo from '@/components/logo/logo';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import type { User } from '@supabase/supabase-js';

interface NavlinksProps {
  user?: User | null;
}

const NAV_ITEMS = [
    { href: '/feature', label: 'Features' },
    { href: '/blog', label: 'Blog' }
];

export default function Navlinks({ user }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null;
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen((open) => !open);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-4 xl:px-0">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" aria-label="Logo">
            <Logo />
          </Link>

          <nav aria-label='Primary navigation' className='space-x-2 hidden lg:flex items-center'>
            <ul className="flex space-x-3 items-center">
              {NAV_ITEMS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-canvas-text hover:text-canvas-text-contrast rounded-sm px-3 py-2 text-base font-medium transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              {user && (
                <li key="account">
                  <Link href="/account">
                    <Button variant="solid" color="primary">
                      Account
                    </Button>
                  </Link>
                </li>
              )}
              {!user && (
                <li key="signin">
                  <Link href="/signin">
                    <Button variant="solid" color="primary">
                      Sign In
                    </Button>
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <Button
            onClick={toggleMobile}
            aria-label='Toggle menu'
            name='Toggle menu'
            aria-controls='mobile-menu'
            aria-expanded={mobileOpen}
            className='block lg:hidden'
            color='neutral'
            variant='ghost'
            iconOnly
            leadingIcon={
                mobileOpen ? (
                    <FaTimes className='text-canvas-text h-5 w-5' />
                ) : (
                    <FaBars className='text-canvas-text h-5 w-5' />
                )
            }
          />
        </div>
      </div>

      {mobileOpen && (
        <nav
          id='mobile-menu'
          aria-label='Mobile navigation'
          aria-labelledby='mobile-menu-label'
          aria-describedby='mobile-menu-description'
          role='dialog'
          aria-modal='true'
          className='bg-canvas-base/95 sticky inset-0 top-[100px] z-50 h-screen backdrop-blur-sm lg:hidden transition-all duration-300 ease-in-out'>
          <ul className='border-canvas-border space-y-3 border-t p-4'>
            {NAV_ITEMS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={toggleMobile}
                  className="text-canvas-text hover:bg-canvas-bg hover:text-primary-text block rounded-sm px-4 py-2 text-base font-medium transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <Link href="/account" onClick={toggleMobile}>
                  <Button variant="solid" color="primary" className="w-full">
                    Account
                  </Button>
                </Link>
              </li>
            )}
            {!user && (
              <li>
                <div className='flex flex-col gap-3'>
                  <Link
                    href="/signin"
                    onClick={toggleMobile}
                  >
                    <Button variant="solid" color="primary" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
}
