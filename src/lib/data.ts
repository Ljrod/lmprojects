import { Replace, Layers, CloudUpload } from 'lucide-react';
import type { Service } from './types';

const services: Service[] = [
  {
    id: '1',
    title: 'Renovación de equipos tecnológicos',
    slug: 'renovacion-de-equipos-tecnologicos',
    shortDescription:
      'Auditoría, plan de recambio, imagen corporativa y despliegue en terreno.',
    longDescription:
      'Ofrecemos un servicio completo para la renovación de su parque tecnológico. Realizamos una auditoría exhaustiva de sus equipos actuales, elaboramos un plan de recambio estratégico, gestionamos la adquisición de nuevo hardware, preparamos una imagen corporativa para los sistemas operativos y nos encargamos de la instalación y configuración en las dependencias del cliente. Finalmente, gestionamos el retiro responsable y ecológico de los equipos antiguos.',
    icon: Replace,
  },
  {
    id: '2',
    title: 'Migración de sistemas operativos',
    slug: 'migracion-de-sistemas-operativos',
    shortDescription:
      'Actualización masiva (Windows 11/macOS/Linux), gestión de compatibilidad y despliegue automatizado.',
    longDescription:
      'Facilitamos la actualización y migración de sistemas operativos en toda su organización. Nuestro proceso incluye un inventario detallado de software y hardware, la creación de respaldos de seguridad, el despliegue automatizado y silencioso de la nueva versión (Windows, macOS o Linux), un plan de pruebas de usuario y la entrega de documentación completa del proceso para futuras referencias.',
    icon: Layers,
  },
  {
    id: '3',
    title: 'Migración de servidores a la nube',
    slug: 'migracion-de-servidores-a-la-nube',
    shortDescription:
      'Estrategia de traslado a Azure, AWS o GCP, incluyendo arquitectura segura y estabilización.',
    longDescription:
      'Acompañamos a su empresa en el viaje a la nube. Realizamos un assessment de su infraestructura local para determinar la mejor estrategia. Diseñamos una arquitectura cloud a medida en Azure, AWS o GCP, optimizada para costos y rendimiento. Ejecutamos la migración de servidores y datos, y realizamos validaciones exhaustivas para asegurar la continuidad operativa. Implementamos una base de seguridad y gobernanza para proteger sus activos en la nube.',
    icon: CloudUpload,
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
