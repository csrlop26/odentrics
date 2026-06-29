import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Star, CornerDownRight, Plus, Activity, Heart, Award, ArrowUpRight, Crosshair, Sparkles, ShieldAlert, X } from 'lucide-react';
import { CLINIC_SERVICES } from '../../data';
import { Service } from '../../types';
import { useTimelapse } from '../../hooks/useTimelapse';
import CodeEditorOverlay from './CodeEditorOverlay';

interface TimelapseServicesProps {
  isActive?: boolean;
  isAutoplay?: boolean;
  onComplete?: () => void;
  onOpenBooking?: (id: string) => void;
}

export default function TimelapseServices({ isActive = true, isAutoplay = false, onComplete, onOpenBooking }: TimelapseServicesProps) {
  const step = useTimelapse(15, isActive, isAutoplay, onComplete);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getCodeSnippet = (s: number) => {
    switch (s) {
      case 0: return "";
      case 1: return "// Mount Services Container\nbackground-color: #fef08a; // test yellow";
      case 2: return "/* Change to calm clinic blue */\nbackground-color: #e9f5ff;\npadding: 6rem 0;";
      case 3: return "/* Header Content */\n<h2 className=\"font-serif text-3xl\">\n  Excelencia Clínica\n</h2> // basic typography";
      case 4: return "/* Fix Header Typography */\n<h2 className=\"font-sans text-5xl font-extrabold text-[#1A252C]\">\n  Excelencia Clínica\n</h2>";
      case 5: return "/* Fetch Clinical Services Data */\nconst services = fetchServices();\n<Grid layout=\"1-col\" /> // wait, this is too big";
      case 6: return "/* Fix Grid Layout */\ngrid-template-columns: repeat(4, 1fr);";
      case 7: return "/* Render Service Cards */\nservices.map(s => <Card data={s} />)\nborder: 3px solid black; // whoops";
      case 8: return "/* Style Service Cards */\nborder-radius: 28px;\nbox-shadow: sm;\nborder: 1px solid #deeaf3;";
      case 9: return "/* Add Action Buttons */\n<button><Plus /></button>\nposition: absolute; right: -10px; // bugged";
      case 10: return "/* Fix Action Buttons & Pills */\ndisplay: flex;\njustify-content: space-between;";
      case 11: return "/* Inject Footer Pricing */\n<CardFooter>\n  Presupuesto Estimado...\n</CardFooter>";
      case 12: return "/* Inject Promo Standards */\n<StandardsBlock />\nbackground: black;\ncolor: white; // too dark";
      case 13: return "/* Refine Promo Standards */\nbackground: white;\nborder: 1px solid #deeaf3;";
      case 14: return "/* Section Finished */";
      default: return "";
    }
  };

  const getBgColor = () => {
    if (step === 1) return '#fef08a';
    if (step >= 2) return '#e9f5ff';
    return '#ffffff';
  };

  const getHeaderClass = () => {
    if (step === 3) return 'font-serif text-3xl text-gray-800';
    return 'text-4xl md:text-5xl font-extrabold text-[#1A252C] tracking-tight';
  };

  const getGridClass = () => {
    if (step === 5) return 'grid grid-cols-1 gap-6';
    return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';
  };

  const getCardClass = () => {
    if (step === 7) return 'bg-white border-[3px] border-black p-4 flex flex-col justify-between';
    return 'bg-white rounded-[28px] overflow-hidden p-6 md:p-8 flex flex-col justify-between shadow-sm border border-[#deeaf3]/50 group relative';
  };

  const getPromoClass = () => {
    if (step === 12) return 'mt-16 bg-black text-white rounded-md p-6 flex flex-col lg:flex-row justify-between items-center gap-8';
    return 'mt-16 bg-white rounded-3xl p-8 md:p-10 border border-[#deeaf3]/60 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-8';
  };

  return (
    <section id="servicios" className="py-24 relative transition-colors duration-500" style={{ backgroundColor: getBgColor() }}>
      
      <CodeEditorOverlay isVisible={isActive} codeSnippet={getCodeSnippet(step)} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
        {/* Header content detail */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
            >
              <div className="max-w-xl space-y-4">
                {step >= 4 && (
                  <span className="text-xs uppercase tracking-widest text-[#2C3E48] font-bold font-mono px-3 py-1 bg-white inline-block rounded-lg shadow-sm">
                    Tratamientos Especializados
                  </span>
                )}
                <h2 className={getHeaderClass()}>
                  Excelencia Clínica y Estética
                </h2>
                {step >= 4 && (
                  <p className="text-sm md:text-base text-[#6B7A82]">
                    Aplicamos biotecnología avanzada y flujos digitales de alta precisión para ofrecerle procedimientos indoloros con resultados que se sienten y lucen completamente naturales.
                  </p>
                )}
              </div>

              {step >= 4 && (
                <a
                  href="#contacto"
                  className="text-xs font-bold uppercase tracking-wider text-[#2C3E48] inline-flex items-center gap-1.5 hover:underline shrink-0"
                >
                  <span>Consultas Especiales</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Services Grid Layout */}
        <div className={getGridClass()}>
          <AnimatePresence>
            {step >= 5 && CLINIC_SERVICES.map((serv, idx) => (
              <motion.div
                key={serv.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={step >= 8 ? { y: -6 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={getCardClass()}
              >
                {step >= 8 && <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2C3E48] opacity-0 group-hover:opacity-100 transition-opacity" />}

                <div className="space-y-6 relative">
                  {/* Action Badges */}
                  {step >= 9 && (
                    <div className={step === 9 ? "absolute -right-10 -top-10" : "flex items-center justify-between w-full"}>
                      {step >= 10 && (
                        <span className="text-[10px] font-mono font-bold text-[#2C3E48] bg-slate-50 px-2.5 py-1 rounded-full uppercase">
                          {serv.duration}
                        </span>
                      )}
                      <button
                        className="p-1.5 h-8 w-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[#2C3E48] hover:bg-[#2C3E48] hover:text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Icon & Description */}
                  <div className="space-y-3 pt-4">
                    <h3 className="text-xl font-extrabold text-[#1A252C] leading-snug group-hover:text-[#2C3E48] transition-colors">
                      {serv.title}
                    </h3>
                    <p className="text-xs text-[#6B7A82] leading-relaxed line-clamp-3">
                      {serv.description}
                    </p>
                  </div>
                </div>

                {/* Footer specs of the card */}
                {step >= 11 && (
                  <div className="pt-6 mt-6 border-t border-[#e4eff9] flex justify-between items-center bg-transparent">
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono tracking-wide block uppercase">
                        Presupuesto Estimado
                      </span>
                      <span className="text-sm font-extrabold text-[#2C3E48] font-mono">
                        {serv.priceEstimate}
                      </span>
                    </div>

                    <button
                      className="p-3 bg-slate-50 text-[#2C3E48] rounded-xl hover:bg-[#2C3E48] hover:text-white transition-all transform active:scale-95 flex items-center justify-center"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CLINICAL STANDARDS / CERTIFICATES PROMOS */}
        <AnimatePresence>
          {step >= 12 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={getPromoClass()}
            >
              <div className="flex items-start gap-4">
                <div className={`p-4 rounded-2xl shrink-0 ${step === 12 ? 'bg-white/10 text-white' : 'bg-emerald-50 text-emerald-800'}`}>
                  <Crosshair className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className={`text-lg font-bold ${step === 12 ? 'text-white' : 'text-[#1A252C]'}`}>Diagnóstico Computarizado No-Invasivo</h4>
                  <p className={`text-xs max-w-xl ${step === 12 ? 'text-gray-400' : 'text-[#6B7A82]'}`}>
                    Nuestra clínica está equipada con el sistema iTero Element 5D plus, que nos permite escanear su esmalte e interdentalidad en 60 segundos sin moldes incómodos ni radiaciones ionizantes nocivas.
                  </p>
                </div>
              </div>

              {step >= 13 && (
                <div className="flex flex-wrap gap-4 shrink-0 justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-700 font-mono font-bold text-[10px] uppercase rounded-lg border border-slate-100">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Tecnología de Flujo de aire
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-700 font-mono font-bold text-[10px] uppercase rounded-lg border border-slate-100">
                    <Star className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" /> Escaneado 3D iTero
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Helper overlay */}
      {step < 15 && !isAutoplay && (
        <div className="fixed top-2 left-2 text-[10px] font-mono text-gray-400 opacity-50 select-none pointer-events-none z-50">
          TIMELAPSE MODE [SERVICES] - STEP {step}/14
        </div>
      )}
    </section>
  );
}
