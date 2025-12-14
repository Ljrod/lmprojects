'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Menu, ChevronDown } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useState, useEffect } from 'react';
import { getServices } from '@/lib/data';
import type { Service } from '@/lib/types';

const navLinks = [
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/#lead-form-section', label: 'Contacto' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    async function fetchServices() {
      const fetchedServices = await getServices();
      setServices(fetchedServices);
    }
    fetchServices();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'border-b border-transparent bg-card/90 backdrop-blur-sm'
          : 'border-b bg-card shadow-sm'
      )}
    >
      <div className="container relative flex h-16 items-center justify-between max-w-7xl mx-auto">
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
                  <div className="mb-8">
                    <Logo />
                  </div>
                  <nav className="mt-8 flex flex-col space-y-2">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="services">
                        <AccordionTrigger
                          className={cn(
                            'text-lg font-medium transition-colors hover:text-accent hover:no-underline',
                            isLinkActive('/servicios')
                              ? 'text-primary'
                              : 'text-foreground/60'
                          )}
                        >
                          Servicios
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col space-y-2 pl-4 pt-2">
                            <Link
                              href="/servicios"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-muted-foreground hover:text-accent"
                            >
                              Todos los servicios
                            </Link>
                            {services.map(service => (
                              <Link
                                key={service.id}
                                href={`/servicios/${service.slug}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-muted-foreground hover:text-accent"
                              >
                                {service.title}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    {navLinks.map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'text-lg font-medium transition-colors hover:text-accent py-4',
                          isLinkActive(link.href)
                            ? 'text-primary'
                            : 'text-foreground/60'
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-8">
                    <Button
                      asChild
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      <Link href="/#lead-form-section" onClick={() => setIsMobileMenuOpen(false)}>Contáctanos</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:flex absolute top-0 left-4 h-full items-center z-50">
            <Logo className="relative z-50" />
          </div>
        </div>

        <div className="md:hidden shrink-0 min-w-[150px] max-w-[180px]">
          <Logo />
        </div>

        <nav className="hidden absolute left-1/2 -translate-x-1/2 items-center gap-6 text-sm md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                'flex items-center gap-1 font-medium transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-0',
                isLinkActive('/servicios')
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              Servicios <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/servicios">Todos los servicios</Link>
              </DropdownMenuItem>
              {services.map(service => (
                <DropdownMenuItem key={service.id} asChild>
                  <Link href={`/servicios/${service.slug}`}>
                    {service.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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

        <div className="hidden md:flex items-center">
          <Button
            asChild
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Link href="/#lead-form-section">Contáctanos</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
