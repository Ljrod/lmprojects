import Link from 'next/link';

export function Logo() {
  return (
    <Link
      href="/"
      className="text-xl font-bold text-primary hover:opacity-80 transition-opacity"
    >
      LM Projects
    </Link>
  );
}
