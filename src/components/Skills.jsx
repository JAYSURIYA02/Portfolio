import { useEffect, useRef, useState } from 'react';
import { gsap, isReducedMotion } from '../utils/animations';
import { portfolioConfig } from '../config/portfolioConfig';

export default function Skills() {
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);
  const [activeCategory, setActiveCategory] = useState(
    portfolioConfig.skills.categories[0].index
  );

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowRefs.current.filter(Boolean),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.75,
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

  const tickerItems = portfolioConfig.skills.tickerItems;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/10 bg-[#111111] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <p className="mb-3 font-mono text-xs tracking-[0.22em] text-lime">
              03 // TECHNICAL CAPABILITIES
            </p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-none tracking-[-0.03em] text-white">
              STACK &amp; DOMAINS.
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs leading-relaxed tracking-wider text-muted">
            VERIFIED TECHNICAL EXPERTISE ACROSS DATA ANALYTICS, COMPUTER VISION, DEEP LEARNING, AND FULL-STACK ENGINEERING.
          </p>
        </div>
      </div>

      {/* Dual-Track Interactive Technology Ticker */}
      <div className="ticker-wrapper mb-16 border-y border-white/10 bg-[#080808] py-5">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={`t1-${idx}`} className="flex items-center">
              <span className="px-6 font-display text-2xl font-bold tracking-tight text-white/85 transition-colors hover:text-lime sm:text-3xl">
                {item}
              </span>
              <span className="h-2 w-2 rounded-full bg-lime/70" />
            </div>
          ))}
        </div>
        <div className="ticker-track-reverse mt-3">
          {[...tickerItems.slice().reverse(), ...tickerItems.slice().reverse()].map(
            (item, idx) => (
              <div key={`t2-${idx}`} className="flex items-center">
                <span className="px-6 font-mono text-xs tracking-[0.28em] text-muted transition-colors hover:text-white">
                  {item}
                </span>
                <span className="text-white/25">/</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Interactive Architectural Category Matrix */}
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="divide-y divide-white/10 border-y border-white/10">
          {portfolioConfig.skills.categories.map((cat, idx) => {
            const isActive = activeCategory === cat.index;
            return (
              <div
                key={cat.index}
                ref={(el) => (rowRefs.current[idx] = el)}
                onMouseEnter={() => setActiveCategory(cat.index)}
                onClick={() => setActiveCategory(cat.index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveCategory(cat.index);
                  }
                }}
                className={`group grid cursor-pointer grid-cols-1 gap-6 py-7 transition-colors duration-300 lg:grid-cols-12 lg:items-center lg:py-9 ${
                  isActive ? 'bg-white/[0.02]' : 'hover:bg-white/[0.015]'
                }`}
              >
                <div className="flex items-baseline gap-5 lg:col-span-4">
                  <span
                    className={`font-mono text-xs tracking-[0.2em] transition-colors ${
                      isActive ? 'text-lime' : 'text-muted'
                    }`}
                  >
                    {cat.index}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-lime sm:text-2xl">
                      {cat.title}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] tracking-[0.16em] text-muted">
                      {cat.accent.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 lg:col-span-8">
                  {cat.items.map((skill) => (
                    <span
                      key={skill}
                      className={`border px-3.5 py-1.5 font-mono text-xs transition-all duration-200 ${
                        isActive
                          ? 'border-lime/35 bg-[#080808] text-white'
                          : 'border-white/12 bg-[#0A0A0A] text-white/75 group-hover:border-white/25'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
