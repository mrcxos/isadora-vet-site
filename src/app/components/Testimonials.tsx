import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTestimonials, useSectionContent } from "../../hooks/useSiteData";

export function Testimonials() {
  const { data: testimonials } = useTestimonials();
  const { data: section } = useSectionContent('testimonials');
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);
  const t = testimonials[current] ?? testimonials[0];

  if (!t) return null;

  return (
    <section id="depoimentos" className="py-28 overflow-hidden" style={{ background: "linear-gradient(135deg, var(--color-text-dark) 0%, #292524 60%, #3B2D28 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5" style={{ background: "rgba(196,98,45,0.22)", color: "var(--color-accent)" }}>{section.badge_text}</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#FFFFFF", lineHeight: 1.2 }}>
            {(section.title ?? '').split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>
        </motion.div>

        <div className="flex justify-center gap-1 mb-14">
          {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="var(--color-primary)" color="var(--color-primary)" />)}
          <span className="ml-3 text-sm font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>{section.secondary_text}</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="relative p-10 lg:p-14 rounded-3xl" style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 4px 48px rgba(0,0,0,0.25)" }}>
              <Quote size={40} style={{ color: "rgba(196,98,45,0.4)", marginBottom: "1.5rem" }} />
              <p className="mb-10" style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)", color: "rgba(255,255,255,0.88)", lineHeight: 1.8, fontStyle: "italic" }}>
                "{t.text}"
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}>
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: "#FFFFFF", fontSize: "0.9375rem" }}>{t.name}</p>
                    <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)", marginTop: "0.125rem" }}>{t.location}</p>
                    <p style={{ fontSize: "0.8125rem", color: "var(--color-accent)", marginTop: "0.125rem" }}>{t.pet}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="var(--color-primary)" color="var(--color-primary)" />)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-5 mt-8">
            <button onClick={prev} className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.7)" }}>
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className="transition-all duration-300 rounded-full" style={{ width: i === current ? "24px" : "8px", height: "8px", background: i === current ? "var(--color-primary)" : "rgba(255,255,255,0.25)" }} />
              ))}
            </div>
            <button onClick={next} className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.7)" }}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {testimonials.map((t, i) => (
            <motion.button key={t.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} onClick={() => setCurrent(i)} className="text-left p-5 rounded-2xl transition-all duration-200" style={{ background: current === i ? "rgba(196,98,45,0.14)" : "rgba(255,255,255,0.04)", border: current === i ? "1px solid rgba(196,98,45,0.35)" : "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: t.color }}>{t.initials}</div>
                <div>
                  <p style={{ fontWeight: 600, color: "#FFFFFF", fontSize: "0.8125rem" }}>{t.name}</p>
                  <p style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.45)" }}>{t.pet}</p>
                </div>
              </div>
              <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {t.text}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}