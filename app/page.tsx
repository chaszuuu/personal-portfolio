'use client';

import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Skills } from '@/components/skills';
import { Projects } from '@/components/projects';
import { Certifications } from '@/components/certifications';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { AuroraBackground } from '@/components/background';

export default function Home() {
  return (
    <div className="relative bg-background text-foreground" style={{ overflowX: 'clip' }}>
      <AuroraBackground />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}