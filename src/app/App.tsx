{/* MARKER-MAKE-KIT-INVOKED */}
import "../styles/fonts.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { HowItWorks } from "./components/HowItWorks";
import { Destinations } from "./components/Destinations";
import { About } from "./components/About";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import {
  useSiteSettings, useContact, useNavLinks,
  useHero, useServices, useHowItWorksSteps,
  useDestinations, useAbout, useFaq,
  useFooter, useFooterLinks, useSectionContent,
} from "../hooks/useSiteData";
import React, { useEffect } from "react";

export default function App() {
  const { data: settings, loading: settingsLoading }          = useSiteSettings();
  const { loading: navLinksLoading }                           = useNavLinks();
  const { loading: heroLoading }                               = useHero();
  const { loading: servicesLoading }                           = useServices();
  const { loading: servicesSectionLoading }                    = useSectionContent('services');
  const { loading: howItWorksStepsLoading }                    = useHowItWorksSteps();
  const { loading: howItWorksSectionLoading }                  = useSectionContent('how_it_works');
  const { loading: destinationsLoading }                       = useDestinations();
  const { loading: destinationsSectionLoading }                = useSectionContent('destinations');
  const { loading: aboutLoading }                              = useAbout();
  const { loading: faqLoading }                                = useFaq();
  const { loading: faqSectionLoading }                         = useSectionContent('faq');
  const { loading: footerLoading }                             = useFooter();
  const { loading: footerLinksLoading }                        = useFooterLinks();
  const { data: contact, loading: contactLoading }             = useContact();

  const isLoading =
    settingsLoading || navLinksLoading || heroLoading ||
    servicesLoading || servicesSectionLoading ||
    howItWorksStepsLoading || howItWorksSectionLoading ||
    destinationsLoading || destinationsSectionLoading ||
    aboutLoading || faqLoading || faqSectionLoading ||
    footerLoading || footerLinksLoading || contactLoading;

  useEffect(() => {
    const raw = settings.tracking_scripts?.trim()
    if (!raw) return
    const injected: HTMLElement[] = []
    const temp = document.createElement('div')
    temp.innerHTML = raw
    Array.from(temp.childNodes).forEach(node => {
      if (node.nodeName === 'SCRIPT') {
        const src = node as HTMLScriptElement
        const script = document.createElement('script')
        Array.from(src.attributes).forEach(attr => script.setAttribute(attr.name, attr.value))
        script.textContent = src.textContent
        document.head.appendChild(script)
        injected.push(script)
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const clone = (node as Element).cloneNode(true) as HTMLElement
        document.head.appendChild(clone)
        injected.push(clone)
      }
    })
    return () => { injected.forEach(el => el.parentNode?.removeChild(el)) }
  }, [settings.tracking_scripts])

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAF8F5' }}>
        <div className="animate-spin" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '3px solid rgba(196,98,45,0.15)', borderTopColor: '#C4622D' }} />
      </div>
    );
  }

  const themeVars = {
    "--color-primary":      settings.color_primary      ?? "#C4622D",
    "--color-primary-dark": settings.color_primary_dark ?? "#A04E22",
    "--color-secondary":    settings.color_secondary    ?? "#6B7C5C",
    "--color-accent":       settings.color_accent       ?? "#E8845A",
    "--color-text-dark":    settings.color_text_dark    ?? "#1C1917",
    "--color-bg-light":     settings.color_bg_light     ?? "#FAF8F5",
  } as React.CSSProperties;

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "var(--font-sans)",
        background: "var(--background)",
        color: "var(--foreground)",
        scrollBehavior: "smooth",
        ...themeVars,
      }}
    >
      <Header />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Destinations />
        <About />
        <FAQ />
        {contact.is_visible !== false && <Contact />}
      </main>
      <Footer />
    </div>
  );
}
