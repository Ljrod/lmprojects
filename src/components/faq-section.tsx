import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
    {
        question: '¿Cuánto cuesta el diagnóstico inicial?',
        answer: 'El diagnóstico inicial es 100% gratuito y sin compromiso. Analizamos su infraestructura actual y le entregamos un informe con recomendaciones personalizadas.',
    },
    {
        question: '¿Cuánto tiempo toma una migración típica?',
        answer: 'Depende del alcance. Una migración de sistemas operativos para 50-100 equipos toma 2-4 semanas. Migraciones cloud más complejas pueden tomar 1-3 meses. Siempre proporcionamos un cronograma detallado antes de iniciar.',
    },
    {
        question: '¿Habrá tiempo de inactividad (downtime)?',
        answer: 'Nuestra prioridad es la continuidad operativa. Planificamos las migraciones críticas fuera del horario laboral y utilizamos estrategias de redundancia para garantizar un tiempo de inactividad cercano a cero.',
    },
    {
        question: '¿Qué sucede si algo falla durante la migración?',
        answer: 'Cada proyecto incluye un plan de rollback completo. Antes de cualquier cambio crítico, creamos respaldos y definimos puntos de reversión. En caso de problemas, podemos volver al estado anterior rápidamente.',
    },
    {
        question: '¿Trabajan con hardware de cualquier marca?',
        answer: 'Sí, somos agnósticos en cuanto a marcas. Trabajamos con Dell, HP, Lenovo, Apple y otros, recomendando la mejor opción costo-beneficio para sus necesidades.',
    },
    {
        question: '¿Cumplen con normativas del sector financiero?',
        answer: 'Sí. Tenemos experiencia con regulaciones de la CMF y estándares de seguridad del sector financiero. Cada proyecto incluye documentación completa para auditorías.',
    },
    {
        question: '¿Pueden firmar NDA antes de iniciar?',
        answer: 'Absolutamente. Firmamos acuerdos de confidencialidad (NDA) antes de recibir cualquier información sensible. La seguridad de sus datos es nuestra prioridad.',
    },
    {
        question: '¿Ofrecen soporte después del proyecto?',
        answer: 'Sí, todos nuestros proyectos incluyen un período de estabilización y soporte post-implementación. También ofrecemos contratos de soporte continuo con SLA garantizado.',
    },
];

export default function FAQSection() {
    return (
        <section className="py-16 bg-secondary/30 snap-start">
            <div className="container max-w-4xl mx-auto px-4">
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="bg-white rounded-xl border border-border px-6 data-[state=open]:shadow-md transition-shadow"
                        >
                            <AccordionTrigger className="text-left text-base font-semibold hover:no-underline py-5">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <p className="text-muted-foreground mb-4">¿Tiene otra pregunta?</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            asChild
                            className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-full px-6 h-11"
                        >
                            <Link href="/#lead-form-section">
                                Solicitar Diagnóstico Gratis
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="rounded-full px-6 h-11"
                        >
                            <a href="https://wa.me/56983151563" target="_blank" rel="noopener noreferrer">
                                Escribir por WhatsApp
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

