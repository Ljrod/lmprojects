import { ClipboardList, PenTool, Rocket, CheckCircle, FileText, LifeBuoy } from 'lucide-react';

const steps = [
    {
        icon: ClipboardList,
        title: '1. Auditoría',
        description:
            'Evaluación exhaustiva de la situación actual para identificar necesidades y riesgos.',
    },
    {
        icon: PenTool,
        title: '2. Diseño',
        description:
            'Creación de una arquitectura y plan de trabajo detallado y a medida.',
    },
    {
        icon: Rocket,
        title: '3. Ejecución',
        description:
            'Implementación de la solución con mínima interrupción operativa.',
    },
    {
        icon: CheckCircle,
        title: '4. Validación',
        description:
            'Pruebas rigurosas para asegurar que todo funcione según lo esperado.',
    },
    {
        icon: FileText,
        title: '5. Documentación',
        description:
            'Entrega de manuales y guías técnicas para el equipo interno.',
    },
    {
        icon: LifeBuoy,
        title: '6. Soporte',
        description:
            'Acompañamiento post-implementación para garantizar la estabilidad.',
    },
];

export default function ProcessSteps() {
    return (
        <section className="py-12 md:py-16 bg-background snap-start">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
                        Nuestro Proceso de Trabajo
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Metodología probada para resultados predecibles: Auditoría, Diseño, Ejecución, Validación, Documentación y Soporte.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                    {steps.map((step, index) => (
                        <div key={index} className="group relative flex flex-col items-start text-left p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm md:border-none md:ring-1 md:ring-slate-900/5 md:shadow-sm border-t-4 border-blue-500 hover:ring-blue-200 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                            {/* Watermark Number */}
                            <span className="absolute top-2 right-4 text-8xl font-black text-slate-100/50 select-none -z-0 pointer-events-none">
                                {index + 1}
                            </span>

                            <div className="relative z-10 w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <step.icon className="w-8 h-8 text-blue-600" />
                            </div>

                            <h3 className="relative z-10 text-xl font-bold text-slate-900 mb-3">
                                {step.title.replace(/^\d+\.\s*/, '')} {/* Remove number from title if present in data */}
                            </h3>

                            <p className="relative z-10 text-slate-600 text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
