import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, CheckCircle, ChevronLeft, ChevronRight, CornerDownRight, Quote } from 'lucide-react';
import { CLINIC_CASE_STUDIES } from '../data';

export default function WorksSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCase = CLINIC_CASE_STUDIES[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CLINIC_CASE_STUDIES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CLINIC_CASE_STUDIES.length) % CLINIC_CASE_STUDIES.length);
  };

  return (
    <section id="trabajos" className="py-24 bg-white relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
        {/* Header content details */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold font-mono px-3 py-1 bg-[#EAF5EE] inline-block rounded-lg">
            Casos Clínicos & Resultados
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A252C] tracking-tight">
            Sonrisas Reales, Ciencia Verificable
          </h2>
          <p className="text-base md:text-lg text-[#6B7A82] max-w-2xl mx-auto">
            Observe la transformación real y la naturalidad que logramos al alinear la estructura oclusal con la simetría facial de cada paciente.
          </p>
        </div>

        {/* Dynamic Interactive Case Study Gallery Slider */}
        <div className="max-w-[1184px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Block Spec Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex gap-2">
              {CLINIC_CASE_STUDIES.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    idx === activeIndex
                      ? 'bg-[#2C3E48] text-white shadow-sm'
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  Sonrisa {idx + 1}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-indigo-700 font-mono font-bold block">
                {activeCase.subtitle}
              </span>
              <h3 className="text-3xl font-extrabold text-[#1A252C] leading-tight transition-all">
                {activeCase.title}
              </h3>
              <p className="text-sm text-[#6B7A82] leading-relaxed">
                {activeCase.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div>
                <span className="block font-bold text-slate-400 uppercase tracking-widest text-[9px]">Especialista:</span>
                <span className="text-[#1A252C] font-semibold">{activeCase.doctor}</span>
              </div>
              <div>
                <span className="block font-bold text-slate-400 uppercase tracking-widest text-[9px]">Duración total:</span>
                <span className="text-[#1A252C] font-semibold font-mono">{activeCase.duration}</span>
              </div>
            </div>

            {/* Testimonial card inline */}
            <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#deeaf3]/60 relative space-y-3">
              <Quote className="absolute right-6 top-6 w-8 h-8 text-[#2C3E48]/10" />
              <div className="flex gap-0.5 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "{activeCase.testimonial.text}"
              </p>
              <span className="block text-xs font-bold text-[#2C3E48]">
                — {activeCase.testimonial.patient}, Paciente Verificado
              </span>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handlePrev}
                className="p-3 bg-slate-50 hover:bg-slate-100 text-[#2C3E48] rounded-full transition-colors"
                title="Caso anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 bg-[#2C3E48] text-white hover:opacity-90 rounded-full transition-all"
                title="Siguiente caso"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Block Image (7 Cols) with Zoom / Stagger Animations */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[28px] overflow-hidden group shadow-lg border border-slate-100 aspect-[1184/864]">
              <img
                alt={activeCase.title}
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-[800ms] group-hover:scale-105"
                src={activeCase.imageUrl}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="text-white space-y-1">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-300">Fotografía Clínica de Entrada</span>
                  <p className="text-xs font-semibold text-neutral-200">Resultados clínicos reales documentados bajo consentimiento de privacidad.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
