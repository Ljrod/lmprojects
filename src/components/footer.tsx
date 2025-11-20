import { Logo } from './logo';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-white/10 w-full py-12 snap-start">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Logo className="text-white h-12 w-auto" />
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} LM Projects.
            </p>
          </div>

          <div className="flex gap-8 text-sm font-medium">
            <a href="/nosotros" className="hover:text-accent transition-colors">
              Nosotros
            </a>
            <a href="/servicios" className="hover:text-accent transition-colors">
              Servicios
            </a>
            <a href="/#lead-form-section" className="hover:text-accent transition-colors">
              Contacto
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1 text-sm text-primary-foreground/60">
            <a href="mailto:contacto@lmprojects.cl" className="hover:text-white transition-colors">
              contacto@lmprojects.cl
            </a>
            <p>Santiago, Chile</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
