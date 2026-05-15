import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { LogoStrip } from '@/components/logo-strip';
import { Features } from '@/components/features';
import { ProductShowcase } from '@/components/product-showcase';
import { Pricing } from '@/components/pricing';
import { Testimonials } from '@/components/testimonials';
import { FAQ } from '@/components/faq';
import { FinalCTA } from '@/components/final-cta';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="bg-background relative mx-auto min-h-screen max-w-300 border-x px-2 md:px-0">
      <Navbar />
      <Hero />
      <LogoStrip />
      <Features />
      <ProductShowcase />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
