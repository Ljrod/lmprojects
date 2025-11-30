import Link from 'next/link';
import Image from 'next/image';
import logoImage from '@/images/logo.png';

import { cn } from '@/lib/utils';

export function Logo({ className, imageClassName }: { className?: string; imageClassName?: string }) {
  return (
    <Link
      href="/"
      className={cn("relative z-50 flex items-center justify-center leading-none hover:opacity-80 transition-opacity h-14 w-auto md:h-32 lg:h-40", className)}
    >
      <Image
        src={logoImage}
        alt="LM Projects Logo"
        width={240}
        height={160}
        priority
        className={cn("h-full w-auto object-contain", imageClassName)}
      />
    </Link>
  );
}
