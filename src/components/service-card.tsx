import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {ArrowRight} from 'lucide-react';
import type {Service} from '@/lib/types';

export default function ServiceCard({service}: {service: Service}) {
  const Icon = service.icon;

  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        {Icon && <Icon className="w-10 h-10 mb-4 text-accent" />}
        <CardTitle>{service.title}</CardTitle>
        <CardDescription className="pt-2 flex-grow">
          {service.shortDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/servicios/${service.slug}`}>
            Ver más
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
