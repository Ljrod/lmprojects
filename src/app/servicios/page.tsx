import Link from 'next/link';
import ServiceCard from '@/components/service-card';
import { getServices, getServiceTitles } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servicios | LM Projects - Infraestructura TI para Banca y Retail',
  description:
    'Servicios especializados de renovación tecnológica, migración cloud y CMDB para instituciones financieras y retail.',
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-16 md:py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm mb-6">
            <Briefcase className="h-4 w-4 mr-2 text-accent" />
            6 Servicios Especializados
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Soluciones TI para su <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-300">sector</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Servicios diseñados específicamente para instituciones financieras y cadenas retail con cumplimiento regulatorio garantizado.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-secondary/50 border-t">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
            ¿No sabe qué servicio necesita?
          </h2>
          <p className="text-muted-foreground mb-6">
            Solicite un diagnóstico gratuito y le ayudamos a identificar la mejor solución para su empresa.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-full px-8 h-12"
          >
            <Link href="/#lead-form-section">
              Solicitar Diagnóstico Gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

