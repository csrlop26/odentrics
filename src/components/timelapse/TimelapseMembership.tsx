import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../../data';
import { useTimelapse } from '../../hooks/useTimelapse';
import CodeEditorOverlay from './CodeEditorOverlay';

interface TimelapseMembershipProps {
  isActive?: boolean;
  isAutoplay?: boolean;
  onComplete?: () => void;
  onOpenBooking?: (id?: string) => void;
}

export default function TimelapseMembership({ isActive = true, isAutoplay = false, onComplete, onOpenBooking }: TimelapseMembershipProps) {
  const step = useTimelapse(16, isActive, isAutoplay, onComplete);
  const [savedCalculatorAmount, setSavedCalculatorAmount] = useState<number>(140);
  const [treatmentCount, setTreatmentCount] = useState<number>(2);

  const calculateSavings = (count: number) => {
    const annualSavings = (count * 60) + 140;
    setSavedCalculatorAmount(annualSavings);
    setTreatmentCount(count);
  };

  const getCodeSnippet = (s: number) => {
    switch (s) {
      case 0: return "";
      case 1: return "// Mount Membership Section\nbackground-color: #000; // wait, too dark";
      case 2: return "/* Fix background */\nbackground-color: #FDFBF7;\noverflow: hidden;";
      case 3: return "/* Inject Decorative Shapes */\n<div className=\"shape right\" />\n<div className=\"shape left\" />\n// Oops, they are squares";
      case 4: return "/* Fix shapes to blurs */\nborder-radius: 50%;\nfilter: blur(3xl);";
      case 5: return "/* Typography */\ntext-align: left; // Looks unbalanced";
      case 6: return "/* Fix Typography Alignment */\ntext-align: center;\nmax-width: 4xl;";
      case 7: return "/* Load Membership Plans */\nconst plans = getPlans();\n<Grid layout=\"2-cols\" />";
      case 8: return "/* Render Plan Cards */\nplans.map(p => <PlanCard />)\n// Why are both cards black?!";
      case 9: return "/* Fix Card Themes */\nif (isPremium) bg = '#2C3E48';\nelse bg = 'white';";
      case 10: return "/* Add Watermark Text */\n<Watermark>40%</Watermark>\nfont-size: 140px;";
      case 11: return "/* Inject Features List */\n<ul className=\"checklist\">\n  {features.map(...)}\n</ul>";
      case 12: return "/* Add CTAs */\n<Button variant=\"primary\" />\nborder-radius: full;";
      case 13: return "/* Add Savings Calculator */\n<input type=\"range\" /> // raw HTML input";
      case 14: return "/* Style Calculator Widget */\nbackdrop-filter: blur(10px);\naccent-color: #2C3E48;";
      case 15: return "/* Add Calculator Result Screen */\n<ResultScreen>140€ / año</ResultScreen>";
      case 16: return "/* Section Finished */";
      default: return "";
    }
  };

  const getBgColor = () => {
    if (step === 1) return '#000000';
    if (step >= 2) return '#FDFBF7';
    return '#ffffff';
  };

  const getShapeClass = (base: string) => {
    if (step === 3) return `${base} rounded-none blur-none opacity-100`; // Squares
    return `${base} rounded-full filter blur-3xl pointer-events-none`;
  };

  const getHeaderAlign = () => step === 5 ? 'text-left' : 'text-center';

  return (
    <section id="circulo" className="py-24 relative overflow-hidden transition-colors duration-500" style={{ backgroundColor: getBgColor() }}>
      
      <CodeEditorOverlay isVisible={isActive} codeSnippet={getCodeSnippet(step)} />

      {/* Background visual graphics */}
      <AnimatePresence>
        {step >= 3 && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: step === 3 ? 1 : 0.4 }} transition={{ duration: 1 }} className={getShapeClass("absolute right-0 top-1/4 w-96 h-96 bg-slate-200")} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: step === 3 ? 1 : 0.3 }} transition={{ duration: 1 }} className={getShapeClass("absolute left-10 bottom-10 w-80 h-80 bg-emerald-100")} />
          </>
        )}
      </AnimatePresence>

      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px] relative">
        
        <AnimatePresence>
          {step >= 5 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`max-w-4xl mx-auto mb-16 space-y-4 ${getHeaderAlign()}`}
            >
              <span className="text-xs uppercase tracking-widest text-[#2C3E48] font-bold font-mono px-3 py-1 bg-emerald-50 rounded-lg inline-block">
                Membresías Exclusivas
              </span>
              <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight ${step === 1 ? 'text-white' : 'text-[#1A252C]'}`}>
                Únase al Círculo Odentrics
              </h2>
              {step >= 6 && (
                <p className={`text-base md:text-lg max-w-2xl mx-auto ${step === 1 ? 'text-gray-400' : 'text-[#6B7A82]'}`}>
                  Nuestro programa está pensado para quienes valoran la salud bucal constante e integral. Acceda a reducciones fijas, reservas preferentes y seguimiento de alta resolución para toda su familia.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Benefits Cards Row */}
        <div className={step >= 7 ? "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16" : "hidden"}>
          <AnimatePresence>
            {step >= 8 && MEMBERSHIP_PLANS.map((plan, idx) => {
              const isSlateCard = step === 8 ? true : plan.percentageDiscount === '40%';
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className={`p-8 md:p-10 rounded-[32px] relative overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                    isSlateCard
                      ? 'bg-[#2C3E48] text-white shadow-2xl'
                      : 'bg-white text-[#1A252C] shadow-lg border border-[#e4eff9]'
                  }`}
                >
                  {/* Accent Watermark */}
                  {step >= 10 && (
                    <div className={`absolute top-0 right-[-10px] p-6 text-[110px] sm:text-[140px] font-mono font-extrabold ${
                      isSlateCard ? 'text-white/[0.04]' : 'text-[#2C3E48]/[0.02]'
                    }`}>
                      {plan.percentageDiscount}
                    </div>
                  )}

                  {/* Popular Badge */}
                  {plan.isPopular && step >= 10 && (
                    <span className="absolute top-6 right-6 px-3.5 py-1 bg-[#dae5de] text-[#2C3E48] font-sans font-extrabold text-[10px] uppercase tracking-wider rounded-full shadow-sm">
                      Más Recomendado
                    </span>
                  )}

                  <div className="space-y-6 relative z-10">
                    <div className="space-y-1">
                      <span className={`text-[11px] uppercase tracking-widest font-mono font-bold ${
                        isSlateCard ? 'text-emerald-300' : 'text-[#2C3E48]/80'
                      }`}>
                        {plan.typeLabel}
                      </span>
                      <h3 className="text-5xl font-extrabold tracking-tight font-mono">
                        {plan.percentageDiscount}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-2xl font-extrabold">{plan.name}</h4>
                      <p className={`text-sm ${isSlateCard ? 'text-slate-300' : 'text-[#6B7A82]'} leading-relaxed`}>
                        {plan.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="text-lg font-extrabold tracking-tight font-mono">{plan.price}</span>
                    </div>

                    {/* Features Checklist */}
                    {step >= 11 && (
                      <ul className="space-y-3 pt-4 border-t border-slate-200/25">
                        {plan.features.map((feat, index) => (
                          <li key={index} className="flex items-start gap-2.5 text-xs font-semibold">
                            <span className={`p-0.5 rounded-full shrink-0 ${
                              isSlateCard ? 'bg-emerald-400/20 text-emerald-300' : 'bg-[#2C3E48]/10 text-[#2C3E48]'
                            }`}>
                              <Check className="w-3.5 h-3.5" />
                            </span>
                            <span className={isSlateCard ? 'text-slate-200/90' : 'text-[#1A252C]/90'}>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Card Button */}
                  {step >= 12 && (
                    <div className="mt-8 pt-6 relative z-10">
                      {isSlateCard ? (
                        <button className="w-full py-4 text-xs font-bold uppercase tracking-widest rounded-full bg-emerald-400 text-[#2C3E48] hover:bg-emerald-300 transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2">
                          <Sparkles className="w-4 h-4" /> {plan.ctaText}
                        </button>
                      ) : (
                        <button className="w-full py-4 text-xs font-bold uppercase tracking-widest rounded-full bg-[#2C3E48] text-white hover:bg-[#1A252C] transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2">
                          <span>{plan.ctaText}</span>
                        </button>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* SAVINGS CALCULATOR PANEL */}
        <AnimatePresence>
          {step >= 13 && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`max-w-4xl mx-auto border p-8 ${step === 13 ? 'bg-gray-200 border-black rounded-none' : 'bg-white/70 backdrop-blur-md rounded-3xl border-[#deeaf3] shadow-sm'}`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-3 max-w-lg">
                  {step >= 14 && (
                    <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                      Simulador del Círculo Odentrics
                    </span>
                  )}
                  <h4 className={`text-xl font-bold ${step === 13 ? 'text-black font-serif' : 'text-[#1A252C]'}`}>¿Cuánto puedes ahorrar al año?</h4>
                  
                  {step >= 14 && (
                    <p className="text-xs text-[#6B7A82] leading-relaxed">
                      Estime la frecuencia promedio de visitas anuales de su familia (odontología general, higiene, limpiezas avanzadas con sistema Airflow) y compruebe su nivel estimado de ahorro neto garantizado.
                    </p>
                  )}

                  <div className="pt-2">
                    <label className={`text-xs font-bold block mb-1 ${step === 13 ? 'text-black' : 'text-slate-700'}`}>
                      Visitas estimadas al año por la familia: <span className="text-indigo-700 font-mono text-base ml-1">{treatmentCount}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={treatmentCount}
                      onChange={(e) => calculateSavings(Number(e.target.value))}
                      className={step === 13 ? "w-full" : "w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2C3E48]"}
                    />
                    {step >= 14 && (
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                        <span>1 Visita</span>
                        <span>5 Visitas</span>
                        <span>10 Visitas</span>
                      </div>
                    )}
                  </div>
                </div>

                {step >= 15 && (
                  <div className="bg-[#2C3E48] text-white rounded-2xl p-6 text-center shadow-lg shrink-0 flex flex-col justify-center min-w-[220px]">
                    <span className="text-[10px] text-emerald-300 font-mono tracking-widest uppercase block font-bold">Ahorro Estimado Neto</span>
                    <span className="text-4xl font-extrabold text-white block my-2 font-mono">{savedCalculatorAmount}€ <span className="text-xs text-[#dae5de] font-sans font-normal">/ año</span></span>
                    <div className="h-px bg-white/10 my-2" />
                    <span className="text-[10px] text-slate-300 leading-normal">Incluye limpiezas gratis e informes de diagnóstico en 3D.</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Helper overlay */}
      {step < 16 && !isAutoplay && (
        <div className="fixed top-2 left-2 text-[10px] font-mono text-gray-400 opacity-50 select-none pointer-events-none z-50">
          TIMELAPSE MODE [MEMBERSHIP] - STEP {step}/16
        </div>
      )}
    </section>
  );
}
