import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-glow" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.4_0.15_280_/_0.15)_0%,_transparent_70%)]" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(oklch(0.98 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.98 0 0) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />
      
      {/* Floating Shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[128px] animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Trusted by startups and enterprises worldwide
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
          <span className="text-foreground">Automate everything.</span>
          <br />
          <span className="text-gradient">Build faster with AI-powered workflows.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty leading-relaxed">
          FlowAI is the modern intelligence layer that helps teams automate tasks, generate insights, and scale operations effortlessly.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 h-12 text-base font-medium"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 h-12 text-base font-medium border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50"
          >
            <Play className="mr-2 h-4 w-4" />
            View Demo
          </Button>
        </div>
      </div>
    </section>
  )
}
