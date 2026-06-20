export type Project = {
  title: string;
  tagline: string;
  stack: string[];
  href: string;
  liveLabel: string; // small caps label e.g. "Vercel · Live"
  span: number; // md:col-span (7 / 5 / 5 / 7 alternating)
  aspect: string;
  /** Subtle radial gradient hue for the card background (HSL angle) */
  hue: number;
};

export const WORKS: Project[] = [
  {
    title: 'AskUni',
    tagline: 'Study together in real time.',
    stack: ['React', 'Django REST', 'WebRTC', 'Supabase', 'MediaPipe'],
    href: 'https://askuni-two.vercel.app',
    liveLabel: 'Live · Vercel',
    span: 7,
    aspect: 'aspect-[16/10]',
    hue: 200,
  },
  {
    title: 'IT-Fix',
    tagline: 'Tickets, tracked clean.',
    stack: ['Next.js', 'Supabase', 'Vercel'],
    href: 'https://it-fix.vercel.app',
    liveLabel: 'Live · Vercel',
    span: 5,
    aspect: 'aspect-[16/10]',
    hue: 30,
  },
  {
    title: 'Resumind',
    tagline: 'AI résumés for students.',
    stack: ['JavaScript', 'AI'],
    href: 'https://resum-ai-tau.vercel.app',
    liveLabel: 'Live · Vercel',
    span: 5,
    aspect: 'aspect-[16/10]',
    hue: 145,
  },
  {
    title: 'StudyGPT',
    tagline: 'Focus timer that knows when you crash.',
    stack: ['Flutter', 'Dart'],
    href: 'https://github.com/YanisCodes/StudyGPT',
    liveLabel: 'Source · GitHub',
    span: 7,
    aspect: 'aspect-[16/10]',
    hue: 280,
  },
];
