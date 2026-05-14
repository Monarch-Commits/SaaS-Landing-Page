import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.5_0.2_280_/_0.2)_0%,_transparent_60%)]" />
      
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
          Start building intelligent workflows today
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
          Join thousands of teams who are already automating their work with FlowAI. Get started in minutes, no credit card required.
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
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  )
}
