import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/lib/types';

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <article className="group relative flex flex-col h-full bg-white border border-slate-200 shadow-sm md:border-none md:ring-1 md:ring-slate-900/5 md:shadow-none hover:ring-slate-400/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden rounded-2xl">
      {/* Subtle background pattern/gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader className="relative z-10 pb-0 pt-6 px-6 flex-none text-left">
        <div className="flex items-start justify-between mb-4">
          <div className="relative p-3 rounded-2xl bg-blue-50 border border-blue-500/20 shadow-lg shadow-blue-500/20 text-blue-600 group-hover:scale-110 transition-transform duration-500">
            {Icon && <Icon className="w-8 h-8" aria-hidden="true" />}
          </div>
          {/* Badge */}
          <div className="px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-semibold text-amber-700 uppercase tracking-wider">
            Alta Demanda
          </div>
        </div>
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors duration-300 text-left">
          {service.title}
        </h3>
      </CardHeader>
      <CardContent className="relative z-10 flex flex-col flex-grow px-6 pb-6 pt-2 gap-4 text-left">
        <CardDescription className="text-sm leading-relaxed text-slate-600 text-left">
          {service.shortDescription}
        </CardDescription>
        <div className="mt-auto pt-4 border-t border-slate-100">
          <Button
            asChild
            variant="ghost"
            className="w-full justify-between hover:bg-transparent p-0 h-auto font-bold text-slate-700 group-hover:text-blue-600 transition-colors duration-300"
          >
            <Link
              href={`/servicios/${service.slug}`}
              aria-label={`Ver más detalles sobre ${service.title}`}
            >
              Descubrir Cómo
              <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-2 group-hover:text-blue-500" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </article>
  );
}
