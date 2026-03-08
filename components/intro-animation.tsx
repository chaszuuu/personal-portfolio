'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

let hasShownIntro = false;

const GRID_COLS = 12;
const GRID_ROWS = 8;
const INTRO_TOTAL_MS = 3800;

export function IntroAnimation() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<'grid' | 'name' | 'exit'>('grid');

  useEffect(() => {
    if (hasShownIntro) return;
    hasShownIntro = true;
    setVisible(true);

    // Phase sequence
    const t1 = setTimeout(() => setPhase('name'), 1200);
    const t2 = setTimeout(() => setPhase('exit'), INTRO_TOTAL_MS - 400);
    const t3 = setTimeout(() => setVisible(false), INTRO_TOTAL_MS);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (!visible) return null;

  const totalCells = GRID_COLS * GRID_ROWS;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] bg-background overflow-hidden flex items-center justify-center"
          aria-hidden
        >
          {/* Animated grid cells */}
          <div
            className="absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
            }}
          >
            {Array.from({ length: totalCells }).map((_, i) => {
              const col = i % GRID_COLS;
              const row = Math.floor(i / GRID_COLS);
              // Distance from center for stagger
              const cx = GRID_COLS / 2;
              const cy = GRID_ROWS / 2;
              const dist = Math.sqrt((col - cx) ** 2 + (row - cy) ** 2);
              const delay = dist * 0.04;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={phase === 'grid' || phase === 'name'
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0 }
                  }
                  transition={{
                    delay: phase === 'exit' ? (totalCells - i) * 0.001 : delay,
                    duration: 0.35,
                    ease: 'easeOut',
                  }}
                  className="border border-border/30"
                  style={{ transformOrigin: 'center' }}
                />
              );
            })}
          </div>

          {/* Horizontal scan line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 0.15 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
            className="absolute left-0 right-0 h-px bg-foreground origin-left"
            style={{ top: '50%' }}
          />
          <motion.div
            initial={{ scaleY: 0, opacity: 1 }}
            animate={{ scaleY: 1, opacity: 0.15 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
            className="absolute top-0 bottom-0 w-px bg-foreground origin-top"
            style={{ left: '50%' }}
          />

          {/* Corner brackets */}
          {[
            'top-8 left-8 border-t border-l',
            'top-8 right-8 border-t border-r',
            'bottom-8 left-8 border-b border-l',
            'bottom-8 right-8 border-b border-r',
          ].map((cls) => (
            <motion.div
              key={cls}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: phase === 'grid' || phase === 'name' ? 1 : 0, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className={`absolute w-10 h-10 border-foreground/40 ${cls}`}
            />
          ))}

          {/* Name reveal */}
          <AnimatePresence>
            {phase === 'name' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-center px-6 select-none"
              >
                {/* Top label */}
                <motion.p
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground mb-6"
                >
                  Portfolio — 2026
                </motion.p>

                {/* Name */}
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl sm:text-5xl md:text-6xl font-display font-normal tracking-tight text-foreground leading-none"
                  >
                    Charles Vincent
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl sm:text-5xl md:text-6xl font-display italic font-normal tracking-tight text-muted-foreground leading-none"
                  >
                    Panlilio
                  </motion.h1>
                </div>

                {/* Bottom label */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-6 flex items-center justify-center gap-4"
                >
                  <div className="h-px w-12 bg-border" />
                  <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">
                    Aspiring Full-Stack Developer
                  </p>
                  <div className="h-px w-12 bg-border" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
