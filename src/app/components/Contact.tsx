import { useState } from "react";
import { motion } from "motion/react";
import { MessageCircle, Mail, Instagram, Send, CheckCircle2, Phone } from "lucide-react";
import { useContact } from "../../hooks/useSiteData";

export function Contact() {
  const { data: contact } = useContact();
  const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "", pet: "", destination: "", timeline: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = { width: "100%", padding: "0.875rem 1rem", borderRadius: "12px", border: "1px solid rgba(28,25,23,0.12)", background: "rgba(255,255,255,0.8)", fontSize: "0.9375rem", color: "#1C1917", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s", fontFamily: "var(--font-sans)" };
  const labelStyle = { display: "block" as const, fontSize: "0.875rem", fontWeight: 600, color: "#1C1917", marginBottom: "0.5rem" };
  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { e.target.style.borderColor = "#C4622D"; e.target.style.boxShadow = "0 0 0 3px rgba(196,98,45,0.12)"; };
  const blurStyle  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { e.target.style.borderColor = "rgba(28,25,23,0.12)"; e.target.style.boxShadow = "none"; };

  return (
    <section id="contato" className="py-28" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5" style={{ background: "rgba(196,98,45,0.10)", color: "#C4622D" }}>Entre em Contato</span>
          <h2 className="mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#1C1917", lineHeight: 1.2 }}>
            {contact.section_title.includes('\n')
              ? contact.section_title.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)
              : contact.section_title}
          </h2>
          <p style={{ color: "#78716C", fontSize: "1.0625rem", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto" }}>{contact.section_subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2">
            <h3 className="mb-8" style={{ fontWeight: 600, color: "#1C1917", fontSize: "1.25rem", lineHeight: 1.3 }}>Fale comigo pelo canal de sua preferência</h3>

            <a href={`https://wa.me/${contact.whatsapp_number.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-2xl mb-4 transition-all duration-200 hover:-translate-y-0.5 group" style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.18)", textDecoration: "none" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(37,211,102,0.15)" }}><MessageCircle size={22} style={{ color: "#25D366" }} /></div>
              <div>
                <p style={{ fontWeight: 600, color: "#1C1917", fontSize: "0.9375rem" }}>WhatsApp</p>
                <p style={{ color: "#25D366", fontSize: "0.875rem", fontWeight: 500 }}>{contact.whatsapp_label}</p>
                <p style={{ color: "#78716C", fontSize: "0.8125rem" }}>{contact.whatsapp_number}</p>
              </div>
            </a>

            <a href={`mailto:${contact.email}`} className="flex items-center gap-4 p-5 rounded-2xl mb-4 transition-all duration-200 hover:-translate-y-0.5" style={{ background: "rgba(196,98,45,0.06)", border: "1px solid rgba(196,98,45,0.14)", textDecoration: "none" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(196,98,45,0.10)" }}><Mail size={22} style={{ color: "#C4622D" }} /></div>
              <div>
                <p style={{ fontWeight: 600, color: "#1C1917", fontSize: "0.9375rem" }}>E-mail</p>
                <p style={{ color: "#78716C", fontSize: "0.875rem" }}>{contact.email}</p>
                <p style={{ color: "#78716C", fontSize: "0.8125rem" }}>Resposta em até 24h</p>
              </div>
            </a>

            <a href={contact.instagram_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-2xl mb-4 transition-all duration-200 hover:-translate-y-0.5" style={{ background: "rgba(193,53,132,0.06)", border: "1px solid rgba(193,53,132,0.14)", textDecoration: "none" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(193,53,132,0.10)" }}><Instagram size={22} style={{ color: "#C13584" }} /></div>
              <div>
                <p style={{ fontWeight: 600, color: "#1C1917", fontSize: "0.9375rem" }}>Instagram</p>
                <p style={{ color: "#C13584", fontSize: "0.875rem" }}>{contact.instagram_handle}</p>
                <p style={{ color: "#78716C", fontSize: "0.8125rem" }}>Dicas e novidades</p>
              </div>
            </a>

            <a href={`tel:${contact.phone_number.replace(/\s/g, '')}`} className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5" style={{ background: "rgba(107,124,92,0.06)", border: "1px solid rgba(107,124,92,0.14)", textDecoration: "none" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(107,124,92,0.10)" }}><Phone size={22} style={{ color: "#6B7C5C" }} /></div>
              <div>
                <p style={{ fontWeight: 600, color: "#1C1917", fontSize: "0.9375rem" }}>Telefone</p>
                <p style={{ color: "#78716C", fontSize: "0.875rem" }}>{contact.phone_number}</p>
                <p style={{ color: "#78716C", fontSize: "0.8125rem" }}>{contact.phone_hours}</p>
              </div>
            </a>

            <div className="mt-8 p-5 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(196,98,45,0.06), rgba(107,124,92,0.06))", border: "1px solid rgba(196,98,45,0.12)" }}>
              <p style={{ fontSize: "0.875rem", color: "#57534E", lineHeight: 1.6 }}>
                🐾 <strong style={{ color: "#1C1917" }}>{contact.trust_badge_text}</strong>
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-3">
            <div className="p-8 lg:p-10 rounded-3xl" style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)", border: "1px solid rgba(196,98,45,0.12)", boxShadow: "0 8px 40px rgba(196,98,45,0.08)" }}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(196,98,45,0.12)" }}><CheckCircle2 size={32} style={{ color: "#C4622D" }} /></div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600, color: "#1C1917" }}>Mensagem recebida!</h3>
                  <p style={{ color: "#78716C", fontSize: "1rem", lineHeight: 1.7, maxWidth: "360px" }}>Obrigada pelo contato! Retornarei em até 24 horas com orientações personalizadas para a viagem do seu pet.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="mb-2" style={{ fontWeight: 700, color: "#1C1917", fontSize: "1.25rem" }}>Solicitar Consulta Gratuita</h3>
                  <p className="mb-8" style={{ color: "#78716C", fontSize: "0.9rem" }}>Preencha o formulário abaixo e entrarei em contato em até 24h.</p>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                      <label style={labelStyle}>Seu nome completo *</label>
                      <input type="text" required placeholder="Maria da Silva" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>E-mail *</label>
                      <input type="email" required placeholder="maria@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>WhatsApp *</label>
                      <input type="tel" required placeholder="+55 (11) 99999-9999" value={formData.whatsapp} onChange={e => setFormData({ ...formData, whatsapp: e.target.value })} style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Raça e espécie do pet</label>
                      <input type="text" placeholder="Golden Retriever, 3 anos" value={formData.pet} onChange={e => setFormData({ ...formData, pet: e.target.value })} style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>País de destino</label>
                      <input type="text" placeholder="Portugal, EUA, Austrália..." value={formData.destination} onChange={e => setFormData({ ...formData, destination: e.target.value })} style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                    </div>
                    <div className="sm:col-span-2">
                      <label style={labelStyle}>Quando pretende viajar?</label>
                      <select value={formData.timeline} onChange={e => setFormData({ ...formData, timeline: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }} onFocus={focusStyle} onBlur={blurStyle}>
                        <option value="">Selecione o prazo</option>
                        <option value="1-3 meses">Em 1 a 3 meses</option>
                        <option value="3-6 meses">Em 3 a 6 meses</option>
                        <option value="6-12 meses">Em 6 a 12 meses</option>
                        <option value="mais de 12 meses">Mais de 12 meses</option>
                        <option value="não definido">Ainda não definido</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label style={labelStyle}>Conte mais sobre sua situação</label>
                      <textarea rows={4} placeholder="Descreva brevemente: número de pets, destino, se já tem alguma documentação, dúvidas específicas..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }} onFocus={focusStyle} onBlur={blurStyle} />
                    </div>
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-base font-medium mt-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-95" style={{ background: "linear-gradient(135deg, #C4622D, #A04E22)", color: "white", boxShadow: "0 4px 20px rgba(196,98,45,0.35)" }}>
                    <Send size={18} />Solicitar Consulta Gratuita
                  </button>
                  <p className="text-center mt-4" style={{ fontSize: "0.8125rem", color: "#78716C" }}>Ao enviar, você concorda com nossa política de privacidade. Nenhum dado é compartilhado com terceiros.</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
