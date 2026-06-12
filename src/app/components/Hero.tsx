import { motion } from "motion/react";
import { ArrowRight, Star, Shield, Globe } from "lucide-react";
import { useHero } from "../../hooks/useSiteData";

export function Hero() {
  const { data: hero } = useHero();

  const handleScrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={hero.bg_image_url}
          alt="Dois cachorros em frente a um avião, prontos para viagem internacional"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(28,25,23,0.72) 0%, rgba(28,25,23,0.45) 50%, rgba(107,124,92,0.25) 100%)" }} />
      </div>

      <div className="absolute top-24 right-8 lg:right-24 w-48 h-48 rounded-3xl hidden md:block" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }} />
      <div className="absolute bottom-32 right-16 lg:right-48 w-28 h-28 rounded-2xl hidden md:block" style={{ background: "rgba(196,98,45,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(196,98,45,0.25)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: "rgba(196,98,45,0.22)", backdropFilter: "blur(12px)", border: "1px solid rgba(196,98,45,0.35)", color: "#FFD6B8" }}>
            <Star size={14} fill="currentColor" />
            <span className="text-sm font-medium tracking-wide">{hero.badge_text}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mb-6 leading-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 600, color: "#FFFFFF", lineHeight: 1.12 }}>
            {hero.title_line_1}
            <br />
            <span style={{ color: "#E8845A" }}>{hero.title_line_2}</span>
            <br />
            {hero.title_line_3}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-10 max-w-xl" style={{ fontSize: "1.125rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.7, fontWeight: 400 }}>
            {hero.subtitle}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-wrap gap-4 mb-16">
            <button onClick={() => handleScrollTo("#contato")} className="group flex items-center gap-2.5 px-7 py-4 rounded-2xl text-base font-medium transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 active:scale-95" style={{ background: "linear-gradient(135deg, #C4622D, #A04E22)", color: "white", boxShadow: "0 4px 24px rgba(196,98,45,0.45)" }}>
              {hero.cta_primary_label}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={() => handleScrollTo("#servicos")} className="flex items-center gap-2.5 px-7 py-4 rounded-2xl text-base font-medium transition-all duration-300 hover:-translate-y-0.5 active:scale-95" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.28)", color: "white" }}>
              {hero.cta_secondary_label}
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="flex flex-wrap gap-6">
            {[
              { icon: Shield, text: hero.trust_1_text },
              { icon: Globe,  text: hero.trust_2_text },
              { icon: Star,   text: hero.trust_3_text },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.9)" }}>
                <Icon size={15} style={{ color: "#E8845A" }} />
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-px h-10" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }} />
      </motion.div>
    </section>
  );
}