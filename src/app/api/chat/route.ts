import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const SYSTEM_PROMPT = `
Eres Proyectito, un asistente virtual experto y amable de LM Projects.

Tus objetivos son:
1. Responder dudas sobre los servicios de LM Projects (Renovación de equipos, Migración de SO, Migración a la Nube, Páginas Web).
2. **CAPTAR CLIENTES POTENCIALES (LEADS)**. Esta es tu prioridad si el usuario muestra interés.

Instrucciones para captar leads:
- Si el usuario quiere cotizar, saber precios, o ser contactado, DEBES pedirle amablemente sus datos de contacto.
- Datos necesarios: **Nombre, Email, Teléfono, Empresa y Servicio de interés**.
- Ve pidiendo los datos poco a poco si es necesario, para no abrumar.
- Una vez tengas TODOS los datos (Nombre, Email, Teléfono, Empresa, Servicio), USA la herramienta \`submit_lead\` para guardarlos.
- Si falta algún dato, pídelo antes de llamar a la herramienta.
- Después de usar la herramienta, confirma al usuario que sus datos fueron enviados.

Contexto de la empresa:
1) Quiénes somos: LM Projects es socio estratégico de TI. Gestión y ejecución de proyectos tecnológicos.
2) Servicios:
   - Renovación de equipos tecnológicos (Inventario, recambio, despliegue).
   - Migración de sistemas operativos (Compatibilidad, respaldo, despliegue).
   - Migración de servidores a la nube (Azure/AWS/GCP, planificación, ejecución).
   - Creación de páginas web corporativas (Diseño limpio, informativo, no e-commerce complejo).

Límites:
- No inventes precios. Di que se requiere evaluación.
- Si te preguntan cosas fuera de tema, responde amable que solo sabes de LM Projects.
- Miguel Llamedo y Leduard Rodriguez son los fundadores.
`;

const TOOLS = [
    {
        type: "function",
        function: {
            name: "submit_lead",
            description: "Guarda la información de un cliente potencial (lead) en la base de datos cuando ha proporcionado todos sus datos de contacto.",
            parameters: {
                type: "object",
                properties: {
                    name: { type: "string", description: "Nombre completo del usuario" },
                    email: { type: "string", description: "Correo electrónico del usuario" },
                    phone: { type: "string", description: "Número de teléfono del usuario" },
                    company: { type: "string", description: "Nombre de la empresa del usuario" },
                    service: {
                        type: "string",
                        description: "Servicio en el que está interesado",
                        enum: ["Renovación de equipos", "Migración de SO", "Migración a la Nube", "Páginas Web", "Otro"]
                    },
                    message: { type: "string", description: "Mensaje adicional o detalles de la solicitud (opcional)" }
                },
                required: ["name", "email", "phone", "company", "service"]
            }
        }
    }
];

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        if (!message) {
            return NextResponse.json({ reply: "No he recibido ningún mensaje." }, { status: 400 });
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ reply: "Error de configuración: API Key no encontrada." }, { status: 500 });
        }

        // Prepare messages array with history if available, or just current message
        // Note: In a real prod app, you'd want to sanitize and limit history.
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...(history || []), // Previous messages should be passed from frontend if we want context
            { role: 'user', content: message }
        ];

        // First call to OpenAI
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messages,
                tools: TOOLS,
                tool_choice: "auto",
                max_tokens: 300,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenAI API Error:", errorText);
            return NextResponse.json({ reply: "Lo siento, tuve un problema técnico." }, { status: 500 });
        }

        const data = await response.json();
        const choice = data.choices[0];
        const responseMessage = choice.message;

        // Check if the model wants to call a tool
        if (responseMessage.tool_calls) {
            const toolCall = responseMessage.tool_calls[0];

            if (toolCall.function.name === 'submit_lead') {
                const args = JSON.parse(toolCall.function.arguments);

                // Execute the tool (Save to Firestore)
                let toolResult = "Error al guardar los datos.";
                try {
                    // Check for Firebase config
                    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
                        console.warn("Firebase config missing. Simulating save.");
                        toolResult = "Éxito: Datos guardados correctamente (Simulación).";
                    } else {
                        await addDoc(collection(db, 'leads'), {
                            ...args,
                            status: 'nuevo',
                            source: 'chatbot',
                            createdAt: serverTimestamp(),
                        });
                        toolResult = "Éxito: Los datos del cliente han sido guardados correctamente en la base de datos.";
                    }
                } catch (error) {
                    console.error("Error saving lead:", error);
                    toolResult = "Error: Hubo un problema técnico al intentar guardar los datos en la base de datos.";
                }

                // Call OpenAI again with the tool result
                const secondResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [
                            ...messages,
                            responseMessage, // The assistant's message with the tool call
                            {
                                role: "tool",
                                tool_call_id: toolCall.id,
                                name: toolCall.function.name,
                                content: toolResult
                            }
                        ],
                    }),
                });

                const secondData = await secondResponse.json();
                return NextResponse.json({ reply: secondData.choices[0].message.content });
            }
        }

        // If no tool call, just return the text response
        return NextResponse.json({ reply: responseMessage.content });

    } catch (error) {
        console.error("Error en el chatbot:", error);
        return NextResponse.json(
            { reply: "Ocurrió un error interno al procesar tu mensaje." },
            { status: 500 }
        );
    }
}
