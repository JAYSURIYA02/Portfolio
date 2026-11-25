import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, isReducedMotion } from '../utils/animations';
import { portfolioConfig } from '../config/portfolioConfig';

export default function Experience() {
  const sectionRef = useRef(null);
  const spineRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (spineRef.current) {
        gsap.fromTo(
          spineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: true,
            },
          }
        );
      }

      gsap.fromTo(
        itemRefs.current.filter(Boolean),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative border-b border-white/10 bg-[#111111] py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <p className="mb-3 font-mono text-xs tracking-[0.22em] text-lime">
              05 // WORK &amp; LEADERSHIP
            </p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-none tracking-[-0.03em] text-white">
              EXPERIENCE.
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs leading-relaxed tracking-wider text-muted">
            DATA ANALYTICS INTERNSHIP AND TECHNICAL CLUB LEADERSHIP.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-7 sm:pl-12">
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-2 top-2 w-[1px] bg-white/15 sm:left-3"
          />
          <div
            ref={spineRef}
            aria-hidden="true"
            className="absolute bottom-2 left-2 top-2 w-[2px] origin-top bg-lime sm:left-3"
          />

          <div className="space-y-8">
            {portfolioConfig.experience.map((item, idx) => (
              <article
                key={item.title}
                ref={(el) => (itemRefs.current[idx] = el)}
                className="group relative border border-white/12 bg-[#080808] p-6 transition-colors duration-300 hover:border-lime/45 sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[25px] top-8 h-3 w-3 border-2 border-[#080808] bg-lime sm:-left-[41px]"
                />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="border border-lime/35 bg-lime/10 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.18em] text-lime">
                      {item.roleType}
                    </span>
                    <span className="font-mono text-xs tracking-[0.15em] text-muted">
                      {item.period.toUpperCase()}
                    </span>
                  </div>

                  {item.highlight && (
                    <span className="border border-white/15 px-3 py-1 font-mono text-[11px] text-white/80">
                      {item.highlight}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-lime sm:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-1 font-mono text-xs tracking-[0.14em] text-white/65">
                  {item.organization}
                </p>

                {item.summary && (
                  <p className="mt-3 text-sm italic text-white/65">{item.summary}</p>
                )}

                <ul className="mt-4 space-y-2.5">
                  {item.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-3 text-sm leading-relaxed text-white/80 sm:text-base"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-lime" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {item.links?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-4">
                    {item.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-white/15 bg-[#111111] px-3.5 py-1.5 font-mono text-[11px] tracking-[0.14em] text-lime transition-colors hover:border-lime hover:bg-lime hover:text-[#080808]"
                      >
                        <span>{link.label.replace(' ↗', '')}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
