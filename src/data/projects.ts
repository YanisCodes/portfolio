export type Project = {
  title: string;
  href: string;
  image: string;
  span: number; // md:col-span (7 / 5 / 5 / 7 alternating)
  aspect: string; // tailwind aspect class
};

export const WORKS: Project[] = [
  {
    title: 'AskUni',
    href: 'https://askuni-two.vercel.app',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80',
    span: 7,
    aspect: 'aspect-[16/10]',
  },
  {
    title: 'IT-Fix',
    href: 'https://it-fix.vercel.app',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    span: 5,
    aspect: 'aspect-[16/10]',
  },
  {
    title: 'Resumind',
    href: 'https://resum-ai-tau.vercel.app',
    image:
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80',
    span: 5,
    aspect: 'aspect-[16/10]',
  },
  {
    title: 'StudyGPT',
    href: 'https://github.com/YanisCodes/StudyGPT',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80',
    span: 7,
    aspect: 'aspect-[16/10]',
  },
];
