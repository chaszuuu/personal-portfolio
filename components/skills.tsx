'use client';

import { FadeInView } from './fade-in-view';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  icon: string;
}

interface SkillGroup {
  category: string;
  skills: Skill[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
      { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
      { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
    ],
  },
  {
    category: 'Databases & Services',
    skills: [
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
      { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg' },
      { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
      { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
    ],
  },
  {
    category: 'Tools & Design',
    skills: [
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
      { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32 border-t border-border bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <FadeInView>
          <p className="sec-label">Expertise</p>
          <h2 className="text-4xl sm:text-5xl font-display font-normal tracking-tight text-foreground mb-16">
            Skills &amp; <em className="italic text-muted-foreground">Tech Stack</em>
          </h2>
        </FadeInView>

        <div className="space-y-0">
          {SKILL_GROUPS.map((group, gi) => (
            <FadeInView key={group.category} delay={gi * 0.08}>
              <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] gap-6 py-7 border-t border-border first:border-t-0">
                {/* Category label pinned left */}
                <div className="pt-1">
                  <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-muted-foreground">
                    {group.category}
                  </span>
                </div>

                {/* Skills inline row */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, si) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: si * 0.04, duration: 0.3 }}
                      viewport={{ once: false }}
                      whileHover={{ y: -2 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card hover:bg-accent hover:border-ring/40 transition-all duration-200 cursor-default group"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-4 h-4 object-contain dark:[&[src*='nextjs']]:invert dark:[&[src*='github']]:invert dark:[&[src*='vercel']]:invert dark:[&[src*='flask']]:invert"
                      />
                      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}