import Link from 'next/link';
import { Logo } from './logo';
import { Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground w-full py-4 snap-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo + Copyright */}
          <div className="flex items-center gap-3">
            <Logo className="text-white h-8 w-auto opacity-80" />
            <span className="text-xs text-white/40 hidden sm:inline">
              © {new Date().getFullYear()} LM Projects
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs">
            <Link href="/nosotros" className="text-white/60 hover:text-white transition-colors">
              Nosotros
            </Link>
            <Link href="/servicios" className="text-white/60 hover:text-white transition-colors">
              Servicios
            </Link>
            <Link href="/como-trabajamos" className="text-white/60 hover:text-white transition-colors">
              Cómo Trabajamos
            </Link>
            <Link href="/#lead-form-section" className="text-white/60 hover:text-white transition-colors">
              Contacto
            </Link>
            <Link href="/preguntas-frecuentes" className="text-white/60 hover:text-white transition-colors">
              FAQ
            </Link>
            <Link href="/politica-de-privacidad" className="text-white/60 hover:text-white transition-colors">
              Privacidad
            </Link>
          </nav>

          {/* Contact Icons */}
          <div className="flex items-center gap-3 text-xs">
            <a
              href="https://wa.me/56983151563"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors"
            >
              <Phone className="h-3 w-3" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>
            <a
              href="mailto:contacto@lmprojects.cl"
              className="flex items-center gap-1 text-white/60 hover:text-white transition-colors"
            >
              <Mail className="h-3 w-3" />
              <span className="hidden md:inline">Email</span>
            </a>
          </div>
        </div>

        {/* Mobile Copyright */}
        <p className="text-center text-[10px] text-white/30 mt-3 sm:hidden">
          © {new Date().getFullYear()} LM Projects · Santiago, Chile
        </p>
      </div>
    </footer>
  );
}



