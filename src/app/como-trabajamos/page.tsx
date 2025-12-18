import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ClipboardList, PenTool, Rocket, CheckCircle, FileText, LifeBuoy, ShieldCheck, RefreshCcw, UserCheck } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Cómo Trabajamos | LM Projects - Metodología de Proyectos TI',
    description: 'Metodología probada para proyectos de infraestructura TI: Diagnóstico, Planificación, Ejecución, Validación, Cierre y Soporte.',
};

const etapas = [
    {
        numero: '01',
        titulo: 'Diagnóstico',
        duracion: '1-2 semanas',
        icon: ClipboardList,
        descripcion: 'Levantamiento de información, entrevistas con stakeholders, identificación de riesgos.',
        entregables: [
            'Informe de diagnóstico',
            'Matriz de riesgos',
            'Propuesta de alcance',
        ],
    },
    {
        numero: '02',
        titulo: 'Planificación',
        duracion: '1 semana',
        icon: PenTool,
        descripcion: 'Definición de arquitectura, cronograma detallado, asignación de recursos.',
        entregables: [
            'Plan de proyecto',
            'Cronograma de hitos',
            'Plan de rollback',
        ],
    },
    {
        numero: '03',
        titulo: 'Ejecución',
        duracion: 'Variable según alcance',
        icon: Rocket,
        descripcion: 'Implementación por fases, ventanas de cambio acordadas, comunicación continua.',
        entregables: [
            'Reportes de avance semanales',
            'Minutas de reuniones',
            'Control de cambios',
        ],
    },
    {
        numero: '04',
        titulo: 'Validación',
        duracion: '1-2 semanas',
        icon: CheckCircle,
        descripcion: 'Pruebas de aceptación, validación con usuarios, corrección de hallazgos.',
        entregables: [
            'Informe de pruebas',
            'Checklist de validación firmado',
            'Lista de pendientes (si aplica)',
        ],
    },
    {
        numero: '05',
        titulo: 'Cierre',
        duracion: '1 semana',
        icon: FileText,
        descripcion: 'Entrega formal, capacitación a equipos internos, traspaso de conocimiento.',
        entregables: [
            'Acta de cierre',
            'Documentación técnica',
            'Credenciales y accesos revocados',
        ],
    },
    {
        numero: '06',
        titulo: 'Soporte',
        duracion: 'Según contrato',
        icon: LifeBuoy,
        descripcion: 'Periodo de estabilización incluido. Contratos de soporte continuo disponibles.',
        entregables: [
            'SLA de soporte',
            'Canales de comunicación definidos',
            'Reportes mensuales de incidentes',
        ],
    },
];

const gestionRiesgos = [
    {
        icon: RefreshCcw,
        titulo: 'Plan de Rollback',
        descripcion: 'Antes de cualquier cambio crítico, definimos puntos de reversión y validamos respaldos. Si algo no funciona según lo esperado, volvemos al estado anterior en menos de 2 horas.',
    },
    {
        icon: ShieldCheck,
        titulo: 'Control de Cambios',
        descripcion: 'Los cambios de alcance se documentan formalmente. Evaluamos impacto en tiempo y costo antes de aprobar. No hay sorpresas.',
    },
    {
        icon: UserCheck,
        titulo: 'Aprobaciones Formales',
        descripcion: 'Cada fase requiere aprobación formal antes de continuar. Usted mantiene control total del proyecto en todo momento.',
    },
];

const entregablesFinales = [
    'Documentación técnica completa',
    'Informe ejecutivo de resultados',
    'Inventario actualizado (si aplica)',
    'Credenciales y accesos documentados',
    'Período de garantía post-implementación',
    'Opciones de soporte continuo',
];

export default function ComoTrabajamosPage() {
    return (
        <main className="bg-background">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-16 md:py-20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm mb-6">
                        Metodología Probada
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                        Cómo <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-300">Trabajamos</span>
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Proceso estructurado en 6 etapas con entregables claros, gestión de riesgos y comunicación transparente en cada paso.
                    </p>
                </div>
            </section>

            {/* Etapas del Proceso */}
            <section className="py-16 md:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
                        6 Etapas del Proyecto
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {etapas.map((etapa) => (
                            <div key={etapa.numero} className="group relative bg-white rounded-2xl border border-border p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300">
                                <span className="absolute top-4 right-4 text-6xl font-black text-slate-100 select-none">
                                    {etapa.numero}
                                </span>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <etapa.icon className="h-7 w-7 text-accent" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-1">{etapa.titulo}</h3>
                                    <p className="text-sm text-accent font-medium mb-3">{etapa.duracion}</p>
                                    <p className="text-muted-foreground text-sm mb-4">{etapa.descripcion}</p>
                                    <div className="border-t pt-4">
                                        <p className="text-xs font-semibold text-primary mb-2">Entregables:</p>
                                        <ul className="space-y-1">
                                            {etapa.entregables.map((entregable, idx) => (
                                                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                                                    <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                                    {entregable}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gestión de Riesgos */}
            <section className="py-16 bg-secondary/50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-4">
                        Gestión de Riesgos
                    </h2>
                    <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                        Minimizamos riesgos con planificación rigurosa y comunicación transparente.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {gestionRiesgos.map((item, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 border border-border">
                                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                                    <item.icon className="h-6 w-6 text-accent" />
                                </div>
                                <h3 className="font-bold text-primary mb-2">{item.titulo}</h3>
                                <p className="text-sm text-muted-foreground">{item.descripcion}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Qué Recibe el Cliente */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-4">
                        ¿Qué Recibe al Final?
                    </h2>
                    <p className="text-muted-foreground text-center mb-8">
                        Al cierre de cada proyecto, usted recibe:
                    </p>
                    <div className="bg-white rounded-2xl border border-border p-8">
                        <ul className="grid sm:grid-cols-2 gap-4">
                            {entregablesFinales.map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                    <span className="text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        ¿Listo para comenzar?
                    </h2>
                    <p className="text-gray-300 mb-8">
                        Conversemos sobre su proyecto. El diagnóstico inicial es gratuito y sin compromiso.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-full px-8 h-14 text-lg"
                    >
                        <Link href="/#lead-form-section">
                            Solicitar Diagnóstico Gratis
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}
