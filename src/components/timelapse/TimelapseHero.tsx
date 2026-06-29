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
  const step = useTimelapse(16, isActive, isAutoplay, onComplete);

  const getCodeSnippet = (s: number) => {
    switch (s) {
      case 0: return "";
      case 1: return "// Mounting Hero Container\nbackground-color: #ff0000; // test color";
      case 2: return "// Whoops, that's too red\nbackground-color: #020617; // dark slate";
      case 3: return "// Let's try clinic blue\nbackground-color: #082f49;";
      case 4: return "/* Load Background Asset */\n<img src=\"clinic-premium.jpg\" />\nobject-fit: contain; // wait, looks broken";
      case 5: return "/* Fix Image Fit */\nobject-fit: cover;\nfilter: brightness(1); // too bright";
      case 6: return "/* Darken Image */\nfilter: brightness(0.45) saturate(1.1);";
      case 7: return "/* Apply Gradient Overlay for Text Readability */\nbackground: linear-gradient();\nmix-blend-mode: overlay;";
      case 8: return "/* Inject Trust Badge */\n<Badge icon={<Sparkles />} />\nposition: absolute;\ntop: 0; // wait, overlapping header";
      case 9: return "/* Fix Badge Position */\ntop: 8rem;\nanimation: float 3s ease-in-out;";
      case 10: return "/* Render Typography */\n<h1 className=\"font-serif text-red-500\">\n  Clínica Dentel\n</h1> // Typos and ugly font";
      case 11: return "/* Fix Typography & Typos */\n<h1 className=\"font-sans text-white\">\n  Cuidado Dental\n</h1>\nfont-weight: 800;";
      case 12: return "/* Inject Subtitle */\n<p className=\"text-neutral-100\">\n  Descubra una clínica diseñada...\n</p>";
      case 13: return "/* Primary Action Buttons */\n<Button variant=\"outline\">Reservar Cita</Button>\n// Needs more pop";
      case 14: return "/* Refine Buttons */\n<Button variant=\"primary\" rounded=\"full\">\n  Reservar Mi Cita\n</Button>";
      case 15: return "/* Fetch KPIs Data */\n<div className=\"grid-stats\">\n  {stats.map(stat => <Stat />)}\n</div>";
      case 16: return "/* Hero Section Ready! */";
      default: return "";
    }
  };

  // Dynamic Styles based on "mistake" steps
  const getBgColor = () => {
    if (step === 1) return '#ff0000';
    if (step === 2) return '#020617';
    if (step >= 3) return '#082f49';
    return '#ffffff';
  };

  const getImgFit = () => step === 4 ? 'contain' : 'cover';
  const getImgFilter = () => {
    if (step <= 5) return 'brightness(1)';
    return 'brightness(0.45) saturate(1.1)';
  };

  const getBadgeClass = () => {
    if (step === 8) return 'absolute top-0 left-0 z-10 px-4'; // Broken position
    return 'absolute top-28 sm:top-32 left-1/2 -translate-x-1/2 z-10 w-full max-w-lg px-4'; // Fixed
  };

  const getH1Class = () => {
    if (step === 10) return 'font-serif text-5xl md:text-7xl font-normal text-red-500 leading-[1.1] tracking-tight text-left'; // Ugly
    return 'font-sans text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight text-center'; // Fixed
  };

  const getH1Text = () => {
    if (step === 10) return <>Clínica Dentel <br/><span className="text-blue-500">Impecable y Moderno</span></>;
    return (
      <>
        Cuidado Dental <br />
        <span className="text-emerald-300 relative inline-block">
          Impecable y Moderno
          <svg className="absolute left-0 bottom-0 w-full h-2 text-emerald-300/40" viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg>
        </span>
      </>
    );
  };

  const getBtnClass = () => {
    if (step === 13) return 'w-full sm:w-auto border-2 border-gray-400 text-gray-400 px-6 py-2 flex items-center justify-center gap-2 font-sans text-sm shadow-sm'; // Boring outline
    return 'w-full sm:w-auto bg-[#FDFBF7] text-[#2C3E48] px-10 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-slate-50 transition-all font-sans text-sm font-bold shadow-xl active:scale-95 group'; // Fixed
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-24 overflow-hidden text-center transition-colors duration-500" style={{ backgroundColor: getBgColor() }}>
      
      <CodeEditorOverlay isVisible={isActive} codeSnippet={getCodeSnippet(step)} />

      {/* Background Image Content */}
      <div className="absolute inset-0 z-0">
        <motion.img
          alt="Clínica Odentrics Premium"
          className="w-full h-full select-none pointer-events-none transition-all duration-700"
          style={{ objectFit: getImgFit(), filter: getImgFilter() }}
          src="https://lh3.googleusercontent.com/aida/ADBb0ugsa7vYDWYwjWXstGlAEpDR3HAKUxZoBHM3n9B73KksVUWvailVblGJHQWnMJONs4i80VSfIIdwAzJ_bdGl0icEUfPjGdlp2ZAyzMQh_3wNSLJY3PWgzAGfKyRtlm8KUZ4aRgdX70o_Zn5rdkye1AgnKPeyQAkpjC9NTxG6ryeG8TKYMdlKNpuN_G6XPX5Tet8zRAH01tK6JJ5BzeyMXUr_aG3TurviG1Y6SreclDd0Oa8kEgQlQXN5DNV8"
          referrerPolicy="no-referrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 4 ? 1 : 0 }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-[#2C3E48]/20 via-transparent to-[#FDFBF7]/90" 
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 7 ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Floating Trust Badge */}
      <AnimatePresence>
        {step >= 8 && (
          <div className={getBadgeClass()}>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
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
            {step >= 10 && (
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className={getH1Class()}
              >
                {getH1Text()}
              </motion.h1>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 12 && (
              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="font-sans text-base md:text-xl text-neutral-100 max-w-2xl mx-auto leading-relaxed"
              >
                Descubra una clínica diseñada para su salud a largo plazo. Fusionamos tecnología de diagnóstico en 3D, bienestar guiado y tratamientos mínimamente invasivos con el máximo confort médico.
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 13 && (
              <motion.div
                initial={{ y: 15, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className={`flex ${step === 13 ? 'flex-col items-start gap-2' : 'flex-col sm:flex-row gap-4 justify-center items-center'}`}
              >
                <button
                  onClick={onOpenBooking}
                  className={getBtnClass()}
                >
                  <span>{step === 13 ? 'Reservar Cita' : 'Reservar Mi Cita'}</span>
                  {step >= 14 && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
                {step >= 14 && (
                  <a
                    href="#servicios"
                    className="w-full sm:w-auto border border-white/40 text-white px-10 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-white/10 backdrop-blur-sm transition-all font-sans text-sm font-bold active:scale-95"
                  >
                    Conocer Especialidades
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Stats list with smooth indicators */}
          <AnimatePresence>
            {step >= 15 && (
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
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.15, type: 'spring', stiffness: 100 }}
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
