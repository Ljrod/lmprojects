import {notFound} from 'next/navigation';
import {getServices, getServiceBySlug, getServiceTitles} from '@/lib/data';
import LeadForm from '@/components/lead-form';
import {Badge} from '@/components/ui/badge';
import type {Metadata} from 'next';
import {Check} from 'lucide-react';

type Props = {
  params: {slug: string};
};

// Generate metadata for each service page
export async function generateMetadata({params}: Props): Promise<Metadata> {
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

export default async function ServiceDetailPage({params}: Props) {
  const service = await getServiceBySlug(params.slug);
  const serviceTitles = await getServiceTitles();

  if (!service) {
    notFound();
  }

  const {title, longDescription, icon: Icon} = service;

  return (
    <main>
      <div className="container py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          <div className="md:col-span-2">
            <Badge variant="secondary" className="mb-4">
              {Icon && <Icon className="mr-2 h-4 w-4" />}Servicio
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-primary mb-6">
              {title}
            </h1>
            <div className="space-y-4 text-lg text-muted-foreground">
              {longDescription.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 p-6 bg-secondary rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">
                ¿Qué incluye este servicio?
              </h3>
              <ul className="space-y-3">
                {/* Dummy list items for illustration */}
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                  <span>Auditoría y Planificación Estratégica</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                  <span>Ejecución, Despliegue y Migración de Datos</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                  <span>Pruebas de Aceptación y Validación de Usuario</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                  <span>Documentación Completa y Soporte Post-implementación</span>
                </li>
              </ul>
            </div>
          </div>
          <aside className="md:col-span-1">
            <div className="sticky top-24">
              <LeadForm
                services={serviceTitles}
                defaultService={service.title}
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
