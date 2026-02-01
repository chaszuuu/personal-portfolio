'use client';

import React, { useEffect, useState } from "react"
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlobProps extends React.HTMLAttributes<HTMLDivElement> {
  firstBlobColor?: string;
  secondBlobColor?: string;
  thirdBlobColor?: string;
}

interface BlobPosition {
  x: number;
  y: number;
}

export function AuroraBackground({
  className,
  firstBlobColor = 'bg-violet-400',
  secondBlobColor = 'bg-purple-400',
  thirdBlobColor = 'bg-fuchsia-400',
}: BlobProps) {
  const [positions, setPositions] = useState<BlobPosition[]>([
    { x: -100, y: -100 },
    { x: 0, y: -50 },
    { x: 0, y: 0 },
  ]);

  useEffect(() => {
    // Initialize positions with window dimensions on client-side
    setPositions([
      { x: -100, y: -100 },
      { x: window.innerWidth + 100, y: -50 },
      { x: window.innerWidth / 2, y: window.innerHeight + 100 },
    ]);

    const generateRandomPosition = () => {
      return {
        x: Math.random() * (window.innerWidth + 200) - 100,
        y: Math.random() * (window.innerHeight + 200) - 100,
      };
    };

    const interval = setInterval(() => {
      setPositions([
        generateRandomPosition(),
        generateRandomPosition(),
        generateRandomPosition(),
      ]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="relative w-full h-full">
        <motion.div
          animate={{ x: positions[0].x, y: positions[0].y }}
          transition={{ duration: 6, ease: 'easeInOut' }}
          className={cn(
            'absolute h-72 w-72 rounded-full p-8 opacity-40 mix-blend-screen blur-3xl filter',
            className,
            firstBlobColor
          )}
        />
        <motion.div
          animate={{ x: positions[1].x, y: positions[1].y }}
          transition={{ duration: 6, ease: 'easeInOut', delay: 0.5 }}
          className={cn(
            'absolute h-80 w-80 rounded-full p-8 opacity-35 mix-blend-screen blur-3xl filter',
            className,
            secondBlobColor
          )}
        />
        <motion.div
          animate={{ x: positions[2].x, y: positions[2].y }}
          transition={{ duration: 6, ease: 'easeInOut', delay: 1 }}
          className={cn(
            'absolute h-96 w-96 rounded-full p-8 opacity-30 mix-blend-screen blur-3xl filter',
            className,
            thirdBlobColor
          )}
        />
      </div>
    </div>
  );
}