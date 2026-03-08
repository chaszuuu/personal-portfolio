'use client';

import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Footer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-[0.6rem] text-muted-foreground">
          &copy; 2025. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[0.6rem] text-muted-foreground/40">v2.0.0</span>
          <p className="font-mono text-[0.6rem] text-muted-foreground flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by{' '}
            <a
              href="https://github.com/chaszuuu"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              {mounted && (
                <Image
                  src="/img/chaszuulogo.png"
                  alt="chaszuu"
                  width={72}
                  height={24}
                  className="h-10 w-auto object-contain"
                />
              )}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}