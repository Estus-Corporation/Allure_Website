import Header from "@/components/header";
import Hero from "@/components/hero";
import PartnersHero from "@/components/partners-hero";
import HowItWorks from "@/components/how-it-works";
import ProjectsCarousel from "@/components/projects-carousel";
import Solutions from "@/components/solutions";
import SavingsCalculator from "@/components/savings-calculator";
import Testimonials from "@/components/testimonials";
import WhyAllure from "@/components/why-allure";
import FAQ from "@/components/faq";
import FinalCTA from "@/components/final-cta";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <PartnersHero />
        <Solutions />
        <HowItWorks />
        <ProjectsCarousel />
        <Testimonials />
        <WhyAllure />
        <SavingsCalculator />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
