import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, CheckCircle, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

const STATS = [
  { value: '100%', label: 'Biocompatible' },
  { value: 'iTero 3D', label: 'Escaneo intraoral' },
  { value: '+12.000', label: 'Sonrisas tratadas' },
  { value: '0%', label: 'Financiación' },
];

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="min-h-screen bg-[#EAEBE7] flex flex-col pt-20 overflow-hidden">

      {/* ── MAIN CONTENT AREA ── */}
      <div className="flex-1 max-w-[1440px] mx-auto w-full px-4 md:px-[80px] py-6 md:py-10 flex flex-col md:flex-row items-stretch gap-6">

        {/* ── LEFT: PHOTO CARD ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[24px] overflow-hidden flex-1 min-h-[55vw] md:min-h-0"
        >
          <img
            alt="Clínica Odentrics"
            src="https://lh3.googleusercontent.com/aida/ADBb0ugsa7vYDWYwjWXstGlAEpDR3HAKUxZoBHM3n9B73KksVUWvailVblGJHQWnMJONs4i80VSfIIdwAzJ_bdGl0icEUfPjGdlp2ZAyzMQh_3wNSLJY3PWgzAGfKyRtlm8KUZ4aRgdX70o_Zn5rdkye1AgnKPeyQAkpjC9NTxG6ryeG8TKYMdlKNpuN_G6XPX5Tet8zRAH01tK6JJ5BzeyMXUr_aG3TurviG1Y6SreclDd0Oa8kEgQlQXN5DNV8"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none pointer-events-none"
            style={{ filter: 'brightness(0.92) saturate(1.08)' }}
          />

          {/* Floating badge — tecnología */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-5 left-5 bg-white rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-[#e8f5ee] flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="font-sans font-bold text-xs text-[#1A252C] leading-tight">Escaneo iTero 3D</p>
              <p className="font-sans text-[10px] text-slate-400 font-medium leading-tight mt-0.5">Sin moldes · Sin dolor</p>
            </div>
          </motion.div>

          {/* Floating badge — rating */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-5 right-5 bg-white rounded-2xl px-4 py-3 shadow-lg flex items-center gap-2"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="font-sans font-bold text-xs text-[#1A252C]">4.9 · 800+ reseñas</span>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: CONTENT ── */}
        <div className="md:w-[400px] lg:w-[440px] shrink-0 flex flex-col justify-between py-2 md:py-4 gap-8">

          {/* Tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="inline-flex items-center gap-2 self-start"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#2C3E48]/55 font-semibold">
              Odontología preventiva & estética
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(2.6rem,4.5vw,4.4rem)] font-bold text-[#1A252C] leading-[1.02] tracking-[-0.02em]"
          >
            La clínica<br />dental que<br />
            <span className="text-[#2C3E48]/50">mereces.</span>
          </motion.h1>

          {/* Divider + subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <div className="w-10 h-0.5 bg-[#2C3E48]/20 rounded-full" />
            <p className="font-sans text-sm text-[#6B7A82] leading-relaxed font-light">
              Diagnóstico en 3D, biotecnología biocompatible y tratamientos mínimamente invasivos — sin renunciar al confort.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            <button
              onClick={onOpenBooking}
              className="w-full bg-[#2C3E48] text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#1A252C] transition-all font-sans text-sm font-bold shadow-md active:scale-95 group"
            >
              Reservar cita ahora
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#servicios"
              className="w-full border border-[#2C3E48]/18 text-[#2C3E48] px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#2C3E48]/5 transition-all font-sans text-sm font-medium text-center"
            >
              Ver tratamientos
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-black/4"
          >
            <div className="flex -space-x-2 shrink-0">
              {['#c8d5c0', '#a8bdb4', '#d4c5bc'].map((bg, i) => (
                <div key={i} className="w-9 h-9 rounded-full border-2 border-white" style={{ backgroundColor: bg }} />
              ))}
            </div>
            <div>
              <p className="font-sans text-xs font-bold text-[#1A252C] leading-tight">+12.000 pacientes satisfechos</p>
              <p className="font-sans text-[10px] text-slate-400 mt-0.5 font-medium">Confían en Odentrics cada año</p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── STATS BAR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.8 }}
        className="border-t border-black/8 bg-white/60 backdrop-blur-sm"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-[80px] grid grid-cols-2 md:grid-cols-4 divide-x divide-black/8">
          {STATS.map((stat, i) => (
            <div key={i} className="py-5 px-6 flex flex-col gap-1">
              <span className="font-serif text-2xl font-bold text-[#1A252C] leading-none">{stat.value}</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B7A82] font-medium mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
