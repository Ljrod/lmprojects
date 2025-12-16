import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Zap, Users, TrendingUp, CheckCircle, ArrowRight, Award, Building2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Nosotros | LM Projects - Especialistas en TI para Banca y Retail',
    description: 'Equipo especializado en infraestructura TI para instituciones financieras y retail. +50 proyectos exitosos, cumplimiento regulatorio garantizado.',
};

const stats = [
    { number: '+50', label: 'Proyectos Exitosos' },
    { number: '99.9%', label: 'Uptime Garantizado' },
    { number: '0', label: 'Incidentes Críticos' },
    { number: '24h', label: 'Tiempo de Respuesta' },
];

const differentiators = [
    {
        icon: Shield,
        title: 'Cumplimiento Regulatorio',
        description: 'Experiencia en normativas del sector financiero. Cada proyecto incluye documentación para auditorías.',
    },
    {
        icon: Zap,
        title: 'Cero Interrupción',
        description: 'Metodología probada para migraciones sin afectar la operación de sucursales y puntos de venta.',
    },
    {
        icon: Clock,
        title: 'Respuesta Inmediata',
        description: 'Soporte dedicado con tiempos de respuesta garantizados por SLA.',
    },
    {
        icon: TrendingUp,
        title: 'Resultados Medibles',
        description: 'KPIs claros y reportes ejecutivos. Usted ve el ROI de cada proyecto.',
    },
];

const teamMembers = [
    {
        name: 'Miguel Llamedo',
        title: 'Director de Arquitectura',
        focus: 'Diseño de soluciones cloud y estrategia técnica',
        imageUrl: 'https://picsum.photos/seed/miguel/400/400',
    },
    {
        name: 'Leduard Rodriguez',
        title: 'Director de Proyectos',
        focus: 'Gestión, cumplimiento y entrega a tiempo',
        imageUrl: '/images/leduard.jpg',
    }
];

export default function NosotrosPage() {
    return (
        <main className="bg-background">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 md:py-28">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm mb-6">
                        <Building2 className="h-4 w-4 mr-2 text-accent" />
                        Especialistas en Banca y Retail
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Hacemos que la tecnología <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-300">trabaje para usted</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        No somos una consultora genérica. Somos especialistas en infraestructura TI para el sector financiero y retail, con metodologías probadas para proyectos de alto impacto.
                    </p>
                </div>
            </section>

            {/* Stats Section - Social Proof */}
            <section className="py-12 bg-white border-b">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <p className="text-3xl md:text-4xl font-bold text-accent mb-1">{stat.number}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us - Differentiators */}
            <section className="py-16 md:py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                            ¿Por qué trabajar con nosotros?
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Entendemos los desafíos únicos del sector financiero y retail.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {differentiators.map((item, index) => (
                            <div
                                key={index}
                                className="flex gap-4 p-6 bg-white rounded-2xl border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                                    <item.icon className="h-6 w-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section - Simplified */}
            <section className="py-12 md:py-16 bg-secondary/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                            Liderazgo con Experiencia
                        </h2>
                        <p className="text-muted-foreground text-sm">
                            Un equipo senior enfocado en resultados, no en burocracia.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {teamMembers.map((member) => (
                            <div key={member.name} className="bg-white rounded-2xl p-6 border border-border text-center">
                                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-accent/20">
                                    <Image
                                        src={member.imageUrl}
                                        alt={member.name}
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-primary">{member.name}</h3>
                                <p className="text-accent font-medium text-sm mb-2">{member.title}</p>
                                <p className="text-muted-foreground text-sm">{member.focus}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="py-8 bg-white border-y">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center justify-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-center">Empresa en Chile</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-center">Factura electrónica</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-center">Contratos con SLA</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-center">NDA disponible</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-primary">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Award className="h-12 w-12 text-accent mx-auto mb-6" />
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Conversemos sobre su próximo proyecto
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                        Diagnóstico inicial gratuito. Sin compromiso. Descubra cómo podemos optimizar su infraestructura TI.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-full px-8 h-14 text-lg shadow-lg shadow-accent/20"
                    >
                        <Link href="/#lead-form-section">
                            Agendar Diagnóstico Gratuito
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <p className="text-gray-400 text-sm mt-4">
                        Respuesta garantizada en menos de 24 horas
                    </p>
                </div>
            </section>
        </main>
    );
}

