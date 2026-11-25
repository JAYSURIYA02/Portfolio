import { ArrowUp } from 'lucide-react';
import { portfolioConfig } from '../config/portfolioConfig';
import { useLenis } from '../hooks/useLenis';
import MagneticButton from './MagneticButton';

export default function Footer() {
  const { scrollTo } = useLenis();

  return (
    <footer className="border-t border-white/10 bg-[#080808] py-10">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center md:px-12">
        <div className="space-y-1">
          <div className="font-display text-lg font-extrabold tracking-tight text-white">
            {portfolioConfig.personal.fullName}
          </div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted">
            &copy; 2026 · {portfolioConfig.personal.location.toUpperCase()} · BUILT WITH REACT, THREE.JS &amp; GSAP
          </p>
        </div>

        <MagneticButton
          as="button"
          type="button"
          onClick={() => scrollTo(0)}
          aria-label="Back to top"
          className="border border-white/15 px-5 py-2.5 font-mono text-xs tracking-[0.18em] text-white transition-colors hover:border-lime hover:text-lime"
        >
          BACK TO TOP
          <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
        </MagneticButton>
      </div>
    </footer>
  );
}
