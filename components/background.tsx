'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface BlobPosition {
  x: number;
  y: number;
}

const BLOB_INTERVAL_MS = 7000;

function randomPosition(): BlobPosition {
  return {
    x: Math.random() * (window.innerWidth + 200) - 100,
    y: Math.random() * (window.innerHeight + 200) - 100,
  };
}

export function AuroraBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [positions, setPositions] = useState<BlobPosition[]>([
    { x: -100, y: -100 },
    { x: 0, y: -50 },
    { x: 0, y: 0 },
  ]);

  useEffect(() => {
    setMounted(true);
    setPositions([
      { x: -100, y: -100 },
      { x: window.innerWidth + 100, y: -50 },
      { x: window.innerWidth / 2, y: window.innerHeight + 100 },
    ]);

    const interval = setInterval(() => {
      setPositions([randomPosition(), randomPosition(), randomPosition()]);
    }, BLOB_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  // Dark mode: vivid but subtle violet/indigo/purple
  // Light mode: soft pastel blue/violet/pink so it doesn't overpower
  const blobs = isDark
    ? [
        { color: 'bg-white', size: 'h-96 w-96', opacity: 'opacity-[0.22]' },
        { color: 'bg-slate-200', size: 'h-[28rem] w-[28rem]', opacity: 'opacity-[0.18]' },
        { color: 'bg-neutral-100', size: 'h-80 w-80', opacity: 'opacity-[0.20]' },
      ]
    : [
        { color: 'bg-neutral-500', size: 'h-96 w-96', opacity: 'opacity-[0.55]' },
        { color: 'bg-slate-600',   size: 'h-[28rem] w-[28rem]', opacity: 'opacity-[0.45]' },
        { color: 'bg-zinc-500',    size: 'h-80 w-80', opacity: 'opacity-[0.50]' },
      ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      <div className="relative w-full h-full">
        {blobs.map((blob, i) => (
          <motion.div
            key={i}
            animate={{ x: positions[i].x, y: positions[i].y }}
            transition={{ duration: 7, ease: 'easeInOut', delay: i * 0.4 }}
            className={`absolute rounded-full mix-blend-screen blur-3xl filter ${blob.size} ${blob.opacity} ${blob.color}`}
          />
        ))}
      </div>
    </div>
  );
}