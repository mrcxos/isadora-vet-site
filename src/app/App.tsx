{/* MARKER-MAKE-KIT-INVOKED */}
import "../styles/fonts.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { HowItWorks } from "./components/HowItWorks";
import { Destinations } from "./components/Destinations";
import { About } from "./components/About";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "var(--font-sans)",
        background: "var(--background)",
        color: "var(--foreground)",
        scrollBehavior: "smooth",
      }}
    >
      <Header />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Destinations />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
