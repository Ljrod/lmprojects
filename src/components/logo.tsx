import Link from 'next/link';
import Image from 'next/image';
import logoImage from '@/images/logo.png';

import { cn } from '@/lib/utils';

export function Logo({ className, imageClassName }: { className?: string; imageClassName?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center justify-center hover:opacity-80 transition-opacity relative h-20 w-auto", className)}
    >
      <Image
        src={logoImage}
        alt="LM Projects Logo"
        width={240}
        height={48}
        priority
        className={cn("h-full w-auto object-contain", imageClassName)}
      />
    </Link>
  );
}
