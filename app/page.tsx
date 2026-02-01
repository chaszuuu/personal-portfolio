'use client';

import { AuroraBackground } from '@/components/aurora-background';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Skills } from '@/components/skills';
import { Projects } from '@/components/projects';
import { Certifications } from '@/components/certifications';
import { Contact } from '@/components/contact';

export default function Home() {
  return (
    <div className="relative dark bg-background text-foreground overflow-x-hidden">
      <AuroraBackground />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </div>
    </div>
  );
}
