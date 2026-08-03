import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import About from "@/components/About";
import FeaturedServices from "@/components/FeaturedServices";
import Services from "@/components/Services";
import Calculator from "@/components/Calculator";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink">
      <Header />
      <Hero />
      <TrustStrip />
      <About />
      <FeaturedServices />
      <Services />
      <Calculator />
      <Portfolio />
      <Process />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}
