import { ClipboardList, Map, Rocket, ShieldCheck } from 'lucide-react';

const steps = [
    {
        icon: ClipboardList,
        title: '1. Evaluación',
        description:
            'Analizamos su infraestructura actual, identificamos cuellos de botella y definimos los objetivos del proyecto.',
    },
    {
        icon: Map,
        title: '2. Estrategia',
        description:
            'Diseñamos un plan detallado, seleccionando las tecnologías adecuadas y definiendo el cronograma de ejecución.',
    },
    {
        icon: Rocket,
        title: '3. Ejecución',
        description:
            'Implementamos las soluciones con mínima interrupción, asegurando que sus operaciones continúen sin problemas.',
    },
    {
        icon: ShieldCheck,
        title: '4. Soporte',
        description:
            'Validamos el éxito del proyecto y brindamos soporte continuo para garantizar la estabilidad a largo plazo.',
    },
];

export default function ProcessSteps() {
    return (
        <section className="py-20 bg-background snap-start">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
                        Nuestro Proceso de Trabajo
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Un enfoque estructurado para garantizar resultados predecibles y exitosos.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className="w-24 h-24 rounded-2xl bg-card border border-border shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300 relative z-10">
                                <step.icon className="w-10 h-10 text-primary group-hover:text-accent transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
