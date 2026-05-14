import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for individuals and small projects.",
    features: [
      "Up to 3 workflows",
      "Basic AI automation",
      "Community support",
      "API access",
      "1 team member",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    description: "Best for growing teams and businesses.",
    features: [
      "Unlimited workflows",
      "Advanced AI features",
      "Priority support",
      "Custom integrations",
      "Up to 10 team members",
      "Analytics dashboard",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$29",
    period: "per month",
    description: "For teams that need enterprise features.",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "SSO & SAML",
      "Custom SLA",
      "Dedicated support",
      "Advanced security",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-glow" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Start for free, upgrade when you need. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl transition-all duration-300 ${
                plan.highlighted
                  ? "bg-gradient-to-b from-primary/20 to-card border-2 border-primary/50 scale-105"
                  : "bg-card/40 border border-border/50 hover:border-border"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-foreground">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.highlighted ? "bg-primary/20" : "bg-muted"
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${
                          plan.highlighted ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full rounded-full ${
                  plan.highlighted
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
