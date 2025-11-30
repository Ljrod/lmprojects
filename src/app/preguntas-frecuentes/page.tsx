import FAQSection from '@/components/faq-section';

export default function FAQPage() {
    return (
        <main className="flex-1 pt-24">
            <div className="container max-w-4xl mx-auto px-4 mb-12 text-center">
                <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
                    Preguntas Frecuentes
                </h1>
            </div>
            <FAQSection />
        </main>
    );
}
