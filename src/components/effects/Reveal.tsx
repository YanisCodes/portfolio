import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/**
 * Soft reveal: opacity + translateY + blur, triggered when 8% in view.
 * Designed per Jakub's enter recipe — subtle, materializing.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  ...rest
}: Props) {
  return (
    <motion.div
      {...rest}
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        type: 'spring',
        duration: 0.6,
        bounce: 0,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
