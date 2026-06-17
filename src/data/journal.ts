export type JournalEntry = {
  title: string;
  href: string;
  image: string;
  readTime: string;
  date: string;
};

export const JOURNAL: JournalEntry[] = [
  {
    title: 'Building AskUni — real-time video for studying together',
    href: 'https://github.com/YanisCodes/askuni',
    image:
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80',
    readTime: '6 min read',
    date: 'Apr 2026',
  },
  {
    title: 'Rebuilding my portfolio with Vite, React & Tailwind v4',
    href: '#',
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    readTime: '4 min read',
    date: 'Mar 2026',
  },
  {
    title: 'Two years of CS at ESTIN — what I actually learned',
    href: '#',
    image:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80',
    readTime: '5 min read',
    date: 'Feb 2026',
  },
  {
    title: 'Picking up Flutter as a web developer',
    href: 'https://github.com/YanisCodes/StudyGPT',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    readTime: '4 min read',
    date: 'Jan 2026',
  },
];
