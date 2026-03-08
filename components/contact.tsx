'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Globe, ArrowUpRight, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { FadeInView } from './fade-in-view';
import { useState } from 'react';

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'panliliocharlesvincent@gmail.com',
    href: 'mailto:panliliocharlesvincent@gmail.com',
    icon: Mail,
    description: 'Best for project inquiries',
  },
  {
    label: 'GitHub',
    value: 'github.com/chaszuuu',
    href: 'https://github.com/chaszuuu',
    icon: Github,
    description: 'View my open-source work',
  },
  {
    label: 'Portfolio',
    value: 'charlesvincentpanlilio.vercel.app',
    href: 'https://charlesvincentpanlilio.vercel.app',
    icon: Globe,
    description: 'You are here',
  },
] as const;

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [fields, setFields] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!fields.name || !fields.email || !fields.message) return;
    setFormState('loading');
    try {
      // Replace YOUR_FORM_ID below with your actual Formspree form ID
      const res = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setFormState('success');
        setFields({ name: '', email: '', message: '' });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  const inputClass =
    'w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200';

  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — heading + contact links */}
          <FadeInView>
            <p className="sec-label">Contact</p>
            <h2 className="text-4xl sm:text-5xl font-display font-normal tracking-tight text-foreground mb-6">
              Let&apos;s build<br />
              <em className="italic text-muted-foreground">something together.</em>
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              I&apos;m always open to new opportunities, collaborations, and conversations.
              Reach out — I typically respond within 24 hours.
            </p>

            <div className="mt-10 space-y-3">
              {CONTACT_LINKS.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: false }}
                    className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-accent hover:border-ring/50 transition-all duration-200"
                  >
                    <div className="w-9 h-9 rounded-lg border border-border bg-background flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[0.6rem] text-muted-foreground uppercase tracking-wider mb-0.5">
                        {link.label}
                      </p>
                      <p className="text-sm font-medium text-foreground truncate">{link.value}</p>
                      <p className="text-xs text-muted-foreground">{link.description}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </motion.a>
                );
              })}
            </div>
          </FadeInView>

          {/* Right — contact form */}
          <FadeInView delay={0.15}>
            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="text-lg font-semibold text-foreground tracking-tight mb-1">
                Send a message
              </h3>
              <p className="text-xs text-muted-foreground mb-6">
                Fill out the form and I&apos;ll get back to you shortly.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={fields.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      disabled={formState === 'loading' || formState === 'success'}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={fields.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      disabled={formState === 'loading' || formState === 'success'}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or idea..."
                    rows={5}
                    disabled={formState === 'loading' || formState === 'success'}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={formState === 'loading' || formState === 'success' || !fields.name || !fields.email || !fields.message}
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-85 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {formState === 'loading' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                  ) : formState === 'success' ? (
                    <><CheckCircle className="w-4 h-4" /> Message sent!</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send message</>
                  )}
                </button>

                {/* Status messages */}
                <AnimatePresence>
                  {formState === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-xs text-green-500"
                    >
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                      Thanks! I&apos;ll get back to you within 24 hours.
                    </motion.p>
                  )}
                  {formState === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-2 text-xs text-destructive"
                    >
                      <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span>
                        Something went wrong. Try{' '}
                        <a href="mailto:panliliocharlesvincent@gmail.com" className="underline underline-offset-2">
                          emailing me directly
                        </a>{' '}
                        instead.
                        <button
                          onClick={() => setFormState('idle')}
                          className="ml-2 underline underline-offset-2"
                        >
                          Try again
                        </button>
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-[0.6rem] font-mono text-muted-foreground/50 text-center">
                  Powered by Formspree · No spam, ever.
                </p>
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}