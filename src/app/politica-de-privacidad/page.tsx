import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Política de Privacidad | LM Projects',
    description: 'Política de privacidad y protección de datos de LM Projects.',
};

export default function PoliticaDePrivacidadPage() {
    return (
        <main className="bg-background py-16 md:py-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver al inicio
                    </Link>
                </Button>

                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    Política de Privacidad
                </h1>
                <p className="text-muted-foreground mb-8">
                    Última actualización: Diciembre 2024
                </p>

                <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-muted-foreground mb-6">
                        LM Projects SpA (&quot;nosotros&quot;) recopila información personal a través de este sitio web
                        únicamente para responder a sus consultas y proporcionar nuestros servicios.
                    </p>

                    <h2 className="text-xl font-bold text-primary mt-8 mb-4">Información que Recopilamos</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Nombre y datos de contacto (email, teléfono)</li>
                        <li>Nombre de la empresa</li>
                        <li>Información sobre sus necesidades de servicio</li>
                    </ul>

                    <h2 className="text-xl font-bold text-primary mt-8 mb-4">Uso de la Información</h2>
                    <p className="text-muted-foreground mb-4">
                        Utilizamos su información exclusivamente para:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Responder a sus consultas</li>
                        <li>Enviar propuestas comerciales solicitadas</li>
                        <li>Coordinar reuniones y diagnósticos</li>
                    </ul>
                    <p className="text-muted-foreground mt-4">
                        <strong>No vendemos ni compartimos su información con terceros.</strong> Sus datos se
                        almacenan de forma segura y se eliminan tras 12 meses de inactividad.
                    </p>

                    <h2 className="text-xl font-bold text-primary mt-8 mb-4">Sus Derechos</h2>
                    <p className="text-muted-foreground">
                        Puede solicitar acceso, rectificación o eliminación de sus datos escribiendo a{' '}
                        <a href="mailto:contacto@lmprojects.cl" className="text-accent hover:underline">
                            contacto@lmprojects.cl
                        </a>
                    </p>

                    <h2 className="text-xl font-bold text-primary mt-8 mb-4">Contacto</h2>
                    <p className="text-muted-foreground">
                        Para consultas sobre privacidad:{' '}
                        <a href="mailto:contacto@lmprojects.cl" className="text-accent hover:underline">
                            contacto@lmprojects.cl
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
