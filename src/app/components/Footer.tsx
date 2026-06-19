import { PawPrint, MessageCircle, Mail, Instagram } from "lucide-react";
import { useFooter, useFooterLinks, useSiteSettings } from "../../hooks/useSiteData";

export function Footer() {
  const { data: footer } = useFooter();
  const { data: footerLinksList } = useFooterLinks();
  const { data: settings } = useSiteSettings();

  const footerGroups = footerLinksList.reduce<Array<{ name: string; links: typeof footerLinksList }>>(
    (acc, link) => {
      const g = acc.find(x => x.name === link.group_name);
      if (g) g.links.push(link);
      else acc.push({ name: link.group_name, links: [link] });
      return acc;
    },
    []
  );
  console.log('[Footer] footerLinksList:', footerLinksList)
  console.log('[Footer] footerGroups:', footerGroups)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#") return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: footer.bg_color, color: "rgba(255,255,255,0.85)" }}>
      <div className="py-16 px-6" style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 50%, var(--color-secondary) 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 600, color: "white", lineHeight: 1.2 }}>
            {footer.cta_title}
          </h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.0625rem", lineHeight: 1.6 }}>{footer.cta_subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contato" onClick={e => handleNavClick(e, "#contato")} className="px-8 py-4 rounded-2xl text-base font-semibold transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95" style={{ background: "white", color: "var(--color-primary)" }}>
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
              <div className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))" }}>
                {settings.logo_url ? (
                  <img src={settings.logo_url} alt={settings.company_name} className="w-9 h-9 object-contain" />
                ) : (
                  <PawPrint size={18} color="white" strokeWidth={2} />
                )}
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "white", fontSize: "0.9375rem", lineHeight: 1.2 }}>{settings.company_name}</p>
                <p style={{ color: "var(--color-primary)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.06em" }}>{settings.company_subtitle}</p>
              </div>
            </div>
            <p className="mb-6" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.75, maxWidth: "300px" }}>{footer.brand_description}</p>
            <div className="flex gap-3">
              {[
                { icon: MessageCircle, href: footer.whatsapp_url,   color: "#25D366", label: "WhatsApp" },
                { icon: Instagram,     href: footer.instagram_url,  color: "#C13584", label: "Instagram" },
                { icon: Mail,          href: `mailto:${footer.email}`, color: "var(--color-primary)", label: "Email" },
              ].map(({ icon: Icon, href, color, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", color }}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {footerGroups.map(({ name, links }) => (
            <div key={name}>
              <p className="mb-4" style={{ fontWeight: 600, color: "white", fontSize: "0.875rem", letterSpacing: "0.02em" }}>{name}</p>
              <ul className="flex flex-col gap-2.5">
                {links.map(link => (
                  <li key={link.id}>
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
          <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)" }}>{footer.credit_text}</p>
        </div>
      </div>
    </footer>
  );
}