'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  logo?: string;
  longDescription?: string;
  technologies?: string[];
  highlights?: string[];
  github?: string;
  link?: string;
  buttonText?: string;
  isCompact?: boolean;
}

export function ProjectCard({
  title,
  description,
  logo,
  isCompact = false,
}: ProjectCardProps) {
  if (isCompact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(139, 92, 246, 0.15)' }}
        className="group h-full rounded-xl overflow-hidden border border-border bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col"
      >
        {/* Logo Image */}
        <div className="relative w-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden aspect-video md:aspect-square lg:aspect-video">
          {logo ? (
            <div className="relative w-full h-full flex items-center justify-center p-8">
              <Image
                src={logo}
                alt={title}
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/20 select-none">
                  {title.charAt(0)}
                </div>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
        </div>

        {/* Card content */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-foreground/60 mt-1 line-clamp-2">
              {description}
            </p>
          </div>

          {/* Hover indicator */}
          <div className="mt-3 text-xs text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to view details →
          </div>
        </div>
      </motion.div>
    );
  }

  // Full card view (used in modal)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h3>
        <p className="text-sm sm:text-base text-foreground/70">{description}</p>
      </div>
    </motion.div>
  );
}