import { motion } from "motion/react";
import { FileText, Plane, Stethoscope, MapPin, HeartHandshake, CheckCircle2, type LucideIcon } from "lucide-react";
import { useServices, useSectionContent } from "../../hooks/useSiteData";

const iconMap: Record<string, LucideIcon> = {
  FileText, Plane, Stethoscope, MapPin, HeartHandshake, CheckCircle2,
};

export function Services() {
  const { data: services } = useServices();
  const { data: section } = useSectionContent('services');

  return (
    <section id="servicos" className="py-28" style={{ background: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5" style={{ background: "rgba(196,98,45,0.10)", color: "var(--color-primary)" }}>{section.badge_text}</span>
          <h2 className="mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "var(--color-text-dark)", lineHeight: 1.2 }}>
            {(section.title ?? '').split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "#78716C", fontSize: "1.0625rem", lineHeight: 1.7 }}>
            {section.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon_name] ?? FileText;
            return (
              <motion.div key={service.id} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="group relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-default" style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(196,98,45,0.10)", boxShadow: "0 2px 16px rgba(28,25,23,0.05)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(196,98,45,0.14)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,98,45,0.22)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(28,25,23,0.05)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,98,45,0.10)"; }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${service.color}14`, border: `1px solid ${service.color}22` }}>
                  <Icon size={22} style={{ color: service.color }} />
                </div>
                <h3 className="mb-3" style={{ fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-text-dark)", lineHeight: 1.3 }}>{service.title}</h3>
                <p className="mb-5" style={{ fontSize: "0.9375rem", color: "#78716C", lineHeight: 1.65 }}>{service.description}</p>
                <ul className="flex flex-col gap-2">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: service.color }} />
                      <span style={{ fontSize: "0.875rem", color: "#57534E", fontWeight: 500 }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center mt-16">
          <button onClick={() => document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-medium transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-95" style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", color: "white", boxShadow: "0 4px 20px rgba(196,98,45,0.35)" }}>
            {section.cta_button_text}
          </button>
        </motion.div>
      </div>
    </section>
  );
}