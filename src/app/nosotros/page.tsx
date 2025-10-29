import type { Metadata } from 'next';
import Image from 'next/image';
import { Building, Target, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nosotros | LM Projects',
  description: 'Conozca más sobre LM Projects, nuestra misión, visión y el equipo que lo hace posible.',
};

const teamMembers = [
    {
        name: 'Juan Pérez',
        role: 'Director de Proyectos',
        imageUrl: 'https://picsum.photos/seed/team1/400/400',
        imageHint: 'professional headshot'
    },
    {
        name: 'Maria González',
        role: 'Especialista en Migraciones Cloud',
        imageUrl: 'https://picsum.photos/seed/team2/400/400',
        imageHint: 'professional headshot'
    },
    {
        name: 'Carlos Sánchez',
        role: 'Técnico de Soporte Senior',
        imageUrl: 'https://picsum.photos/seed/team3/400/400',
        imageHint: 'professional headshot'
    }
];

export default function NosotrosPage() {
  return (
    <main>
        <section className="py-16 md:py-24 bg-background">
            <div className="container max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-primary">
                        Sobre LM Projects
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                        Somos un equipo de apasionados por la tecnología, dedicados a facilitar la transformación digital de las empresas.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-muted-foreground">
                        <p className="text-lg">
                            En LM Projects, entendemos que la tecnología es un pilar fundamental para el crecimiento y la eficiencia de cualquier negocio. Nacimos con el objetivo de ser el socio estratégico que las empresas necesitan para navegar el complejo y cambiante mundo de la infraestructura TI.
                        </p>
                        <p>
                            Nuestra filosofía se basa en la gestión cercana y personalizada. Nos involucramos en cada proyecto como si fuera nuestro, asegurando que cada migración y renovación tecnológica se ejecute sin fricción, minimizando el impacto en la operación diaria de nuestros clientes.
                        </p>
                    </div>
                     <div>
                        <Image
                        src="https://picsum.photos/seed/aboutus/600/400"
                        alt="Equipo de LM Projects trabajando"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-lg"
                        data-ai-hint="team collaboration office"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary">
          <div className="container max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-6">
                    <Building className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary mb-4">Nuestra Misión</h2>
                  <p className="text-muted-foreground">
                    Impulsar la modernización tecnológica de nuestros clientes a través de soluciones de migración y gestión de infraestructura eficientes, seguras y personalizadas, actuando como un verdadero socio en su evolución digital.
                  </p>
              </div>
              <div className="flex flex-col items-center md:items-start">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-6">
                    <Target className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary mb-4">Nuestra Visión</h2>
                  <p className="text-muted-foreground">
                    Ser la empresa líder en gestión de proyectos tecnológicos en la región, reconocida por nuestra excelencia operativa, confiabilidad y la capacidad de transformar los desafíos tecnológicos en oportunidades de crecimiento para nuestros clientes.
                  </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
            <div className="container max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-primary">
                        Nuestro Equipo
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Profesionales expertos y comprometidos con su éxito.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member) => (
                    <div key={member.name} className="text-center">
                        <Image
                        src={member.imageUrl}
                        alt={`Retrato de ${member.name}`}
                        width={150}
                        height={150}
                        className="rounded-full mx-auto mb-4 shadow-md"
                        data-ai-hint={member.imageHint}
                        />
                        <h3 className="text-xl font-semibold text-primary">{member.name}</h3>
                        <p className="text-muted-foreground">{member.role}</p>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    </main>
  );
}
