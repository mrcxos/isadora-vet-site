import { motion } from "motion/react";
import { GraduationCap, Award, Globe, Heart } from "lucide-react";
import { useAbout } from "../../hooks/useSiteData";

export function About() {
  const { data: { about, timeline } } = useAbout();

  const credentials = [
    { icon: GraduationCap, label: about.credential_1_label, sub: about.credential_1_sub },
    { icon: Award,         label: about.credential_2_label, sub: about.credential_2_sub },
    { icon: Globe,         label: about.credential_3_label, sub: about.credential_3_sub },
    { icon: Heart,         label: about.credential_4_label, sub: about.credential_4_sub },
  ];

  return (
    <section id="sobre" className="py-28 overflow-hidden" style={{ background: "#FAF8F5" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5" style={{ background: "rgba(196,98,45,0.10)", color: "#C4622D" }}>Sobre {about.name}</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#1C1917", lineHeight: 1.2 }}>
            A especialista que entende<br />o que seu pet significa para você
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0">
              <img src={about.photo_url} alt={`${about.name}, ${about.role_title}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,25,23,0.45) 0%, transparent 50%)" }} />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl" style={{ background: "rgba(250,248,245,0.88)", backdropFilter: "blur(16px)", border: "1px solid rgba(196,98,45,0.18)" }}>
                <p style={{ fontWeight: 700, color: "#1C1917", fontSize: "1.0625rem" }}>{about.name}</p>
                <p style={{ color: "#C4622D", fontSize: "0.875rem", fontWeight: 500 }}>{about.role_title}</p>
                <p style={{ color: "#78716C", fontSize: "0.8125rem", marginTop: "0.25rem" }}>{about.credentials_line}</p>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(196,98,45,0.18), rgba(107,124,92,0.18))", backdropFilter: "blur(8px)", border: "1px solid rgba(196,98,45,0.15)" }} />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6 max-w-md mx-auto lg:mx-0">
              {credentials.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(196,98,45,0.10)", boxShadow: "0 2px 8px rgba(28,25,23,0.04)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(196,98,45,0.10)" }}><Icon size={17} style={{ color: "#C4622D" }} /></div>
                  <div>
                    <p style={{ fontWeight: 600, color: "#1C1917", fontSize: "0.875rem" }}>{label}</p>
                    <p style={{ color: "#78716C", fontSize: "0.75rem" }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="mb-6" style={{ fontSize: "1.0625rem", color: "#44403C", lineHeight: 1.8 }}>{about.bio_paragraph_1}</p>
            <p className="mb-12" style={{ fontSize: "1.0625rem", color: "#44403C", lineHeight: 1.8 }}>{about.bio_paragraph_2}</p>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, #C4622D, #6B7C5C, transparent)" }} />
              <div className="flex flex-col gap-8">
                {timeline.map((item, i) => (
                  <motion.div key={item.id} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="pl-10 relative">
                    <div className="absolute left-2 top-1.5 w-4 h-4 rounded-full border-2 -translate-x-1/2" style={{ background: i % 2 === 0 ? "#C4622D" : "#6B7C5C", borderColor: "#FAF8F5", boxShadow: `0 0 0 3px ${i % 2 === 0 ? "rgba(196,98,45,0.20)" : "rgba(107,124,92,0.20)"}` }} />
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-bold tracking-wider mb-1.5" style={{ background: i % 2 === 0 ? "rgba(196,98,45,0.10)" : "rgba(107,124,92,0.10)", color: i % 2 === 0 ? "#C4622D" : "#6B7C5C" }}>{item.year}</span>
                    <h4 style={{ fontWeight: 600, color: "#1C1917", fontSize: "0.9375rem", marginBottom: "0.25rem" }}>{item.title}</h4>
                    <p style={{ fontSize: "0.875rem", color: "#78716C", lineHeight: 1.6 }}>{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}