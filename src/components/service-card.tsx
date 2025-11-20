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
    <Card className="group flex flex-col h-full min-h-[380px] border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="relative z-10 pb-2">
        <div className="flex items-start justify-between">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            {Icon && <Icon className="w-6 h-6" />}
          </div>
        </div>
        <CardTitle className="mt-4 text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
          {service.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 flex flex-col flex-grow">
        <CardDescription className="text-base leading-relaxed flex-grow">
          {service.shortDescription}
        </CardDescription>
        <div className="mt-6 pt-4 border-t border-border/50">
          <Button
            asChild
            variant="ghost"
            className="w-full justify-between group/btn hover:bg-transparent hover:text-primary p-0 h-auto font-medium"
          >
            <Link href={`/servicios/${service.slug}`}>
              Ver detalles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
