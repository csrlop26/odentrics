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
  const step = useTimelapse(6, isActive, isAutoplay, onComplete);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getCodeSnippet = (s: number) => {
    switch (s) {
      case 0: return "";
      case 1: return "// Mount Services Container\nbackground-color: #e9f5ff;\npadding: 6rem 0;";
      case 2: return "/* Header Content */\n<Header>\n  <h2>Excelencia Clínica</h2>\n</Header>";
      case 3: return "/* Fetch Clinical Services Data */\nconst services = fetchServices();\n<Grid layout=\"4-cols\" />";
      case 4: return "/* Render Service Cards */\nservices.map(s => <Card data={s} />)\n// Applying hover animations...";
      case 5: return "/* Inject Promo Standards */\n<StandardsBlock icon={<Crosshair />} />\nborder: 1px solid #deeaf3;";
      case 6: return "/* Section Finished */";
      default: return "";
    }
  };

  return (
    <section id="servicios" className="py-24 relative transition-colors duration-1000" style={{ backgroundColor: step >= 1 ? '#e9f5ff' : '#ffffff' }}>
      
      <CodeEditorOverlay isVisible={isActive} codeSnippet={getCodeSnippet(step)} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
        {/* Header content detail */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
            >
              <div className="max-w-xl space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#2C3E48] font-bold font-mono px-3 py-1 bg-white inline-block rounded-lg shadow-sm">
                  Tratamientos Especializados
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A252C] tracking-tight">
                  Excelencia Clínica y Estética
                </h2>
                <p className="text-sm md:text-base text-[#6B7A82]">
                  Aplicamos biotecnología avanzada y flujos digitales de alta precisión para ofrecerle procedimientos indoloros con resultados que se sienten y lucen completamente naturales.
                </p>
              </div>

              <a
                href="#contacto"
                className="text-xs font-bold uppercase tracking-wider text-[#2C3E48] inline-flex items-center gap-1.5 hover:underline shrink-0"
              >
                <span>Consultas Especiales</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Services Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {step >= 4 && CLINIC_SERVICES.map((serv, idx) => (
              <motion.div
                key={serv.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-[28px] overflow-hidden p-6 md:p-8 flex flex-col justify-between shadow-sm border border-[#deeaf3]/50 group relative"
              >
                {/* Upper line decoration */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2C3E48] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-6">
                  {/* Floating Action Badge */}
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono font-bold text-[#2C3E48] bg-slate-50 px-2.5 py-1 rounded-full uppercase">
                      {serv.duration}
                    </span>
                    <button
                      onClick={() => setSelectedService(serv)}
                      className="p-1.5 h-8 w-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[#2C3E48] hover:bg-[#2C3E48] hover:text-white transition-colors cursor-pointer"
                      title="Ver más información"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Icon & Description */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-extrabold text-[#1A252C] leading-snug group-hover:text-[#2C3E48] transition-colors">
                      {serv.title}
                    </h3>
                    <p className="text-xs text-[#6B7A82] leading-relaxed line-clamp-3">
                      {serv.description}
                    </p>
                  </div>
                </div>

                {/* Footer specs of the card */}
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
                    onClick={() => onOpenBooking && onOpenBooking(serv.id)}
                    className="p-3 bg-slate-50 text-[#2C3E48] rounded-xl hover:bg-[#2C3E48] hover:text-white transition-all transform active:scale-95 flex items-center justify-center cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CLINICAL STANDARDS / CERTIFICATES PROMOS */}
        <AnimatePresence>
          {step >= 5 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-16 bg-white rounded-3xl p-8 md:p-10 border border-[#deeaf3]/60 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-8"
            >
              <div className="flex items-start gap-4">
                <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-800 shrink-0">
                  <Crosshair className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-[#1A252C]">Diagnóstico Computarizado No-Invasivo</h4>
                  <p className="text-xs text-[#6B7A82] max-w-xl">
                    Nuestra clínica está equipada con el sistema iTero Element 5D plus, que nos permite escanear su esmalte e interdentalidad en 60 segundos sin moldes incómodos ni radiaciones ionizantes nocivas.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 shrink-0 justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-700 font-mono font-bold text-[10px] uppercase rounded-lg border border-slate-100">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Tecnología de Flujo de aire
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-700 font-mono font-bold text-[10px] uppercase rounded-lg border border-slate-100">
                  <Star className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" /> Escaneado 3D iTero
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Helper overlay */}
      {step < 6 && !isAutoplay && (
        <div className="fixed top-2 left-2 text-[10px] font-mono text-gray-400 opacity-50 select-none pointer-events-none z-50">
          TIMELAPSE MODE [SERVICES] - STEP {step}/6
        </div>
      )}
    </section>
  );
}
