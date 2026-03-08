'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FadeInView } from './fade-in-view';
import { MapPin, Mail, Github, Briefcase, FileText } from 'lucide-react';

interface EducationItem {
  degree: string;
  period: string;
  school: string;
  location: string;
}

const EDUCATION: EducationItem[] = [
  {
    degree: 'Bachelor of Science in Information Technology',
    period: '2021 – 2026',
    school: 'Pampanga State University',
    location: 'Santa Ines, Bacolor, Pampanga',
  },
  {
    degree: 'Senior High School — STEM',
    period: '2019 – 2021',
    school: 'Potrero National High School',
    location: 'Bulaon Resettlement, San Fernando, Pampanga',
  },
];

const BIO = [
  `I'm a BSIT student at Pampanga State University with a deep passion for blending creative design
   with technical innovation. My journey has been defined by an endless curiosity about how technology
   can transform ideas into meaningful experiences.`,
  `What drives me is the intersection of artistry and engineering — building interfaces that are not
   just visually compelling but also functionally robust. I thrive collaborating with seasoned
   professionals, absorbing best practices while contributing fresh perspectives.`,
  `Beyond coding and design, I'm committed to continuous learning — exploring emerging technologies,
   contributing to open-source, and pushing my technical boundaries through side projects.`,
];

interface InfoRow {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  accent?: boolean;
  isCV?: boolean;
}

const INFO_ROWS: InfoRow[] = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Fernando, Pampanga, PH',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'panliliocharlesvincent@gmail.com',
    href: 'mailto:panliliocharlesvincent@gmail.com',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/chaszuuu',
    href: 'https://github.com/chaszuuu',
  },
  {
    icon: Briefcase,
    label: 'Status',
    value: 'Open to opportunities',
    accent: true,
  },
  {
    icon: FileText,
    label: 'CV',
    value: '',
    href: '/CV-Charles_Vincent_Panlilio.pdf',
    isCV: true,
  },
];

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">
        <FadeInView>
          <p className="sec-label">About</p>
          <h2 className="text-4xl sm:text-5xl font-display font-normal tracking-tight text-foreground mb-12">
            Curious builder,<br /><em className="italic text-muted-foreground">creative thinker.</em>
          </h2>
        </FadeInView>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 items-start">
          {/* Bio */}
          <FadeInView delay={0.1}>
            <div className="space-y-4">
              {BIO.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
              ))}
            </div>

            {/* Info rows with icons */}
            <div className="mt-8 pt-8 border-t border-border space-y-2.5">
              {INFO_ROWS.map(({ icon: Icon, label, value, href, accent, isCV }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  viewport={{ once: false }}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="w-7 h-7 rounded-md border border-border bg-card flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <span className="font-mono text-[0.65rem] text-muted-foreground uppercase tracking-wider w-16 shrink-0">
                    {label}
                  </span>
                  {isCV ? (
                    <div className="flex items-center gap-2">
                      <a
                        href="/CV-Charles_Vincent_Panlilio.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-foreground text-background text-[0.65rem] font-medium hover:opacity-85 transition-all duration-200"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View
                      </a>
                      <a
                        href="/CV-Charles_Vincent_Panlilio.pdf"
                        download="CV-Charles_Vincent_Panlilio.pdf"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border bg-card text-muted-foreground text-[0.65rem] font-medium hover:text-foreground hover:bg-accent transition-all duration-200"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </a>
                    </div>
                  ) : href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-muted-foreground transition-colors underline underline-offset-4 decoration-border truncate"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className={`${accent ? 'text-green-500 font-medium flex items-center gap-1.5' : 'text-foreground'}`}>
                      {accent && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />}
                      {value}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

          </FadeInView>
          <FadeInView delay={0.2}>
            <p className="font-mono text-[0.68rem] tracking-widest uppercase text-muted-foreground mb-4">Education</p>
            <div className="space-y-3">
              {EDUCATION.map((item, i) => (
                <motion.div
                  key={item.degree}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: false }}
                  className="p-4 rounded-lg border border-border bg-card hover:bg-accent transition-colors duration-200"
                >
                  <p className="font-mono text-[0.62rem] text-muted-foreground tracking-wider mb-2">{item.period}</p>
                  <p className="text-sm font-medium text-foreground leading-snug mb-1">{item.degree}</p>
                  <p className="text-xs text-muted-foreground">{item.school}</p>
                  <p className="text-xs text-muted-foreground/70 mt-0.5">{item.location}</p>
                </motion.div>
              ))}
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}