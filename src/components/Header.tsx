import React from 'react';
import { Calendar, User, Eye, Activity } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenDashboard: () => void;
  activeAppointmentsCount: number;
}

export default function Header({
  onOpenBooking,
  onOpenDashboard,
  activeAppointmentsCount
}: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-40 backdrop-blur-md bg-white/90 shadow-sm border-b border-[#deeaf3]/45 transition-all">
      <nav className="flex justify-between items-center px-6 md:px-[80px] h-20 max-w-[1440px] mx-auto">
        {/* Brand Logo and icon */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-[#2C3E48] flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300">
            <Activity className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="font-sans font-extrabold text-2xl tracking-tight text-[#1A252C]">
            Odentrics
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-8 items-center">
          <a href="#servicios" className="text-[#6B7A82] hover:text-[#2C3E48] transition-colors font-sans text-sm font-semibold">
            Servicios Clínicos
          </a>
          <a href="#circulo" className="text-[#6B7A82] hover:text-[#2C3E48] transition-colors font-sans text-sm font-semibold">
            Membresía Circle
          </a>
          <a href="#trabajos" className="text-[#6B7A82] hover:text-[#2C3E48] transition-colors font-sans text-sm font-semibold">
            Antes y Después
          </a>
          <a href="#contacto" className="text-[#6B7A82] hover:text-[#2C3E48] transition-colors font-sans text-sm font-semibold">
            Contacto Concierge
          </a>
        </div>

        {/* Actions CTA */}
        <div className="flex items-center gap-3">
          {/* Patient Portal / Booking list indicator */}
          <button
            onClick={onOpenDashboard}
            className="relative px-4 py-2.5 rounded-full hover:bg-slate-50 transition-all text-[#2C3E48] flex items-center gap-2 border border-[#deeaf3]"
          >
            <User className="w-4 h-4" />
            <span className="text-xs font-bold hidden sm:inline">Mi Portal</span>
            {activeAppointmentsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white font-mono text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow animate-bounce">
                {activeAppointmentsCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenBooking}
            className="bg-[#2C3E48] text-[#FDFBF7] px-6 py-2.5 rounded-full flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all group"
          >
            <span className="font-sans text-xs font-bold">Reservar Cita</span>
            <Calendar className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </nav>
    </header>
  );
}
