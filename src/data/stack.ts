import type { ReactNode } from 'react';
import { LayoutGrid, Server, Wrench } from './icons';

export type StackItem = { name: string; level: number };
export type StackCategory = {
  title: string;
  icon: ReactNode;
  items: StackItem[];
};

export const STACK_CATEGORIES: StackCategory[] = [
  {
    title: 'Frontend',
    icon: LayoutGrid,
    items: [
      { name: 'React', level: 85 },
      { name: 'Next.js', level: 80 },
      { name: 'TypeScript', level: 75 },
      { name: 'JavaScript', level: 90 },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    items: [
      { name: 'Django REST', level: 80 },
      { name: 'Python', level: 85 },
      { name: 'Supabase', level: 75 },
      { name: 'PostgreSQL', level: 70 },
    ],
  },
  {
    title: 'Tools & Mobile',
    icon: Wrench,
    items: [
      { name: 'Flutter', level: 70 },
      { name: 'Git', level: 80 },
      { name: 'Vercel', level: 75 },
    ],
  },
];
