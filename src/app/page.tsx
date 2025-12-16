import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/service-card';
import LeadForm from '@/components/lead-form';

import PainPoints from '@/components/pain-points';
import { getServices, getServiceTitles } from '@/lib/data';
import heroImage from '@/images/hero.png';

export default async function HomePage() {
  const services = await getServices();
  const serviceTitles = await getServiceTitles();

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden snap-start">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90 z-0" />
        <Image
          src={heroImage}
          alt="Server room with modern equipment."
          fill
          className="object-cover opacity-20 mix-blend-overlay"
          priority
          data-ai-hint="server room"
        />
        <div className="container relative z-10 text-center max-w-5xl mx-auto px-4">
          <div className="inline-flex items-center rounded-full border border-primary-foreground/10 bg-primary-foreground/5 px-3 py-1 text-sm font-medium text-primary-foreground backdrop-blur-xl mb-6">
            <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
            Especialistas en Banca y Retail
          </div>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
            Infraestructura TI para <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-300">servicios financieros y retail</span>
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <strong className="text-white">Renovación tecnológica, migración cloud y CMDB</strong> con cumplimiento regulatorio. Expertos en sucursales bancarias, puntos de venta y operaciones multi-sitio.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white font-semibold text-lg h-14 px-8 rounded-full shadow-lg shadow-accent/20 transition-all hover:scale-105 relative overflow-hidden group"
            >
              <Link href="#lead-form-section">
                <span className="relative z-10">Solicitar Diagnóstico GRATIS</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 font-semibold text-lg h-14 px-8 rounded-full backdrop-blur-sm transition-all"
            >
              <Link href="#services">Ver Servicios</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            ✓ Sin compromiso · ✓ Respuesta en 24 horas · ✓ 100% confidencial
          </p>
        </div>
      </section>

      {/* Pain Points Section */}
      <PainPoints />

      <div className="max-w-7xl mx-auto w-full">
        {/* Services Section */}
        <section id="services" className="py-12 md:py-16 bg-background snap-start">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
                Servicios Especializados
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Soluciones diseñadas para instituciones financieras y cadenas retail con cumplimiento regulatorio.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        <section
          id="lead-form-section"
          className="py-12 md:py-16 bg-background snap-start"
        >
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-headline text-2xl font-bold tracking-tight text-primary md:text-4xl text-center">
                Obtenga su Diagnóstico Gratuito
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Descubra cómo optimizar su infraestructura TI. <strong>Sin costo y sin compromiso.</strong>
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><span className="text-green-500">✓</span> Respuesta en 24h</span>
                <span className="flex items-center gap-2"><span className="text-green-500">✓</span> 100% Confidencial</span>
                <span className="flex items-center gap-2"><span className="text-green-500">✓</span> Sin vendedores agresivos</span>
              </div>
            </div>
            <LeadForm services={serviceTitles} />
          </div>
        </section>
      </div>
    </>
  );
}

