import { useEffect, useRef, useState } from 'react';
import { ChevronDown, GraduationCap } from 'lucide-react';
import { gsap, isReducedMotion } from '../utils/animations';
import { portfolioConfig } from '../config/portfolioConfig';

export default function Education() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [courseworkOpen, setCourseworkOpen] = useState(false);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRefs.current.filter(Boolean),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.14,
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
      id="education"
      ref={sectionRef}
      className="relative border-b border-white/10 bg-[#080808] py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <p className="mb-3 font-mono text-xs tracking-[0.22em] text-lime">
              06 // ACADEMIC FOUNDATION
            </p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-none tracking-[-0.03em] text-white">
              EDUCATION.
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs leading-relaxed tracking-wider text-muted">
            FORMAL COMPUTER SCIENCE DEGREE AND ACADEMIC CREDENTIALS.
          </p>
        </div>

        {/* Two-Column Editorial Ledger */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {portfolioConfig.education.entries.map((edu, idx) => (
            <article
              key={edu.index}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="group flex flex-col justify-between border border-white/15 bg-[#111111] p-7 transition-colors duration-300 hover:border-lime/50 sm:p-10"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs tracking-[0.2em] text-lime">
                      {edu.index} //
                    </span>
                    <span className="border border-white/15 bg-[#080808] px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-white/80">
                      {edu.level}
                    </span>
                  </div>
                  <span className="font-mono text-xs tracking-[0.15em] text-muted">
                    {edu.period}
                  </span>
                </div>

                <div className="mt-6 flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-lime/35 bg-[#080808] text-lime">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-lime sm:text-3xl">
                      {edu.degree}
                    </h3>
                    <p className="mt-2 font-mono text-xs tracking-[0.14em] text-white/70">
                      {edu.institution}
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-white/75 sm:text-base">
                  {edu.summary}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                {edu.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="border border-lime/40 bg-lime/10 px-4 py-1.5 font-mono text-xs font-semibold tracking-[0.15em] text-lime"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Expandable Relevant Coursework Strip */}
        <div className="mt-10 border border-white/15 bg-[#111111]">
          <button
            type="button"
            onClick={() => setCourseworkOpen((prev) => !prev)}
            aria-expanded={courseworkOpen}
            className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/[0.02] sm:px-8"
          >
            <div>
              <span className="font-mono text-[11px] tracking-[0.2em] text-lime">
                CURRICULUM // B.TECH CSE
              </span>
              <div className="mt-1 font-display text-lg font-bold text-white sm:text-xl">
                RELEVANT COURSEWORK ({portfolioConfig.education.coursework.length})
              </div>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-lime transition-transform duration-300 ${
                courseworkOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {courseworkOpen && (
            <div className="border-t border-white/10 px-6 py-6 sm:px-8">
              <div className="flex flex-wrap gap-2.5">
                {portfolioConfig.education.coursework.map((course) => (
                  <span
                    key={course}
                    className="border border-white/15 bg-[#080808] px-3.5 py-1.5 font-mono text-xs text-white/85"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
