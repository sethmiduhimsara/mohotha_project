import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Templates from "@/components/sections/Templates";
import InteractivePreview from "@/components/sections/InteractivePreview";
import WhatsAppPreview from "@/components/sections/WhatsAppPreview";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import SocialProofToast from "@/components/ui/SocialProofToast";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
        <Hero />
        <Templates />
        <InteractivePreview />
        <WhatsAppPreview />
        <Features />
        <HowItWorks />
        <SavingsCalculator />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <SocialProofToast />
    </>
  );
}
