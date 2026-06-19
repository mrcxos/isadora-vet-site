import { motion } from "motion/react";
import {
  MessageCircle, ClipboardList, FileCheck, Plane, PartyPopper,
  GraduationCap, Award, Globe, Heart, Shield, Star,
  CheckCircle2, PawPrint, Trophy, ThumbsUp, BadgeCheck, Medal, Sparkles,
} from "lucide-react";
import { useHowItWorksSteps, useSectionContent } from "../../hooks/useSiteData";

type IconComponent = typeof GraduationCap;
const STEP_ICONS: Record<string, IconComponent> = {
  MessageCircle, ClipboardList, FileCheck, Plane, PartyPopper,
  GraduationCap, Award, Globe, Heart, Shield, Star,
  CheckCircle2, PawPrint, Trophy, ThumbsUp, BadgeCheck, Medal, Sparkles,
};

export function HowItWorks() {
  const { data: section } = useSectionContent('how_it_works');
  const { data: steps } = useHowItWorksSteps();

  const title = section.title ?? '';
  const titleLines = title.split('\n');

  return (
    <section
      className="py-28"
      style={{ background: "linear-gradient(180deg, var(--color-bg-light) 0%, #FFFFFF 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ background: "rgba(107,124,92,0.10)", color: "var(--color-secondary)" }}
          >
            {section.badge_text}
          </span>
          <h2
            className="mb-5"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 600,
              color: "var(--color-text-dark)",
              lineHeight: 1.2,
            }}
          >
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p
            className="max-w-xl mx-auto"
            style={{ color: "#78716C", fontSize: "1.0625rem", lineHeight: 1.7 }}
          >
            {section.subtitle}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div
            className="absolute top-12 left-0 right-0 h-px hidden lg:block"
            style={{ background: "linear-gradient(to right, transparent, #C4622D44, #6B7C5C44, #C4622D44, transparent)" }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, i) => {
              const Icon = STEP_ICONS[step.icon_name] ?? Plane;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Icon circle */}
                  <div className="relative mb-6">
                    <div
                      className="w-24 h-24 rounded-2xl flex items-center justify-center relative z-10"
                      style={{
                        background: i % 2 === 0
                          ? "linear-gradient(135deg, rgba(196,98,45,0.12), rgba(196,98,45,0.06))"
                          : "linear-gradient(135deg, rgba(107,124,92,0.12), rgba(107,124,92,0.06))",
                        border: `1px solid ${i % 2 === 0 ? "rgba(196,98,45,0.20)" : "rgba(107,124,92,0.20)"}`,
                        boxShadow: `0 4px 20px ${i % 2 === 0 ? "rgba(196,98,45,0.10)" : "rgba(107,124,92,0.10)"}`,
                      }}
                    >
                      <Icon size={28} style={{ color: i % 2 === 0 ? "var(--color-primary)" : "var(--color-secondary)" }} />
                    </div>
                    {/* Step number badge */}
                    <div
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white z-20"
                      style={{
                        background: i % 2 === 0
                          ? "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))"
                          : "linear-gradient(135deg, var(--color-secondary), #4E5C42)",
                      }}
                    >
                      {step.step_number}
                    </div>
                  </div>

                  <h3
                    className="mb-2"
                    style={{ fontWeight: 600, color: "var(--color-text-dark)", fontSize: "0.9375rem", lineHeight: 1.3 }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#78716C", lineHeight: 1.65 }}>
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
