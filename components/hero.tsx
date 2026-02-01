'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Hero() {
  const [displayedRole, setDisplayedRole] = useState('');
  const roles = ['Full-Stack Developer', 'UI/UX Designer', 'Vibe Coder'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const delayBetweenRoles = 2000;

    const timer = setTimeout(() => {
      if (isDeleting) {
        if (displayedRole.length > 0) {
          setDisplayedRole(displayedRole.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      } else {
        if (displayedRole.length < currentRole.length) {
          setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), delayBetweenRoles);
        }
      }
    }, isDeleting || displayedRole.length === currentRole.length ? typingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedRole, currentRoleIndex, isDeleting, roles]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-31">
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        <div className="text-center w-full flex flex-col items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0 }}
            viewport={{ once: false }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-3 text-pretty text-white"
          >
            CHARLES VINCENT PANLILIO
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-2 sm:mb-3 font-light min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.75rem] flex items-center justify-center"
          >
            <span className="text-primary min-w-[200px] sm:min-w-[280px] md:min-w-[380px] inline-block text-center">{displayedRole}<span className="animate-pulse">|</span></span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
            className="text-sm sm:text-base md:text-lg text-foreground/60 mb-6 sm:mb-8 leading-relaxed px-2 max-w-4xl"
          >
            Eager to learn from professionals while supporting impactful projects
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: false }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2"
          >
            
            <a
              href="#projects"
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium text-white transition-all duration-300 w-full sm:w-auto hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(217, 70, 239, 0.8))',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
              }}
            >
              View My Work
            </a>
            
            <a
             href="#contact"
             className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium text-white/80 hover:text-white transition-all duration-300 w-full sm:w-auto hover:bg-white/10"
             style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
              }}
            >
              Get In Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: false }}
            className="mt-8 sm:mt-10 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <a href="#about" className="text-primary/60 hover:text-primary transition-colors">
                <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}