export type Tool = {
  name: string;
  /** small caps tag (e.g. "frontend", "backend") */
  tag: string;
  /** HSL hue for the card gradient */
  hue: number;
};

export const TOOLKIT: Tool[] = [
  { name: 'React', tag: 'frontend', hue: 200 },
  { name: 'Next.js', tag: 'fullstack', hue: 0 },
  { name: 'TypeScript', tag: 'lang', hue: 215 },
  { name: 'Django REST', tag: 'backend', hue: 145 },
  { name: 'Flutter', tag: 'mobile', hue: 195 },
  { name: 'Supabase', tag: 'data', hue: 145 },
  { name: 'PostgreSQL', tag: 'data', hue: 220 },
  { name: 'Python', tag: 'lang', hue: 50 },
  { name: 'Tailwind', tag: 'styling', hue: 190 },
  { name: 'Vercel', tag: 'deploy', hue: 0 },
];
