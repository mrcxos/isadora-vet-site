import { PawPrint, MessageCircle, Mail, Instagram, Heart } from "lucide-react";
import { useFooter } from "../../hooks/useSiteData";

const footerLinks = {
  Serviços: [
    { label: "Documentação Completa", href: "#servicos" },
    { label: "Logística de Transporte", href: "#servicos" },
    { label: "Consultoria Veterinária", href: "#servicos" },
    { label: "Orientação por Destino", href: "#destinos" },
    { label: "Checklist e Cronograma", href: "#servicos" },
  ],
  Destinos: [
    { label: "Portugal", href: "#destinos" },
    { label: "Estados Unidos", href: "#destinos" },
    { label: "Austrália", href: "#destinos" },
    { label: "Reino Unido", href: "#destinos" },
    { label: "Ver todos os destinos", href: "#destinos" },
  ],
  Institucional: [
    { label: "Sobre Isadora Lima", href: "#sobre" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Perguntas Frequentes", href: "#faq" },
    { label: "Política de Privacidade", href: "#" },
    { label: "Termos de Uso", href: "#" },
  ],
};

export function Footer() {
  const { data: footer } = useFooter();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#") return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "#1C1917", color: "rgba(255,255,255,0.85)" }}>
      <div className="py-16 px-6" style={{ background: "linear-gradient(135deg, #C4622D 0%, #A04E22 50%, #6B7C5C 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 600, color: "white", lineHeight: 1.2 }}>
            {footer.cta_title}
          </h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.0625rem", lineHeight: 1.6 }}>{footer.cta_subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contato" onClick={e => handleNavClick(e, "#contato")} className="px-8 py-4 rounded-2xl text-base font-semibold transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95" style={{ background: "white", color: "#C4622D" }}>
              {footer.cta_primary_label}
            </a>
            <a href={footer.whatsapp_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-semibold transition-all hover:-translate-y-0.5 active:scale-95" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "white" }}>
              <MessageCircle size={18} />{footer.cta_whatsapp_label}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #C4622D, #A04E22)" }}><PawPrint size={18} color="white" strokeWidth={2} /></div>
              <div>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "white", fontSize: "0.9375rem", lineHeight: 1.2 }}>Isadora Lima</p>
                <p style={{ color: "#C4622D", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.06em" }}>PET TRAVEL</p>
              </div>
            </div>
            <p className="mb-6" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.75, maxWidth: "300px" }}>{footer.brand_description}</p>
            <div className="flex gap-3">
              {[
                { icon: MessageCircle, href: footer.whatsapp_url,   color: "#25D366", label: "WhatsApp" },
                { icon: Instagram,     href: footer.instagram_url,  color: "#C13584", label: "Instagram" },
                { icon: Mail,          href: `mailto:${footer.email}`, color: "#C4622D", label: "Email" },
              ].map(({ icon: Icon, href, color, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", color }}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="mb-4" style={{ fontWeight: 600, color: "white", fontSize: "0.875rem", letterSpacing: "0.02em" }}>{title}</p>
              <ul className="flex flex-col gap-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} onClick={e => handleNavClick(e, link.href)} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.50)", textDecoration: "none" }}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="my-10" style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)" }}>© {new Date().getFullYear()} {footer.copyright_text}</p>
          <p className="flex items-center gap-1.5" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)" }}>
            Feito com <Heart size={13} fill="#C4622D" color="#C4622D" /> para os tutores e seus pets
          </p>
        </div>
      </div>
    </footer>
  );
}