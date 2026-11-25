import { useEffect, useRef } from 'react';
import { gsap } from '../utils/animations';
import { useMediaQuery, useReducedMotion } from '../hooks/useMediaQuery';

export default function MagneticButton({
  as = 'button',
  href,
  onClick,
  children,
  className = '',
  strength = 0.28,
  cursorLabel,
  ...props
}) {
  const ref = useRef(null);
  const isFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !isFinePointer || reducedMotion) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const relY = (e.clientY - (rect.top + rect.height / 2)) * strength;
      xTo(relX);
      yTo(relY);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [isFinePointer, reducedMotion, strength]);

  const Component = as;

  return (
    <Component
      ref={ref}
      href={href}
      onClick={onClick}
      data-cursor={cursorLabel}
      className={`group relative inline-flex items-center justify-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
