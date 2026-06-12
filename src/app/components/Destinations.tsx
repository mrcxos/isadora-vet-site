import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useDestinations } from "../../hooks/useSiteData";

const difficultyColor = {
  "Simples":  { text: "#16A34A", bg: "rgba(22,163,74,0.10)" },
  "Moderado": { text: "#C4622D", bg: "rgba(196,98,45,0.10)" },
  "Rigoroso": { text: "#DC2626", bg: "rgba(220,38,38,0.10)" },
};

export function Destinations() {
  const { data: destinations } = useDestinations();

  return (
    <section id="destinos" className="py-28" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5" style={{ background: "rgba(107,124,92,0.10)", color: "#6B7C5C" }}>Destinos Atendidos</span>
          <h2 className="mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#1C1917", lineHeight: 1.2 }}>
            Levamos seu pet para<br />qualquer lugar do mundo
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "#78716C", fontSize: "1.0625rem", lineHeight: 1.7 }}>
            Conhecemos as regulamentações específicas de cada país. Seja para uma mudança permanente ou uma temporada, estamos prontos para orientar você em cada destino.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {destinations.map((dest, i) => {
            const dc = difficultyColor[dest.difficulty];
            return (
              <motion.div key={dest.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-default" style={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(28,25,23,0.07)", boxShadow: "0 2px 12px rgba(28,25,23,0.04)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(196,98,45,0.12)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,98,45,0.18)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(28,25,23,0.04)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(28,25,23,0.07)"; }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: "1.75rem" }}>{dest.flag}</span>
                    <span style={{ fontWeight: 600, color: "#1C1917", fontSize: "0.9375rem" }}>{dest.country}</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: dc.text, background: dc.bg }}>{dest.difficulty}</span>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {dest.requirements.map(req => (
                    <li key={req} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: "#C4622D" }} />
                      <span style={{ fontSize: "0.8125rem", color: "#57534E", lineHeight: 1.5 }}>{req}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-14 p-8 rounded-2xl text-center" style={{ background: "linear-gradient(135deg, rgba(196,98,45,0.06), rgba(107,124,92,0.06))", border: "1px solid rgba(196,98,45,0.14)" }}>
          <p style={{ color: "#57534E", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
            Não encontrou seu destino na lista? Atendemos <strong style={{ color: "#C4622D" }}>mais de 20 países</strong> ao redor do mundo. Entre em contato para uma consulta personalizada.
          </p>
          <button onClick={() => document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3" style={{ color: "#C4622D" }}>
            Consultar meu destino <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}