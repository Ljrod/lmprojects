"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Minimize2, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: "user" | "bot";
    content: string;
    timestamp: Date;
}

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "bot",
            content: "¡Hola! Soy Proyectito. ¿En qué puedo ayudarte hoy sobre LM Projects?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [showGreeting, setShowGreeting] = useState(false);

    // Auto-scroll to bottom when messages change or chat opens
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen, isLoading]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && !isMinimized && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen, isMinimized]);

    // Show greeting after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) {
                setShowGreeting(true);
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [isOpen]);

    // Viewport height logic removed in favor of viewport meta tag interactiveWidget: 'resizes-content'
    // This provides a smoother native experience for mobile keyboards

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // Prepare history for context (excluding the very last user message which is sent as 'message')
            const history = messages.map(m => ({
                role: m.role === "bot" ? "assistant" : m.role,
                content: m.content
            }));

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage.content,
                    history: history
                }),
            });

            const data = await response.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                content: data.reply || "Lo siento, hubo un error al procesar tu mensaje.",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                content: "Lo siento, ocurrió un error de conexión. Por favor intenta de nuevo.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setIsMinimized(false);
        setShowGreeting(false);
    };

    return (
        <>
            {/* Chat Window */}
            {isOpen && (
                <div
                    className={cn(
                        "flex flex-col overflow-hidden bg-background shadow-2xl transition-all duration-300 ease-in-out",
                        // Mobile styles (default): Full screen, fixed
                        "fixed bottom-0 left-0 z-50 w-full h-[100%] overscroll-contain rounded-none",
                        // Desktop styles (sm): Floating card
                        "sm:fixed sm:bottom-6 sm:right-6 sm:z-50 sm:h-[500px] sm:w-[350px] sm:rounded-2xl sm:border sm:left-auto sm:top-auto sm:overscroll-auto",
                        isMinimized && "hidden" // Hide main window when minimized (we'll show a small bar instead)
                    )}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-violet-600 to-indigo-600 p-4 text-white shadow-sm shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                <Bot className="h-6 w-6" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-headline text-base font-bold leading-none">Proyectito</h3>
                                <span className="flex items-center gap-1.5 text-xs text-white/80">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400"></span>
                                    </span>
                                    En línea
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white hover:bg-white/20"
                                onClick={() => setIsMinimized(!isMinimized)}
                            >
                                <Minimize2 className="h-4 w-4" />
                                <span className="sr-only">Minimizar</span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white hover:bg-white/20"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="h-5 w-5" />
                                <span className="sr-only">Cerrar</span>
                            </Button>
                        </div>
                    </div>

                    {/* Chat Area */}
                    {!isMinimized && (
                        <>
                            <ScrollArea className="flex-1 bg-muted/30 p-4">
                                <div className="flex flex-col gap-6">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={cn(
                                                "flex w-full gap-2",
                                                msg.role === "user" ? "justify-end" : "justify-start"
                                            )}
                                        >
                                            {msg.role === "bot" && (
                                                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30">
                                                    <Bot className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                                                </div>
                                            )}

                                            <div className={cn(
                                                "flex max-w-[80%] flex-col gap-1",
                                                msg.role === "user" ? "items-end" : "items-start"
                                            )}>
                                                <div
                                                    className={cn(
                                                        "rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                                                        msg.role === "user"
                                                            ? "rounded-tr-none bg-violet-600 text-white"
                                                            : "rounded-tl-none bg-card text-card-foreground border"
                                                    )}
                                                >
                                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                                </div>
                                                <span className="text-[10px] text-muted-foreground px-1">
                                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>

                                            {msg.role === "user" && (
                                                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600">
                                                    <User className="h-5 w-5 text-white" />
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {isLoading && (
                                        <div className="flex w-full gap-2 justify-start">
                                            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30">
                                                <Bot className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                                            </div>
                                            <div className="rounded-2xl rounded-tl-none bg-card border px-4 py-3 shadow-sm">
                                                <div className="flex gap-1">
                                                    <span className="h-2 w-2 animate-bounce rounded-full bg-violet-600/40 [animation-delay:-0.3s]"></span>
                                                    <span className="h-2 w-2 animate-bounce rounded-full bg-violet-600/40 [animation-delay:-0.15s]"></span>
                                                    <span className="h-2 w-2 animate-bounce rounded-full bg-violet-600/40"></span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={scrollRef} />
                                </div>
                            </ScrollArea>

                            {/* Input Area */}
                            <div className="border-t bg-background p-4 shrink-0">
                                <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                                    <Input
                                        ref={inputRef}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Escribe tu mensaje..."
                                        className="pr-12 h-12 rounded-full border-muted-foreground/20 bg-muted/30 focus-visible:ring-violet-600/20"
                                        disabled={isLoading}
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        disabled={isLoading || !input.trim()}
                                        className="absolute right-1.5 h-9 w-9 rounded-full bg-violet-600 hover:bg-violet-700 transition-transform hover:scale-105 active:scale-95 text-white"
                                    >
                                        <Send className="h-4 w-4" />
                                        <span className="sr-only">Enviar</span>
                                    </Button>
                                </form>
                                <div className="mt-2 text-center">
                                    <p className="text-[10px] text-muted-foreground">
                                        Proyectito puede cometer errores. Verifica la información importante.
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Minimized State (Floating Bar) */}
            {isOpen && isMinimized && (
                <div className="fixed bottom-24 right-4 z-50 sm:bottom-24 sm:right-6">
                    <div className="flex w-72 items-center justify-between rounded-2xl border bg-background p-4 shadow-2xl">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30">
                                <Bot className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                            </div>
                            <span className="font-medium">Proyectito</span>
                        </div>
                        <div className="flex gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-muted"
                                onClick={() => setIsMinimized(false)}
                            >
                                <MessageCircle className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-muted"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Action Button & Greeting Container */}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end sm:bottom-6 sm:right-6">
                {/* Greeting Bubble */}
                {showGreeting && !isOpen && (
                    <div className="mb-4 animate-in slide-in-from-bottom-5 fade-in duration-500">
                        <div className="relative flex items-center gap-3 rounded-2xl border bg-white/90 p-4 shadow-xl backdrop-blur-sm dark:bg-card/90 dark:border-white/10 transition-transform hover:scale-105 cursor-pointer" onClick={toggleChat}>
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 shadow-md">
                                <Bot className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-bold text-violet-600 dark:text-violet-400">Proyectito</span>
                                <p className="text-sm font-medium text-foreground leading-tight">👋 ¡Hola! ¿Te puedo ayudar?</p>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowGreeting(false);
                                }}
                                className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted shadow-sm hover:bg-destructive hover:text-destructive-foreground transition-colors"
                            >
                                <X className="h-3 w-3" />
                            </button>
                            {/* Triangle pointer */}
                            <div className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 bg-white/90 border-b border-r dark:bg-card/90 dark:border-white/10"></div>
                        </div>
                    </div>
                )}

                {/* Floating Action Button */}
                {!isOpen && (
                    <Button
                        onClick={toggleChat}
                        size="lg"
                        className={cn(
                            "h-14 w-14 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0",
                            "scale-100 opacity-100"
                        )}
                    >
                        <MessageCircle className="h-7 w-7" />
                        <span className="sr-only">Abrir chat</span>
                    </Button>
                )}
            </div>
        </>
    );
}
