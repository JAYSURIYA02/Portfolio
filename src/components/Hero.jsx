import { lazy, Suspense, useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { gsap, splitElementText, isReducedMotion } from '../utils/animations';
import { portfolioConfig } from '../config/portfolioConfig';
import { useLenis } from '../hooks/useLenis';
import MagneticButton from './MagneticButton';
import { GitHubIcon, LinkedInIcon, LeetCodeIcon } from './SocialIcons';

const HeroSculpture = lazy(() => import('./three/HeroSculpture'));

export default function Hero({ preloaderDone }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const roleRef = useRef(null);
  const statementRef = useRef(null);
  const ctaRef = useRef(null);
  const visualWrapRef = useRef(null);
  const scrollCueRef = useRef(null);
  const { scrollTo } = useLenis();

  useEffect(() => {
    if (!preloaderDone) return;
    if (isReducedMotion()) return;

    let splitHeading = null;
    const ctx = gsap.context(() => {
      splitHeading = splitElementText(headingRef.current, 'chars,words');

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      if (splitHeading?.chars?.length) {
        tl.fromTo(
          splitHeading.chars,
          { yPercent: 115, opacity: 0, rotateX: -25 },
          { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.95, stagger: 0.03 }
        );
      }

      tl.fromTo(
        roleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65 },
        '-=0.55'
      )
        .fromTo(
          statementRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.45'
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          '-=0.45'
        )
        .fromTo(
          visualWrapRef.current,
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.0, ease: 'power3.out' },
          '-=0.85'
        )
        .fromTo(
          scrollCueRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.45'
        );

      // Subtle parallax on scroll for 3D visual container
      gsap.to(visualWrapRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => {
      splitHeading?.revert();
      ctx.revert();
    };
  }, [preloaderDone]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden border-b border-white/10 pt-[72px]"
    >
      {/* Subtle blueprint grid and lime glow */}
      <div className="tech-grid-bg pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[12%] h-[520px] w-[520px] rounded-full bg-lime/10 blur-[140px]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 py-12 md:px-12 lg:grid-cols-12 lg:gap-8 lg:py-16">
        {/* Editorial Left Column */}
        <div className="order-2 flex flex-col items-start lg:order-1 lg:col-span-7">
          <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-[#111111]/80 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.2em] text-white/80">
            <span className="h-2 w-2 rounded-full bg-lime" />
            <span>{portfolioConfig.personal.location.toUpperCase()}</span>
          </div>

          <div className="overflow-hidden">
            <h1
              ref={headingRef}
              className="font-display text-[clamp(2.8rem,8.2vw,7.6rem)] font-extrabold leading-[0.88] tracking-[-0.04em] text-white"
            >
              {portfolioConfig.personal.firstName}{' '}
              <span className="text-lime">{portfolioConfig.personal.lastName}</span>
            </h1>
          </div>

          <p
            ref={roleRef}
            className="mt-6 font-mono text-xs tracking-[0.22em] text-lime sm:text-sm"
          >
            {portfolioConfig.personal.heroRole}
          </p>

          <p
            ref={statementRef}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-2xl sm:leading-snug"
          >
            {portfolioConfig.personal.heroStatement}
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              as="a"
              href="#work"
              cursorLabel="VIEW"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#work');
              }}
              className="border border-lime bg-lime px-7 py-3.5 font-mono text-xs font-semibold tracking-[0.18em] text-[#080808] transition-colors hover:bg-white hover:border-white"
            >
              EXPLORE WORK
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </MagneticButton>

            <MagneticButton
              as="a"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#contact');
              }}
              className="border border-white/20 bg-transparent px-7 py-3.5 font-mono text-xs font-semibold tracking-[0.18em] text-white transition-colors hover:border-lime hover:text-lime"
            >
              LET&apos;S CONNECT
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>

            <div className="flex items-center gap-2.5 pl-1 sm:pl-2">
              <a
                href={portfolioConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className="inline-flex h-11 w-11 items-center justify-center border border-white/15 text-muted transition-colors hover:border-lime hover:text-lime"
              >
                <GitHubIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href={portfolioConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center border border-white/15 text-muted transition-colors hover:border-lime hover:text-lime"
              >
                <LinkedInIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href={portfolioConfig.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                title="LeetCode"
                className="inline-flex h-11 w-11 items-center justify-center border border-white/15 text-muted transition-colors hover:border-lime hover:text-lime"
              >
                <LeetCodeIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>
        </div>

        {/* 3D Interactive Core Right Column */}
        <div
          ref={visualWrapRef}
          className="order-1 relative h-[340px] w-full sm:h-[420px] lg:order-2 lg:col-span-5 lg:h-[580px]"
        >
          <div className="pointer-events-none absolute inset-4 border border-white/10" />
          {/* Precision corner ticks */}
          <span className="pointer-events-none absolute left-4 top-4 h-3 w-3 border-l-2 border-t-2 border-lime" />
          <span className="pointer-events-none absolute right-4 top-4 h-3 w-3 border-r-2 border-t-2 border-lime" />
          <span className="pointer-events-none absolute bottom-4 left-4 h-3 w-3 border-b-2 border-l-2 border-lime" />
          <span className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 border-b-2 border-r-2 border-lime" />

          <div className="pointer-events-none absolute left-7 top-7 z-10 bg-[#080808]/80 px-2 py-0.5 font-mono text-[10px] tracking-[0.2em] text-white/65">
            PORTRAIT CORE // MOVE &amp; CLICK TO PULSE
          </div>
          <div className="pointer-events-none absolute bottom-7 right-7 z-10 bg-[#080808]/80 px-2 py-0.5 font-mono text-[10px] tracking-[0.2em] text-lime">
            {portfolioConfig.personal.fullName}
          </div>
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center font-mono text-xs tracking-widest text-muted">
                INITIALIZING 3D CORE...
              </div>
            }
          >
            <HeroSculpture />
          </Suspense>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        ref={scrollCueRef}
        type="button"
        onClick={() => scrollTo('#about')}
        aria-label="Scroll to About section"
        className="group absolute bottom-6 left-6 z-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-muted transition-colors hover:text-lime md:left-12"
      >
        <span className="inline-block h-8 w-[1px] bg-white/25 transition-colors group-hover:bg-lime" />
        <span>SCROLL TO EXPLORE</span>
      </button>
    </section>
  );
}
