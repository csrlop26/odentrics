import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTimelapse } from '../../hooks/useTimelapse';
import CodeEditorOverlay from './CodeEditorOverlay';

interface TimelapseHeroProps {
  isActive?: boolean;
  isAutoplay?: boolean;
  onComplete?: () => void;
  onOpenBooking?: () => void;
}

export default function TimelapseHero({ isActive = true, isAutoplay = false, onComplete, onOpenBooking }: TimelapseHeroProps) {
  const step = useTimelapse(8, isActive, isAutoplay, onComplete);

  const getCodeSnippet = (s: number) => {
    switch (s) {
      case 0: return "";
      case 1: return "// Mounting Hero Container\nbackground-color: #082f49;";
      case 2: return "/* Load Background Asset */\n<img src=\"clinic-premium.jpg\" />\nfilter: brightness(0.45);";
      case 3: return "/* Apply Gradient Overlay */\nbackground: linear-gradient();\nmix-blend-mode: overlay;";
      case 4: return "/* Inject Trust Badge */\n<Badge icon={<Sparkles />} />\nanimation: float 3s ease-in-out;";
      case 5: return "/* Render Typography */\nfont-family: 'Inter', sans-serif;\ncolor: white;";
      case 6: return "/* Primary Action Buttons */\n<Button variant=\"primary\">\n  Reservar Cita\n</Button>";
      case 7: return "/* Fetch KPIs... */\n<div className=\"grid-stats\">\n  {stats.map(stat => <Stat />)}\n</div>";
      case 8: return "/* Hero Section Ready */";
      default: return "";
    }
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-24 overflow-hidden text-center transition-colors duration-1000" style={{ backgroundColor: step >= 1 ? '#082f49' : '#ffffff' }}>
      
      <CodeEditorOverlay isVisible={isActive} codeSnippet={getCodeSnippet(step)} />

      {/* Background Image Content */}
      <div className="absolute inset-0 z-0">
        <motion.img
          alt="Clínica Odentrics Premium"
          className="w-full h-full object-cover select-none pointer-events-none brightness-[0.45] saturate-[1.1]"
          src="https://lh3.googleusercontent.com/aida/ADBb0ugsa7vYDWYwjWXstGlAEpDR3HAKUxZoBHM3n9B73KksVUWvailVblGJHQWnMJONs4i80VSfIIdwAzJ_bdGl0icEUfPjGdlp2ZAyzMQh_3wNSLJY3PWgzAGfKyRtlm8KUZ4aRgdX70o_Zn5rdkye1AgnKPeyQAkpjC9NTxG6ryeG8TKYMdlKNpuN_G6XPX5Tet8zRAH01tK6JJ5BzeyMXUr_aG3TurviG1Y6SreclDd0Oa8kEgQlQXN5DNV8"
          referrerPolicy="no-referrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-[#2C3E48]/20 via-transparent to-[#FDFBF7]/90" 
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 3 ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Floating Trust Badge */}
      <AnimatePresence>
        {step >= 4 && (
          <div className="absolute top-28 sm:top-32 left-1/2 -translate-x-1/2 z-10 w-full max-w-lg px-4">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-sans text-xs font-semibold uppercase tracking-wider shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
              <span>Odontología Preventiva & Estética de Precisión</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Text block Content details */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-[80px] w-full pt-10">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <AnimatePresence>
            {step >= 5 && (
              <>
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="font-sans text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight text-center"
                >
                  Cuidado Dental <br />
                  <span className="text-emerald-300 relative inline-block">
                    Impecable y Moderno
                    <svg className="absolute left-0 bottom-0 w-full h-2 text-emerald-300/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-sans text-base md:text-xl text-neutral-100 max-w-2xl mx-auto leading-relaxed"
                >
                  Descubra una clínica diseñada para su salud a largo plazo. Fusionamos tecnología de diagnóstico en 3D, bienestar guiado y tratamientos mínimamente invasivos con el máximo confort médico.
                </motion.p>
              </>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 6 && (
              <motion.div
                initial={{ y: 15, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto bg-[#FDFBF7] text-[#2C3E48] px-10 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-slate-50 transition-all font-sans text-sm font-bold shadow-xl active:scale-95 group"
                >
                  <span>Reservar Mi Cita</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#servicios"
                  className="w-full sm:w-auto border border-white/40 text-white px-10 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-white/10 backdrop-blur-sm transition-all font-sans text-sm font-bold active:scale-95"
                >
                  Conocer Especialidades
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Stats list with smooth indicators */}
          <AnimatePresence>
            {step >= 7 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-12 text-white border-t border-white/10"
              >
                {[
                  { value: "100%", label: "Garantía Biocompatible" },
                  { value: "3D", label: "Escaneo intraoral iTero" },
                  { value: "+12k", label: "Sonrisas Protegidas" },
                  { value: "0%", label: "Financiación sin interés" }
                ].map((stat, idx) => (
                  <motion.div 
                    key={idx} 
                    className="space-y-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.15, duration: 0.5 }}
                  >
                    <span className="block text-3xl font-extrabold text-[#dae5de] font-mono">{stat.value}</span>
                    <span className="block text-xs uppercase tracking-wider text-slate-300 font-semibold">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
