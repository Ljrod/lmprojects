'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitLead, type FormState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

const leadSchema = z.object({
  name: z.string().min(2, { message: 'El nombre es requerido.' }),
  email: z.string().email({ message: 'Por favor, ingrese un email válido.' }),
  phone: z.string().min(8, { message: 'Por favor, ingrese un teléfono válido.' }),
  company: z
    .string()
    .min(2, { message: 'El nombre de la empresa es requerido.' }),
  service: z.string().min(1, { message: 'Por favor, seleccione un servicio.' }),
  message: z
    .string()
    .max(500, { message: 'El mensaje no puede superar los 500 caracteres.' })
    .optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

export default function LeadForm({
  services,
  defaultService,
}: {
  services: string[];
  defaultService?: string;
}) {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      service: defaultService || '',
      message: '',
    },
  });

  // Set default service when it changes (e.g., on navigation)
  useEffect(() => {
    if (defaultService) {
      form.setValue('service', defaultService);
    }
  }, [defaultService, form]);

  const onSubmit = async (values: LeadFormValues) => {
    setIsPending(true);

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const result: FormState = await submitLead(
      { message: '', success: false },
      formData
    );

    setIsPending(false);

    toast({
      title: result.success ? 'Éxito' : 'Error',
      description: result.message,
      variant: result.success ? 'default' : 'destructive',
    });

    if (result.success) {
      form.reset();
      // Also reset the service to the default if there is one
      if (defaultService) form.setValue('service', defaultService);
    }
  };

  return (
    <div id="lead-form" className="w-full max-w-2xl mx-auto bg-white ring-1 ring-slate-900/5 shadow-xl shadow-slate-200/40 rounded-2xl p-4 md:p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-slate-700">Nombre completo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Su nombre"
                      autoComplete="name"
                      className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-slate-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@ejemplo.com"
                      autoComplete="email"
                      className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-slate-700">Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+56 9 1234 5678"
                      autoComplete="tel"
                      className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-slate-700">Empresa</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre de su empresa"
                      autoComplete="organization"
                      className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-slate-700">Servicio de interés</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                      <SelectValue placeholder="Seleccione un servicio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {services.map(service => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-slate-700">Mensaje (Opcional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cuéntenos más sobre sus necesidades..."
                    className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-semibold shadow-lg shadow-accent/30 hover:-translate-y-0.5 transition-all"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isPending ? 'Enviando...' : 'Obtener Mi Diagnóstico Gratis'}
          </Button>
        </form>
      </Form>
      {/* TODO: In phase 2, add a "Or sign in with Google" option here, which would pre-fill some user data. */}
    </div>
  );
}
