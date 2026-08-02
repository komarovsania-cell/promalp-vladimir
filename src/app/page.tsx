import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Coverage from "@/components/Coverage";
import Process from "@/components/Process";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink">
      <Header />
      <Hero />
      <About />
      <Services />
      <Coverage />
      <Process />
      <ContactForm />
      <Footer />
    </main>
  );
}
