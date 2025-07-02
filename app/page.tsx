import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { DashboardPreview } from '@/components/dashboard-preview';
import { NewsletterSection } from '@/components/newsletter-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <DashboardPreview />
      <NewsletterSection />
      <Footer />
    </main>
  );
}