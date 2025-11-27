<?php
header('Content-Type: application/json');

// ====== MODO DIAGNÓSTICO ======
// Si entras a chatbot.php?test=1 mostramos info de depuración
if (isset($_GET['test'])) {
    $debug = [];

    $debug['dir_actual'] = __DIR__;

    $envPath = __DIR__ . '/.env';
    $debug['env_existe'] = file_exists($envPath) ? 'sí' : 'no';

    if (file_exists($envPath)) {
        $env = parse_ini_file($envPath, false, INI_SCANNER_RAW);
        $debug['env_contenido_claves'] = array_keys($env ?? []);
        $apiKey = $env['OPENAI_API_KEY'] ?? null;
        if ($apiKey) {
            // No mostramos la clave completa, solo primeros 5 caracteres
            $debug['apiKey_detectada'] = 'sí (empieza con: ' . substr($apiKey, 0, 5) . '...)';
        } else {
            $debug['apiKey_detectada'] = 'no';
        }
    } else {
        $debug['env_contenido_claves'] = [];
        $debug['apiKey_detectada'] = 'no';
    }

    echo json_encode($debug, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// ====== 1. Cargar la API Key desde .env ======
$apiKey = null;
$envPath = __DIR__ . '/.env';

if (file_exists($envPath)) {
    $env = parse_ini_file($envPath, false, INI_SCANNER_RAW);
    if ($env !== false && isset($env['OPENAI_API_KEY'])) {
        $apiKey = trim($env['OPENAI_API_KEY']);
    }
}

// Como respaldo, intentar leer desde variables de entorno del sistema
if (!$apiKey) {
    $apiKey = getenv('OPENAI_API_KEY') ?: null;
}

// ====== 2. Obtener el mensaje del usuario ======
$userMessage = $_POST['message'] ?? '';

// Intentar leer JSON si no viene por POST normal
if (empty($userMessage)) {
    $rawInput = file_get_contents('php://input');
    if (!empty($rawInput)) {
        $jsonInput = json_decode($rawInput, true);
        if (json_last_error() === JSON_ERROR_NONE && isset($jsonInput['message'])) {
            $userMessage = $jsonInput['message'];
        }
    }
}

$reply = '';

if (empty($userMessage)) {
    $reply = "No he recibido ningún mensaje.";
} elseif (empty($apiKey)) {
    http_response_code(500);
    $reply = "Error de configuración: La clave OPENAI_API_KEY no está definida en el archivo .env ni en las variables de entorno.";
} else {
    // ====== 3. Preparar la solicitud a la API de OpenAI ======
    // Importante: aquí limitamos el comportamiento del bot
    $systemPrompt = '
Eres Proyectito un  BOT  creado para asistir clientes.
Tu función es exclusivamente responder dudas sobre LM Projects y sus servicios, usando solo la siguiente información de contexto:

1) Quiénes somos:
- LM Projects es una empresa orientada a la gestión y ejecución de proyectos tecnológicos.
- Actúa como socio estratégico de TI acompañando todo el ciclo del proyecto: diagnóstico, definición de solución, planificación, ejecución, pruebas, documentación y soporte acotado de estabilización.

2) Alcance transversal (metodología general aplicada a todos los servicios):
- Auditoría y planificación: levantamiento del estado actual (inventario de equipos, servidores, servicios, usuarios clave, riesgos) y definición de un plan de trabajo con hitos.
- Diseño de la solución: definición de la arquitectura objetivo (on-premise, nube o híbrida), estándares técnicos, imagen corporativa, políticas y criterios de seguridad.
- Ejecución: implementación técnica coordinada con las áreas internas del cliente y, cuando aplica, con otros proveedores.
- Pruebas y validación: validación funcional con usuarios clave y revisión de impactos.
- Cierre y soporte: documentación básica, traspaso de información y ventana de soporte acotada para estabilizar la solución.

3) Líneas de servicio principales:

a) Renovación de equipos tecnológicos:
- Inventario y diagnóstico del parque de equipos.
- Plan de recambio por etapas (por área, criticidad o ubicación).
- Soporte a la adquisición: recomendaciones de especificaciones para nuevos equipos según las necesidades del cliente.
- Preparación de imagen corporativa (SO, aplicaciones base, políticas).
- Despliegue en terreno: instalación de equipos nuevos, migración básica de datos y validación mínima con el usuario.
- Retiro ordenado de equipos antiguos según las políticas del cliente.
- Fuera de alcance por defecto: reparación masiva de equipos obsoletos, soporte remoto general a usuarios fuera del proyecto, cambios no planificados en medio del despliegue.

b) Migración de sistemas operativos:
- Inventario de equipos y versiones actuales.
- Análisis de compatibilidad de hardware y software.
- Definición de estrategia de migración (por etapas, pilotos, ventanas de cambio).
- Respaldo básico de información de usuario antes de migrar.
- Despliegue del nuevo sistema operativo con imagen corporativa.
- Pruebas con usuarios clave y soporte acotado post-migración para estabilizar.
- Fuera de alcance por defecto: soporte técnico permanente, administración continua del parque de equipos fuera del proyecto.

c) Migración de servidores a la nube:
- Levantamiento de servidores actuales, aplicaciones y dependencias.
- Definición de arquitectura objetivo en nube (por ejemplo Azure, AWS o GCP) y tipo de servicio (IaaS, PaaS, etc.) según el caso.
- Plan de migración (pruebas, entornos, ventanas de corte y estrategia de rollback).
- Ejecución de la migración de servidores y datos.
- Validación funcional con las áreas usuarias.
- Soporte acotado post-migración para estabilizar y ajustar parámetros básicos.
- Fuera de alcance por defecto: operación 24x7 de la nube, monitoreo permanente y administración avanzada de seguridad más allá del proyecto acordado.

d) Creación de páginas web corporativas:
- Levantamiento de la información clave de la empresa (quiénes somos, servicios, contacto).
- Diseño de un sitio web limpio, simple y corporativo, orientado a explicar servicios y facilitar el contacto.
- Implementación de una página web básica (sin funcionalidades avanzadas de e-commerce ni integraciones complejas).
- Ajustes visuales básicos y puesta en marcha inicial.
- Fuera de alcance por defecto: desarrollo de plataformas a medida complejas, tiendas online avanzadas, integraciones profundas con sistemas internos.

4) Límites de tus respuestas:
- Solo puedes responder sobre LM Projects, sus servicios, alcances, beneficios, etapas de trabajo y temas relacionados directamente con proyectos tecnológicos que LM Projects podría ejecutar.
- Si el usuario te pregunta por programación, temas personales, noticias, videojuegos, consejos generales o cualquier cosa que no esté relacionada con LM Projects, responde de forma amable que eres Mamaguebot LM Projects y que solo puedes ayudar con información sobre la empresa y sus servicios.
- Si el usuario pide precios, tarifas, costos, cuánto cobran, cuánto sale, cotizaciones o descuentos, NO inventes números ni valores. 
  Debes responder siempre algo en esta línea: 
  "Para información detallada de precios, tarifas o una cotización formal, te invitamos a contactarnos directamente. Podemos revisar tu caso y preparar una propuesta acorde a tu proyecto."
- Mantén las respuestas claras, en español, con tono profesional pero cercano. No respondas en otro idioma salvo que el usuario lo pida explícitamente.
- Si no estás seguro de algo porque no está en el alcance anterior, explícalo y sugiere contactar a LM Projects para más detalles.

5)Miguel Llamedo y Leduard Rodriguez son los fundadores de LM Projects.


Responde ahora al usuario siguiendo estrictamente estas reglas.
';

    $data = [
        'model' => 'gpt-3.5-turbo',
        'messages' => [
            [
                'role' => 'system',
                'content' => $systemPrompt
            ],
            [
                'role' => 'user',
                'content' => $userMessage
            ]
        ],
        'max_tokens' => 180,
        'temperature' => 0.5,
    ];

    $ch = curl_init('https://api.openai.com/v1/chat/completions');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);

    $response = curl_exec($ch);
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false) {
        $reply = "Error al conectar con la API de OpenAI: " . $error;
    } elseif ($httpcode !== 200) {
        $reply = "Error de la API de OpenAI (Código " . $httpcode . "): " . $response;
    } else {
        $responseData = json_decode($response, true);
        if (isset($responseData['choices'][0]['message']['content'])) {
            $reply = $responseData['choices'][0]['message']['content'];
        } else {
            $reply = "No pude obtener una respuesta válida de la IA. Respuesta cruda: " . $response;
        }
    }
}

echo json_encode(['reply' => $reply]);
?>
