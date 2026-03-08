'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleActiveSection = () => {
      const sections = navItems.map(item => item.href.substring(1));

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleActiveSection);
    handleActiveSection();
    return () => window.removeEventListener('scroll', handleActiveSection);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsMobileMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4"
      >
        <div
          className="flex items-center gap-1 px-2 py-2 rounded-full backdrop-blur-xl border shadow-lg"
          style={{
            background: 'var(--nav-bg)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--shadow-md), inset 0 1px 0 oklch(1 0 0 / 0.05)',
          }}
        >
          {/* Logo */}
          <Link
            href="#hero"
            className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden ml-1 hover:ring-2 hover:ring-ring/40 transition-all duration-300"
          >
            <Image
              src="/img/frieren.png"
              alt="CV Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-1 mx-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-1.5 text-xs font-medium transition-all duration-300 rounded-full group"
                >
                  <span className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                    {item.label}
                  </span>

                  {/* Active background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover background */}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-full bg-transparent group-hover:bg-accent/60 transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1.5 mr-1">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-accent/60 hover:bg-accent transition-all duration-300 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-4 right-4 z-40 p-4 rounded-2xl md:hidden backdrop-blur-xl border shadow-xl"
          style={{
            background: 'var(--nav-bg)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}