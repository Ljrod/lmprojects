'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import LeadForm from '@/components/lead-form';
import { ArrowRight, X } from 'lucide-react';

interface LeadFormModalProps {
    services: string[];
    defaultService?: string;
    buttonText?: string;
    buttonClassName?: string;
}

export default function LeadFormModal({
    services,
    defaultService,
    buttonText = 'Solicitar Diagnóstico Gratuito',
    buttonClassName = '',
}: LeadFormModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                size="lg"
                onClick={() => setIsOpen(true)}
                className={buttonClassName || "bg-accent hover:bg-accent/90 text-white font-semibold rounded-full px-8 h-12 shadow-lg shadow-accent/20"}
            >
                {buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-[95vw] sm:max-w-md p-0 overflow-hidden border-0 max-h-[90vh] overflow-y-auto">
                    <div className="bg-gradient-to-r from-accent to-cyan-500 p-4 sm:p-5 text-center">
                        <DialogTitle className="text-xl sm:text-2xl font-bold text-white mb-1">
                            🎯 Diagnóstico Gratuito
                        </DialogTitle>
                        <p className="text-white/90 text-sm">
                            Sin compromiso ni vendedores agresivos
                        </p>
                    </div>
                    <div className="p-4 sm:p-6">
                        <LeadForm
                            services={services}
                            defaultService={defaultService}
                        />
                    </div>
                    {/* Urgency Indicator */}
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                        <div className="text-center p-3 bg-amber-50 border border-amber-200 rounded-xl">
                            <p className="text-xs sm:text-sm text-amber-800">
                                <span className="font-bold">⚡ Cupos limitados:</span> Solo 5 proyectos nuevos por mes.
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
