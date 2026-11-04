import React from 'react';
import { X, RotateCcw, Save, Check } from 'lucide-react';
import { CVData } from '../data/cvData';

interface EditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: CVData;
  onChange: (updated: CVData) => void;
  onReset: () => void;
  lang: 'es' | 'en';
}

export const EditDrawer: React.FC<EditDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onChange,
  onReset,
  lang,
}) => {
  if (!isOpen) return null;

  const handleFieldChange = (field: keyof CVData, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#fbf9f3] text-[#1b1c18] h-full shadow-2xl border-l border-[#c5c6cb]/60 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#c5c6cb]/40 bg-[#f5f3ed]/80">
          <div>
            <h3 className="font-display font-medium text-base text-[#080e15]">
              {lang === 'es' ? 'Personalizar Curriculum' : 'Customize Curriculum'}
            </h3>
            <p className="font-sans text-[11px] text-[#44474b]">
              {lang === 'es'
                ? 'Modifica datos en tiempo real antes de exportar'
                : 'Edit details in real-time before export'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#44474b] hover:text-[#080e15] hover:bg-[#eae8e2]"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-4 text-xs">
          {/* Nombre completo */}
          <div className="flex flex-col gap-1">
            <label className="font-sans font-semibold text-[#785837] uppercase tracking-wider text-[10px]">
              {lang === 'es' ? 'Nombre Completo' : 'Full Name'}
            </label>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => handleFieldChange('fullName', e.target.value)}
              className="px-3 py-2 bg-white rounded border border-[#c5c6cb]/60 focus:border-[#785837] focus:outline-hidden"
            />
          </div>

          {/* Titular */}
          <div className="flex flex-col gap-1">
            <label className="font-sans font-semibold text-[#785837] uppercase tracking-wider text-[10px]">
              {lang === 'es' ? 'Titular Profesional' : 'Professional Title'}
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              className="px-3 py-2 bg-white rounded border border-[#c5c6cb]/60 focus:border-[#785837] focus:outline-hidden"
            />
          </div>

          {/* Ubicación y País */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="font-sans font-semibold text-[#785837] uppercase tracking-wider text-[10px]">
                {lang === 'es' ? 'Ciudad' : 'City'}
              </label>
              <input
                type="text"
                value={data.location}
                onChange={(e) => handleFieldChange('location', e.target.value)}
                className="px-3 py-2 bg-white rounded border border-[#c5c6cb]/60 focus:border-[#785837] focus:outline-hidden"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-sans font-semibold text-[#785837] uppercase tracking-wider text-[10px]">
                {lang === 'es' ? 'País' : 'Country'}
              </label>
              <input
                type="text"
                value={data.country}
                onChange={(e) => handleFieldChange('country', e.target.value)}
                className="px-3 py-2 bg-white rounded border border-[#c5c6cb]/60 focus:border-[#785837] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="font-sans font-semibold text-[#785837] uppercase tracking-wider text-[10px]">
              {lang === 'es' ? 'Email Directo' : 'Direct Email'}
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              className="px-3 py-2 bg-white rounded border border-[#c5c6cb]/60 focus:border-[#785837] focus:outline-hidden"
            />
          </div>

          {/* Teléfono */}
          <div className="flex flex-col gap-1">
            <label className="font-sans font-semibold text-[#785837] uppercase tracking-wider text-[10px]">
              {lang === 'es' ? 'Teléfono / Móvil' : 'Phone / Mobile'}
            </label>
            <input
              type="text"
              value={data.phone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              className="px-3 py-2 bg-white rounded border border-[#c5c6cb]/60 focus:border-[#785837] focus:outline-hidden"
            />
          </div>

          {/* Web */}
          <div className="flex flex-col gap-1">
            <label className="font-sans font-semibold text-[#785837] uppercase tracking-wider text-[10px]">
              {lang === 'es' ? 'Web o GitHub Pages' : 'Website or GitHub Pages'}
            </label>
            <input
              type="text"
              value={data.website}
              onChange={(e) => handleFieldChange('website', e.target.value)}
              className="px-3 py-2 bg-white rounded border border-[#c5c6cb]/60 focus:border-[#785837] focus:outline-hidden"
            />
          </div>

          {/* Disponibilidad */}
          <div className="flex flex-col gap-1">
            <label className="font-sans font-semibold text-[#785837] uppercase tracking-wider text-[10px]">
              {lang === 'es' ? 'Disponibilidad' : 'Availability'}
            </label>
            <input
              type="text"
              value={data.availability}
              onChange={(e) => handleFieldChange('availability', e.target.value)}
              className="px-3 py-2 bg-white rounded border border-[#c5c6cb]/60 focus:border-[#785837] focus:outline-hidden"
            />
          </div>

          {/* Tip */}
          <div className="p-3 bg-[#f5f3ed] rounded border border-[#c5c6cb]/40 text-[11px] text-[#44474b]">
            {lang === 'es'
              ? 'Todos los cambios se reflejan inmediatamente en el documento y se guardan automáticamente en tu navegador.'
              : 'All edits instantly appear on the document and are saved locally in your browser.'}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#c5c6cb]/40 bg-[#f5f3ed]/80 flex items-center justify-between">
          <button
            onClick={onReset}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-[#c5c6cb]/60 bg-white hover:bg-[#eae8e2] text-[#44474b] text-xs font-sans font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'es' ? 'Restablecer' : 'Reset'}</span>
          </button>

          <button
            onClick={onClose}
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#080e15] text-white hover:bg-[#1e242b] text-xs font-sans font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{lang === 'es' ? 'Listo' : 'Done'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
