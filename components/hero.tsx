import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="bg-glow absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.4_0.15_280_/_0.15)_0%,_transparent_70%)]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(oklch(0.98 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.98 0 0) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Floating Shapes */}
      <div className="bg-primary/20 absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full blur-[128px]" />
      <div className="bg-accent/20 absolute right-1/4 bottom-1/4 h-80 w-80 animate-pulse rounded-full blur-[128px] delay-1000" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="mb-8">
          <span className="bg-card/60 border-border/50 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-sm">
            <span className="bg-primary h-2 w-2 animate-pulse rounded-full" />
            Trusted by startups and enterprises worldwide
          </span>
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-foreground">Automate everything.</span>
          <br />
          <span className="text-gradient">
            Build faster with AI-powered workflows.
          </span>
        </h1>

        <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-pretty md:text-xl">
          FlowAI is the modern intelligence layer that helps teams automate
          tasks, generate insights, and scale operations effortlessly.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 h-12 rounded-full px-8 text-base font-medium"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-border/50 bg-card/30 hover:bg-card/50 h-12 rounded-full px-8 text-base font-medium backdrop-blur-sm"
          >
            <Play className="mr-2 h-4 w-4" />
            View Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
