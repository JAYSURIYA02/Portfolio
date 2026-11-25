import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Github, Layers } from 'lucide-react';
import { gsap, ScrollTrigger, isReducedMotion } from '../utils/animations';
import { portfolioConfig } from '../config/portfolioConfig';
import ProjectVisual from './ProjectVisual';
import ProjectModal from './ProjectModal';
import MagneticButton from './MagneticButton';

export default function Projects() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const hasFilteredRef = useRef(false);

  const visibleProjects = portfolioConfig.projects.filter(
    (p) => filter === 'all' || p.filterGroup === filter
  );

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const visuals = cardRefs.current
        .filter(Boolean)
        .map((card) => card.querySelector('.project-visual-frame'))
        .filter(Boolean);

      if (!hasFilteredRef.current) {
        cardRefs.current.filter(Boolean).forEach((card) => {
          const visual = card.querySelector('.project-visual-frame');
          if (visual) {
            gsap.fromTo(
              visual,
              { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0.4 },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                opacity: 1,
                duration: 0.95,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 84%',
                  once: true,
                },
              }
            );
          }
        });
      } else {
        gsap.fromTo(
          visuals,
          { opacity: 0.25, y: 18 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: 'power3.out',
          }
        );
      }
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [filter]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative border-b border-white/10 bg-[#080808] py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <p className="mb-3 font-mono text-xs tracking-[0.22em] text-lime">
              04 // SELECTED ENGINEERING WORK
            </p>
            <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-extrabold leading-none tracking-[-0.03em] text-white">
              FEATURED SYSTEMS.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {[
              { key: 'all', label: `ALL (${portfolioConfig.projects.length})` },
              { key: 'ai-cv', label: 'AI & COMPUTER VISION (4)' },
              { key: 'fullstack', label: 'FULL-STACK & SYSTEMS (2)' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  hasFilteredRef.current = true;
                  setFilter(tab.key);
                }}
                className={`border px-4 py-2 font-mono text-xs tracking-[0.14em] transition-colors ${
                  filter === tab.key
                    ? 'border-lime bg-lime text-[#080808] font-semibold'
                    : 'border-white/15 bg-transparent text-white/75 hover:border-lime hover:text-lime'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Alternating Asymmetric Project Showcases */}
        <div className="space-y-20 md:space-y-28">
          {visibleProjects.map((project, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <article
                key={project.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                className="group grid grid-cols-1 items-center gap-8 border-b border-white/10 pb-16 last:border-b-0 last:pb-0 lg:grid-cols-12 lg:gap-12"
              >
                {/* Visual Frame */}
                <div
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  data-cursor="VIEW"
                  className={`project-visual-frame relative aspect-[16/10] w-full cursor-pointer overflow-hidden border border-white/15 bg-[#111111] transition-colors duration-300 group-hover:border-lime/50 lg:col-span-7 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <ProjectVisual project={project} />
                </div>

                {/* Editorial Spec Column */}
                <div
                  className={`flex flex-col justify-between lg:col-span-5 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs tracking-[0.18em] text-muted">
                    <span className="text-lime">
                      {project.number} // {project.category.toUpperCase()}
                    </span>
                    <span>{project.status.toUpperCase()}</span>
                  </div>

                  <h3 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-white transition-colors group-hover:text-lime sm:text-4xl">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
                    {project.description}
                  </p>

                  {/* Key Metrics */}
                  <div className="mt-6 grid grid-cols-3 gap-3 border-y border-white/10 py-4">
                    {project.metrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="font-mono text-[10px] tracking-[0.14em] text-muted">
                          {metric.label.toUpperCase()}
                        </div>
                        <div className="mt-1 font-mono text-xs font-semibold text-white">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="border border-white/12 bg-[#111111] px-3 py-1 font-mono text-[11px] text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <MagneticButton
                      as="button"
                      type="button"
                      cursorLabel="VIEW"
                      onClick={() => setSelectedProject(project)}
                      className="border border-lime bg-lime px-5 py-2.5 font-mono text-xs font-semibold tracking-[0.16em] text-[#080808] transition-colors hover:bg-white hover:border-white"
                    >
                      <Layers className="h-3.5 w-3.5" />
                      CASE STUDY
                    </MagneticButton>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-white/20 px-4 py-2.5 font-mono text-xs tracking-[0.14em] text-white transition-colors hover:border-lime hover:text-lime"
                      >
                        <Github className="h-3.5 w-3.5" />
                        GITHUB
                      </a>
                    )}

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-white/20 px-4 py-2.5 font-mono text-xs tracking-[0.14em] text-lime transition-colors hover:border-lime"
                      >
                        LIVE DEMO
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
