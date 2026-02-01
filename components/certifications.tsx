'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const certifications = [
    {
      title: 'Cybersecurity Fundamentals',
      provider: 'Palo Alto Networks',
      date: '09/21/2024',
      image: 'img/cert_1.jpg',
    },
    {
      title: 'Network Security Fundamentals',
      provider: 'Palo Alto Networks',
      date: '09/22/2024',
      image: 'img/cert_2.jpg',
    },
    {
      title: 'Security Operations Fundamentals',
      provider: 'Palo Alto Networks',
      date: '09/26/2024',
      image: 'img/cert_3.jpg',
    },
    {
      title: 'Cloud Security Fundamentals',
      provider: 'Palo Alto Networks',
      date: '09/25/2024',
      image: 'img/cert_4.jpg',
    },
  ];

  const totalCertificates = certifications.length;
  const currentCert = certifications[currentPage];

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalCertificates);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalCertificates) % totalCertificates);
  };

  return (
    <>
      <section id="certifications" className="relative flex items-center py-20 sm:py-24 px-4 sm:px-6 min-h-fit">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="mb-8 sm:mb-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
              Certifications
            </h2>
          </motion.div>

          {/* Single Terminal Window - Wider */}
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
                onClick={() => setSelectedCert(currentPage)}
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
                      ~/charlesvincent/cert-{currentPage + 1}
                    </span>
                  </div>
                </div>

                {/* Terminal Content */}
                <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm space-y-4">
                  {/* Command */}
                  <div className="flex items-start gap-2">
                    <span className="text-violet-400">$</span>
                    <span className="text-green-400">cat certificate.json</span>
                  </div>

                  {/* Terminal Output - Certificate as JSON-like format */}
                  <div className="pl-4 space-y-3 text-foreground/80">
                    <div className="text-foreground/60">{"{"}</div>

                    <div className="pl-4 space-y-2">
                      {/* Certificate Title */}
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-400">"title"</span>
                        <span className="text-foreground/60">:</span>
                        <span className="text-yellow-400 flex-1 break-words">"{currentCert.title}"</span>
                        <span className="text-foreground/60">,</span>
                      </div>

                      {/* Provider */}
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-400">"provider"</span>
                        <span className="text-foreground/60">:</span>
                        <span className="text-yellow-400">"{currentCert.provider}"</span>
                        <span className="text-foreground/60">,</span>
                      </div>

                      {/* Date */}
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-400">"date"</span>
                        <span className="text-foreground/60">:</span>
                        <span className="text-yellow-400">"{currentCert.date}"</span>
                        <span className="text-foreground/60">,</span>
                      </div>

                      {/* View Action */}
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-400">"action"</span>
                        <span className="text-foreground/60">:</span>
                        <span className="text-green-400">"click_to_view"</span>
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
                    <span>Certificate loaded</span>
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
            {totalCertificates > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-4"
              >
                <button
                  onClick={prevPage}
                  className="p-2 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30 transition-colors"
                  aria-label="Previous certificate"
                >
                  <ChevronLeft className="w-5 h-5 text-violet-400" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalCertificates }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentPage
                          ? 'bg-violet-400 w-8'
                          : 'bg-violet-500/30 hover:bg-violet-500/50'
                      }`}
                      aria-label={`Go to certificate ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextPage}
                  className="p-2 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30 transition-colors"
                  aria-label="Next certificate"
                >
                  <ChevronRight className="w-5 h-5 text-violet-400" />
                </button>
              </motion.div>
            )}

            {/* Certificate Counter */}
            {totalCertificates > 1 && (
              <div className="text-center">
                <span className="text-xs sm:text-sm text-foreground/60 font-mono">
                  Certificate {currentPage + 1} of {totalCertificates}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-gradient-to-br from-violet-950/50 to-fuchsia-950/50 rounded-2xl border border-violet-500/30 p-4 sm:p-6 backdrop-blur-md max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 transition-colors border border-violet-500/30 z-10"
                aria-label="Close certificate"
              >
                <X className="w-5 h-5 text-violet-400" />
              </button>

              {/* Certificate Image */}
              <div className="flex justify-center p-4">
                <div className="max-w-lg w-full">
                  <img
                    src={certifications[selectedCert].image}
                    alt={certifications[selectedCert].title}
                    className="w-full h-auto rounded-lg border border-violet-500/30"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}