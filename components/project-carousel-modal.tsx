'use client';

import React from "react"

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';

interface ProjectData {
  title: string;
  description: string;
  logo?: string;
  longDescription?: string;
  technologies: string[];
  highlights?: string[];
  github?: string;
  link?: string;
  buttonText?: string;
}

interface ProjectCarouselModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectData[];
  initialIndex: number;
}

export function ProjectCarouselModal({
  isOpen,
  onClose,
  projects,
  initialIndex,
}: ProjectCarouselModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = projects.length - 1;
      if (next >= projects.length) next = 0;
      return next;
    });
  }, [projects.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'Escape') onClose();
    },
    [isOpen, paginate, onClose]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    const isLeftSwipe = touchStart - touchEnd > 50;
    const isRightSwipe = touchEnd - touchStart > 50;

    if (isLeftSwipe) paginate(1);
    if (isRightSwipe) paginate(-1);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown]);

  const currentProject = projects[currentIndex];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Project carousel"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl max-h-[90vh] bg-card rounded-2xl border border-border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                  {currentProject.title}
                </h2>
                <p className="text-xs sm:text-sm text-foreground/60 mt-1">
                  Project {currentIndex + 1} of {projects.length}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-foreground" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="relative overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.4 },
                    }}
                    className="p-6 sm:p-8 md:p-10"
                  >
                    <div className="space-y-6 sm:space-y-8">
                      {/* Short Description */}
                      <div>
                        <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                          {currentProject.longDescription}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div className="space-y-3">
                        <h4 className="text-sm sm:text-base font-semibold text-primary uppercase tracking-wide">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentProject.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium border border-primary/30 hover:bg-primary/20 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Features */}
                      {currentProject.highlights && currentProject.highlights.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-sm sm:text-base font-semibold text-foreground uppercase tracking-wide">
                            Key Features
                          </h4>
                          <ul className="space-y-2">
                            {currentProject.highlights.map((highlight, idx) => (
                              <li
                                key={idx}
                                className="text-sm sm:text-base text-foreground/70 flex items-start gap-3"
                              >
                                <span className="text-primary flex-shrink-0 mt-1 text-lg">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Primary Action Button */}
                      {currentProject.link && (
                        <div className="pt-4">
                          <motion.a
                            href={currentProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors shadow-lg shadow-primary/20"
                          >
                            {currentProject.buttonText || 'Visit Website'}
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-t border-border bg-card/50 backdrop-blur-sm">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(-1)}
                className="p-2 sm:p-3 hover:bg-primary/10 rounded-lg transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </motion.button>

              <div className="flex gap-1 sm:gap-2">
                {projects.map((_, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex
                        ? 'w-6 sm:w-8 bg-primary'
                        : 'w-2 bg-primary/30 hover:bg-primary/50'
                    }`}
                    aria-label={`Go to project ${idx + 1}`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(1)}
                className="p-2 sm:p-3 hover:bg-primary/10 rounded-lg transition-colors"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}