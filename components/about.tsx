'use client';

import { motion } from 'framer-motion';
import { Terminal, GraduationCap } from 'lucide-react';
import { FadeInView } from './fade-in-view';

export function About() {
  const educationItems = [
    {
      title: 'Bachelor of Science in Information Technology',
      period: '2021 - 2026',
      institution: 'Pampanga State University',
      location: 'Santa Ines, Bacolor, Pampanga',
      gradient: 'from-violet-500 to-fuchsia-500',
      bgColor: 'rgba(139, 92, 246, 0.05)',
      borderColor: 'rgba(139, 92, 246, 0.2)',
      badgeColor: 'bg-violet-500/20 text-violet-400',
      hoverGlow: 'from-violet-500/0 via-violet-500/5 to-violet-500/0',
    },
    {
      title: 'Senior High School Diploma (STEM)',
      period: '2019 - 2021',
      institution: 'Potrero National Highschool',
      location: 'Bulaon Resettlement, City of San Fernando, Pampanga',
      gradient: 'from-fuchsia-500 to-violet-500',
      bgColor: 'rgba(217, 70, 239, 0.05)',
      borderColor: 'rgba(217, 70, 239, 0.2)',
      badgeColor: 'bg-fuchsia-500/20 text-fuchsia-400',
      hoverGlow: 'from-fuchsia-500/0 via-fuchsia-500/5 to-fuchsia-500/0',
    },
  ];

  return (
    <section id="about" className="relative flex items-center py-20 sm:py-24 px-4 sm:px-6 min-h-fit">
      <div className="max-w-4xl mx-auto w-full">
        <FadeInView delay={0} className="mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">About Me</h2>
        </FadeInView>

        <div className="space-y-6">
          {/* Terminal Window */}
          <FadeInView delay={0.1} y={30} duration={0.8}>
            <div className="rounded-2xl overflow-hidden border border-violet-500/20 bg-black/40 backdrop-blur-sm">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-violet-950/30 border-b border-violet-500/20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <Terminal className="w-3 h-3 text-foreground/60" />
                  <span className="text-xs font-mono text-foreground/60">~/charlesvincent/about</span>
                </div>
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-violet-400">$</span>
                    <span className="text-green-400">cat bio.txt</span>
                  </div>
                  <div className="text-foreground/80 pl-4 space-y-3 font-sans text-sm sm:text-base leading-relaxed">
                    <p>
                      I'm a BSIT student at Pampanga State University with a deep passion for blending creative design with technical
                      innovation. My journey has been defined by an endless curiosity about how technology can transform ideas into
                      meaningful experiences.
                    </p>
                    <p>
                      What drives me is the intersection of artistry and engineering—building interfaces that are not just visually
                      compelling but also functionally robust. I thrive in environments where I can collaborate with seasoned professionals,
                      absorbing best practices while contributing fresh perspectives to challenging projects.
                    </p>
                    <p>
                      Beyond coding and design, I'm committed to continuous learning, whether it's exploring emerging technologies, diving
                      into open-source contributions, or working on side projects that push my technical boundaries.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <span className="text-violet-400">$</span>
                  <span className="text-foreground/60 animate-pulse">▊</span>
                </div>
              </div>
            </div>
          </FadeInView>

          {/* Education Section */}
          <FadeInView delay={0.2} y={30} duration={0.8}>
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-foreground">Education</h3>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {educationItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: false }}
                    className="group relative p-5 sm:p-6 rounded-xl transition-all duration-300"
                    style={{
                      background: item.bgColor,
                      border: `1px solid ${item.borderColor}`,
                    }}
                  >
                    {/* Glowing effect on hover */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.hoverGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative flex gap-4">
                      <div className={`flex-shrink-0 w-1 bg-gradient-to-b ${item.gradient} rounded-full`} />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <h4 className="text-lg sm:text-xl font-semibold text-foreground">
                            {item.title}
                          </h4>
                          <span className={`px-3 py-1 rounded-full ${item.badgeColor} text-xs font-medium whitespace-nowrap`}>
                            {item.period}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-foreground/60 mb-1">{item.institution}</p>
                        <p className="text-sm text-foreground/70">{item.location}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}