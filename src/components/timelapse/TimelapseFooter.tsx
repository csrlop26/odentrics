import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Globe, Send } from 'lucide-react';
import { useTimelapse } from '../../hooks/useTimelapse';
import CodeEditorOverlay from './CodeEditorOverlay';

interface TimelapseFooterProps {
  isActive?: boolean;
  isAutoplay?: boolean;
  onComplete?: () => void;
}

export default function TimelapseFooter({ isActive = true, isAutoplay = false, onComplete }: TimelapseFooterProps) {
  const step = useTimelapse(6, isActive, isAutoplay, onComplete);
  const [phoneInput, setPhoneInput] = useState('');

  const getCodeSnippet = (s: number) => {
    switch (s) {
      case 0: return "";
      case 1: return "// Mount Footer Container\nbackground-color: #2C3E48;\ncolor: #FDFBF7;";
      case 2: return "/* Generate Mesh Visual Overlay */\nbackground-image: radial-gradient();\nopacity: 0.05;";
      case 3: return "/* Build Contact Callout Block */\n<ContactForm />\nborder-radius: 40px;";
      case 4: return "/* Populate Info & Links grid */\ndisplay: grid;\ngrid-template-columns: repeat(12, 1fr);";
      case 5: return "/* Load Copyright & Bottom bar */\n<BottomBar>\n  © Odentrics Dental Clinic\n</BottomBar>";
      case 6: return "/* Section Finished */";
      default: return "";
    }
  };

  return (
    <footer id="contacto" className="pt-24 pb-12 relative overflow-hidden transition-colors duration-1000" style={{ backgroundColor: step >= 1 ? '#2C3E48' : '#ffffff', color: step >= 1 ? '#FDFBF7' : 'transparent' }}>
      
      <CodeEditorOverlay isVisible={isActive} codeSnippet={getCodeSnippet(step)} />

      {/* Mesh visual overlay */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', bgSize: '40px 40px' }} 
          />
        )}
      </AnimatePresence>

      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px] relative space-y-16">
        
        {/* Upper Integrated Contact Callout & Form */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#1A252C] rounded-[40px] p-8 md:p-16 text-center max-w-5xl mx-auto border border-white/5 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
              
              <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                Comience su Viaje Hoy Mismo
              </h3>
              <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
                Estamos dispuestos a transformar por completo su visión sobre la consulta dental. Introduzca su teléfono y un asesor concierge le resolverá any duda o le agendará preferentemente.
              </p>

              {/* Inline Form */}
              <form onSubmit={(e) => e.preventDefault()} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
                <input
                  type="tel"
                  placeholder="Su teléfono móvil (ej. 622 112 334)"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="bg-white/10 text-white placeholder-slate-400 font-sans text-sm p-4 px-5 rounded-full border border-white/20 focus:outline-none focus:border-white flex-1 focus:bg-white/15"
                />
                <button
                  type="submit"
                  className="bg-[#FDFBF7] text-[#2C3E48] font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:opacity-95 transition-all text-center flex items-center justify-center gap-2 duration-300 shrink-0 select-none cursor-pointer"
                >
                  Pedir Llamada
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clinical Info & Links Section */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8"
            >
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
                  <li><span className="text-slate-300">Servicios Clínicos</span></li>
                  <li><span className="text-slate-300">Tecnología en 3D</span></li>
                  <li><span className="text-slate-300">Casos de Éxito</span></li>
                  <li><span className="text-slate-400 font-normal">Equipo de Odontólogos</span></li>
                </ul>
              </div>

              {/* Links 2 (3 Cols) */}
              <div className="md:col-span-3 space-y-4 text-xs font-semibold">
                <h5 className="text-[10px] uppercase tracking-widest text-[#dae5de] font-bold">Atención Paciente</h5>
                <ul className="space-y-3">
                  <li><span className="text-slate-400 font-normal">Portal Clínico Privado</span></li>
                  <li><span className="text-slate-300">Círculo de Membresía</span></li>
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Line bar */}
        <AnimatePresence>
          {step >= 5 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400"
            >
              <span>© {new Date().getFullYear()} Odentrics Dental Clinic. Todos los derechos reservados.</span>
              <div className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                <span className="font-semibold text-slate-300">España (Español)</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      
      {/* Helper overlay */}
      {step < 6 && !isAutoplay && (
        <div className="fixed top-2 left-2 text-[10px] font-mono text-gray-400 opacity-50 select-none pointer-events-none z-50">
          TIMELAPSE MODE [FOOTER] - STEP {step}/6
        </div>
      )}
    </footer>
  );
}
