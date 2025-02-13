'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Search } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {!isHomePage && (
          <Link href="/" className="mr-auto">
            <Button variant="ghost" size="sm" className="w-9 px-0">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Go back</span>
            </Button>
          </Link>
        )}

        <div className="flex flex-1 items-center justify-center">
          <nav className="flex items-center space-x-2">
            <Link href="/" className={isHomePage ? 'pointer-events-none' : ''}>
              <Button variant={isHomePage ? 'default' : 'ghost'} size="sm" className="w-24">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </Link>
            <Link href="/favorites" className={!isHomePage ? 'pointer-events-none' : ''}>
              <Button variant={!isHomePage ? 'default' : 'ghost'} size="sm" className="w-24">
                <Heart className="mr-2 h-4 w-4" />
                Saved
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
