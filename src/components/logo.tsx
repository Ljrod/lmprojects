import Link from 'next/link';
import Image from 'next/image';
import logoImage from '@/images/logo.png';

import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-block hover:opacity-80 transition-opacity", className)}
    >
      <Image
        src={logoImage}
        alt="LM Projects Logo"
        width={240}
        height={48}
        priority
        className="h-16 w-auto"
      />
    </Link>
  );
}
