import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Star, CornerDownRight, Plus, Activity, Heart, Award, ArrowUpRight, Crosshair, Sparkles, ShieldAlert, X } from 'lucide-react';
import { CLINIC_SERVICES } from '../data';
import { Service } from '../types';

interface ServicesProps {
  onOpenBooking: (preselectedServiceId: string) => void;
}

export default function ServicesSection({ onOpenBooking }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="servicios" className="py-24 bg-[#e9f5ff] relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
        {/* Header content detail */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
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
        </div>

        {/* Dynamic Services Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINIC_SERVICES.map((serv) => {
            return (
              <motion.div
                key={serv.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
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
                    onClick={() => onOpenBooking(serv.id)}
                    className="p-3 bg-slate-50 text-[#2C3E48] rounded-xl hover:bg-[#2C3E48] hover:text-white transition-all transform active:scale-95 flex items-center justify-center cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CLINICAL STANDARDS / CERTIFICATES PROMOS */}
        <div className="mt-16 bg-white rounded-3xl p-8 md:p-10 border border-[#deeaf3]/60 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-8">
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
        </div>
      </div>

      {/* SERVICE DETAIL SPEC SHEET DIALOG */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Soft backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-white relative w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl z-10 border border-slate-100"
            >
              <div className="bg-[#2C3E48] text-white p-6 relative">
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <span className="text-[10px] uppercase tracking-widest text-[#dae5de] font-mono font-bold">
                  Ficha de Especialidad
                </span>
                <h4 className="text-xl font-bold mt-1">{selectedService.title}</h4>
              </div>

              <div className="p-6 md:p-8 space-y-4">
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Descripción Ampliada:</h5>
                  <p className="text-sm text-slate-700 leading-relaxed text-justify">
                    {selectedService.longDescription}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 mt-2 text-xs">
                  <div>
                    <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px]">Garantía Odentrics:</span>
                    <span className="text-slate-800 font-medium">Biotolerancia y confort 100%</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px]">Duración Estimada:</span>
                    <span className="text-slate-800 font-semibold font-mono">{selectedService.duration}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px]">Costo Estimado:</span>
                    <span className="text-emerald-800 font-bold font-mono">{selectedService.priceEstimate}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px]">Técnica Dental:</span>
                    <span className="text-slate-800 font-medium">Mínimamente invasivo GBT</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-5 py-2.5 rounded-full text-slate-500 hover:text-slate-800 text-xs font-bold"
                  >
                    Cerrar Detalle
                  </button>
                  <button
                    onClick={() => {
                      const id = selectedService.id;
                      setSelectedService(null);
                      onOpenBooking(id);
                    }}
                    className="bg-[#2C3E48] text-[#FDFBF7] px-8 py-3 rounded-full hover:opacity-95 text-xs font-bold shadow active:scale-95 transition-all"
                  >
                    Reservar Tratamiento
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
