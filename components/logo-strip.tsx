'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

const LOGOS = [
  { src: 'https://storage.efferd.com/logo/nvidia-wordmark.svg', alt: 'Nvidia' },
  {
    src: 'https://storage.efferd.com/logo/supabase-wordmark.svg',
    alt: 'Supabase',
  },
  { src: 'https://storage.efferd.com/logo/openai-wordmark.svg', alt: 'OpenAI' },
  { src: 'https://storage.efferd.com/logo/turso-wordmark.svg', alt: 'Turso' },
  { src: 'https://storage.efferd.com/logo/vercel-wordmark.svg', alt: 'Vercel' },
  { src: 'https://storage.efferd.com/logo/github-wordmark.svg', alt: 'GitHub' },
  {
    src: 'https://storage.efferd.com/logo/claude-wordmark.svg',
    alt: 'Claude AI',
  },
  { src: 'https://storage.efferd.com/logo/clerk-wordmark.svg', alt: 'Clerk' },
] as const;

// 3× for seamless infinite loop
const TRACK = [...LOGOS, ...LOGOS, ...LOGOS];

export function LogoStrip() {
  const rowRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const scrollAt = useRef(0);
  const [active, setActive] = useState(false);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    setActive(true);
    startX.current = e.clientX;
    scrollAt.current = rowRef.current?.scrollLeft ?? 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || !rowRef.current) return;
    rowRef.current.scrollLeft = scrollAt.current - (e.clientX - startX.current);
  }, []);

  const onPointerEnd = useCallback(() => {
    dragging.current = false;
    setActive(false);
  }, []);

  return (
    <>
      <section className="relative border-y py-14">
        {/* Outer wrapper holds fade edges so they don't scroll */}
        <div className="relative">
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-40 bg-gradient-to-r to-transparent" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-40 bg-gradient-to-l to-transparent" />

          <div
            ref={rowRef}
            aria-label="Partner logos"
            className={`overflow-x-auto overflow-y-hidden py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              active ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerLeave={onPointerEnd}
          >
            <div
              className={`marquee-track flex w-max items-center${active ? 'paused' : ''}`}
            >
              {TRACK.map((logo, i) => (
                <div
                  key={`${logo.alt}-${i}`}
                  className="logo-item flex items-center justify-center px-16 select-none md:px-20"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={32}
                    draggable={false}
                    className="!h-8 !w-auto max-w-[120px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
