import { notFound } from 'next/navigation';
import { getServices, getServiceBySlug, getServiceTitles } from '@/lib/data';
import LeadFormModal from '@/components/lead-form-modal';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';
import { Check, Shield, Clock, Award, Users } from 'lucide-react';

type Props = {
  params: { slug: string };
};

// Generate metadata for each service page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: 'Servicio no encontrado',
    };
  }

  return {
    title: `${service.title} | LM Projects`,
    description: service.shortDescription,
  };
}

// Generate static paths for all services
export async function generateStaticParams() {
  const services = await getServices();
  return services.map(service => ({
    slug: service.slug,
  }));
}

const trustIndicators = [
  { icon: Shield, label: 'Cumplimiento Regulatorio' },
  { icon: Clock, label: 'Respuesta en 24h' },
  { icon: Award, label: 'Especialistas Certificados' },
  { icon: Users, label: '+50 Clientes Satisfechos' },
];

const benefits = [
  'Auditoría y diagnóstico inicial sin costo',
  'Plan de implementación personalizado',
  'Ejecución con mínima interrupción operativa',
  'Pruebas de aceptación y validación completa',
  'Documentación técnica detallada',
  'Soporte post-implementación incluido',
];

export default async function ServiceDetailPage({ params }: Props) {
  const service = await getServiceBySlug(params.slug);
  const serviceTitles = await getServiceTitles();

  if (!service) {
    notFound();
  }

  const { title, longDescription, shortDescription, icon: Icon } = service;

  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20 backdrop-blur-sm">
              {Icon && <Icon className="mr-2 h-4 w-4" />}
              Servicio Especializado
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              {shortDescription}
            </p>
            {/* CTA Button that opens modal */}
            <div className="mb-8">
              <LeadFormModal
                services={serviceTitles}
                defaultService={service.title}
              />
            </div>
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4">
              {trustIndicators.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-white/80 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2"
                >
                  <item.icon className="h-4 w-4 text-accent" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Description */}
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
              ¿Qué incluye este servicio?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {longDescription.split('.').filter(s => s.trim()).map((sentence, index) => (
                <p key={index}>{sentence.trim()}.</p>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-br from-secondary to-secondary/50 rounded-2xl p-8 border border-border mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-6 flex items-center justify-center gap-2">
              <Award className="h-6 w-6 text-accent" />
              Todo lo que obtiene con nosotros
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-xl">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                    <Check className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-white rounded-2xl p-8 border border-border shadow-lg mb-12">
            <div className="text-center">
              <p className="text-5xl font-bold text-accent mb-2">+50</p>
              <p className="text-muted-foreground mb-4">Empresas del sector financiero y retail confían en nosotros</p>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">Calificación promedio de nuestros clientes</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Listo para modernizar su infraestructura?
            </h3>
            <p className="text-gray-300 mb-6">
              Obtenga un diagnóstico gratuito y descubra cómo podemos ayudarle.
            </p>
            <LeadFormModal
              services={serviceTitles}
              defaultService={service.title}
            />
          </div>
        </div>
      </section>
    </main>
  );
}


