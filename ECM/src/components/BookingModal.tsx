import React, { useState } from 'react';
import { COMMONS_HUBS } from '../data/gazetteData';
import { BookingSubmission } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedHubId?: string;
  onBookingSuccess?: (booking: BookingSubmission) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedHubId,
  onBookingSuccess,
}) => {
  const [step, setStep] = useState<number>(1);
  const [agreedPrinciples, setAgreedPrinciples] = useState<boolean>(false);
  const [selectedHubId, setSelectedHubId] = useState<string>(preselectedHubId || 'hub-1');
  const [selectedTier, setSelectedTier] = useState<'Tier A (Multi-purpose Studio)' | 'Tier B (Teaching Kitchen)' | 'Tier C (Assembly Hall)'>('Tier A (Multi-purpose Studio)');
  
  const [collectiveName, setCollectiveName] = useState<string>('');
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicantEmail, setApplicantEmail] = useState<string>('');
  const [estimatedGuests, setEstimatedGuests] = useState<number>(20);
  const [eventDate, setEventDate] = useState<string>('2026-11-15');
  const [timeSlot, setTimeSlot] = useState<string>('18:00–21:00');
  const [purpose, setPurpose] = useState<string>('Neighborhood Workshop & Skillshare');

  const [confirmedBooking, setConfirmedBooking] = useState<BookingSubmission | null>(null);

  if (!isOpen) return null;

  const selectedHub = COMMONS_HUBS.find((h) => h.id === selectedHubId) || COMMONS_HUBS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const badgeCode = `MUN-${Math.floor(100000 + Math.random() * 900000)}-CIV`;
    const newBooking: BookingSubmission = {
      id: Date.now().toString(),
      hubId: selectedHub.id,
      hubName: selectedHub.name,
      tier: selectedTier,
      collectiveName: collectiveName || 'Resident Neighborhood Assembly',
      applicantName: applicantName || 'Resident Organizer',
      applicantEmail: applicantEmail || 'resident@civic.local',
      estimatedGuests,
      eventDate,
      timeSlot,
      principlesAgreed: agreedPrinciples,
      badgeCode,
      createdAt: new Date().toLocaleDateString(),
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('convergence_bookings') || '[]');
      localStorage.setItem('convergence_bookings', JSON.stringify([newBooking, ...existing]));
    } catch {
      // fallback
    }

    setConfirmedBooking(newBooking);
    onBookingSuccess?.(newBooking);
    setStep(4);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#fbf9f5] w-full max-w-2xl border border-[#e4e2de] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#061523] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c6e8d2]">how_to_reg</span>
            <div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#b8c8da] block">
                Policy Code: MUN-SPACE-40 · Ordinance 2021-08
              </span>
              <h3 className="font-serif font-bold text-lg text-white">
                Municipal Community Space Reservation
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

        {/* Step Indicator */}
        <div className="grid grid-cols-4 bg-[#eae8e4] text-xs font-semibold border-b border-[#e4e2de]">
          {[
            { num: 1, label: 'Principles' },
            { num: 2, label: 'Hub & Tier' },
            { num: 3, label: 'Application' },
            { num: 4, label: 'Permit Badge' },
          ].map((s) => (
            <div
              key={s.num}
              className={`py-2 px-3 text-center flex items-center justify-center gap-1.5 transition-colors ${
                step === s.num
                  ? 'bg-[#476554] text-white font-bold'
                  : step > s.num
                  ? 'bg-[#c6e8d2] text-[#032014]'
                  : 'text-[#44474c]'
              }`}
            >
              <span className="w-4 h-4 rounded-full border flex items-center justify-center text-[10px]">
                {step > s.num ? '✓' : s.num}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-[#efeeea] p-4 border border-[#e4e2de]">
                <h4 className="font-serif font-bold text-[#061523] text-base mb-1">
                  Step 01: Statutory Guarantees &amp; Principles
                </h4>
                <p className="text-xs text-[#44474c] leading-relaxed">
                  Under municipal ordinance 2021-08, any collective of two or more residents has the statutory right to request free reservation of municipal community rooms for non-commercial educational, social, or mutual-aid programming.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 p-3 bg-white border border-[#e4e2de] hover:border-[#476554] cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={agreedPrinciples}
                    onChange={(e) => setAgreedPrinciples(e.target.checked)}
                    className="mt-1 h-4 w-4 text-[#476554] rounded focus:ring-[#476554]"
                  />
                  <div className="text-xs text-[#1b1c1a]">
                    <strong className="block font-bold text-[#061523] mb-0.5">
                      Non-Commercial, Non-Discriminatory &amp; Free Attendance
                    </strong>
                    I certify that our gathering is strictly non-profit, charges zero admission fees, is open to all neighborhood residents without discrimination, and respects house decorum rules.
                  </div>
                </label>

                <div className="text-[11px] text-[#44474c] bg-[#f5f3ef] p-3 border-l-2 border-[#476554]">
                  <strong>Municipal Insurance Notice:</strong> Gatherings under 120 guests are automatically covered by the Municipal Civic Liability Pool at zero cost to the organizers.
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  disabled={!agreedPrinciples}
                  onClick={() => setStep(2)}
                  className="bg-[#061523] text-white text-xs font-bold px-6 py-2.5 disabled:opacity-40 disabled:hover:bg-[#061523] hover:bg-[#476554] transition-colors flex items-center gap-1.5"
                >
                  <span>Continue to Hub Selection</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-[#061523] text-base">
                Step 02: Select Civic Commons Hub &amp; Room Tier
              </h4>

              {/* Hub Picker */}
              <div>
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1.5 font-sans">
                  Select Location (from 6 District Commons)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {COMMONS_HUBS.map((hub) => (
                    <button
                      key={hub.id}
                      type="button"
                      onClick={() => setSelectedHubId(hub.id)}
                      className={`p-3 text-left border transition-all ${
                        selectedHubId === hub.id
                          ? 'border-[#476554] bg-[#c6e8d2]/20 ring-1 ring-[#476554]'
                          : 'border-[#e4e2de] bg-white hover:bg-[#f5f3ef]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#061523]">{hub.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-[#eae8e4] text-[#44474c] font-mono">
                          {hub.ward}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#44474c] line-clamp-1">{hub.focus}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tier Selection */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-1.5 font-sans">
                  Choose Facility Tier (Policy Form § 2.B)
                </label>
                <div className="space-y-2">
                  {[
                    {
                      tier: 'Tier A (Multi-purpose Studio)',
                      capacity: 'Up to 35 guests',
                      desc: 'Equipped with movable tables, whiteboard, projector, and high-speed Wi-Fi.',
                    },
                    {
                      tier: 'Tier B (Teaching Kitchen)',
                      capacity: 'Up to 25 guests',
                      desc: 'Commercial stainless steel ranges, dishwashers, and food prep stations.',
                    },
                    {
                      tier: 'Tier C (Assembly Hall)',
                      capacity: 'Up to 120 guests',
                      desc: 'Acoustic PA system, stage, folding chairs, and direct street-level accessible ramp.',
                    },
                  ].map((t) => (
                    <label
                      key={t.tier}
                      className={`flex items-start justify-between p-3 border cursor-pointer transition-colors ${
                        selectedTier === t.tier
                          ? 'border-[#476554] bg-[#c6e8d2]/15'
                          : 'border-[#e4e2de] bg-white hover:bg-[#f5f3ef]'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <input
                          type="radio"
                          name="tier"
                          checked={selectedTier === t.tier}
                          onChange={() => setSelectedTier(t.tier as any)}
                          className="mt-1 text-[#476554] focus:ring-[#476554]"
                        />
                        <div>
                          <strong className="text-xs font-bold text-[#061523] block">{t.tier}</strong>
                          <span className="text-[11px] text-[#44474c] block">{t.desc}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#476554] bg-white px-2 py-0.5 border border-[#e4e2de] shrink-0">
                        {t.capacity}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#44474c] hover:text-[#061523] font-medium"
                >
                  ← Back to Principles
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-[#061523] text-white text-xs font-bold px-6 py-2.5 hover:bg-[#476554] transition-colors flex items-center gap-1.5"
                >
                  <span>Proceed to Application Details</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="font-serif font-bold text-[#061523] text-base">
                Step 03: Submit Reservation Credentials
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[#44474c] font-bold mb-1">
                    Collective / Resident Initiative Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ward 4 Multilingual Book Club"
                    value={collectiveName}
                    onChange={(e) => setCollectiveName(e.target.value)}
                    className="w-full bg-white border border-[#e4e2de] p-2 text-xs focus:ring-1 focus:ring-[#476554] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#44474c] font-bold mb-1">
                    Designated Host Representative *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full legal or chosen name"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full bg-white border border-[#e4e2de] p-2 text-xs focus:ring-1 focus:ring-[#476554] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#44474c] font-bold mb-1">
                    Contact Email / Phone *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="resident@municipality.local"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full bg-white border border-[#e4e2de] p-2 text-xs focus:ring-1 focus:ring-[#476554] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#44474c] font-bold mb-1">
                    Estimated Guest Attendance (Max 120)
                  </label>
                  <input
                    type="number"
                    min={2}
                    max={120}
                    value={estimatedGuests}
                    onChange={(e) => setEstimatedGuests(Number(e.target.value))}
                    className="w-full bg-white border border-[#e4e2de] p-2 text-xs focus:ring-1 focus:ring-[#476554] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#44474c] font-bold mb-1">
                    Proposed Date
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-white border border-[#e4e2de] p-2 text-xs focus:ring-1 focus:ring-[#476554] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#44474c] font-bold mb-1">
                    Requested Time Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-white border border-[#e4e2de] p-2 text-xs focus:ring-1 focus:ring-[#476554] focus:outline-none"
                  >
                    <option value="09:00–12:00">Morning (09:00–12:00)</option>
                    <option value="13:00–16:00">Afternoon (13:00–16:00)</option>
                    <option value="18:00–21:00">Evening (18:00–21:00)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#44474c] font-bold text-xs mb-1">
                  Brief Purpose &amp; Activity Overview
                </label>
                <textarea
                  rows={2}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full bg-white border border-[#e4e2de] p-2 text-xs focus:ring-1 focus:ring-[#476554] focus:outline-none"
                />
              </div>

              <div className="bg-[#f5f3ef] p-3 text-[11px] text-[#44474c] border border-[#e4e2de]">
                <strong>Selected Venue:</strong> {selectedHub.name} ({selectedTier}) · {selectedHub.transit}
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-[#44474c] hover:text-[#061523] font-medium"
                >
                  ← Back to Facility
                </button>
                <button
                  type="submit"
                  className="bg-[#476554] text-white text-xs font-bold px-6 py-2.5 hover:bg-[#061523] transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>Submit &amp; Generate Access Badge</span>
                </button>
              </div>
            </form>
          )}

          {step === 4 && confirmedBooking && (
            <div className="space-y-5 text-center">
              <div className="w-12 h-12 bg-[#c6e8d2] text-[#476554] rounded-full flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-2xl">check</span>
              </div>

              <div>
                <span className="text-[11px] font-bold tracking-widest text-[#476554] uppercase block">
                  Step 04 · Statutory Approval Confirmed
                </span>
                <h4 className="font-serif font-bold text-xl text-[#061523] mt-1">
                  Municipal Door Access Badge Issued
                </h4>
                <p className="text-xs text-[#44474c] max-w-md mx-auto mt-1">
                  Under Ordinance 2021-08, your room allocation has been stamped and registered. Show this digital pass or physical key fob code at the site steward’s desk.
                </p>
              </div>

              {/* Official Credential Card */}
              <div className="bg-white border-2 border-[#061523] p-5 max-w-md mx-auto text-left shadow-md relative">
                <div className="flex items-start justify-between border-b border-[#e4e2de] pb-3 mb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#74777c] block">
                      MUNICIPAL ACCESS PASS
                    </span>
                    <strong className="text-sm font-serif text-[#061523] block">
                      {confirmedBooking.collectiveName}
                    </strong>
                    <span className="text-xs text-[#476554] font-medium">
                      Host: {confirmedBooking.applicantName}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] bg-[#061523] text-white px-1.5 py-0.5 font-mono font-bold">
                      {confirmedBooking.badgeCode}
                    </span>
                    <span className="text-[10px] text-[#74777c] block mt-1 font-mono">
                      Form § 1.A / § 2.B
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3 text-[#1b1c1a]">
                  <div>
                    <span className="text-[10px] text-[#74777c] uppercase block">Hub Facility</span>
                    <strong>{confirmedBooking.hubName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#74777c] uppercase block">Space Tier</span>
                    <strong className="text-[11px]">{confirmedBooking.tier}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#74777c] uppercase block">Reserved Date</span>
                    <strong>{confirmedBooking.eventDate}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#74777c] uppercase block">Time Window</span>
                    <strong>{confirmedBooking.timeSlot}</strong>
                  </div>
                </div>

                <div className="bg-[#f5f3ef] p-2.5 flex items-center justify-between text-[11px]">
                  <span className="text-[#44474c]">Reception Key Fob PIN:</span>
                  <span className="font-mono font-bold text-sm tracking-wider text-[#061523]">
                    #4082*
                  </span>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-[#efeeea] hover:bg-[#e4e2de] text-[#061523] text-xs font-bold px-4 py-2 border border-[#c4c6cc] flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">print</span>
                  <span>Print Permit Pass</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="bg-[#061523] hover:bg-[#476554] text-white text-xs font-bold px-6 py-2 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
