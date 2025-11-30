import { AlertTriangle, Clock, Lock } from 'lucide-react';

const painPoints = [
    {
        icon: Clock,
        title: 'Lentitud Operativa',
        description:
            'Equipos obsoletos y sistemas lentos que frustran a sus empleados y reducen la productividad diaria.',
    },
    {
        icon: AlertTriangle,
        title: 'Riesgo de Fallos',
        description:
            'Hardware sin garantía y software desactualizado que aumentan la probabilidad de caídas críticas del sistema.',
    },
    {
        icon: Lock,
        title: 'Vulnerabilidad',
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
                        ¿Su tecnología actual le está costando dinero?
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {painPoints.map((point, index) => (
                        <div key={index} className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-red-100 shadow-lg shadow-rose-500/5 hover:border-rose-300 hover:-translate-y-1 transition-all duration-300">
                            <div className="p-4 rounded-full bg-gradient-to-br from-red-50 to-rose-100 text-rose-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <point.icon className="w-8 h-8" />
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
            </div>
        </section>
    );
}
