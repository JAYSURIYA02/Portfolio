import { useEffect, useMemo, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { gsap, isReducedMotion } from '../utils/animations';
import { portfolioConfig } from '../config/portfolioConfig';
import { useLenis } from '../hooks/useLenis';
import { useActiveSection } from '../hooks/useActiveSection';

export default function Navbar() {
  const { scrollTo } = useLenis();
  const sectionIds = useMemo(
    () => portfolioConfig.navigation.map((item) => item.id),
    []
  );
  const activeId = useActiveSection(sectionIds);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef(null);
  const linkRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      if (!isReducedMotion()) {
        gsap.fromTo(
          drawer,
          { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 0.45,
            ease: 'power3.out',
          }
        );
        gsap.fromTo(
          linkRefs.current.filter(Boolean),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.45,
            delay: 0.1,
            ease: 'power3.out',
          }
        );
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/10 bg-[#080808]/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Main Navigation"
          className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 md:px-12"
        >
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-2.5 font-display text-base font-extrabold tracking-tight text-white sm:text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
          >
            <span className="whitespace-nowrap">{portfolioConfig.personal.fullName}</span>
            <span className="h-2 w-2 shrink-0 rounded-full bg-lime transition-transform duration-300 group-hover:scale-150" />
            <span className="hidden font-mono text-[11px] font-normal tracking-[0.2em] text-white/45 2xl:inline">
              // CHENNAI, INDIA
            </span>
          </a>

          <ul className="hidden items-center gap-5 xl:gap-7 lg:flex">
            {portfolioConfig.navigation.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`group relative py-1 font-mono text-[11px] tracking-[0.16em] transition-colors duration-200 focus-visible:outline-none focus-visible:text-lime ${
                      isActive ? 'text-lime' : 'text-white/75 hover:text-white'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-lime transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href={portfolioConfig.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 border border-white/15 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.16em] text-white transition-colors duration-200 hover:border-lime hover:text-lime sm:inline-flex"
            >
              RESUME
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-white transition-colors hover:border-lime hover:text-lime lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Fullscreen Drawer */}
      {mobileOpen && (
        <div
          ref={drawerRef}
          className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-[#080808] px-6 pb-8 pt-24 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {portfolioConfig.navigation.map((item, idx) => (
              <li key={item.id}>
                <a
                  ref={(el) => (linkRefs.current[idx] = el)}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`flex items-baseline justify-between border-b border-white/10 py-3 font-display text-2xl font-bold tracking-tight sm:text-3xl ${
                    activeId === item.id ? 'text-lime' : 'text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-muted">0{idx + 1}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4">
            <a
              href={portfolioConfig.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between border border-lime/40 bg-lime/10 px-4 py-3 font-mono text-xs tracking-[0.2em] text-lime"
            >
              DOWNLOAD RESUME (PDF)
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <div className="flex items-center justify-between font-mono text-xs text-muted">
              <span>{portfolioConfig.personal.email}</span>
              <span>{portfolioConfig.personal.phone}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
