import { useState, useEffect } from "react";
import { Menu, X, PawPrint } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Destinos", href: "#destinos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(250, 248, 245, 0.82)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(196, 98, 45, 0.12)" : "none",
          boxShadow: scrolled ? "0 1px 32px rgba(28,25,23,0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-18" style={{ height: "72px" }}>
            {/* Logo */}
            <a
              href="#inicio"
              onClick={(e) => handleNavClick(e, "#inicio")}
              className="flex items-center gap-2.5 group"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                style={{ background: "linear-gradient(135deg, #C4622D, #A04E22)" }}
              >
                <PawPrint size={18} color="white" strokeWidth={2} />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-sm tracking-wide"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    color: "#1C1917",
                    letterSpacing: "0.02em",
                  }}
                >
                  Isadora Lima
                </span>
                <span
                  className="text-xs"
                  style={{ color: "#C4622D", letterSpacing: "0.06em", fontWeight: 500 }}
                >
                  PET TRAVEL
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3.5 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-[#C4622D]/8"
                  style={{ color: "#44403C", fontWeight: 500 }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#C4622D";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#44403C";
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#contato"
                onClick={(e) => handleNavClick(e, "#contato")}
                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #C4622D, #A04E22)",
                  color: "white",
                  boxShadow: "0 2px 12px rgba(196,98,45,0.35)",
                }}
              >
                Consulta Gratuita
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: "#1C1917" }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-40 lg:hidden"
            style={{
              background: "rgba(250, 248, 245, 0.96)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(196, 98, 45, 0.12)",
              boxShadow: "0 8px 32px rgba(28,25,23,0.08)",
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-3 rounded-xl text-base transition-colors hover:bg-[#C4622D]/8"
                  style={{ color: "#1C1917", fontWeight: 500 }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contato"
                onClick={(e) => handleNavClick(e, "#contato")}
                className="mt-2 px-4 py-3 rounded-xl text-base font-medium text-center transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #C4622D, #A04E22)",
                  color: "white",
                }}
              >
                Consulta Gratuita
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
