import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, CheckCircle } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../data';

interface MembershipProps {
  onOpenBooking: (preselectedId?: string) => void;
}

export default function MembershipSection({ onOpenBooking }: MembershipProps) {
  const [savedCalculatorAmount, setSavedCalculatorAmount] = useState<number>(140);
  const [treatmentCount, setTreatmentCount] = useState<number>(2);
  const [joinedPlanId, setJoinedPlanId] = useState<string | null>(null);

  const calculateSavings = (count: number) => {
    const annualSavings = (count * 60) + 140;
    setSavedCalculatorAmount(annualSavings);
    setTreatmentCount(count);
  };

  const handleJoinCircle = (planId: string) => {
    setJoinedPlanId(planId);
  };

  return (
    <section id="circulo" className="py-24 bg-[#FDFBF7] relative overflow-hidden">
      {/* Background visual graphics */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-slate-100 rounded-full filter blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-80 h-80 bg-emerald-50 rounded-full filter blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px] relative">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#2C3E48] font-bold font-mono px-3 py-1 bg-emerald-50 rounded-lg inline-block">
            Membresías Exclusivas
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#1A252C] tracking-tight leading-[1.1]">
            Únase al <em className="not-italic font-medium text-[#2C3E48]/60">Círculo Odentrics</em>
          </h2>
          <p className="text-base md:text-lg text-[#6B7A82] max-w-2xl mx-auto font-light leading-relaxed">
            Nuestro programa está pensado para quienes valoran la salud bucal constante e integral. Acceda a reducciones fijas, reservas preferentes y seguimiento de alta resolución para toda su familia.
          </p>
        </div>

        {/* Benefits Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {MEMBERSHIP_PLANS.map((plan) => {
            const isSlateCard = plan.percentageDiscount === '40%';
            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`p-8 md:p-10 rounded-[32px] relative overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                  isSlateCard
                    ? 'bg-[#2C3E48] text-white shadow-2xl'
                    : 'bg-white text-[#1A252C] shadow-lg border border-[#e4eff9]'
                }`}
              >
                {/* Accent Watermark */}
                <div className={`absolute top-0 right-[-10px] p-6 text-[110px] sm:text-[140px] font-mono font-extrabold ${
                  isSlateCard ? 'text-white/[0.04]' : 'text-[#2C3E48]/[0.02]'
                }`}>
                  {plan.percentageDiscount}
                </div>

                {/* Popular Badge */}
                {plan.isPopular && (
                  <span className="absolute top-6 right-6 px-3.5 py-1 bg-[#dae5de] text-[#2C3E48] font-sans font-extrabold text-[10px] uppercase tracking-wider rounded-full shadow-sm">
                    Más Recomendado
                  </span>
                )}

                <div className="space-y-6">
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
                </div>

                {/* Card Button */}
                <div className="mt-8 pt-6">
                  {isSlateCard ? (
                    joinedPlanId === plan.id ? (
                      <div className="w-full py-4 rounded-full bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-300" />
                        <span className="text-xs font-bold text-emerald-200 tracking-wide">¡Solicitud enviada!</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleJoinCircle(plan.id)}
                        className="w-full py-4 text-xs font-bold uppercase tracking-widest rounded-full bg-emerald-400 text-[#2C3E48] hover:bg-emerald-300 transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" /> {plan.ctaText}
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => onOpenBooking(plan.id)}
                      className="w-full py-4 text-xs font-bold uppercase tracking-widest rounded-full bg-[#2C3E48] text-white hover:bg-[#1A252C] transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2"
                    >
                      <span>{plan.ctaText}</span>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* SAVINGS CALCULATOR PANEL */}
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl border border-[#deeaf3] p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-lg">
              <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                Simulador del Círculo Odentrics
              </span>
              <h4 className="text-xl font-bold text-[#1A252C]">¿Cuánto puedes ahorrar al año?</h4>
              <p className="text-xs text-[#6B7A82] leading-relaxed">
                Estime la frecuencia promedio de visitas anuales de su familia (odontología general, higiene, limpiezas avanzadas con sistema Airflow) y compruebe su nivel estimado de ahorro neto garantizado.
              </p>

              {/* Slider widget */}
              <div className="pt-2">
                <label className="text-xs text-slate-700 font-bold block mb-1">
                  Visitas estimadas al año por la familia: <span className="text-indigo-700 font-mono text-base ml-1">{treatmentCount}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={treatmentCount}
                  onChange={(e) => calculateSavings(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2C3E48]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>1 Visita</span>
                  <span>5 Visitas</span>
                  <span>10 Visitas</span>
                </div>
              </div>
            </div>

            <div className="bg-[#2C3E48] text-white rounded-2xl p-6 text-center shadow-lg shrink-0 flex flex-col justify-center min-w-[220px]">
              <span className="text-[10px] text-emerald-300 font-mono tracking-widest uppercase block font-bold">Ahorro Estimado Neto</span>
              <span className="text-4xl font-extrabold text-white block my-2 font-mono">{savedCalculatorAmount}€ <span className="text-xs text-[#dae5de] font-sans font-normal">/ año</span></span>
              <div className="h-px bg-white/10 my-2" />
              <span className="text-[10px] text-slate-300 leading-normal">Incluye limpiezas gratis e informes de diagnóstico en 3D.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
