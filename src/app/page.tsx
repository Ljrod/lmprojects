import Link from 'next/link';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import ServiceCard from '@/components/service-card';
import LeadForm from '@/components/lead-form';
import {getServices, getServiceTitles} from '@/lib/data';
import {Users, Package, ShieldCheck} from 'lucide-react';
import {PlaceHolderImages} from '@/lib/placeholder-images';

const whyUsPoints = [
  {
    icon: Users,
    title: 'Gestión Cercana y Personalizada',
    description:
      'Nos involucramos en cada proyecto como si fuera nuestro, garantizando una comunicación fluida y directa.',
  },
  {
    icon: Package,
    title: 'Paquetes Flexibles y Accesibles',
    description:
      'Ofrecemos soluciones a medida que se adaptan a su presupuesto y necesidades, sin costos ocultos.',
  },
  {
    icon: ShieldCheck,
    title: 'Servicio Integral y Confiable',
    description:
      'Desde la planificación hasta la ejecución y el soporte post-migración, cubrimos todo el ciclo de vida del proyecto.',
  },
];

export default async function HomePage() {
  const services = await getServices();
  const serviceTitles = await getServiceTitles();
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-primary text-primary-foreground">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover opacity-10"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Transforma tu infraestructura TI con LM Projects
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
            Migraciones y renovación tecnológica con gestión experta, sin
            fricción operativa.
          </p>
          <div className="mt-10">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Link href="#lead-form">Solicitar diagnóstico</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-primary">
              Nuestros Servicios
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Soluciones expertas para los desafíos tecnológicos de su empresa.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-primary">
              ¿Por qué LM Projects?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Su socio estratégico para una transformación tecnológica exitosa.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {whyUsPoints.map((point, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-6">
                  <point.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-primary">
                  {point.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="lead-form-section" className="py-16 md:py-24 bg-background">
        <div className="container">
          <LeadForm services={serviceTitles} />
        </div>
      </section>
    </>
  );
}
