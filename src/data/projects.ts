export type Project = {
  name: string;
  desc: string;
  stack: string[];
  github: string | null;
  live: string | null;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    name: 'AskUni',
    desc: 'Collaborative university platform — WebRTC video sessions, real-time Supabase collaboration, and focus monitoring via Google MediaPipe.',
    stack: ['React', 'Vite', 'Django REST', 'WebRTC', 'Supabase Realtime', 'MediaPipe'],
    github: 'https://github.com/YanisCodes/askuni',
    live: 'https://askuni-two.vercel.app',
    featured: true,
  },
  {
    name: 'IT-Fix',
    desc: 'IT support ticketing extranet with request management, real-time tracking, and continuous deployment via Vercel CI/CD.',
    stack: ['Next.js', 'Supabase', 'Vercel'],
    github: 'https://github.com/YanisCodes/it-fix',
    live: 'https://it-fix.vercel.app',
  },
  {
    name: 'StudyGPT',
    desc: 'Smart Flutter study timer app with fatigue detection and adaptive break recommendations.',
    stack: ['Dart', 'Flutter'],
    github: 'https://github.com/YanisCodes/StudyGPT',
    live: null,
  },
  {
    name: 'Resumind',
    desc: 'AI-powered CV generator — transforms a student profile into an optimized professional document in seconds.',
    stack: ['JavaScript', 'AI'],
    github: 'https://github.com/YanisCodes/Resumind',
    live: 'https://resum-ai-tau.vercel.app',
  },
];
