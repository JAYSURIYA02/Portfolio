import { useEffect, useRef, useState } from 'react';
import { gsap } from '../utils/animations';
import { useMediaQuery, useReducedMotion } from '../hooks/useMediaQuery';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorLabel, setCursorLabel] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const isFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reducedMotion = useReducedMotion();
  const enabled = isFinePointer && !reducedMotion;

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    document.body.classList.add('custom-cursor-active');
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.28, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.28, ease: 'power3.out' });

    const onMove = (e) => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onOver = (e) => {
      const target = e.target.closest('[data-cursor], a, button, [role="button"]');
      if (target) {
        setIsHovered(true);
        const label = target.getAttribute('data-cursor') || '';
        setCursorLabel(label);
      } else {
        setIsHovered(false);
        setCursorLabel('');
      }
    };

    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime opacity-0 transition-opacity duration-200"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[89] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-[width,height,background-color,border-color,opacity] duration-200 opacity-0 ${
          cursorLabel
            ? 'h-16 w-16 border-lime bg-lime text-[#080808]'
            : isHovered
            ? 'h-12 w-12 border-lime/80 bg-lime/10'
            : 'h-9 w-9 border-white/35 bg-transparent'
        }`}
      >
        {cursorLabel && (
          <span className="font-mono text-[10px] font-bold tracking-widest">
            {cursorLabel}
          </span>
        )}
      </div>
    </>
  );
}
