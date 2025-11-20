import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/service-card';
import LeadForm from '@/components/lead-form';
import FAQSection from '@/components/faq-section';
import ProcessSteps from '@/components/process-steps';
import PainPoints from '@/components/pain-points';
import { getServices, getServiceTitles } from '@/lib/data';
import { Users, Package, ShieldCheck } from 'lucide-react';
import heroImage from '@/images/hero.png';

const whyUsPoints = [
  {
    icon: Users,
    title: 'Gestión Cercana',
    description:
      'Nos integramos como una extensión de su equipo, garantizando comunicación directa y sin tecnicismos innecesarios.',
  },
  {
    icon: Package,
    title: 'Soluciones a Medida',
    description:
      'Adaptamos cada proyecto a su presupuesto y realidad operativa, evitando costos ocultos y sorpresas.',
  },
  {
    icon: ShieldCheck,
    title: 'Garantía Total',
    description:
      'Acompañamiento integral desde el diseño hasta el soporte post-implementación. Su tranquilidad es nuestra prioridad.',
  },
];

export default async function HomePage() {
  const services = await getServices();
  const serviceTitles = await getServiceTitles();

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 lg:py-48 overflow-hidden snap-start">
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
          <div className="inline-flex items-center rounded-full border border-primary-foreground/10 bg-primary-foreground/5 px-3 py-1 text-sm font-medium text-primary-foreground backdrop-blur-xl mb-8">
            <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
            Expertos en Transformación Digital
          </div>
          <h1 className="font-headline text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
            Migración a la nube y <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-300">renovación TI</span> sin fricción
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Modernice su infraestructura con gestión experta. Eliminamos la complejidad técnica para que usted se enfoque en hacer crecer su negocio.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white font-semibold text-lg h-14 px-8 rounded-full shadow-lg shadow-accent/20 transition-all hover:scale-105"
            >
              <Link href="#lead-form-section">Solicitar Presupuesto</Link>
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
        </div>
      </section>

      {/* Pain Points Section */}
      <PainPoints />

      <div className="max-w-7xl mx-auto w-full">
        {/* Services Section */}
        <section id="services" className="py-20 md:py-32 bg-background snap-start">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
                Soluciones Integrales
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Diseñamos estrategias tecnológicas que impulsan la eficiencia y seguridad de su empresa.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <ProcessSteps />

        {/* Why Us Section */}
        <section className="py-20 md:py-32 bg-secondary/50 snap-start">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
                ¿Por qué elegir LM Projects?
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Más que proveedores, somos su socio estratégico en tecnología.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              {whyUsPoints.map((point, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-white shadow-md text-primary mb-6 group-hover:scale-110 group-hover:text-accent transition-all duration-300">
                    <point.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed px-4">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* Lead Form Section */}
        <section
          id="lead-form-section"
          className="py-20 md:py-32 bg-background snap-start"
        >
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
                Hablemos de su Proyecto
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Complete el formulario y nos pondremos en contacto a la brevedad.
              </p>
            </div>
            <LeadForm services={serviceTitles} />
          </div>
        </section>
      </div>
    </>
  );
}
