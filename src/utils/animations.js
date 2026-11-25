import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger, SplitType };

/**
 * Checks whether the user prefers reduced motion.
 */
export function isReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Splits text using SplitType and returns a cleanup callback alongside the split instance.
 * Ensures words/chars stay crisp and revert cleanly when React unmounts.
 */
export function splitElementText(element, types = 'words,chars') {
  if (!element) return null;
  return new SplitType(element, { types });
}

/**
 * Standard ScrollTrigger reveal helper for editorial blocks.
 */
export function animateClipReveal(target, trigger, delay = 0) {
  if (!target || isReducedMotion()) return null;
  return gsap.fromTo(
    target,
    { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0.4, scale: 1.05 },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      scale: 1,
      duration: 1.05,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: trigger || target,
        start: 'top 84%',
        once: true,
      },
    }
  );
}
