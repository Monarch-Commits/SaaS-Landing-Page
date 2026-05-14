'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const WaveHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Wave Configuration
    const waves = [
      {
        y: height * 0.7,
        length: 0.002,
        amplitude: 60,
        frequency: 0.02,
        color: 'rgba(99, 102, 241, 0.3)', // Indigo
        speed: 0.01,
      },
      {
        y: height * 0.75,
        length: 0.001,
        amplitude: 80,
        frequency: 0.015,
        color: 'rgba(168, 85, 247, 0.2)', // Purple
        speed: -0.008,
      },
      {
        y: height * 0.65,
        length: 0.0015,
        amplitude: 40,
        frequency: 0.01,
        color: 'rgba(34, 211, 238, 0.25)', // Cyan
        speed: 0.012,
      },
    ];

    let increment = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw each wave layer
      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, wave.y);

        for (let i = 0; i < width; i++) {
          const dy =
            Math.sin(i * wave.length + increment * wave.speed) *
            wave.amplitude *
            Math.sin(increment * 0.01); // Vertical breathing

          ctx.lineTo(i, wave.y + dy);
        }

        ctx.lineTo(width, height);
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      increment += 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0c]">
      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0"
        style={{ filter: 'blur(60px)' }}
      />

      {/* Noise Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />

      {/* Radial Glow */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="mb-6 text-6xl font-bold tracking-tight text-white md:text-8xl">
            Future of{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Fluid
            </span>{' '}
            Design
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
            High-performance interactions meet premium aesthetics. Built for the
            next generation of SaaS interfaces.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full bg-white px-8 py-4 font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              Get Started
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}
              className="rounded-full border border-white/10 bg-transparent px-8 py-4 font-semibold text-white backdrop-blur-sm transition-colors"
            >
              View Documentation
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute right-0 bottom-0 left-0 z-[5] h-32 bg-gradient-to-t from-[#0a0a0c] to-transparent" />
    </div>
  );
};

export default WaveHero;
