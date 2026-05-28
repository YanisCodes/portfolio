import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';

type Variant = 'primary' | 'ghost';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  children: ReactNode;
};

const BASE =
  'inline-flex items-center gap-2 px-[26px] py-[13px] rounded-lg font-semibold text-[14.5px] font-sans active:scale-[0.96] [transition:transform_200ms_var(--ease-snap)]';

const PRIMARY =
  'text-[#161814] shadow-[0_2px_20px_rgba(155,161,124,0.22)] hover:shadow-[0_4px_36px_rgba(155,161,124,0.38)] hover:-translate-y-[2px] hover:[background-position:100%_50%] [transition:transform_200ms_var(--ease-snap),box-shadow_280ms_var(--ease-snap),background-position_400ms_var(--ease-snap)]';

const PRIMARY_BG = {
  background:
    'linear-gradient(135deg, var(--color-accent-1) 0%, var(--color-accent-2) 50%, var(--color-accent-3) 100%)',
  backgroundSize: '200% 200%',
};

const GHOST =
  'bg-transparent text-[var(--color-t1)] border border-[var(--color-border-hi)] hover:border-[var(--color-border-acc)] hover:bg-[var(--color-accent-dim)] hover:-translate-y-[2px] [transition:border-color_220ms_var(--ease-snap),background_220ms_var(--ease-snap),transform_200ms_var(--ease-snap),color_220ms_var(--ease-snap)]';

export default function MagneticButton({ variant = 'primary', children, className, ...rest }: Props) {
  const ref = useMagnetic<HTMLAnchorElement>(10);
  const variantClass = variant === 'primary' ? PRIMARY : GHOST;
  const style = variant === 'primary' ? PRIMARY_BG : undefined;

  return (
    <a ref={ref} {...rest} className={`${BASE} ${variantClass} ${className ?? ''}`} style={style}>
      {children}
    </a>
  );
}
