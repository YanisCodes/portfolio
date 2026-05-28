import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? (scrollY / max) * 100 : 0;
      setPct(p);
    };
    update();
    addEventListener('scroll', update, { passive: true });
    return () => removeEventListener('scroll', update);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed left-0 top-0 z-[1000] h-[3px]"
      style={{
        width: `${pct}%`,
        background:
          'linear-gradient(90deg, var(--color-accent-1), var(--color-accent-2), var(--color-accent-3), var(--color-accent-4))',
        transition: 'width 60ms linear',
      }}
    />
  );
}
