import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  return (
    <nav className="flex justify-center space-x-4 mb-4">
      <Link href="/" passHref>
        <Button variant="ghost">Search</Button>
      </Link>
      <Link href="/favorites" passHref>
        <Button variant="ghost">Favorites</Button>
      </Link>
    </nav>
  );
}
