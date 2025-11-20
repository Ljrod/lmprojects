import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
    {
        question: '¿Cuánto tiempo toma una migración típica?',
        answer:
            'El tiempo varía según la complejidad, pero una migración estándar de servidores suele tomar entre 2 a 4 semanas, incluyendo planificación y pruebas. Para renovaciones de equipos, depende del volumen, pero optimizamos para minimizar interrupciones.',
    },
    {
        question: '¿Habrá tiempo de inactividad (downtime)?',
        answer:
            'Nuestra prioridad es la continuidad operativa. Planificamos las migraciones críticas fuera del horario laboral y utilizamos estrategias de redundancia para garantizar un tiempo de inactividad cercano a cero.',
    },
    {
        question: '¿Qué sucede si algo falla después de la migración?',
        answer:
            'Ofrecemos un periodo de garantía y soporte post-migración dedicado. Además, implementamos planes de rollback (reversión) probados para asegurar que siempre haya una vuelta atrás segura en caso de imprevistos.',
    },
    {
        question: '¿Trabajan con hardware de cualquier marca?',
        answer:
            'Sí, somos agnósticos en cuanto a marcas. Trabajamos con Dell, HP, Lenovo, Apple y otros, recomendando siempre la mejor opción costo-beneficio para sus necesidades específicas.',
    },
];

export default function FAQSection() {
    return (
        <section className="py-20 bg-secondary/30 snap-start">
            <div className="container max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
                        Preguntas Frecuentes
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Resolvemos sus dudas antes de empezar.
                    </p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left text-lg font-medium">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
