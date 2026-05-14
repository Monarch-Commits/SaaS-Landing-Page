import { Zap, GitBranch, Users, Plug, BarChart3, Shield } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'AI Workflow Automation',
    description:
      'Automate repetitive tasks with intelligent workflows that learn and adapt to your processes.',
  },
  {
    icon: GitBranch,
    title: 'Smart Task Routing',
    description:
      'Automatically route tasks to the right team members based on skills, workload, and priorities.',
  },
  {
    icon: Users,
    title: 'Real-time Collaboration',
    description:
      'Work together seamlessly with live updates, comments, and shared workspaces.',
  },
  {
    icon: Plug,
    title: 'API Integrations',
    description:
      'Connect with 200+ tools and services. Build custom integrations with our developer API.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description:
      'Get actionable insights with real-time analytics, custom reports, and performance metrics.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description:
      'SOC 2 compliant with end-to-end encryption, SSO, and advanced access controls.',
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="bg-glow-bottom absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-medium">
            Features
          </span>
          <h2 className="mb-4 text-3xl font-bold text-balance md:text-4xl lg:text-5xl">
            Everything you need to scale
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-pretty">
            Powerful features designed for modern teams. Built for performance,
            security, and scale.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-card/40 border-border/50 hover:bg-card/60 hover:border-border relative border p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="from-primary/5 absolute inset-0 bg-gradient-to-b to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="bg-primary/10 group-hover:bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
                  <feature.icon className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-2 text-lg font-semibold">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
