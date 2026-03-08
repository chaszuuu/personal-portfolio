'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { FadeInView } from './fade-in-view';

export interface Project {
  title: string;
  summary: string;
  images: string[];
  description: string;
  technologies: string[];
  features: string[];
  link: string;
  github?: string;
  buttonText: string;
  lightLogo?: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Yomuzuu',
    summary: 'Full-stack manga reader & aggregator with multi-source scraping',
    images: ['img/yomuzuu_logo.png', 'img/yomuzuu_hero.png', 'img/yomuzuu_manga.png', 'img/yomuzuu_read.png', 'img/yomuzuu_browse.png', 'img/yomuzuu_bookmark.png'],
    description:
      'A full-stack manga reader web application integrating web scraping (MangaFreak) and the MyAnimeList API for metadata aggregation. Features a RESTful Flask backend with scheduled background jobs, rate limiting, and optimized image delivery via CDN redirect. The React frontend offers a dual-mode chapter reader (scroll/paginated), real-time search, genre filtering, and persistent bookmarks.',
    technologies: ['React', 'Flask', 'PostgreSQL', 'Python', 'REST API', 'Redis', 'Gunicorn', 'Render'],
    features: [
      'Multi-source manga aggregation via MangaFreak scraping',
      'MyAnimeList API integration for rich metadata',
      'Dual-mode chapter reader — scroll & paginated',
      'Real-time search with genre filtering',
      'Persistent bookmarks & reading progress',
      'Scheduled background jobs & rate limiting',
      'Optimized image delivery via CDN redirect',
    ],
    link: 'https://yomuzuu.onrender.com',
    buttonText: 'Visit Website',
  },
  {
    title: 'AttachMates',
    summary: 'AI-powered dating app focused on compatibility matchmaking',
    images: [
      'img/attachmates_logo.png',
      'img/attachmates1.jpg',
      'img/attachmates2.jpg',
      'img/attachmates3.jpg',
      'img/attachmates4.jpg',
      'img/attachmates5.jpg',
    ],
    description:
      'An AI-powered dating application that intelligently matches users based on attachment style, love language, and preferred gender. Designed with a mobile-first approach and secure user verification.',
    technologies: ['Flutter', 'Python (FastAPI)', 'Firebase Auth', 'Firebase Firestore', 'Supabase Storage', 'Figma'],
    features: [
      'Compatibility-based matchmaking algorithm',
      'Attachment style and love language assessments',
      'Secure authentication and profile verification',
      'Real-time data synchronization',
    ],
    link: 'http://getattachmates.vercel.app',
    buttonText: 'View App',
  },
  {
    title: 'Personal Portfolio',
    summary: 'Portfolio with modern UI, animations, and interactive project modals',
    images: ['img/portfolio_logo.png'],
    description:
      'A modern personal portfolio showcasing projects, skills, and experience with smooth animations, interactive components, and a dark/light theme toggle.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    features: [
      'Dark / light mode toggle',
      'Geometric intro animation',
      'Interactive project modals',
      'Fully responsive layout',
    ],
    link: 'https://charlesvincentpanlilio.vercel.app',
    buttonText: 'Visit Website',
  },
  {
    title: 'Tanim',
    summary: 'CRUD web app with real-time weather API integration',
    images: ['img/tanim_logo.png', 'img/tanim-hero.png', 'img/tanim-dashboard.png'],
    lightLogo: 'img/tanim_logo_2.png',
    description:
      'A full CRUD web application integrated with a Weather API to provide real-time weather updates alongside dynamic data management.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Weather API'],
    features: [
      'Full Create, Read, Update, Delete operations',
      'Third-party Weather API integration',
      'Dynamic content rendering',
    ],
    link: '',
    buttonText: 'Visit Website',
  },
  {
    title: 'CCS College Website',
    summary: 'Frontend website for the College of Computing Studies',
    images: ['img/college_of_computing_studies_logo.png'],
    description:
      'A frontend-only informational website for the College of Computing Studies with responsive design and structured academic content.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    features: ['Responsive layout', 'Organized academic content', 'Clean navigation'],
    link: 'https://collegeofcomputingstudiespsu.vercel.app/',
    buttonText: 'Visit Website',
  },
];

function ProjectLogo({ project, size }: { project: Project; size: number }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const src =
    mounted && resolvedTheme === 'light' && project.lightLogo
      ? project.lightLogo
      : project.images[0];
  return (
    <Image src={src} alt={project.title} width={size} height={size} className="object-contain p-1" />
  );
}

export function Projects() {
  const [selected, setSelected] = useState<number | null>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => { setSelected(null); setZoomed(false); }, []);

  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  const openProject = (i: number) => { setSelected(i); setImgIdx(0); setZoomed(false); };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selected === null) return;
    setImgIdx((p) => (p - 1 + PROJECTS[selected].images.length) % PROJECTS[selected].images.length);
  };
  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selected === null) return;
    setImgIdx((p) => (p + 1) % PROJECTS[selected].images.length);
  };

  const getModalLogoSrc = (project: Project) =>
    mounted && resolvedTheme === 'light' && project.lightLogo
      ? project.lightLogo
      : project.images[0];

  return (
    <>
      <section id="projects" className="py-24 sm:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6">
          <FadeInView>
            <p className="sec-label">Work</p>
            <h2 className="text-4xl sm:text-5xl font-display font-normal tracking-tight text-foreground mb-16">
              Selected <em className="italic text-muted-foreground">Projects</em>
            </h2>
          </FadeInView>

          {/* Project list — numbered rows */}
          <div className="space-y-0">
            {PROJECTS.map((project, i) => (
              <FadeInView key={project.title} delay={i * 0.06}>
                <motion.div
                  onClick={() => openProject(i)}
                  whileHover="hover"
                  className="group grid grid-cols-[48px_1fr_auto] sm:grid-cols-[48px_64px_1fr_auto] items-center gap-4 sm:gap-6 py-5 border-t border-border cursor-pointer"
                >
                  {/* Index */}
                  <span className="font-mono text-[0.6rem] text-muted-foreground/50 tracking-wider">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Logo — hidden on mobile */}
                  <div className="hidden sm:flex w-12 h-12 rounded-lg border border-border bg-card items-center justify-center overflow-hidden shrink-0 group-hover:border-ring/40 transition-colors">
                    <ProjectLogo project={project} size={48} />
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-3 mb-1.5 flex-wrap">
                      <h3 className="text-sm font-semibold text-foreground tracking-tight">
                        {project.title}
                      </h3>
                      <div className="hidden md:flex items-center gap-1.5 flex-wrap">
                        {project.technologies.slice(0, 3).map((t) => (
                          <span key={t} className="font-mono text-[0.55rem] px-1.5 py-0.5 rounded border border-border bg-background text-muted-foreground">
                            {t}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="font-mono text-[0.55rem] text-muted-foreground/60">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground truncate max-w-sm sm:max-w-none">
                      {project.summary}
                    </p>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    variants={{ hover: { x: 2, y: -2 } }}
                    transition={{ duration: 0.15 }}
                    className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              </FadeInView>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* ── Modal — fixed size, scrollable details, sticky button ── */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
            role="dialog"
            aria-modal
            aria-label={PROJECTS[selected].title}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full rounded-2xl border border-border bg-card shadow-2xl"
              style={{ maxWidth: '900px', height: '580px' }}
            >
              {/* Close */}
              <button
                onClick={close}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-md border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">

                {/* ── Left: image pane, fixed, no scroll ── */}
                <div className="relative bg-background rounded-l-2xl border-r border-border overflow-hidden hidden lg:block">
                  <div className="relative w-full h-full cursor-zoom-in" onClick={() => setZoomed(true)}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={imgIdx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={imgIdx === 0 ? getModalLogoSrc(PROJECTS[selected]) : PROJECTS[selected].images[imgIdx]}
                          alt={`${PROJECTS[selected].title} ${imgIdx + 1}`}
                          fill
                          className="object-contain p-8"
                          sizes="50vw"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {PROJECTS[selected].images.length > 1 && (
                      <>
                        <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md border border-border bg-background/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground z-10">
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md border border-border bg-background/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground z-10">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] text-muted-foreground bg-background/80 px-2 py-1 rounded border border-border">
                          {imgIdx + 1} / {PROJECTS[selected].images.length}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* ── Right: scrollable details + sticky button ── */}
                <div className="flex flex-col h-full min-h-0 rounded-r-2xl rounded-l-2xl lg:rounded-l-none overflow-hidden">
                  {/* Scrollable content */}
                  <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-5 min-h-0">

                    {/* Mobile image strip */}
                    <div className="lg:hidden relative bg-background rounded-lg border border-border overflow-hidden aspect-video mb-2 cursor-zoom-in" onClick={() => setZoomed(true)}>
                      <AnimatePresence mode="wait">
                        <motion.div key={imgIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                          <Image
                            src={imgIdx === 0 ? getModalLogoSrc(PROJECTS[selected]) : PROJECTS[selected].images[imgIdx]}
                            alt={`${PROJECTS[selected].title} ${imgIdx + 1}`}
                            fill
                            className="object-contain p-4"
                            sizes="100vw"
                          />
                        </motion.div>
                      </AnimatePresence>
                      {PROJECTS[selected].images.length > 1 && (
                        <>
                          <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md border border-border bg-background/80 backdrop-blur flex items-center justify-center text-muted-foreground z-10">
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md border border-border bg-background/80 backdrop-blur flex items-center justify-center text-muted-foreground z-10">
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-foreground tracking-tight mb-2">
                        {PROJECTS[selected].title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {PROJECTS[selected].description}
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[0.62rem] text-muted-foreground uppercase tracking-wider mb-2">Tech Stack</p>
                      <div className="flex flex-wrap gap-1.5">
                        {PROJECTS[selected].technologies.map((t) => (
                          <span key={t} className="font-mono text-[0.6rem] px-2 py-1 rounded border border-border bg-background text-muted-foreground">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-mono text-[0.62rem] text-muted-foreground uppercase tracking-wider mb-2">Key Features</p>
                      <ul className="space-y-1.5">
                        {PROJECTS[selected].features.map((f) => (
                          <li key={f} className="text-sm text-muted-foreground flex gap-2">
                            <span className="text-foreground/30 mt-1 shrink-0">—</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* ── Sticky action bar ── */}
                  <div className="shrink-0 border-t border-border px-6 lg:px-8 py-4 bg-card flex items-center gap-2">
                    {PROJECTS[selected].link ? (
                      <a
                        href={PROJECTS[selected].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-85 transition-opacity"
                      >
                        {PROJECTS[selected].buttonText}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-muted-foreground text-sm font-medium opacity-50 cursor-not-allowed">
                        {PROJECTS[selected].buttonText}
                      </span>
                    )}
                    {PROJECTS[selected].github && (
                      <a
                        href={PROJECTS[selected].github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-muted-foreground text-sm font-medium hover:text-foreground hover:bg-accent transition-all"
                      >
                        <Github className="w-3.5 h-3.5" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {zoomed && selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button onClick={() => setZoomed(false)} className="absolute top-4 right-4 w-8 h-8 rounded-md border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground">
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="relative w-full h-full max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={imgIdx === 0 ? getModalLogoSrc(PROJECTS[selected]) : PROJECTS[selected].images[imgIdx]}
                alt="Zoomed"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}