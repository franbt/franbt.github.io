import React from 'react';
import { VocationalTrack } from '../types';

interface SyllabusModalProps {
  track: VocationalTrack | null;
  onClose: () => void;
  onBookCounselor: () => void;
}

export const SyllabusModal: React.FC<SyllabusModalProps> = ({ track, onClose, onBookCounselor }) => {
  if (!track) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#fbf9f5] w-full max-w-2xl border border-[#e4e2de] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#061523] text-white px-6 py-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold tracking-widest uppercase bg-[#476554] text-white px-1.5 py-0.5">
                {track.trackNum}
              </span>
              <span className="text-[11px] text-[#b8c8da] uppercase font-sans">
                {track.category} · {track.duration}
              </span>
            </div>
            <h3 className="font-serif font-bold text-xl text-white">
              {track.title}
            </h3>
            <span className="text-xs text-[#8291a2] flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-sm text-[#c6e8d2]">apartment</span>
              <span>{track.location}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#8291a2] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#44474c] mb-1 font-sans">
              Program Description &amp; Guild Framework
            </h4>
            <p className="text-xs text-[#1b1c1a] leading-relaxed">
              {track.description} Open-enrollment program guaranteed under municipal operating statutes. Tuition is 100% sponsored via civic inclusion levies, with zero debt liability for trainees.
            </p>
          </div>

          {/* Syllabus Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#44474c] mb-2.5 font-sans">
              Curriculum Roadmap &amp; Statutory Milestone Deliverables
            </h4>
            <div className="space-y-2">
              {track.syllabus.map((item, idx) => (
                <div key={idx} className="bg-white border border-[#e4e2de] p-3 shadow-xs">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-[#476554] font-mono">{item.week}</span>
                    <span className="text-[10px] bg-[#eae8e4] text-[#1b1c1a] px-1.5 py-0.5 font-bold">
                      Stage 0{idx + 1}
                    </span>
                  </div>
                  <strong className="text-xs text-[#061523] block">{item.topic}</strong>
                  <div className="text-[11px] text-[#44474c] mt-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-xs text-[#476554]">verified</span>
                    <span><strong>Credential Target:</strong> {item.deliverable}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wraparound support note */}
          <div className="bg-[#c6e8d2]/25 p-3.5 border border-[#c6e8d2] text-xs text-[#032014]">
            <strong className="block font-bold mb-1">Universal Participant Support Guaranteed:</strong>
            Includes unlimited transit pass, childcare crèche vouchers, and pro-bono credential legal notarization throughout the course.
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-[#eae8e4] px-6 py-3 border-t border-[#e4e2de] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-[#44474c] hover:text-[#061523] font-medium"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBookCounselor();
            }}
            className="bg-[#061523] hover:bg-[#476554] text-white text-xs font-bold px-5 py-2 transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">calendar_month</span>
            <span>Book Counselor Consultation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
