'use server';

import {z} from 'zod';
import {db} from '@/lib/firebase';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';

const leadSchema = z.object({
  name: z.string().min(2, {message: 'El nombre es requerido.'}),
  email: z.string().email({message: 'Por favor, ingrese un email válido.'}),
  phone: z.string().min(8, {message: 'Por favor, ingrese un teléfono válido.'}),
  company: z
    .string()
    .min(2, {message: 'El nombre de la empresa es requerido.'}),
  service: z.string().min(1, {message: 'Por favor, seleccione un servicio.'}),
  message: z
    .string()
    .max(500, {message: 'El mensaje no puede superar los 500 caracteres.'})
    .optional(),
});

export type FormState = {
  message: string;
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    company?: string[];
    service?: string[];
    message?: string[];
  };
};

export async function submitLead(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = leadSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    company: formData.get('company'),
    service: formData.get('service'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Falló la validación. Por favor revise los campos.',
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // TODO: In phase 2, associate lead with logged-in user if available.
    // This can be done by getting the user from Firebase Auth server-side.

    // Check for Firebase config before proceeding
    if (
      !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
      !process.env.NEXT_PUBLIC_FIREBASE_API_KEY
    ) {
      console.warn(
        'Firebase config is missing, skipping Firestore write. Simulating success.'
      );
      // Simulate a successful submission for UI development without Firebase connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        message: 'Diagnóstico solicitado con éxito. Nos pondremos en contacto pronto.',
        success: true,
      };
    }

    await addDoc(collection(db, 'leads'), {
      ...validatedFields.data,
      status: 'nuevo',
      createdAt: serverTimestamp(),
    });

    return {
      message: 'Diagnóstico solicitado con éxito. Nos pondremos en contacto pronto.',
      success: true,
    };
  } catch (error) {
    console.error('Error adding document to Firestore:', error);
    return {
      message: 'Ocurrió un error al enviar su solicitud. Por favor, intente de nuevo.',
      success: false,
    };
  }
}
