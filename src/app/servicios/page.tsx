import ServiceCard from '@/components/service-card';
import {getServices} from '@/lib/data';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Servicios | LM Projects',
  description:
    'Explore nuestros servicios de gestión y migración tecnológica, diseñados para modernizar su infraestructura TI.',
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main>
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-primary">
              Nuestros Servicios
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Ofrecemos una gama de servicios especializados para abordar sus
              necesidades de infraestructura y modernización tecnológica.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
