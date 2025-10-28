import type React from 'react';

export type Service = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  icon?: React.ComponentType<{className?: string}>;
};

export type Lead = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  status: 'nuevo' | 'contactado' | 'descartado';
  createdAt: Date;
};
