import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Activity, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenDashboard: () => void;
  activeAppointmentsCount: number;
}

const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#circulo', label: 'Membresía' },
  { href: '#trabajos', label: 'Casos Clínicos' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Header({
  onOpenBooking,
  onOpenDashboard,
  activeAppointmentsCount
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-40 backdrop-blur-md bg-white/92 shadow-sm border-b border-[#deeaf3]/40 transition-all">
        <nav className="flex justify-between items-center px-6 md:px-[80px] h-20 max-w-[1440px] mx-auto">

          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-lg bg-[#2C3E48] flex items-center justify-center text-white group-hover:bg-[#1A252C] transition-colors duration-300">
              <svg viewBox="0 0 20 20" fill="none" className="w-4.5 h-4.5" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2C7.5 2 5.5 3.8 5 6.2C4.2 6.5 3 7.5 3 9c0 1.2.7 2.2 1.7 2.7.5 3.2 2.6 6.3 5.3 6.3s4.8-3.1 5.3-6.3C16.3 11.2 17 10.2 17 9c0-1.5-1.2-2.5-2-2.8C14.5 3.8 12.5 2 10 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                <path d="M7 9.5c.5 1 1.5 1.5 3 1.5s2.5-.5 3-1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-sans font-bold text-xl tracking-tight text-[#1A252C]">Odentrics</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#6B7A82] hover:text-[#2C3E48] transition-colors font-sans text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenDashboard}
              className="relative px-4 py-2.5 rounded-full hover:bg-slate-50 transition-all text-[#2C3E48] flex items-center gap-2 border border-[#deeaf3]"
            >
              <User className="w-4 h-4" />
              <span className="text-xs font-semibold">Mi Portal</span>
              {activeAppointmentsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white font-mono text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow">
                  {activeAppointmentsCount}
                </span>
              )}
            </button>
            <button
              onClick={onOpenBooking}
              className="bg-[#2C3E48] text-[#FDFBF7] px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#1A252C] active:scale-95 transition-all group"
            >
              <span className="font-sans text-xs font-bold">Reservar Cita</span>
              <Calendar className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile: portal badge + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenDashboard}
              className="relative p-2.5 rounded-full border border-[#deeaf3] text-[#2C3E48]"
            >
              <User className="w-4 h-4" />
              {activeAppointmentsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white font-mono text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow">
                  {activeAppointmentsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2.5 rounded-full text-[#2C3E48] hover:bg-slate-50 transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 h-full w-72 bg-white z-50 md:hidden shadow-2xl flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-20 border-b border-slate-100">
                <span className="font-sans font-bold text-lg text-[#1A252C]">Odentrics</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-50 text-slate-500 transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col px-4 pt-4 gap-1 flex-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                    onClick={() => setMobileOpen(false)}
                    className="font-sans text-base font-medium text-[#1A252C] px-4 py-3.5 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* CTA at bottom */}
              <div className="px-6 pb-10 pt-4 border-t border-slate-100">
                <button
                  onClick={() => { setMobileOpen(false); onOpenBooking(); }}
                  className="w-full bg-[#2C3E48] text-white rounded-full py-4 font-sans text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  Reservar Cita
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
