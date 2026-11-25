import { useEffect, useRef } from 'react';
import { gsap, splitElementText, isReducedMotion } from '../utils/animations';
import { portfolioConfig } from '../config/portfolioConfig';

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const frameRef = useRef(null);
  const paraRefs = useRef([]);

  useEffect(() => {
    if (isReducedMotion()) return;

    let splitHeading = null;
    const ctx = gsap.context(() => {
      splitHeading = splitElementText(headingRef.current, 'words,chars');

      if (splitHeading?.chars?.length) {
        gsap.fromTo(
          splitHeading.chars,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.025,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      gsap.fromTo(
        paraRefs.current.filter(Boolean),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.14,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        frameRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0.3 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: frameRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      splitHeading?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative border-b border-white/10 bg-[#080808] py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-5 font-mono text-xs tracking-[0.22em] text-muted">
          <span>02 // PROFILE OVERVIEW</span>
          <span className="text-lime">{portfolioConfig.personal.degree.toUpperCase()}</span>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Editorial Copy */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden">
              <h2
                ref={headingRef}
                className="font-display text-[clamp(2.5rem,6vw,5.2rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-white"
              >
                {portfolioConfig.about.heading}
              </h2>
            </div>

            <div className="mt-10 space-y-6">
              {portfolioConfig.about.paragraphs.map((text, idx) => (
                <p
                  key={idx}
                  ref={(el) => (paraRefs.current[idx] = el)}
                  className="max-w-2xl text-base leading-[1.8] text-white/80 sm:text-lg"
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Research Interests */}
            <div className="mt-10 border-t border-white/10 pt-8">
              <div className="mb-4 font-mono text-xs tracking-[0.22em] text-muted">
                RESEARCH &amp; ENGINEERING FOCUS
              </div>
              <div className="flex flex-wrap gap-2.5">
                {portfolioConfig.about.researchInterests.map((interest) => (
                  <span
                    key={interest}
                    className="border border-white/15 bg-[#111111] px-3.5 py-1.5 font-mono text-xs text-white/85 transition-colors hover:border-lime hover:text-lime"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Editorial Identity / Portrait Frame */}
          <div className="lg:col-span-5">
            <div
              ref={frameRef}
              className="relative overflow-hidden border border-white/15 bg-[#111111] p-6 sm:p-8"
            >
              {(portfolioConfig.personal.aboutImage || portfolioConfig.personal.profileImage) ? (
                <div className="group relative aspect-[4/5] w-full overflow-hidden border border-white/10 bg-[#0A0A0A]">
                  <img
                    src={portfolioConfig.personal.aboutImage || portfolioConfig.personal.profileImage}
                    alt={portfolioConfig.personal.fullName}
                    className="h-full w-full object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808]/85 via-transparent to-[#080808]/20" />
                  <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] tracking-[0.18em]">
                    <span className="text-white">{portfolioConfig.personal.fullName}</span>
                    <span className="border border-lime/40 bg-[#080808]/80 px-2 py-0.5 text-lime">
                      IIIT SRI CITY
                    </span>
                  </div>
                </div>
              ) : (
                <div className="tech-grid-bg relative flex aspect-[4/5] w-full flex-col justify-between border border-white/10 bg-[#0A0A0A] p-6">
                  <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-muted">
                    <span>ID // S2024</span>
                    <span className="text-lime">ACTIVE</span>
                  </div>

                  <div className="my-auto flex flex-col items-center justify-center text-center">
                    <div className="relative flex items-center justify-center border border-lime/40 px-7 py-6">
                      <div className="absolute inset-2 border border-white/15" />
                      <span className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                        {portfolioConfig.personal.fullName}
                      </span>
                    </div>
                    <p className="mt-5 font-mono text-xs tracking-[0.2em] text-lime">
                      {portfolioConfig.personal.location.toUpperCase()}
                    </p>
                    <p className="mt-1.5 font-mono text-[11px] text-muted">
                      {portfolioConfig.personal.institution}
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-white/10 pt-4 font-mono text-[11px] text-white/70">
                    <div className="flex justify-between">
                      <span className="text-muted">PROGRAM</span>
                      <span>B.TECH CSE (2024–2028)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">CLUBS</span>
                      <span>EPOCH AI/ML · NEXSYNC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">INTERNSHIP</span>
                      <span>INAMIGOS FOUNDATION</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
