'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Logo} from '@/components/logo';
import {cn} from '@/lib/utils';
import {Button} from './ui/button';
import {Menu} from 'lucide-react';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import {useState} from 'react';

const navLinks = [
  {href: '/servicios', label: 'Servicios'},
  {href: '/nosotros', label: 'Nosotros'},
  {href: '/#lead-form-section', label: 'Contacto'},
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    if (href.startsWith('/#')) {
      return false; // Anchor links on the same page don't activate
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="p-4">
                  <Logo />
                  <nav className="mt-8 flex flex-col space-y-4">
                    {navLinks.map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'text-lg font-medium transition-colors hover:text-accent',
                          isLinkActive(link.href)
                            ? 'text-primary'
                            : 'text-foreground/60'
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:block">
            <Logo />
          </div>
        </div>

        <div className="md:hidden">
          <Logo />
        </div>

        <nav className="hidden absolute left-1/2 -translate-x-1/2 items-center gap-6 text-sm md:flex">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-medium transition-colors hover:text-accent',
                isLinkActive(link.href)
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* This empty div is a placeholder to keep the justify-between working correctly with the centered nav */}
        <div className="hidden md:block"></div>

      </div>
    </header>
  );
}
