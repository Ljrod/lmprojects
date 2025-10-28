# LM Projects - Web App

Esta es una aplicación web para "LM Projects", una empresa de gestión de proyectos tecnológicos. Creada con Next.js, Tailwind CSS y Firebase.

## Stack Tecnológico

- **Framework:** [Next.js 14](https://nextjs.org/) (con App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/)
- **Backend Services:** [Firebase](https://firebase.google.com/) (App Hosting y Firestore)
- **Validación de Formularios:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

## Estructura del Proyecto

- `src/app/`: Rutas principales de la aplicación (Home, Servicios, etc.).
- `src/components/`: Componentes reutilizables de React.
- `src/lib/`: Lógica compartida, configuración de Firebase y tipos de datos.
- `src/app/actions.ts`: Server Actions para interactuar con el backend (ej. envío de formularios).
- `src/lib/data.ts`: Simula la obtención de datos de servicios. Para un uso real, debe conectarse a Firestore.

## Primeros Pasos

Siga estos pasos para configurar y ejecutar el proyecto en su entorno local.

### 1. Prerrequisitos

- Node.js (v18 o superior)
- npm, pnpm o yarn

### 2. Instalación

Clone el repositorio e instale las dependencias:

```bash
npm install
```

### 3. Configuración de Firebase

Para que la aplicación se conecte a Firebase (específicamente para guardar los leads del formulario de contacto), necesitará crear un proyecto en la [Consola de Firebase](https://console.firebase.google.com/).

Una vez creado el proyecto:

1.  Vaya a la configuración de su proyecto (`Project Settings`).
2.  En la pestaña "General", desplácese hacia abajo hasta "Your apps".
3.  Cree una nueva aplicación web (`</>`).
4.  Copie el objeto `firebaseConfig` que se le proporciona.
5.  Cree un archivo `.env.local` en la raíz de su proyecto.
6.  Añada las variables de entorno de Firebase a su archivo `.env.local` con el prefijo `NEXT_PUBLIC_`:

```.env.local
NEXT_PUBLIC_FIREBASE_API_KEY="AIza..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
NEXT_PUBLIC_FIREBASE_APP_ID="1:..."
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-..."
```

7. En la consola de Firebase, vaya a **Firestore Database** y cree una base de datos en modo de producción. Necesitará una colección llamada `leads` para que el formulario de contacto funcione. Se recomienda crear reglas de seguridad para Firestore.

### 4. Ejecutar el Servidor de Desarrollo

Con las dependencias instaladas y las variables de entorno configuradas, puede iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abra [http://localhost:9002](http://localhost:9002) en su navegador para ver la aplicación.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run start`: Inicia el servidor de producción después de un `build`.
- `npm run lint`: Ejecuta el linter de Next.js.

## Despliegue

Este proyecto está configurado para ser desplegado en **Firebase App Hosting**.
Para más información, consulte la [documentación oficial](https://firebase.google.com/docs/app-hosting).
