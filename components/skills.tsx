'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function Skills() {
  const [currentPage, setCurrentPage] = useState(0);

  const skillsData = [
    {
      category: 'Frontend',
      skills: [
        { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
        { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
        { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
        { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
        { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
        { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
        { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Python (FastAPI)', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
        { name: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
      ],
    },
    {
      category: 'Databases & Services',
      skills: [
        { name: 'Firebase Authentication', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg' },
        { name: 'Firebase Firestore', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg' },
        { name: 'Supabase Storage', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
      ],
    },
    {
      category: 'Tools & Design',
      skills: [
        { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
        { name: 'Vercel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg' },
        { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      ],
    },
  ];

  const totalCategories = skillsData.length;
  const currentCategory = skillsData[currentPage];

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalCategories);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalCategories) % totalCategories);
  };

  return (
    <section id="skills" className="relative flex items-center py-20 sm:py-24 px-4 sm:px-6 min-h-fit">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="mb-8 sm:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
            Skills & Expertise
          </h2>
        </motion.div>

        {/* Single Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
          className="space-y-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden border border-violet-500/20 bg-black/40 backdrop-blur-sm"
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-violet-950/30 border-b border-violet-500/20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <Terminal className="w-3 h-3 text-foreground/60" />
                  <span className="text-xs font-mono text-foreground/60">
                    ~/charlesvincent/{currentCategory.category.toLowerCase().replace(/\s+/g, '-')}
                  </span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm space-y-4">
                {/* Command */}
                <div className="flex items-start gap-2">
                  <span className="text-violet-400">$</span>
                  <span className="text-green-400">cat {currentCategory.category.toLowerCase().replace(/\s+/g, '-')}.json</span>
                </div>

                {/* Terminal Output - Skills as JSON-like format */}
                <div className="pl-4 space-y-3 text-foreground/80">
                  {/* Category Header - Terminal Style */}
                  <div className="flex items-center gap-2">
                    <span className="text-violet-400">"</span>
                    <span className="text-fuchsia-400 font-semibold">{currentCategory.category}</span>
                    <span className="text-violet-400">":</span>
                    <span className="text-foreground/60">[</span>
                  </div>

                  {/* Skills List */}
                  <div className="pl-6 space-y-2">
                    {currentCategory.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                        className="flex items-center gap-3 group"
                      >
                        <span className="text-foreground/60">{"{"}</span>
                        
                        {/* Skill Icon and Name */}
                        <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                          <img
                            src={skill.logo || '/placeholder.svg'}
                            alt={skill.name}
                            className="w-4 h-4 sm:w-5 sm:h-5"
                          />
                          <span className="text-cyan-400">"skill"</span>
                          <span className="text-foreground/60">:</span>
                          <span className="text-yellow-400">"{skill.name}"</span>
                        </div>

                        <span className="text-foreground/60">
                          {skillIndex === currentCategory.skills.length - 1 ? '}' : '},'}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-foreground/60">]</div>
                </div>

                {/* Success Message */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pt-2 flex items-center gap-2 text-green-400"
                >
                  <span>✓</span>
                  <span>{currentCategory.category} skills loaded</span>
                </motion.div>

                {/* Cursor */}
                <div className="flex items-start gap-2 pt-2">
                  <span className="text-violet-400">$</span>
                  <span className="text-foreground/60 animate-pulse">▊</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination Controls */}
          {totalCategories > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-4"
            >
              <button
                onClick={prevPage}
                className="p-2 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30 transition-colors"
                aria-label="Previous category"
              >
                <ChevronLeft className="w-5 h-5 text-violet-400" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalCategories }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentPage
                        ? 'bg-violet-400 w-8'
                        : 'bg-violet-500/30 hover:bg-violet-500/50'
                    }`}
                    aria-label={`Go to ${skillsData[index].category}`}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                className="p-2 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30 transition-colors"
                aria-label="Next category"
              >
                <ChevronRight className="w-5 h-5 text-violet-400" />
              </button>
            </motion.div>
          )}

          {/* Category Counter */}
          {totalCategories > 1 && (
            <div className="text-center">
              <span className="text-xs sm:text-sm text-foreground/60 font-mono">
                Category {currentPage + 1} of {totalCategories}
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}