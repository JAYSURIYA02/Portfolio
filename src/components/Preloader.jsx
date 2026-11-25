import { useEffect, useRef, useState } from 'react';
import { gsap, isReducedMotion } from '../utils/animations';
import { portfolioConfig } from '../config/portfolioConfig';

export default function Preloader({ onComplete }) {
  const overlayRef = useRef(null);
  const progressBarRef = useRef(null);
  const contentRef = useRef(null);
  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (isReducedMotion()) {
      setDone(true);
      onComplete?.();
      return;
    }

    let isMounted = true;
    const counter = { value: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (!isMounted) return;
          setDone(true);
          onComplete?.();
        },
      });

      // Fast, responsive load progression synced with fonts readiness
      tl.to(counter, {
        value: 82,
        duration: 0.45,
        ease: 'power2.out',
        onUpdate: () => {
          if (isMounted) setPercent(Math.round(counter.value));
        },
      });

      const finishLoad = async () => {
        try {
          if (document.fonts?.ready) {
            await Promise.race([
              document.fonts.ready,
              new Promise((r) => setTimeout(r, 450)),
            ]);
          }
        } catch {
          // Proceed cleanly if font API is unavailable
        }

        if (!isMounted) return;

        gsap.to(counter, {
          value: 100,
          duration: 0.3,
          ease: 'power2.out',
          onUpdate: () => {
            if (isMounted) setPercent(Math.round(counter.value));
          },
          onComplete: () => {
            if (!isMounted) return;
            gsap
              .timeline({
                onComplete: () => {
                  if (isMounted) {
                    setDone(true);
                    onComplete?.();
                  }
                },
              })
              .to(contentRef.current, {
                opacity: 0,
                y: -16,
                duration: 0.25,
                ease: 'power2.in',
              })
              .to(
                overlayRef.current,
                {
                  yPercent: -100,
                  duration: 0.65,
                  ease: 'power4.inOut',
                },
                '-=0.08'
              );
          },
        });
      };

      tl.add(() => {
        finishLoad();
      });
    }, overlayRef);

    return () => {
      isMounted = false;
      ctx.revert();
    };
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#080808] px-6 py-8 md:px-12 md:py-10"
    >
      <div className="flex items-center justify-between font-mono text-xs tracking-[0.22em] text-muted">
        <span>{portfolioConfig.personal.fullName} // SYSTEM INIT</span>
        <span>{portfolioConfig.personal.location.toUpperCase()}</span>
      </div>

      <div ref={contentRef} className="my-auto flex flex-col items-start gap-6">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-4xl font-extrabold tracking-tighter text-white sm:text-7xl">
            {portfolioConfig.personal.fullName}
          </span>
          <span className="h-3 w-3 shrink-0 rounded-full bg-lime" />
        </div>
        <div className="w-full max-w-md">
          <div className="mb-2 flex items-center justify-between font-mono text-xs tracking-widest text-muted">
            <span>LOADING MODULES</span>
            <span className="text-lime">{String(percent).padStart(3, '0')}%</span>
          </div>
          <div className="h-[2px] w-full overflow-hidden bg-white/10">
            <div
              ref={progressBarRef}
              className="h-full bg-lime transition-[width] duration-75"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-white/40">
        <span>AI / ML · COMPUTER VISION · FULL-STACK</span>
        <span>2026</span>
      </div>
    </div>
  );
}
