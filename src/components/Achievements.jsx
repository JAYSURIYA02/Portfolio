import { useEffect, useRef } from 'react';
import { Award } from 'lucide-react';
import { gsap, isReducedMotion } from '../utils/animations';
import { portfolioConfig } from '../config/portfolioConfig';

export default function Achievements() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRefs.current.filter(Boolean),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative border-b border-white/10 bg-[#111111] py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <p className="mb-3 font-mono text-xs tracking-[0.22em] text-lime">
              07 // COMPETITIONS &amp; RECOGNITION
            </p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-none tracking-[-0.03em] text-white">
              ACHIEVEMENTS.
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs leading-relaxed tracking-wider text-muted">
            HACKATHON HONORS AND COMPETITIVE MACHINE LEARNING LEADERBOARD RESULTS.
          </p>
        </div>

        {/* 3-Column Editorial Achievement Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {portfolioConfig.achievements.map((item, idx) => (
            <article
              key={item.index}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="group flex flex-col justify-between border border-white/15 bg-[#080808] p-7 transition-colors duration-300 hover:border-lime/55 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-display text-3xl font-extrabold text-white/20 transition-colors group-hover:text-lime">
                    {item.index}
                  </span>
                  <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-muted">
                    <span>{item.scope}</span>
                    <span className="text-white/25">·</span>
                    <span>{item.year}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <Award className="h-5 w-5 shrink-0 text-lime" />
                  <span className="border border-lime/35 bg-lime/10 px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.14em] text-lime">
                    {item.badge}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-2xl font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-lime">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] tracking-[0.18em] text-white/50">
                <span>VERIFIED RECORD</span>
                <span className="h-2 w-2 bg-lime" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
