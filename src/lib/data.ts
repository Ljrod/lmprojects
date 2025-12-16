import { Replace, Layers, CloudUpload, Bot, Globe, Database } from 'lucide-react';
import type { Service } from './types';

const services: Service[] = [
  {
    id: '1',
    title: 'Renovación de equipos tecnológicos',
    slug: 'renovacion-de-equipos-tecnologicos',
    shortDescription:
      'Auditoría, plan de recambio, imagen corporativa y despliegue en terreno para sucursales y puntos de venta.',
    longDescription:
      'Ofrecemos un servicio completo para la renovación de su parque tecnológico en instituciones financieras y cadenas retail. Realizamos una auditoría exhaustiva de sus equipos actuales en sucursales y puntos de venta, elaboramos un plan de recambio estratégico, gestionamos la adquisición de nuevo hardware, preparamos una imagen corporativa para los sistemas operativos y nos encargamos de la instalación y configuración en terreno. Finalmente, gestionamos el retiro responsable y ecológico de los equipos antiguos cumpliendo normativas del sector.',
    icon: Replace,
  },
  {
    id: '2',
    title: 'Migración de sistemas operativos',
    slug: 'migracion-de-sistemas-operativos',
    shortDescription:
      'Actualización masiva (Windows 11/macOS/Linux), gestión de compatibilidad con sistemas core bancarios y POS.',
    longDescription:
      'Facilitamos la actualización y migración de sistemas operativos en toda su organización. Nuestro proceso incluye un inventario detallado de software y hardware, la creación de respaldos de seguridad, el despliegue automatizado y silencioso de la nueva versión (Windows, macOS o Linux), validación de compatibilidad con sistemas core bancarios y aplicaciones de punto de venta, un plan de pruebas de usuario y la entrega de documentación completa del proceso.',
    icon: Layers,
  },
  {
    id: '3',
    title: 'Migración de servidores a la nube',
    slug: 'migracion-de-servidores-a-la-nube',
    shortDescription:
      'Estrategia de traslado a Azure, AWS o GCP con cumplimiento regulatorio para el sector financiero.',
    longDescription:
      'Acompañamos a su empresa en el viaje a la nube con foco en cumplimiento regulatorio. Realizamos un assessment de su infraestructura local para determinar la mejor estrategia. Diseñamos una arquitectura cloud a medida en Azure, AWS o GCP, optimizada para costos, rendimiento y cumplimiento de normativas del sector financiero y retail. Ejecutamos la migración de servidores y datos, implementamos controles de seguridad y gobernanza para proteger sus activos críticos.',
    icon: CloudUpload,
  },
  {
    id: '4',
    title: 'Chatbots inteligentes para empresas',
    slug: 'chatbots-inteligentes-para-empresas',
    shortDescription:
      'Asistentes virtuales con IA para atención al cliente en banca digital y comercio electrónico 24/7.',
    longDescription:
      'Desarrollamos e integramos chatbots inteligentes potenciados por IA para el sector financiero y retail. Nuestros asistentes virtuales atienden consultas de clientes las 24 horas, automatizan procesos de atención bancaria, gestionan consultas de productos en e-commerce, capturan leads y escalan casos complejos a su equipo. Integramos el chatbot con su CRM, WhatsApp Business, banca en línea y su sitio web para una experiencia omnicanal.',
    icon: Bot,
  },
  {
    id: '5',
    title: 'Aplicaciones web empresariales',
    slug: 'aplicaciones-web-empresariales',
    shortDescription:
      'Desarrollo de portales de clientes, dashboards financieros y sistemas de gestión para retail.',
    longDescription:
      'Creamos aplicaciones web a medida para digitalizar y optimizar los procesos de instituciones financieras y empresas retail. Portales de banca en línea, dashboards de gestión financiera, sistemas de inventario para retail, plataformas e-commerce B2B. Desarrollamos soluciones robustas, escalables y seguras utilizando las mejores tecnologías del mercado. Incluye diseño UX/UI profesional, integración con sistemas core y soporte post-lanzamiento.',
    icon: Globe,
  },
  {
    id: '6',
    title: 'Control de inventario y CMDB',
    slug: 'control-de-inventario-cmdb',
    shortDescription:
      'Gestión centralizada de activos TI, trazabilidad completa y reportería para auditorías regulatorias.',
    longDescription:
      'Implementamos soluciones de CMDB (Configuration Management Database) para el control y gestión de todos sus activos tecnológicos. Ideal para instituciones financieras y cadenas retail que requieren trazabilidad completa de hardware y software en múltiples sucursales. Incluye inventario automatizado, gestión del ciclo de vida de activos, reportería para auditorías regulatorias, integración con mesa de ayuda y alertas de vencimiento de licencias y garantías.',
    icon: Database,
  },
];

export async function getServices(): Promise<Service[]> {
  // In a real app, you'd fetch this from Firestore
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(services);
    }, 100); // Simulate network delay
  });
}

export async function getServiceBySlug(
  slug: string
): Promise<Service | undefined> {
  // In a real app, you'd query Firestore for the service with this slug
  return new Promise(resolve => {
    setTimeout(() => {
      const service = services.find(s => s.slug === slug);
      resolve(service);
    }, 100);
  });
}

export async function getServiceTitles(): Promise<string[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(services.map(s => s.title));
    }, 100);
  });
}

// TODO: In a phase 2, implement functions to fetch data from Firestore.
// Example:
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from './firebase';
//
// export async function getServicesFromFirestore(): Promise<Service[]> {
//   const servicesCol = collection(db, 'services');
//   const serviceSnapshot = await getDocs(servicesCol);
//   const serviceList = serviceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Service[];
//   return serviceList;
// }
