'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Track if intro has been shown in this page load
let hasShownIntro = false;

export function IntroAnimation() {
  const [isComplete, setIsComplete] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Check if intro has already been shown in this page load cycle
    if (hasShownIntro) {
      // Skip the intro if already shown
      setIsComplete(true);
      return;
    }
    
    // Show the intro
    setShouldShow(true);
    
    // Mark intro as shown for this page load
    hasShownIntro = true;
    
    const timer = setTimeout(() => setIsComplete(true), 5000);
    
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 800);

    return () => {
      clearTimeout(timer);
      clearInterval(glitchInterval);
    };
  }, []);

  if (!shouldShow || isComplete) return null;

  const name = "CHARLES VINCENT PANLILIO";
  const subtitle = "< FULL-STACK DEVELOPER />";

  // Letter animation variants
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: 0.5 + i * 0.03,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  // Particle animation
  const particleVariants = {
    initial: { 
      scale: 0, 
      opacity: 0 
    },
    animate: (i: number) => ({
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      x: [0, Math.random() * 400 - 200],
      y: [0, Math.random() * 400 - 200],
      transition: {
        delay: 1.5 + i * 0.1,
        duration: 2,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 4.8, duration: 0.4 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center pointer-events-none overflow-hidden"
    >
      {/* Cyberpunk grid background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center center',
        }}
      />

      {/* Animated scan lines */}
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: '100%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/10 to-transparent"
        style={{ height: '200px' }}
      />

      {/* Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={particleVariants}
          initial="initial"
          animate="animate"
          className="absolute w-1 h-1 bg-violet-400 rounded-full"
          style={{
            left: '50%',
            top: '50%',
          }}
        />
      ))}

      {/* Corner brackets */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Top-left */}
        <div className="absolute top-8 left-8 sm:top-16 sm:left-16">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-l-2 border-t-2 border-violet-500" />
        </div>
        {/* Top-right */}
        <div className="absolute top-8 right-8 sm:top-16 sm:right-16">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-r-2 border-t-2 border-violet-500" />
        </div>
        {/* Bottom-left */}
        <div className="absolute bottom-8 left-8 sm:bottom-16 sm:left-16">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-l-2 border-b-2 border-violet-500" />
        </div>
        {/* Bottom-right */}
        <div className="absolute bottom-8 right-8 sm:bottom-16 sm:right-16">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-r-2 border-b-2 border-violet-500" />
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        {/* Terminal-style header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 sm:mb-12 font-mono text-violet-400 text-xs sm:text-sm border border-violet-500/30 px-3 sm:px-4 py-1 sm:py-2 rounded bg-violet-950/20 backdrop-blur-sm whitespace-nowrap"
        >
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ▸
          </motion.span>
          {' '}INITIALIZING...
        </motion.div>

        {/* Main name with glitch effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={`relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-3 text-center text-white ${
            glitchActive ? 'glitch' : ''
          }`}
          style={{
            perspective: '1000px',
            textShadow: glitchActive 
              ? '2px 2px #ff00de, -2px -2px #00ffff' 
              : 'none',
          }}
        >
          {name}

          {/* Glitch layers */}
          {glitchActive && (
            <>
              <div className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-violet-500 opacity-70"
                style={{ transform: 'translate(2px, -2px)' }}>
                {name}
              </div>
              <div className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-fuchsia-500 opacity-70"
                style={{ transform: 'translate(-2px, 2px)' }}>
                {name}
              </div>
            </>
          )}
        </motion.h1>

        {/* Subtitle with typewriter effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="font-mono text-sm sm:text-lg md:text-xl text-violet-300 mb-8 sm:mb-12"
        >
          {subtitle.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 + i * 0.05 }}
            >
              {char}
            </motion.span>
          ))}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="ml-1"
          >
            |
          </motion.span>
        </motion.div>

        {/* Status bars */}
        <div className="space-y-2 w-full max-w-md px-4">
          {['LOADING SKILLS', 'LOADING PROJECTS', 'LOADING PORTFOLIO'].map((label, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5 + i * 0.2 }}
              className="flex items-center gap-3"
            >
              <span className="font-mono text-xs text-violet-400/70 w-32 sm:w-40">{label}</span>
              <div className="flex-1 h-1 bg-violet-950/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ 
                    delay: 2.5 + i * 0.2,
                    duration: 0.8,
                    ease: 'easeInOut'
                  }}
                  className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                />
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.3 + i * 0.2 }}
                className="font-mono text-xs text-green-400"
              >
                ✓
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Ready message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 4.2, duration: 0.3 }}
          className="mt-8 font-mono text-green-400 text-xs sm:text-sm border border-green-500/30 px-4 py-2 rounded bg-green-950/20 backdrop-blur-sm"
        >
          SYSTEM READY
        </motion.div>
      </div>

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle, transparent 0%, transparent 50%, black 100%)'
        }}
      />
    </motion.div>
  );
}
