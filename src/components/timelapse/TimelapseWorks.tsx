import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { CLINIC_CASE_STUDIES } from '../../data';
import { useTimelapse } from '../../hooks/useTimelapse';
import CodeEditorOverlay from './CodeEditorOverlay';

interface TimelapseWorksProps {
  isActive?: boolean;
  isAutoplay?: boolean;
  onComplete?: () => void;
}

export default function TimelapseWorks({ isActive = true, isAutoplay = false, onComplete }: TimelapseWorksProps) {
  const step = useTimelapse(15, isActive, isAutoplay, onComplete);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide cases during autoplay
  useEffect(() => {
    if (step >= 12 && isAutoplay) {
      const t = setTimeout(() => setActiveIndex(1), 1200);
      return () => clearTimeout(t);
    }
  }, [step, isAutoplay]);

  const activeCase = CLINIC_CASE_STUDIES[activeIndex];

  const getCodeSnippet = (s: number) => {
    switch (s) {
      case 0: return "";
      case 1: return "// Mount Works Section\nbackground-color: #000; // error, wrong color";
      case 2: return "/* Fix Background */\nbackground-color: #ffffff;\npadding-top: 6rem;";
      case 3: return "/* Load Header Details */\n<div className=\"header\">\n  <h2>Sonrisas Reales</h2>\n</div>";
      case 4: return "/* Setup Slider Layout */\ndisplay: flex;\nflex-direction: column; // No, we want grid";
      case 5: return "/* Fix Slider Layout to Grid */\ndisplay: grid;\ngrid-template-columns: 5fr 7fr;\ngap: 2.5rem;";
      case 6: return "/* Render Case Info */\n<h3 className=\"text-3xl\">{case.title}</h3>";
      case 7: return "/* Fetch Gallery Image */\n<img src=\"clinical_case_1.jpg\" />\nobject-fit: fill; // Wait, image is stretched!";
      case 8: return "/* Fix Image Aspect Ratio */\nobject-fit: cover;\nborder-radius: 28px;";
      case 9: return "/* Add Image Overlay */\nbackground: linear-gradient();\nmix-blend-mode: multiply;";
      case 10: return "/* Setup Testimonial Card */\n<TestimonialCard>\n  <Stars count={5} />\n</TestimonialCard>";
      case 11: return "/* Fix Stars Color */\ncolor: #eab308; // yellow-500";
      case 12: return "/* Add Controls */\n<button><ChevronRight /></button>";
      case 13: return "/* Add Case Selectors */\n<div className=\"flex gap-2\">\n  <button>Sonrisa 1</button>\n</div>";
      case 14: return "/* Setup Interactivity */\n// Initializing slider mechanics...";
      case 15: return "/* Section Finished */";
      default: return "";
    }
  };

  const getBgColor = () => step === 1 ? '#000000' : '#ffffff';
  const getLayoutClass = () => step === 4 ? 'flex flex-col gap-10 items-center' : 'grid grid-cols-1 lg:grid-cols-12 gap-10 items-center';
  const getImgFit = () => step === 7 ? 'fill' : 'cover';

  return (
    <section id="trabajos" className="py-24 transition-colors duration-500 relative" style={{ backgroundColor: getBgColor() }}>
      
      <CodeEditorOverlay isVisible={isActive} codeSnippet={getCodeSnippet(step)} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
        {/* Header content details */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto mb-16 space-y-4"
            >
              <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold font-mono px-3 py-1 bg-[#EAF5EE] inline-block rounded-lg">
                Casos Clínicos & Resultados
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A252C] tracking-tight">
                Sonrisas Reales, Ciencia Verificable
              </h2>
              <p className="text-base md:text-lg text-[#6B7A82] max-w-2xl mx-auto">
                Observe la transformación real y la naturalidad que logramos al alinear la estructura oclusal con la simetría facial de cada paciente.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Interactive Case Study Gallery Slider */}
        <div className={`max-w-[1184px] mx-auto ${getLayoutClass()}`}>
          
          {/* Left Block Spec Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 w-full">
            <AnimatePresence>
              {step >= 6 && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {step >= 13 && (
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
                  )}

                  <div className="space-y-3 mt-6">
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

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs mt-6">
                    <div>
                      <span className="block font-bold text-slate-400 uppercase tracking-widest text-[9px]">Especialista:</span>
                      <span className="text-[#1A252C] font-semibold">{activeCase.doctor}</span>
                    </div>
                    <div>
                      <span className="block font-bold text-slate-400 uppercase tracking-widest text-[9px]">Duración total:</span>
                      <span className="text-[#1A252C] font-semibold font-mono">{activeCase.duration}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Testimonial card inline */}
            <AnimatePresence>
              {step >= 10 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#deeaf3]/60 relative space-y-3 mt-6"
                >
                  <Quote className="absolute right-6 top-6 w-8 h-8 text-[#2C3E48]/10" />
                  <div className={`flex gap-0.5 ${step === 10 ? 'text-black' : 'text-yellow-500'}`}>
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
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls */}
            {step >= 12 && (
              <div className="flex items-center gap-2 pt-2">
                <button className="p-3 bg-slate-50 hover:bg-slate-100 text-[#2C3E48] rounded-full transition-colors" title="Caso anterior">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-3 bg-[#2C3E48] text-white hover:opacity-90 rounded-full transition-all" title="Siguiente caso">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

          {/* Right Block Image (7 Cols) with Zoom / Stagger Animations */}
          <div className="lg:col-span-7 w-full">
            <AnimatePresence>
              {step >= 7 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className={`relative overflow-hidden group shadow-lg border border-slate-100 aspect-[1184/864] ${step === 7 ? 'rounded-none' : 'rounded-[28px]'}`}
                >
                  <img
                    alt={activeCase.title}
                    className={`w-full h-full select-none pointer-events-none transition-transform duration-[800ms] group-hover:scale-105`}
                    style={{ objectFit: getImgFit() as any }}
                    src={activeCase.imageUrl}
                    referrerPolicy="no-referrer"
                  />
                  
                  {step >= 9 && (
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-8 transition-opacity duration-300 pointer-events-none">
                      <div className="text-white space-y-1">
                        <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-300">Fotografía Clínica de Entrada</span>
                        <p className="text-xs font-semibold text-neutral-200">Resultados clínicos reales documentados bajo consentimiento de privacidad.</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
      
      {/* Helper overlay */}
      {step < 16 && !isAutoplay && (
        <div className="fixed top-2 left-2 text-[10px] font-mono text-gray-400 opacity-50 select-none pointer-events-none z-50">
          TIMELAPSE MODE [WORKS] - STEP {step}/15
        </div>
      )}
    </section>
  );
}
