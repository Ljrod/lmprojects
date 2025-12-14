import Link from 'next/link';
import { AlertTriangle, Clock, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const painPoints = [
    {
        icon: Clock,
        title: 'Lentitud Operativa',
        stat: '-40%',
        statLabel: 'productividad',
        description:
            'Equipos obsoletos y sistemas lentos que frustran a sus empleados y reducen la productividad diaria.',
    },
    {
        icon: AlertTriangle,
        title: 'Riesgo de Fallos',
        stat: '3x',
        statLabel: 'más caídas',
        description:
            'Hardware sin garantía y software desactualizado que aumentan la probabilidad de caídas críticas del sistema.',
    },
    {
        icon: Lock,
        title: 'Vulnerabilidad',
        stat: '60%',
        statLabel: 'más ataques',
        description:
            'Sistemas operativos antiguos sin parches de seguridad que exponen su empresa a ciberataques y pérdida de datos.',
    },
];

export default function PainPoints() {
    return (
        <section className="py-12 md:py-16 bg-destructive/5 border-y border-destructive/10 snap-start">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-2xl font-bold tracking-tight text-primary md:text-3xl">
                        ¿Cuánto dinero está perdiendo por tecnología obsoleta?
                    </h2>
                    <p className="mt-2 text-muted-foreground">Estos problemas le cuestan miles de dólares cada mes</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {painPoints.map((point, index) => (
                        <div key={index} className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-red-100 shadow-lg shadow-rose-500/5 hover:border-rose-300 hover:-translate-y-1 transition-all duration-300">
                            <div className="p-4 rounded-full bg-gradient-to-br from-red-50 to-rose-100 text-rose-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                                <point.icon className="w-8 h-8" />
                            </div>
                            <div className="mb-4">
                                <span className="text-3xl font-black text-rose-600">{point.stat}</span>
                                <span className="text-sm text-rose-500 ml-1">{point.statLabel}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {point.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {point.description}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <p className="text-lg text-muted-foreground mb-4">
                        <strong className="text-primary">No deje que estos problemas sigan afectando su negocio.</strong>
                    </p>
                    <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-full px-8 h-12">
                        <Link href="#lead-form-section">Resolver Ahora →</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
