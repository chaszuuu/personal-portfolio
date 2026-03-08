'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { FadeInView } from './fade-in-view';

interface Certification {
  title: string;
  provider: string;
  date: string;
  image: string;
  link?: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    title: 'Cybersecurity Fundamentals',
    provider: 'Palo Alto Networks',
    date: 'Sep 21, 2024',
    image: 'img/cert_1.jpg',
  },
  {
    title: 'Network Security Fundamentals',
    provider: 'Palo Alto Networks',
    date: 'Sep 22, 2024',
    image: 'img/cert_2.jpg',
  },
  {
    title: 'Security Operations Fundamentals',
    provider: 'Palo Alto Networks',
    date: 'Sep 26, 2024',
    image: 'img/cert_3.jpg',
  },
  {
    title: 'Cloud Security Fundamentals',
    provider: 'Palo Alto Networks',
    date: 'Sep 25, 2024',
    image: 'img/cert_4.jpg',
  },
];

export function Certifications() {
  const [selected, setSelected] = useState<number | null>(null);
  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  return (
    <>
      <section id="certifications" className="py-24 sm:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6">
          <FadeInView>
            <p className="sec-label">Credentials</p>
            <h2 className="text-4xl sm:text-5xl font-display font-normal tracking-tight text-foreground mb-12">
              Certifications
            </h2>
          </FadeInView>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <FadeInView key={cert.title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -3 }}
                  onClick={() => setSelected(i)}
                  className="group relative rounded-xl border border-border bg-card hover:border-ring/50 hover:shadow-md transition-all duration-300 cursor-pointer p-5"
                >
                  <div className="flex items-start gap-4">
                    {/* Badge icon */}
                    <div className="w-10 h-10 rounded-lg border border-border bg-background flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-muted-foreground" />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Provider */}
                      <p className="font-mono text-[0.6rem] tracking-wider text-muted-foreground uppercase mb-1 flex items-center justify-between">
                        {cert.provider}
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </p>

                      {/* Title */}
                      <h3 className="text-sm font-semibold text-foreground tracking-tight leading-snug mb-1">
                        {cert.title}
                      </h3>

                      {/* Date */}
                      <p className="font-mono text-[0.6rem] text-muted-foreground">{cert.date}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Image Modal */}
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
            aria-label={CERTIFICATIONS[selected].title}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
            >
              <button
                onClick={close}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-md border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="p-6">
                <p className="font-mono text-[0.62rem] text-muted-foreground uppercase tracking-wider mb-1">
                  {CERTIFICATIONS[selected].provider}
                </p>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {CERTIFICATIONS[selected].title}
                </h3>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={CERTIFICATIONS[selected].image}
                  alt={CERTIFICATIONS[selected].title}
                  className="w-full h-auto rounded-lg border border-border"
                />
                <p className="font-mono text-[0.62rem] text-muted-foreground mt-3 text-right">
                  {CERTIFICATIONS[selected].date}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
