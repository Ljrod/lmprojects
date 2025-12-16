'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Show button after 3 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        // Show tooltip after 5 seconds
        const tooltipTimer = setTimeout(() => {
            setShowTooltip(true);
            // Hide tooltip after 8 seconds
            setTimeout(() => setShowTooltip(false), 8000);
        }, 5000);

        return () => {
            clearTimeout(timer);
            clearTimeout(tooltipTimer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
            {/* Tooltip */}
            {showTooltip && (
                <div className="animate-fade-in bg-white rounded-lg shadow-lg border border-gray-200 p-3 max-w-[200px] relative">
                    <button
                        onClick={() => setShowTooltip(false)}
                        className="absolute -top-2 -right-2 bg-gray-100 rounded-full p-1 hover:bg-gray-200 transition-colors"
                    >
                        <X className="h-3 w-3 text-gray-500" />
                    </button>
                    <p className="text-sm text-gray-700">
                        <span className="font-medium">¿Necesita ayuda?</span>
                        <br />
                        Escríbanos por WhatsApp
                    </p>
                </div>
            )}

            {/* WhatsApp Button */}
            <a
                href="https://wa.me/56983151563?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios%20de%20TI"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                aria-label="Contactar por WhatsApp"
            >
                <MessageCircle className="h-7 w-7 text-white fill-white" />
            </a>
        </div>
    );
}
