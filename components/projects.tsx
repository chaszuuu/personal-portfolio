'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const projects = [
    {
      title: 'AttachMates',
      summary: 'AI-powered dating app focused on compatibility matchmaking',
      images: [
        'img/attachmates_logo.png',
        'img/attachmates1.jpg',
        'img/attachmates2.jpg',
        'img/attachmates3.jpg',
        'img/attachmates4.jpg',
        'img/attachmates5.jpg',
        'img/attachmates6.jpg',
        'img/attachmates7.jpg',
        'img/attachmates8.jpg',
        'img/attachmates9.jpg'
      ],
      description: 'An AI-powered dating application that intelligently matches users based on attachment style, love language, and preferred gender. Designed with a mobile-first approach and secure user verification.',
      technologies: ['Flutter', 'Python (FastAPI)', 'Firebase Authentication', 'Firebase Firestore', 'Supabase Storage', 'Figma'],
      features: [
        'Compatibility-based matchmaking algorithm',
        'Attachment style and love language assessments',
        'Secure authentication and profile verification',
        'Real-time data synchronization',
      ],
      link: 'http://getattachmates.vercel.app',
      buttonText: 'View App',
    },
    {
      title: 'Tanim',
      summary: 'CRUD web app with real-time weather API integration',
      images: [
        'img/tanim_logo.png',
        'img/tanim-hero.png',
        'img/tanim-dashboard.png',
      ],
      description: 'A full CRUD web application integrated with a Weather API to provide real-time weather updates alongside dynamic data management.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Weather API'],
      features: [
        'Create, Read, Update, Delete operations',
        'Third-party API integration',
        'Dynamic content rendering',
      ],
      link: '',
      buttonText: 'Visit Website',
    },
    {
      title: 'College of Computing Studies Website',
      summary: 'Frontend website for the College of Computing Studies',
      images: ['img/college_of_computing_studies_logo.png'],
      description: 'A frontend-only informational website developed for the College of Computing Studies with a focus on responsive design and structured content.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      features: [
        'Responsive layout',
        'Organized academic content',
        'Clean navigation',
      ],
      link: 'https://collegeofcomputingstudiespsu.vercel.app/',
      buttonText: 'Visit Website',
    },
    {
      title: 'Personal Portfolio Website',
      summary: 'Personal portfolio with modern UI and animations',
      images: ['img/portfolio_logo.png'],
      description: 'A modern personal portfolio showcasing projects, skills, and experience with smooth animations and interactive components.',
      technologies: ['Next.js (React)', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'Vercel'],
      features: [
        'Animated sections and transitions',
        'Interactive project modals',
        'Responsive and performance-optimized UI',
      ],
      link: '#',
      buttonText: 'Visit Website',
    },
  ];

  const totalProjects = projects.length;
  const currentProject = projects[currentPage];

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalProjects);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject !== null) {
      const totalImages = projects[selectedProject].images.length;
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject !== null) {
      const totalImages = projects[selectedProject].images.length;
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  const openProject = (index: number) => {
    setSelectedProject(index);
    setCurrentImageIndex(0);
    setIsImageZoomed(false);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsImageZoomed(false);
  };

  return (
    <>
      <section id="projects" className="relative flex items-center py-20 sm:py-24 px-4 sm:px-6 min-h-fit">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="mb-8 sm:mb-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
              Featured Projects
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
                className="rounded-2xl overflow-hidden border border-violet-500/20 bg-black/40 backdrop-blur-sm cursor-pointer hover:border-violet-500/40 transition-colors"
                onClick={() => openProject(currentPage)}
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
                      ~/charlesvincent/project-{currentPage + 1}
                    </span>
                  </div>
                </div>

                {/* Terminal Content */}
                <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm space-y-4">
                  {/* Command */}
                  <div className="flex items-start gap-2">
                    <span className="text-violet-400">$</span>
                    <span className="text-green-400">cat project.json</span>
                  </div>

                  {/* Terminal Output - Project as JSON-like format */}
                  <div className="pl-4 space-y-3 text-foreground/80">
                    <div className="text-foreground/60">{"{"}</div>

                    <div className="pl-4 space-y-2">
                      {/* Project Title */}
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-400">"title"</span>
                        <span className="text-foreground/60">:</span>
                        <span className="text-yellow-400 flex-1 break-words">"{currentProject.title}"</span>
                        <span className="text-foreground/60">,</span>
                      </div>

                      {/* Summary */}
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-400">"summary"</span>
                        <span className="text-foreground/60">:</span>
                        <span className="text-yellow-400 flex-1 break-words">"{currentProject.summary}"</span>
                        <span className="text-foreground/60">,</span>
                      </div>

                      {/* Tech Stack Count */}
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-400">"technologies"</span>
                        <span className="text-foreground/60">:</span>
                        <span className="text-yellow-400">{currentProject.technologies.length}</span>
                        <span className="text-foreground/60">,</span>
                      </div>

                      {/* View Action */}
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-400">"action"</span>
                        <span className="text-foreground/60">:</span>
                        <span className="text-green-400">"click_to_view_details"</span>
                      </div>
                    </div>

                    <div className="text-foreground/60">{"}"}</div>
                  </div>

                  {/* Success Message */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="pt-2 flex items-center gap-2 text-green-400"
                  >
                    <span>✓</span>
                    <span>Project loaded</span>
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
            {totalProjects > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-4"
              >
                <button
                  onClick={prevPage}
                  className="p-2 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30 transition-colors"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-5 h-5 text-violet-400" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalProjects }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentPage
                          ? 'bg-violet-400 w-8'
                          : 'bg-violet-500/30 hover:bg-violet-500/50'
                      }`}
                      aria-label={`Go to project ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextPage}
                  className="p-2 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30 transition-colors"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-5 h-5 text-violet-400" />
                </button>
              </motion.div>
            )}

            {/* Project Counter */}
            {totalProjects > 1 && (
              <div className="text-center">
                <span className="text-xs sm:text-sm text-foreground/60 font-mono">
                  Project {currentPage + 1} of {totalProjects}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-gradient-to-br from-violet-950/50 to-fuchsia-950/50 rounded-2xl border border-violet-500/30 backdrop-blur-md max-h-[90vh] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 transition-colors border border-violet-500/30 z-20"
                aria-label="Close project"
              >
                <X className="w-5 h-5 text-violet-400" />
              </button>

              <div className="p-4 sm:p-6 overflow-y-auto max-h-[90vh] scrollbar-hide">
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Left Column - Image Carousel */}
                  <div className="flex items-start justify-center pt-8 lg:pt-0">
                    <div className="relative w-full max-w-sm">
                      <div 
                        className="relative aspect-square rounded-lg overflow-hidden border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-purple-500/10 cursor-pointer hover:border-violet-400/50 transition-colors"
                        onClick={() => setIsImageZoomed(true)}
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0"
                          >
                            <Image
                              src={projects[selectedProject].images[currentImageIndex]}
                              alt={`${projects[selectedProject].title} - Image ${currentImageIndex + 1}`}
                              fill
                              className="object-contain p-4"
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                          </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows - Only show if multiple images */}
                        {projects[selectedProject].images.length > 1 && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                prevImage(e);
                              }}
                              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-violet-500/30 hover:bg-violet-500/50 border border-violet-500/50 transition-colors backdrop-blur-sm z-10"
                              aria-label="Previous image"
                            >
                              <ChevronLeft className="w-4 h-4 text-white" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                nextImage(e);
                              }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-violet-500/30 hover:bg-violet-500/50 border border-violet-500/50 transition-colors backdrop-blur-sm z-10"
                              aria-label="Next image"
                            >
                              <ChevronRight className="w-4 h-4 text-white" />
                            </button>
                          </>
                        )}

                        {/* Click to zoom hint */}
                        <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-violet-500/30">
                          <span className="text-xs text-white/70">Click to zoom</span>
                        </div>
                      </div>

                      {/* Image Counter */}
                      {projects[selectedProject].images.length > 1 && (
                        <div className="mt-2 text-center">
                          <span className="text-xs text-white/60 font-mono">
                            {currentImageIndex + 1} / {projects[selectedProject].images.length}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Project Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                        {projects[selectedProject].title}
                      </h3>
                      <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                        {projects[selectedProject].description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-violet-400 uppercase tracking-wide mb-2">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {projects[selectedProject].technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-medium border border-violet-500/30 hover:bg-violet-500/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-violet-400 uppercase tracking-wide mb-2">
                        Key Features
                      </h4>
                      <ul className="space-y-1.5">
                        {projects[selectedProject].features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="text-xs sm:text-sm text-foreground/70 flex items-start gap-2"
                          >
                            <span className="text-violet-400 flex-shrink-0 mt-0.5">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    {projects[selectedProject].link && (
                      <div className="pt-2">
                        <motion.a
                          href={projects[selectedProject].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm rounded-lg font-semibold transition-colors shadow-lg shadow-violet-500/20"
                        >
                          {projects[selectedProject].buttonText}
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Zoom/Lightbox Modal */}
      <AnimatePresence>
        {isImageZoomed && selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageZoomed(false)}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          >
            <button
              onClick={() => setIsImageZoomed(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 transition-colors border border-violet-500/30 z-10"
              aria-label="Close zoomed image"
            >
              <X className="w-6 h-6 text-violet-400" />
            </button>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={projects[selectedProject].images[currentImageIndex]}
                alt={`${projects[selectedProject].title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />

              {/* Navigation arrows for zoomed view */}
              {projects[selectedProject].images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage(e);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-violet-500/30 hover:bg-violet-500/50 border border-violet-500/50 transition-colors backdrop-blur-sm z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage(e);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-violet-500/30 hover:bg-violet-500/50 border border-violet-500/50 transition-colors backdrop-blur-sm z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}

              {/* Image counter in zoomed view */}
              {projects[selectedProject].images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-sm border border-violet-500/30">
                  <span className="text-sm text-white font-mono">
                    {currentImageIndex + 1} / {projects[selectedProject].images.length}
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}