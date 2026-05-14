import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    quote:
      'FlowAI has completely transformed how our team handles workflows...',
    name: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=EmmaL_Watson_88',
    title: 'Founder & CEO',
    company: 'TechFlow',
  },
  {
    id: 2,
    quote: 'The AI-powered automation is incredibly intuitive...',
    name: 'Marcus Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=MarcusRodriguez',
    title: 'CTO',
    company: 'Prism Labs',
  },
  {
    id: 3,
    quote: "Best investment we've made for our productivity...",
    name: 'Emily Watson',
    avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=MRodriguez_X9',
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

        <div className="grid gap-6 border-y p-2 px-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card/40 hover:border-border border p-6 transition-all duration-300"
            >
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {'"'}
                {testimonial.quote}
                {'"'}
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-primary/20 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
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
