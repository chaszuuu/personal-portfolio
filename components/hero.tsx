'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const ROLES = ['Aspiring Full-Stack Developer', 'UI/UX Designer'] as const;
const TYPE_SPEED = 90;
const DEL_SPEED = 45;
const PAUSE_MS = 2200;

export function Hero() {
  const [displayed, setDisplayed] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const role = ROLES[roleIdx];
    const tick = () => {
      if (deleting) {
        if (displayed.length > 0) setDisplayed((p) => p.slice(0, -1));
        else { setDeleting(false); setRoleIdx((i) => (i + 1) % ROLES.length); }
      } else {
        if (displayed.length < role.length) setDisplayed(role.slice(0, displayed.length + 1));
        else { timer.current = setTimeout(() => setDeleting(true), PAUSE_MS); return; }
      }
    };
    timer.current = setTimeout(tick, deleting ? DEL_SPEED : TYPE_SPEED);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [displayed, roleIdx, deleting]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Fade vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full pt-20">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-mono text-muted-foreground mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Open to opportunities · San Fernando, Pampanga, PH
        </motion.div>

        {/* Heading */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal tracking-tight leading-[0.95] text-foreground"
          >
            Charles Vincent
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display italic font-normal tracking-tight leading-[0.95] text-muted-foreground"
          >
            Panlilio
          </motion.h1>
        </div>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-8 bg-border" />
          <span className="font-mono text-sm text-muted-foreground min-w-[220px]">
            {displayed}
            <span className="animate-pulse ml-0.5">|</span>
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-base text-muted-foreground max-w-md leading-relaxed mb-10"
        >
          BSIT student at Pampanga State University — passionate about building interfaces
          where artistry meets engineering.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('projects');
              if (!el) return;
              el.scrollIntoView({ behavior: 'smooth' });
              // brief highlight pulse on the section heading
              el.classList.add('section-highlight');
              setTimeout(() => el.classList.remove('section-highlight'), 1000);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-85 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View Projects
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-card text-foreground text-sm font-medium hover:bg-accent transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Get in Touch
          </a>
          <a
            href="https://github.com/chaszuuu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-card text-muted-foreground text-sm font-medium hover:text-foreground hover:bg-accent transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll to About"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.a>
    </section>
  );
}