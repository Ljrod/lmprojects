import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import isologo from '@/images/isologo.ico';

export const metadata: Metadata = {
  title: 'LM Projects | Gestión y Migraciones Tecnológicas',
  description:
    'Transforma tu infraestructura TI con LM Projects. Migraciones y renovación tecnológica con gestión experta, sin fricción operativa.',
  icons: {
    icon: '/favicon.ico', // Usar una ruta absoluta al favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body flex min-h-screen flex-col items-center bg-background text-foreground antialiased">
        <Header />
        <main className="w-full flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
