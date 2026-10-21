import React, { useState } from 'react';
import { TandemSubmission } from '../types';

interface TandemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (submission: TandemSubmission) => void;
}

export const TandemModal: React.FC<TandemModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [nativeTongue, setNativeTongue] = useState<string>('Levantine Arabic');
  const [learningLanguage, setLearningLanguage] = useState<string>('Municipal Vernacular (English)');
  const [district, setDistrict] = useState<string>('District 4 · Riverside');
  const [preferredVenue, setPreferredVenue] = useState<string>('Central Library & North End Atrium');
  const [hasChildcareNeed, setHasChildcareNeed] = useState<boolean>(false);
  const [hasAccessibilityNeed, setHasAccessibilityNeed] = useState<boolean>(false);
  const [submittedPass, setSubmittedPass] = useState<TandemSubmission | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const badgeCode = `TANDEM-D4-${Math.floor(1000 + Math.random() * 9000)}`;
    const submission: TandemSubmission = {
      id: Date.now().toString(),
      fullName: fullName || 'Newcomer Resident',
      email: email || 'resident@civic.local',
      nativeTongue,
      learningLanguage,
      district,
      preferredVenue,
      hasChildcareNeed,
      hasAccessibilityNeed,
      badgeCode,
      createdAt: new Date().toLocaleDateString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('convergence_tandem_fellows') || '[]');
      localStorage.setItem('convergence_tandem_fellows', JSON.stringify([submission, ...existing]));
    } catch {
      // fallback
    }

    setSubmittedPass(submission);
    onSuccess?.(submission);
  };

  const handleResetAndClose = () => {
    setSubmittedPass(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#fbf9f5] w-full max-w-xl border border-[#e4e2de] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#061523] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb59c]">forum</span>
            <div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#b8c8da] block">
                CIVIC INTAKE REGISTRATION · DUAL-TRACK TANDEM
              </span>
              <h3 className="font-serif font-bold text-lg text-white">
                Register as a Tandem Fellow
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="text-[#8291a2] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {submittedPass ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-[#c6e8d2] text-[#476554] rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#476554] uppercase tracking-wider block">
                Registration Confirmed
              </span>
              <h4 className="font-serif font-bold text-xl text-[#061523] mt-1">
                Tandem Fellow Passport Issued
              </h4>
              <p className="text-xs text-[#44474c] max-w-md mx-auto mt-1">
                You have been registered in the Municipal Language Exchange Cohort. A fellow matching coordinator will pair you before your first Thursday session.
              </p>
            </div>

            {/* Passport Card */}
            <div className="bg-white border-2 border-[#061523] p-4 text-left max-w-sm mx-auto shadow-md">
              <div className="flex justify-between items-start border-b pb-2 mb-2">
                <div>
                  <strong className="text-sm font-serif text-[#061523] block">{submittedPass.fullName}</strong>
                  <span className="text-[11px] text-[#44474c]">{submittedPass.district}</span>
                </div>
                <span className="bg-[#061523] text-[#c6e8d2] text-[10px] font-mono font-bold px-2 py-0.5">
                  {submittedPass.badgeCode}
                </span>
              </div>
              <div className="text-xs space-y-1 text-[#1b1c1a]">
                <div><span className="text-[#74777c]">Mother Tongue:</span> <strong>{submittedPass.nativeTongue}</strong></div>
                <div><span className="text-[#74777c]">Target Language:</span> <strong>{submittedPass.learningLanguage}</strong></div>
                <div><span className="text-[#74777c]">Venue:</span> <strong>{submittedPass.preferredVenue}</strong></div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="bg-[#061523] hover:bg-[#476554] text-white text-xs font-bold px-6 py-2 transition-colors"
              >
                Close &amp; Return to Article
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-[#44474c]">
              Each partner commits ninety minutes weekly: 45 minutes in the municipal vernacular, followed by 45 minutes navigating the partner’s native tongue.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[#44474c] font-bold mb-1">Full Legal or Preferred Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Halim O.-Mercier"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-[#e4e2de] p-2 text-xs focus:ring-1 focus:ring-[#476554] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#44474c] font-bold mb-1">Email or Phone *</label>
                <input
                  type="text"
                  required
                  placeholder="resident@civic.local"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#e4e2de] p-2 text-xs focus:ring-1 focus:ring-[#476554] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#44474c] font-bold mb-1">Your Primary / Native Tongue *</label>
                <select
                  value={nativeTongue}
                  onChange={(e) => setNativeTongue(e.target.value)}
                  className="w-full bg-white border border-[#e4e2de] p-2 text-xs focus:ring-1 focus:ring-[#476554] focus:outline-none"
                >
                  <option value="Levantine Arabic">Levantine Arabic</option>
                  <option value="Ukrainian">Ukrainian</option>
                  <option value="Dari / Pashto">Dari / Pashto</option>
                  <option value="Tigrinya">Tigrinya</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="English">English</option>
                  <option value="Kurdish">Kurdish</option>
                </select>
              </div>

              <div>
                <label className="block text-[#44474c] font-bold mb-1">Language You Wish to Practice *</label>
                <select
                  value={learningLanguage}
                  onChange={(e) => setLearningLanguage(e.target.value)}
                  className="w-full bg-white border border-[#e4e2de] p-2 text-xs focus:ring-1 focus:ring-[#476554] focus:outline-none"
                >
                  <option value="Municipal Vernacular (English)">Municipal Vernacular (English)</option>
                  <option value="Levantine Arabic">Levantine Arabic</option>
                  <option value="Ukrainian">Ukrainian</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>

              <div>
                <label className="block text-[#44474c] font-bold mb-1">Your Home District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-white border border-[#e4e2de] p-2 text-xs focus:ring-1 focus:ring-[#476554] focus:outline-none"
                >
                  <option value="District 1 · North Harbor">District 1 · North Harbor</option>
                  <option value="District 2 · Old Gate">District 2 · Old Gate</option>
                  <option value="District 4 · Riverside">District 4 · Riverside</option>
                  <option value="District 5 · South Boulevard">District 5 · South Boulevard</option>
                  <option value="District 7 · Industrial Annex">District 7 · Industrial Annex</option>
                </select>
              </div>

              <div>
                <label className="block text-[#44474c] font-bold mb-1">Preferred Meeting Venue</label>
                <select
                  value={preferredVenue}
                  onChange={(e) => setPreferredVenue(e.target.value)}
                  className="w-full bg-white border border-[#e4e2de] p-2 text-xs focus:ring-1 focus:ring-[#476554] focus:outline-none"
                >
                  <option value="Central Library & North End Atrium">Central Library & North End Atrium</option>
                  <option value="St. Martin Community Hall">St. Martin Community Hall</option>
                  <option value="South District Municipal Library">South District Municipal Library</option>
                  <option value="District Youth Annex">District Youth Annex</option>
                </select>
              </div>
            </div>

            {/* Accessibility options */}
            <div className="pt-2 border-t border-[#e4e2de] space-y-2">
              <label className="flex items-center gap-2 text-xs cursor-pointer text-[#1b1c1a]">
                <input
                  type="checkbox"
                  checked={hasChildcareNeed}
                  onChange={(e) => setHasChildcareNeed(e.target.checked)}
                  className="text-[#476554] rounded focus:ring-[#476554]"
                />
                <span>I require free supervised toddler crèche during our 90-minute session.</span>
              </label>

              <label className="flex items-center gap-2 text-xs cursor-pointer text-[#1b1c1a]">
                <input
                  type="checkbox"
                  checked={hasAccessibilityNeed}
                  onChange={(e) => setHasAccessibilityNeed(e.target.checked)}
                  className="text-[#476554] rounded focus:ring-[#476554]"
                />
                <span>I require step-free ADA access or hearing induction loop support.</span>
              </label>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="text-xs text-[#44474c] hover:text-[#061523] px-3 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#4f1500] hover:bg-[#061523] text-white text-xs font-bold px-6 py-2.5 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">assignment_turned_in</span>
                <span>Confirm Tandem Enrollment</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
