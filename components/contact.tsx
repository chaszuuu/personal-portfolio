'use client';

import { motion } from 'framer-motion';
import { Github, Mail, Terminal } from 'lucide-react';
import { FadeInView } from './fade-in-view';

export function Contact() {
  const contactInfo = [
    {
      label: 'Gmail',
      icon: Mail,
      value: 'panliliocharlesvincent@gmail.com',
    },
    {
      label: 'GitHub',
      icon: Github,
      value: 'github.com/chaszuuu',
    },
  ];

  return (
    <section id="contact" className="relative flex items-center py-20 sm:py-24 px-4 sm:px-6 min-h-fit">
      <div className="max-w-4xl mx-auto w-full">
        <FadeInView delay={0} className="mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
            Let's Connect
          </h2>
        </FadeInView>

        <div className="space-y-6">
          {/* Terminal 1 - Message */}
          <FadeInView delay={0.1} y={50} duration={0.8}>
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
                  <span className="text-xs font-mono text-foreground/60">~/charlesvincent/message</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm space-y-4">
                {/* Command */}
                <div className="flex items-start gap-2">
                  <span className="text-violet-400">$</span>
                  <span className="text-green-400">cat message.txt</span>
                </div>

                {/* Message */}
                <div className="pl-4 text-foreground/80">
                  <p className="text-yellow-400 leading-relaxed">
                    I'm always open to new opportunities, collaborations, and conversations. Reach out and let's create something amazing together!
                  </p>
                </div>

                {/* Success Message */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pt-2 flex items-center gap-2 text-green-400"
                >
                  <span>✓</span>
                  <span>Message loaded</span>
                </motion.div>

                {/* Cursor */}
                <div className="flex items-start gap-2 pt-2">
                  <span className="text-violet-400">$</span>
                  <span className="text-foreground/60 animate-pulse">▊</span>
                </div>
              </div>
            </div>
          </FadeInView>

          {/* Terminals 2 & 3 - Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <motion.div
                  key={contact.label}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
                  viewport={{ once: false }}
                  className="rounded-2xl overflow-hidden border border-violet-500/20 bg-black/40 backdrop-blur-sm hover:border-violet-500/40 transition-colors group"
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
                      <span className="text-xs font-mono text-foreground/60">~/charlesvincent/contact-{index + 1}</span>
                    </div>
                  </div>

                  {/* Terminal Content */}
                  <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm space-y-4">
                    {/* Command */}
                    <div className="flex items-start gap-2">
                      <span className="text-violet-400">$</span>
                      <span className="text-green-400">cat {contact.label.toLowerCase()}.json</span>
                    </div>

                    {/* Contact Info as JSON */}
                    <div className="pl-4 space-y-3 text-foreground/80">
                      <div className="text-foreground/60">{'{'}</div>

                      <div className="pl-4 space-y-2">
                        {/* Platform */}
                        <div className="flex items-start gap-2">
                          <span className="text-cyan-400">"platform"</span>
                          <span className="text-foreground/60">:</span>
                          <span className="text-yellow-400 flex items-center gap-2">
                            "{contact.label}"
                            <Icon className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                          </span>
                          <span className="text-foreground/60">,</span>
                        </div>

                        {/* Link */}
                        <div className="flex items-start gap-2">
                          <span className="text-cyan-400">"link"</span>
                          <span className="text-foreground/60">:</span>
                          <a 
                            href={contact.label === 'Gmail' ? `mailto:${contact.value}` : `https://${contact.value}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-400 hover:text-yellow-300 transition-colors break-all"
                          >
                            "{contact.value}"
                          </a>
                        </div>
                      </div>

                      <div className="text-foreground/60">{'}'}</div>
                    </div>

                    {/* Success Message */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="pt-2 flex items-center gap-2 text-green-400"
                    >
                      <span>✓</span>
                      <span>Contact loaded</span>
                    </motion.div>

                    {/* Cursor */}
                    <div className="flex items-start gap-2 pt-2">
                      <span className="text-violet-400">$</span>
                      <span className="text-foreground/60 animate-pulse">▊</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: false }}
          className="space-y-2 pt-8 sm:pt-10 border-t border-border mt-8 sm:mt-10 text-center"
        >
          <p className="text-xs sm:text-sm text-foreground/50">
            ©2026 | Charles Vincent Panlilio | All rights reserved
          </p>
        </motion.div>
      </div>
    </section>
  );
}