import React from 'react';
import { Mail, Phone, Globe, Calendar, CheckCircle2, Award, Briefcase, Sparkles, Languages, Compass, ExternalLink } from 'lucide-react';
import { CVData } from '../data/cvData';

interface CVDocumentProps {
  data: CVData;
  lang: 'es' | 'en';
  onContactClick?: (type: 'email' | 'phone' | 'web') => void;
  innerRef?: React.RefObject<HTMLDivElement | null>;
}

export const CVDocument: React.FC<CVDocumentProps> = ({
  data,
  lang,
  onContactClick,
  innerRef,
}) => {
  return (
    <div
      ref={innerRef}
      id="cv-printable-document"
      className="cv-carrier w-full max-w-[794px] min-h-[1123px] bg-white shadow-xl text-[#1b1c18] p-7 sm:p-11 md:p-12 flex flex-col justify-between relative overflow-hidden transition-all duration-300 rounded-sm border border-[#c5c6cb]/30"
    >
      {/* Subtle Archival Grain Gradient Accent (Interior Depth) */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#080e15] via-[#785837] to-[#080e15]"></div>
      <div className="absolute -right-24 -top-24 w-64 h-64 bg-[#eae8e2]/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 bottom-32 w-56 h-56 bg-[#785837]/5 rounded-full blur-2xl pointer-events-none"></div>

      {/* DOCUMENT CORE */}
      <div className="flex flex-col gap-6 sm:gap-7 relative z-10">
        {/* SECTION 1: HEADER & IDENTITY BLOCK */}
        <header className="flex flex-col gap-5">
          <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-5 pb-4 border-b border-[#c5c6cb]/40 bg-gradient-to-b from-transparent to-[#f5f3ed]/30">
            {/* Identity & Title */}
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#fed2a9]/50 text-[#795938] text-[10px] uppercase font-sans font-semibold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#785837]"></span>
                  {lang === 'es' ? 'Perfil Profesional' : 'Professional Profile'}
                </span>
                <span className="text-[10px] font-sans text-[#785837] font-medium uppercase tracking-wider">
                  Curriculum Vitae
                </span>
              </div>

              <h1 className="font-display font-semibold tracking-tight text-[#080e15] text-2xl sm:text-3xl md:text-[34px] leading-tight">
                {data.fullName}
              </h1>

              <p className="font-sans text-xs sm:text-sm text-[#44474b] mt-2 flex flex-wrap items-center">
                <span className="font-medium text-[#1b1c18]">{data.title}</span>
                <span className="text-[#c5c6cb] mx-1.5">•</span>
                <span>{data.location}</span>
                <span className="text-[#c5c6cb] mx-1.5">•</span>
                <span>{data.country}</span>
              </p>
            </div>

            {/* Refined Monogram Emblem & Portrait Anchor */}
            <div className="shrink-0 flex items-center justify-start sm:justify-end">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md bg-[#f5f3ed] border border-[#785837]/30 p-1 flex flex-col items-center justify-center relative shadow-xs">
                <div className="w-full h-full border border-dashed border-[#785837]/40 flex flex-col items-center justify-center bg-white rounded-xs">
                  <span className="font-display text-2xl sm:text-3xl font-semibold text-[#080e15] tracking-tighter">
                    FB
                  </span>
                  <span className="text-[8px] font-sans tracking-widest text-[#785837] uppercase font-semibold">
                    Tarifa
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Telemetry Pill Bar */}
          <div className="bg-[#f5f3ed] p-3 md:p-4 rounded-sm border border-[#c5c6cb]/40 flex flex-col divide-y divide-[#c5c6cb]/60 text-[#1b1c18]">
            {/* Email Directo */}
            <div className="flex items-center gap-3 py-2 first:pt-0 last:pb-0">
              <div className="w-7 h-7 bg-[#e4e2dd] rounded flex items-center justify-center text-[#080e15] shrink-0">
                <Mail className="w-4 h-4 text-[#785837]" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 min-w-0 flex-1 justify-between">
                <span className="font-sans text-[10px] tracking-widest uppercase text-[#44474b] font-semibold shrink-0">
                  {lang === 'es' ? 'Email Directo' : 'Direct Email'}
                </span>
                <a
                  className="font-sans text-xs sm:text-[13px] text-[#080e15] font-medium hover:text-[#785837] transition-colors truncate flex items-center gap-1.5"
                  href={`mailto:${data.email}`}
                  onClick={() => onContactClick?.('email')}
                >
                  <span>{data.email}</span>
                  <ExternalLink className="w-3 h-3 text-[#785837]/60 no-print" />
                </a>
              </div>
            </div>

            {/* Móvil */}
            <div className="flex items-center gap-3 py-2 first:pt-0 last:pb-0">
              <div className="w-7 h-7 bg-[#e4e2dd] rounded flex items-center justify-center text-[#080e15] shrink-0">
                <Phone className="w-4 h-4 text-[#785837]" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 min-w-0 flex-1 justify-between">
                <span className="font-sans text-[10px] tracking-widest uppercase text-[#44474b] font-semibold shrink-0">
                  {lang === 'es' ? 'Móvil' : 'Mobile / Phone'}
                </span>
                <a
                  className="font-sans text-xs sm:text-[13px] text-[#080e15] font-medium hover:text-[#785837] transition-colors truncate"
                  href={`tel:${data.phone.replace(/\s+/g, '')}`}
                  onClick={() => onContactClick?.('phone')}
                >
                  {data.phone}
                </a>
              </div>
            </div>

            {/* Presencia web */}
            <div className="flex items-center gap-3 py-2 first:pt-0 last:pb-0">
              <div className="w-7 h-7 bg-[#e4e2dd] rounded flex items-center justify-center text-[#080e15] shrink-0">
                <Globe className="w-4 h-4 text-[#785837]" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 min-w-0 flex-1 justify-between">
                <span className="font-sans text-[10px] tracking-widest uppercase text-[#44474b] font-semibold shrink-0">
                  {lang === 'es' ? 'Presencia Web' : 'Web Presence'}
                </span>
                <a
                  className="font-sans text-xs sm:text-[13px] text-[#080e15] font-medium hover:text-[#785837] transition-colors truncate flex items-center gap-1.5"
                  href={`https://${data.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onContactClick?.('web')}
                >
                  <span>{data.website}</span>
                  <ExternalLink className="w-3 h-3 text-[#785837]/60 no-print" />
                </a>
              </div>
            </div>

            {/* Disponibilidad */}
            <div className="flex items-center gap-3 py-2 first:pt-0 last:pb-0">
              <div className="w-7 h-7 bg-[#fed2a9] rounded flex items-center justify-center text-[#795938] shrink-0">
                <Calendar className="w-4 h-4 text-[#795938]" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 min-w-0 flex-1 justify-between">
                <span className="font-sans text-[10px] tracking-widest uppercase text-[#785837] font-semibold shrink-0">
                  {lang === 'es' ? 'Disponibilidad' : 'Availability'}
                </span>
                <span className="font-sans text-xs sm:text-[13px] text-[#080e15] font-medium truncate flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {data.availability}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* SECTION 2: EXECUTIVE BLOCKS */}
        <div className="flex flex-col gap-4">
          {/* Formación */}
          <section className="bg-[#eae8e2]/35 hover:bg-[#eae8e2]/45 transition-colors p-4 sm:p-5 rounded-sm border border-[#c5c6cb]/40 relative page-break-avoid">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-[#f5f3ed] text-[#785837] flex items-center justify-center shrink-0 mt-0.5 border border-[#c5c6cb]/50">
                <Award className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <h2 className="font-display text-lg sm:text-xl text-[#080e15] tracking-tight font-medium">
                  {lang === 'es' ? 'Formación' : 'Education & Certifications'}
                </h2>
                <div className="font-sans text-xs sm:text-[13px] text-[#44474b] leading-relaxed flex flex-col gap-1.5">
                  {data.education.map((item, idx) => (
                    <div key={idx} className="flex items-baseline gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#785837] shrink-0 translate-y-[-1px]"></span>
                      <div>
                        <span className="font-medium text-[#1b1c18]">{item.title}</span>
                        <span className="text-[#c5c6cb] mx-1.5">-</span>
                        <span>{item.institution}</span>
                        <span className="text-[#c5c6cb] mx-1.5">-</span>
                        <span className="text-[#785837] font-medium">{item.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Experiencia Laboral */}
          <section className="bg-[#eae8e2]/35 hover:bg-[#eae8e2]/45 transition-colors p-4 sm:p-5 rounded-sm border border-[#c5c6cb]/40 relative page-break-avoid">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-[#f5f3ed] text-[#785837] flex items-center justify-center shrink-0 mt-0.5 border border-[#c5c6cb]/50">
                <Briefcase className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <h2 className="font-display text-lg sm:text-xl text-[#080e15] tracking-tight font-medium">
                  {lang === 'es' ? 'Experiencia Laboral' : 'Work Experience'}
                </h2>
                <div className="font-sans text-xs sm:text-[13px] text-[#44474b] leading-relaxed flex flex-col gap-2.5">
                  {data.experience.map((exp, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#785837] shrink-0 mt-1.5"></span>
                      <div className="flex flex-col">
                        <div className="flex flex-wrap items-baseline gap-x-1.5">
                          <span className="font-semibold text-[#1b1c18]">{exp.role}</span>
                          <span className="text-[#c5c6cb]">•</span>
                          <span className="text-[#44474b]">{exp.company}</span>
                          <span className="text-[#785837] font-mono text-xs font-medium ml-auto">
                            {exp.period}
                          </span>
                        </div>
                        {exp.description && (
                          <p className="text-[11px] text-[#44474b]/90 mt-0.5">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Habilidades y Competencias */}
          <section className="bg-[#eae8e2]/35 hover:bg-[#eae8e2]/45 transition-colors p-4 sm:p-5 rounded-sm border border-[#c5c6cb]/40 relative page-break-avoid">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-[#f5f3ed] text-[#785837] flex items-center justify-center shrink-0 mt-0.5 border border-[#c5c6cb]/50">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                <h2 className="font-display text-lg sm:text-xl text-[#080e15] tracking-tight font-medium">
                  {lang === 'es' ? 'Habilidades y Competencias' : 'Skills & Competencies'}
                </h2>
                <div className="font-sans text-xs sm:text-[13px] text-[#44474b] leading-relaxed flex flex-col gap-2">
                  {data.skills.map((skillGroup, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#785837]"></span>
                        <span className="font-medium text-[#1b1c18]">{skillGroup.category}:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {skillGroup.items.map((item, itemIdx) => (
                          <span
                            key={itemIdx}
                            className="inline-block px-2 py-0.5 rounded text-[11px] bg-white border border-[#c5c6cb]/50 text-[#1b1c18] font-mono"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Idiomas */}
          <section className="bg-[#eae8e2]/35 hover:bg-[#eae8e2]/45 transition-colors p-4 sm:p-5 rounded-sm border border-[#c5c6cb]/40 relative page-break-avoid">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-[#f5f3ed] text-[#785837] flex items-center justify-center shrink-0 mt-0.5 border border-[#c5c6cb]/50">
                <Languages className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <h2 className="font-display text-lg sm:text-xl text-[#080e15] tracking-tight font-medium">
                  {lang === 'es' ? 'Idiomas' : 'Languages'}
                </h2>
                <div className="font-sans text-xs sm:text-[13px] text-[#44474b] leading-relaxed flex flex-wrap gap-4 sm:gap-6">
                  {data.languages.map((langItem, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#785837]"></span>
                      <span className="font-semibold text-[#1b1c18]">{langItem.name}</span>
                      <span className="px-2 py-0.5 rounded bg-white text-[#785837] border border-[#c5c6cb]/50 font-medium text-[11px]">
                        {langItem.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Se ofrece */}
          <section className="bg-[#eae8e2]/35 hover:bg-[#eae8e2]/45 transition-colors p-4 sm:p-5 rounded-sm border border-[#c5c6cb]/40 relative page-break-avoid">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-[#f5f3ed] text-[#785837] flex items-center justify-center shrink-0 mt-0.5 border border-[#c5c6cb]/50">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <h2 className="font-display text-lg sm:text-xl text-[#080e15] tracking-tight font-medium">
                  {lang === 'es' ? 'Se ofrece' : 'Value Proposition & Commitment'}
                </h2>
                <div className="font-sans text-xs sm:text-[13px] text-[#44474b] leading-relaxed flex flex-col gap-1.5">
                  {data.offer.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#785837] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* SECTION 4: ARCHIVAL SIGN-OFF & METADATA FOOTER */}
      <footer className="mt-8 pt-5 border-t border-[#c5c6cb]/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#44474b] relative z-10">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="font-sans text-[10px] tracking-wider uppercase text-[#785837] font-semibold">
            {data.fullName}
          </span>
          <span className="text-[#c5c6cb]">•</span>
          <span className="text-[11px] font-sans">
            {lang === 'es' ? 'Documento Oficial A4' : 'Official A4 Document'}
          </span>
        </div>

        {/* Verification and signature anchor */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-wider text-[#785837] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            <span>franbt.github.io</span>
          </div>
          <span className="text-[#c5c6cb]">•</span>
          <span className="font-sans text-[10px] uppercase tracking-wider text-[#44474b]">
            ISO 216 / A4
          </span>
        </div>
      </footer>
    </div>
  );
};
