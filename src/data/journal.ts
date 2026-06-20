export type CurrentlyItem = {
  title: string;
  href: string;
  /** Short verb label shown on the round chip — e.g. "Building", "Learning". */
  verb: string;
  meta: string; // small right-side info, e.g. "year 2 · ESTIN"
};

export const CURRENTLY: CurrentlyItem[] = [
  {
    verb: 'Building',
    title: 'AskUni — collaborative study with WebRTC + focus tracking',
    href: 'https://askuni-two.vercel.app',
    meta: 'Live · 2026',
  },
  {
    verb: 'Studying',
    title: 'Computer Science — Algorithms, OS, Databases',
    href: 'https://www.estin.dz/',
    meta: 'Year 2 · ESTIN Béjaïa',
  },
  {
    verb: 'Learning',
    title: 'Flutter — pushing StudyGPT past the first beta',
    href: 'https://github.com/YanisCodes/StudyGPT',
    meta: 'In progress',
  },
  {
    verb: 'Shipping',
    title: 'Small tools & side experiments',
    href: 'https://github.com/YanisCodes',
    meta: 'GitHub',
  },
];
