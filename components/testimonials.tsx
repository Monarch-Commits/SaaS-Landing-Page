const testimonials = [
  {
    quote:
      "FlowAI has completely transformed how our team handles workflows. We've reduced manual tasks by 80% in just two months.",
    name: 'Sarah Chen',
    title: 'Founder & CEO',
    company: 'TechFlow',
  },
  {
    quote:
      "The AI-powered automation is incredibly intuitive. It's like having an extra team member that never sleeps.",
    name: 'Marcus Rodriguez',
    title: 'CTO',
    company: 'Prism Labs',
  },
  {
    quote:
      "Best investment we've made for our productivity. The analytics alone have helped us optimize our entire process.",
    name: 'Emily Watson',
    title: 'Product Designer',
    company: 'NovaAI',
  },
];

export function Testimonials() {
  return (
    <section className="border-border/30 relative border-t py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="bg-accent/10 text-accent mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-medium">
            Testimonials
          </span>
          <h2 className="mb-4 text-3xl font-bold text-balance md:text-4xl lg:text-5xl">
            Loved by teams worldwide
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-pretty">
            See what our customers have to say about FlowAI.
          </p>
        </div>

        <div className="grid gap-6 border-y px-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-card/40 hover:border-border border p-6 transition-all duration-300"
            >
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {'"'}
                {testimonial.quote}
                {'"'}
              </p>
              <div className="flex items-center gap-4">
                <div className="from-primary/30 to-accent/30 h-12 w-12 rounded-full bg-gradient-to-br" />
                <div>
                  <p className="text-foreground font-medium">
                    {testimonial.name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
