import React, { useState } from 'react';
import { GAZETTE_META } from '../data/gazetteData';

export const Footer: React.FC = () => {
  const [modalContent, setModalContent] = useState<string | null>(null);

  return (
    <footer className="w-full bg-[#efeeea] border-t border-[#e4e2de] py-12 mt-16 text-[#1b1c1a]">
      <div className="w-full px-4 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1 & 2: Publication Identity */}
          <div className="md:col-span-2">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#44474c] font-sans">
              {GAZETTE_META.subtitle}
            </span>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#061523] mt-1">
              {GAZETTE_META.title}
            </h3>
            <p className="text-xs md:text-sm text-[#44474c] max-w-lg mt-2 leading-relaxed">
              An official public-interest publication issued bi-annually by the Department of Social Cohesion &amp; Municipal Inclusion. Dedicated to community integration, multilingual literacy, civic accessibility, and grassroots pathways.
            </p>
          </div>

          {/* Column 3: Colophon */}
          <div>
            <h4 className="text-[11px] font-bold text-[#1b1c1a] uppercase mb-2 tracking-wider font-sans">
              Editorial Colophon
            </h4>
            <ul className="space-y-1.5 text-xs text-[#44474c]">
              <li>ISSN: {GAZETTE_META.issn}</li>
              <li>Office: {GAZETTE_META.publicationOffice}</li>
              <li>Standard: {GAZETTE_META.accessibility}</li>
              <li>Circulation: {GAZETTE_META.distribution}</li>
            </ul>
          </div>

          {/* Column 4: Civic Inquiries */}
          <div>
            <h4 className="text-[11px] font-bold text-[#1b1c1a] uppercase mb-2 tracking-wider font-sans">
              Civic Inquiries
            </h4>
            <p className="text-xs text-[#44474c]">
              For print requests, translated transcripts, or community submissions:
            </p>
            <a
              href={`mailto:${GAZETTE_META.contactEmail}`}
              className="inline-block text-xs md:text-sm text-[#061523] font-bold hover:text-[#476554] mt-1.5 transition-colors underline decoration-dotted"
            >
              {GAZETTE_META.contactEmail}
            </a>
          </div>
        </div>

        {/* Bottom Legal / Public Domain Notice */}
        <div className="pt-6 border-t border-[#e4e2de] flex flex-col md:flex-row items-center justify-between text-xs text-[#44474c] gap-3">
          <p>© 2024 Department of Social Cohesion &amp; Municipal Inclusion. Public domain government record.</p>
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => setModalContent('Privacy Notice: This publication does not track cookies or collect telemetry. All resident form inputs operate client-side or within municipal encryption protocols under Civic Directive 09.')}
              className="hover:text-[#061523] transition-colors"
            >
              Privacy Notice
            </button>
            <button
              type="button"
              onClick={() => setModalContent('Public Records Exemption: Authorized under Freedom of Information Section § 12.A for open community dissemination without commercial copyright.')}
              className="hover:text-[#061523] transition-colors"
            >
              Public Records Exemption
            </button>
            <button
              type="button"
              onClick={() => setModalContent('Civic Rights Charter: Establishes equitable access to free municipal hubs, multilingual civic documentation, and participatory budgeting.')}
              className="hover:text-[#061523] transition-colors"
            >
              Civic Rights Charter
            </button>
          </div>
        </div>
      </div>

      {/* Quick Legal Notice Toast/Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white p-6 max-w-md w-full shadow-xl border border-[#e4e2de]">
            <h5 className="font-serif font-bold text-[#061523] text-base mb-2">Municipal Notice</h5>
            <p className="text-xs text-[#44474c] leading-relaxed mb-4">{modalContent}</p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="bg-[#061523] text-white text-xs px-4 py-1.5 font-semibold hover:bg-[#476554] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
