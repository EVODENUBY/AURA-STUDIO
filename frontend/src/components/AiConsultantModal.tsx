import React, { useState } from 'react';
import { CategoryType, Service, Artist, AiConsultationResponse } from '../types';
import { Sparkles, Loader2, CheckCircle2, ArrowRight, Eye, Feather, RefreshCw, Star } from 'lucide-react';

interface AiConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory: CategoryType;
  services: Service[];
  artists: Artist[];
  onApplyRecommendationAndBook: (service: Service, artist: Artist, specs: any) => void;
}

export const AiConsultantModal: React.FC<AiConsultantModalProps> = ({
  isOpen,
  onClose,
  initialCategory,
  services,
  artists,
  onApplyRecommendationAndBook
}) => {
  const [category, setCategory] = useState<CategoryType>(initialCategory);
  const [vibeDescription, setVibeDescription] = useState<string>('');
  const [eyeShapeOrPlacement, setEyeShapeOrPlacement] = useState<string>('');
  const [sensitivity, setSensitivity] = useState<string>('');
  const [preferredTone, setPreferredTone] = useState<string>('Soft Minimalist');

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AiConsultationResponse | null>(null);

  if (!isOpen) return null;

  const handleConsultation = async () => {
    if (!vibeDescription.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          vibeDescription,
          eyeShapeOrPlacement,
          skinOrLashSensitivity: sensitivity,
          preferredTone
        })
      });

      const data: AiConsultationResponse = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Failed AI consultation request:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookRecommended = () => {
    if (!result) return;
    const recommendedService = services.find(s => s.id === result.recommendedServiceId) || services[0];
    const recommendedArtist = artists.find(a => a.id === result.recommendedArtistId) || artists[0];

    let customSpecs = {};
    if (category === 'lashes') {
      customSpecs = {
        curl: result.suggestedSpecs.curlOrStyle,
        lengthRange: result.suggestedSpecs.lengthOrSize,
        density: result.suggestedSpecs.densityOrInk,
        mappingStyle: result.suggestedSpecs.mappingOrPlacement
      };
    } else {
      customSpecs = {
        placement: result.suggestedSpecs.mappingOrPlacement,
        approxSizeInches: result.suggestedSpecs.lengthOrSize,
        styleCategory: result.suggestedSpecs.curlOrStyle,
        inkColor: result.suggestedSpecs.densityOrInk
      };
    }

    onApplyRecommendationAndBook(recommendedService, recommendedArtist, customSpecs);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A]/80 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-[#FAF9F6] border border-[#1A1A1A] max-w-2xl w-full max-h-[92vh] flex flex-col p-4 sm:p-6 md:p-8 space-y-4 text-[#1A1A1A] shadow-lg relative my-auto overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 rounded-none bg-[#1A1A1A] text-[#FAF9F6] hover:bg-[#333333] flex items-center justify-center text-sm font-bold transition-colors z-10"
        >
          ✕
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 shrink-0 pr-10">
          <div className="w-10 h-10 bg-[#1A1A1A] flex items-center justify-center text-[#FAF9F6] shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C8A82] block font-bold">
              AI Style & Spec Curator
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1A1A1A]">
              Personalized Atelier Advisor
            </h3>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-4 sm:space-y-6">

        {/* Category Toggle */}
        <div className="grid grid-cols-2 gap-3 bg-[#EBE9E1] p-1.5 border border-[#D1CEC3]">
          <button
            onClick={() => {
              setCategory('lashes');
              setResult(null);
            }}
            className={`flex items-center justify-center gap-2 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${
              category === 'lashes'
                ? 'bg-[#1A1A1A] text-[#FAF9F6]'
                : 'text-[#6B6961] hover:text-[#1A1A1A]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lash Extension Mapping</span>
          </button>

          <button
            onClick={() => {
              setCategory('tattoos');
              setResult(null);
            }}
            className={`flex items-center justify-center gap-2 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${
              category === 'tattoos'
                ? 'bg-[#1A1A1A] text-[#FAF9F6]'
                : 'text-[#6B6961] hover:text-[#1A1A1A]'
            }`}
          >
            <Feather className="w-3.5 h-3.5" />
            <span>Fine-Line Tattoo Curation</span>
          </button>
        </div>

        {/* Input Form */}
        {!result && (
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8C8A82] font-bold mb-1.5">
                {category === 'lashes' ? 'Describe your dream lash aesthetic & daily makeup routine' : 'Describe your tattoo vision, inspiration & symbolism'}
              </label>
              <textarea
                value={vibeDescription}
                onChange={e => setVibeDescription(e.target.value)}
                placeholder={category === 'lashes' ? 'e.g., Wispy texture with soft flutter for hooded almond eyes, mascara look without heavy weight...' : 'e.g., Delicate single-needle wildflower line on inner wrist, fine grey wash, minimal dotwork...'}
                className="w-full bg-[#FAF9F6] border border-[#D1CEC3] p-4 text-xs text-[#1A1A1A] placeholder-[#8C8A82] font-semibold focus:outline-none focus:border-[#1A1A1A] h-28 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8C8A82] font-bold mb-1.5">
                  {category === 'lashes' ? 'Eye Shape or Lash Direction' : 'Target Body Placement'}
                </label>
                <input
                  type="text"
                  value={eyeShapeOrPlacement}
                  onChange={e => setEyeShapeOrPlacement(e.target.value)}
                  placeholder={category === 'lashes' ? 'Almond, Hooded, Round, Deep set' : 'Collarbone, Wrist, Ribs, Ankle'}
                  className="w-full bg-[#FAF9F6] border border-[#D1CEC3] px-4 py-2.5 text-xs text-[#1A1A1A] placeholder-[#8C8A82] font-semibold focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8C8A82] font-bold mb-1.5">
                  Skin / Lash Sensitivity Notes
                </label>
                <input
                  type="text"
                  value={sensitivity}
                  onChange={e => setSensitivity(e.target.value)}
                  placeholder="Sensitive eyes, dry skin, nickel allergy, etc."
                  className="w-full bg-[#FAF9F6] border border-[#D1CEC3] px-4 py-2.5 text-xs text-[#1A1A1A] placeholder-[#8C8A82] font-semibold focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8C8A82] font-bold mb-1.5">
                Preferred Aesthetic Intensity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Barely-There Minimal', 'Soft Wispy Balance', 'Dramatic Statement'].map(tone => (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => setPreferredTone(tone)}
                    className={`py-2 px-3 text-[10px] text-center border font-bold uppercase transition-all ${
                      preferredTone === tone
                        ? 'bg-[#1A1A1A] border-[#1A1A1A] text-[#FAF9F6]'
                        : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#6B6961] hover:text-[#1A1A1A]'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleConsultation}
              disabled={loading || !vibeDescription.trim()}
              className="w-full py-4 bg-[#1A1A1A] hover:bg-[#333333] disabled:bg-[#D1CEC3] disabled:text-[#8C8A82] text-[#FAF9F6] font-bold text-[10px] uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Curating Bespoke Lash & Ink Specifications...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Atelier Recommendation</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Curation Results */}
        {result && (
          <div className="space-y-6 border-t border-[#E5E2D9] pt-4">
            <div className="bg-[#EBE9E1] p-6 border border-[#1A1A1A] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C8A82] font-bold">
                  Bespoke Recommendation
                </span>
                <button
                  onClick={() => setResult(null)}
                  className="flex items-center gap-1 text-xs text-[#1A1A1A] font-bold uppercase hover:underline"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Adjust Input</span>
                </button>
              </div>

              <h4 className="font-serif text-2xl text-[#1A1A1A] font-normal">
                {result.recommendationTitle}
              </h4>

              <p className="text-xs text-[#1A1A1A] font-normal leading-relaxed">
                {result.styleDescription}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 bg-[#FAF9F6] p-4 border border-[#D1CEC3] text-xs">
                <div>
                  <span className="text-[#8C8A82] block text-[9px] uppercase font-bold">
                    {category === 'lashes' ? 'Recommended Curl' : 'Needle / Style'}
                  </span>
                  <span className="text-[#1A1A1A] font-bold">{result.suggestedSpecs.curlOrStyle}</span>
                </div>
                <div>
                  <span className="text-[#8C8A82] block text-[9px] uppercase font-bold">
                    {category === 'lashes' ? 'Length Gradient' : 'Approximate Size'}
                  </span>
                  <span className="text-[#1A1A1A] font-bold">{result.suggestedSpecs.lengthOrSize}</span>
                </div>
                <div>
                  <span className="text-[#8C8A82] block text-[9px] uppercase font-bold">
                    {category === 'lashes' ? 'Density Mapping' : 'Ink Pigment Tone'}
                  </span>
                  <span className="text-[#1A1A1A] font-semibold">{result.suggestedSpecs.densityOrInk}</span>
                </div>
                <div>
                  <span className="text-[#8C8A82] block text-[9px] uppercase font-bold">
                    {category === 'lashes' ? 'Eye Shape Mapping' : 'Anatomy Placement'}
                  </span>
                  <span className="text-[#1A1A1A] font-semibold">{result.suggestedSpecs.mappingOrPlacement}</span>
                </div>
              </div>

              {/* Prep Advice */}
              <div className="space-y-1.5 text-xs text-[#6B6961]">
                <span className="text-[#1A1A1A] font-bold block text-[10px] uppercase">Pre-Appointment Checklist:</span>
                {result.prepAdvice.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1A1A1A] shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Action */}
            <button
              onClick={handleBookRecommended}
              className="w-full py-4 bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F6] font-bold text-[10px] uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
            >
              <span>Apply These Specs & Reserve Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        </div>
      </div>
    </div>
  );
};
