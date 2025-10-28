import {Logo} from './logo';

export default function Footer() {
  return (
    <footer className="border-t bg-secondary w-full">
      <div className="container flex flex-col items-center justify-between gap-6 py-10 md:h-24 md:flex-row md:py-0 max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} LM Projects. Todos los derechos
            reservados.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {/* Placeholder for contact info */}
          <p>contacto@lmprojects.cl | +56 9 1234 5678</p>
        </div>
      </div>
    </footer>
  );
}
