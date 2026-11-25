import { useEffect } from 'react';
import { X, Github, ExternalLink } from 'lucide-react';
import { useLenis } from '../hooks/useLenis';

export default function ProjectModal({ project, onClose }) {
  const { lenis } = useLenis();

  useEffect(() => {
    if (!project) return;

    lenis?.stop();
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [project, onClose, lenis]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#080808]/90 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-white/15 bg-[#111111] p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="font-mono text-xs tracking-[0.2em] text-lime">
              PROJECT {project.number} // {project.category.toUpperCase()}
            </div>
            <h3
              id="modal-project-title"
              className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-4xl"
            >
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 text-white transition-colors hover:border-lime hover:text-lime"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-base leading-relaxed text-white/80 sm:text-lg">
          {project.description}
        </p>

        {/* Metrics Bar */}
        {project.metrics?.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-3 border-y border-white/10 py-5 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-mono text-[11px] tracking-[0.18em] text-muted">
                  {m.label.toUpperCase()}
                </div>
                <div className="mt-1 font-display text-lg font-bold text-lime">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Secondary Image when available (e.g., STRIDE-R Traffic Flow) */}
        {(project.image || project.secondaryImage) && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.image && (
              <img
                src={project.image}
                alt={`${project.title} primary output`}
                className="aspect-video w-full border border-white/10 object-cover"
              />
            )}
            {project.secondaryImage && (
              <img
                src={project.secondaryImage}
                alt={`${project.title} directional flow output`}
                className="aspect-video w-full border border-white/10 object-cover"
              />
            )}
          </div>
        )}

        {/* Architecture Breakdown */}
        <div className="mt-8">
          <h4 className="mb-4 font-mono text-xs tracking-[0.22em] text-lime">
            TECHNICAL IMPLEMENTATION &amp; ARCHITECTURE
          </h4>
          <ul className="space-y-3">
            {project.architecture.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm leading-relaxed text-white/80 sm:text-base"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-lime" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="mt-8 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="border border-white/15 bg-[#080808] px-3 py-1 font-mono text-xs text-white/85"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links (only show verified available URLs) */}
        <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-lime bg-lime px-5 py-2.5 font-mono text-xs font-semibold tracking-[0.16em] text-[#080808] transition-colors hover:bg-white hover:border-white"
            >
              <Github className="h-4 w-4" />
              VIEW SOURCE ON GITHUB
            </a>
          )}
          {project.secondaryGithubUrl && (
            <a
              href={project.secondaryGithubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 px-5 py-2.5 font-mono text-xs font-semibold tracking-[0.16em] text-white transition-colors hover:border-lime hover:text-lime"
            >
              <Github className="h-4 w-4" />
              {project.secondaryGithubLabel?.toUpperCase() || 'COMPANION REPO'}
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 px-5 py-2.5 font-mono text-xs font-semibold tracking-[0.16em] text-white transition-colors hover:border-lime hover:text-lime"
            >
              <ExternalLink className="h-4 w-4" />
              OPEN LIVE DEMO
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
