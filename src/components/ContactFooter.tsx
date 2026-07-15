import React, { useState } from 'react';
import { Mail, Phone, MapPin, Globe, Send, CheckCircle } from 'lucide-react';

export default function ContactFooter() {
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleConciergeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput || !nameInput) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setSubmitSuccess(true);
      setFormSubmitted(false);
    }, 1200);
  };

  return (
    <footer id="contacto" className="bg-[#2C3E48] text-[#FDFBF7] pt-24 pb-12 relative overflow-hidden">
      {/* Mesh visual overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px] relative space-y-16">
        
        {/* Upper Integrated Contact Callout & Form */}
        <div className="bg-[#1A252C] rounded-[40px] p-8 md:p-16 text-center max-w-5xl mx-auto border border-white/5 shadow-[0_30px_70px_-24px_rgba(0,0,0,0.55)] relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/25 rounded-full blur-2xl" />
          
          <h3 className="font-serif text-3xl md:text-5xl font-normal tracking-tight text-white mb-4 leading-tight">
            Comience su Viaje Hoy Mismo
          </h3>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed font-light">
            Deje sus datos y un asesor concierge le llamará en menos de 15 minutos para resolver cualquier duda o agendar su cita con preferencia.
          </p>

          {/* Inline Form or Success State */}
          {submitSuccess ? (
            <div className="max-w-xl mx-auto flex flex-col items-center gap-3 py-4">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
              <p className="text-white font-sans font-semibold text-base">¡Recibido, {nameInput}!</p>
              <p className="text-slate-300 text-sm font-light">Nuestro equipo le llamará en los próximos 15 minutos.</p>
            </div>
          ) : (
            <form onSubmit={handleConciergeSubmit} className="max-w-xl mx-auto flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  placeholder="Su nombre"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="bg-white/10 text-white placeholder-slate-400 font-sans text-sm p-4 px-5 rounded-xl border border-white/20 focus:outline-none focus:border-white/50 flex-1 focus:bg-white/15 transition-colors"
                />
                <input
                  type="tel"
                  required
                  placeholder="Teléfono móvil"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="bg-white/10 text-white placeholder-slate-400 font-sans text-sm p-4 px-5 rounded-xl border border-white/20 focus:outline-none focus:border-white/50 flex-1 focus:bg-white/15 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={formSubmitted}
                className="bg-[#FDFBF7] text-[#2C3E48] font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white active:scale-[0.97] transition text-center flex items-center justify-center gap-2 select-none cursor-pointer disabled:opacity-45 disabled:active:scale-100 w-full sm:w-auto sm:self-center sm:px-16 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.4)]"
              >
                {formSubmitted ? 'Enviando...' : 'Pedir Llamada'}
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Clinical Info & Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8">
          
          {/* Brand Presentation (5 Cols) */}
          <div className="md:col-span-4 space-y-6">
            <div className="space-y-3">
              <h4 className="text-2xl font-extrabold tracking-tight">Odentrics</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Redefinimos la salud bucal mediante diagnóstico en 3D de alta precisión, biotecnología biocompatible y bienestar respetuoso con la fobia dental.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Paseo de la Castellana 112, Madrid, España</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+34 912 345 678</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>concierge@odentrics.com</span>
              </div>
            </div>
          </div>

          {/* Links 1 (3 Cols) */}
          <div className="md:col-span-3 space-y-4 text-xs font-semibold">
            <h5 className="text-[10px] uppercase tracking-widest text-[#dae5de] font-bold">Nuestra Práctica</h5>
            <ul className="space-y-3">
              <li><a href="#servicios" className="text-slate-300 hover:text-white transition-colors">Servicios Clínicos</a></li>
              <li><a href="#circulo" className="text-slate-300 hover:text-white transition-colors">Tecnología en 3D</a></li>
              <li><a href="#trabajos" className="text-slate-300 hover:text-white transition-colors">Casos de Éxito</a></li>
              <li><span className="text-slate-400 font-normal">Equipo de Odontólogos</span></li>
            </ul>
          </div>

          {/* Links 2 (3 Cols) */}
          <div className="md:col-span-3 space-y-4 text-xs font-semibold">
            <h5 className="text-[10px] uppercase tracking-widest text-[#dae5de] font-bold">Atención Paciente</h5>
            <ul className="space-y-3">
              <li><span className="text-slate-400 font-normal">Portal Clínico Privado</span></li>
              <li><a href="#circulo" className="text-slate-300 hover:text-white transition-colors">Círculo de Membresía</a></li>
              <li><span className="text-slate-400 font-normal">Financiación Personalizada</span></li>
              <li><span className="text-slate-400 font-normal">Urgencias Odontológicas</span></li>
            </ul>
          </div>

          {/* Links 3 (2 Cols) */}
          <div className="md:col-span-2 space-y-4 text-xs font-semibold">
            <h5 className="text-[10px] uppercase tracking-widest text-[#dae5de] font-bold">Legal & Registro</h5>
            <ul className="space-y-3">
              <li><span className="text-slate-400 font-normal">Política de Privacidad</span></li>
              <li><span className="text-slate-400 font-normal">Términos de Servicio</span></li>
              <li><span className="text-slate-400 font-normal">Nº Colegiado 28001422</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Line bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <span>© {new Date().getFullYear()} Odentrics Dental Clinic. Todos los derechos reservados.</span>
          <div className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-300">España (Español)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
