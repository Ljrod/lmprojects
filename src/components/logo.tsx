import Link from 'next/link';
import Image from 'next/image';
import logoImage from '@/images/logo.png';

export function Logo() {
  return (
    <Link
      href="/"
      className="inline-block hover:opacity-80 transition-opacity"
    >
      <Image
        src={logoImage}
        alt="LM Projects Logo"
        width={140}
        height={28}
        priority
      />
    </Link>
  );
}
