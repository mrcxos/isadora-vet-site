import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useFaq } from "../../hooks/useSiteData";

export function FAQ() {
  const { data: faqs } = useFaq();
  const [open, setOpen] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("Todos");

  const categories = ["Todos", ...Array.from(new Set(faqs.map(f => f.category)))];
  const filtered = activeCategory === "Todos" ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <section id="faq" className="py-28" style={{ background: "#FAF8F5" }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5" style={{ background: "rgba(107,124,92,0.10)", color: "#6B7C5C" }}>Perguntas Frequentes</span>
          <h2 className="mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#1C1917", lineHeight: 1.2 }}>
            Tudo que você precisa<br />saber antes de viajar
          </h2>
          <p style={{ color: "#78716C", fontSize: "1.0625rem", lineHeight: 1.7 }}>
            Respondemos as dúvidas mais comuns dos tutores. Não encontrou o que procura? Entre em contato diretamente.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setOpen(null); }} className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200" style={{ background: activeCategory === cat ? "#C4622D" : "rgba(196,98,45,0.08)", color: activeCategory === cat ? "white" : "#C4622D" }}>
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {filtered.map((faq, i) => {
            const isOpen = open === faq.id;
            return (
              <motion.div key={faq.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }} className="rounded-2xl overflow-hidden transition-all duration-200" style={{ background: isOpen ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.85)", border: isOpen ? "1px solid rgba(196,98,45,0.22)" : "1px solid rgba(28,25,23,0.08)", boxShadow: isOpen ? "0 4px 24px rgba(196,98,45,0.10)" : "0 1px 6px rgba(28,25,23,0.04)" }}>
                <button onClick={() => setOpen(isOpen ? null : faq.id)} className="w-full flex items-start justify-between gap-4 p-6 text-left">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full mt-0.5 flex-shrink-0" style={{ background: "rgba(196,98,45,0.10)", color: "#C4622D" }}>{faq.category}</span>
                    <span style={{ fontWeight: 600, color: "#1C1917", fontSize: "0.9375rem", lineHeight: 1.4 }}>{faq.question}</span>
                  </div>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all" style={{ background: isOpen ? "#C4622D" : "rgba(196,98,45,0.10)", color: isOpen ? "white" : "#C4622D" }}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
                      <div className="px-6 pb-6 pt-0">
                        <div className="w-full h-px mb-4" style={{ background: "rgba(196,98,45,0.12)" }} />
                        <p style={{ color: "#57534E", fontSize: "0.9375rem", lineHeight: 1.75 }}>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-14 text-center p-8 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(196,98,45,0.08), rgba(107,124,92,0.06))", border: "1px solid rgba(196,98,45,0.14)" }}>
          <p style={{ color: "#44403C", fontSize: "1rem", marginBottom: "1.25rem", lineHeight: 1.6 }}>
            Ainda tem dúvidas? Fale diretamente com a Isadora — a consulta inicial é gratuita.
          </p>
          <button onClick={() => document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-medium transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95" style={{ background: "linear-gradient(135deg, #C4622D, #A04E22)", color: "white", boxShadow: "0 4px 16px rgba(196,98,45,0.30)" }}>
            Falar com a Isadora
          </button>
        </motion.div>
      </div>
    </section>
  );
}