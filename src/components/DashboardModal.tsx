import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Phone, Mail, Trash2, CheckCircle2, AlertCircle, Heart, Stethoscope } from 'lucide-react';
import { Appointment } from '../types';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshTrigger?: () => void;
}

export default function DashboardModal({ isOpen, onClose, onRefreshTrigger }: DashboardModalProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notification, setNotification] = useState('');

  // Local load
  const loadAppointments = () => {
    const saved = localStorage.getItem('odentrics_appointments');
    if (saved) {
      setAppointments(JSON.parse(saved));
    } else {
      setAppointments([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAppointments();
    }
  }, [isOpen]);

  const handleDelete = (id: string) => {
    const saved = localStorage.getItem('odentrics_appointments');
    if (saved) {
      const parsed: Appointment[] = JSON.parse(saved);
      const updated = parsed.filter((appt) => appt.id !== id);
      localStorage.setItem('odentrics_appointments', JSON.stringify(updated));
      setAppointments(updated);
      setNotification('La cita médica ha sido cancelada correctamente.');
      if (onRefreshTrigger) onRefreshTrigger();
      setTimeout(() => setNotification(''), 4000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.95, y: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 15, opacity: 0 }}
        className="relative bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl z-10 border border-[#deeaf3]"
      >
        <div className="bg-[#2C3E48] text-white p-6 md:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <span className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Heart className="w-6 h-6 fill-current" />
            </span>
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Portal del Paciente</h3>
              <p className="text-xs text-[#dae5de] mt-0.5">Gestione y revise sus citas activas en Odentrics.</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 max-h-[550px] overflow-y-auto">
          {notification && (
            <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl mb-6 flex items-start gap-2 border border-emerald-100 animate-pulse text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{notification}</span>
            </div>
          )}

          {appointments.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400">
                <Stethoscope className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-700">No tiene citas programadas</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Mantenga su salud bucal al día reservando un espacio con nuestros especialistas.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#1A252C] uppercase tracking-wide">Tus próximas reservas:</h4>
              <div className="space-y-3">
                {appointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="p-5 bg-slate-50/85 rounded-2xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-slate-50"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#2C3E48] bg-slate-200 px-2 py-0.5 rounded-md">
                          {appt.id}
                        </span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase">
                          {appt.status}
                        </span>
                      </div>
                      <div>
                        <h5 className="font-extrabold text-[#1A252C] text-sm md:text-base">{appt.serviceName}</h5>
                        <p className="text-xs text-[#6B7A82] font-semibold">{appt.doctorName}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1.5 text-xs text-[#6B7A82]">
                        <span className="flex items-center gap-1.5 font-medium text-slate-700">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {appt.date}
                        </span>
                        <span className="flex items-center gap-1.5 font-medium text-slate-700">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {appt.timeSlot}
                        </span>
                      </div>

                      {appt.notes && (
                        <div className="text-xs bg-white border border-slate-100 rounded-xl p-2.5 mt-2 max-w-md">
                          <span className="font-bold text-slate-500 block text-[10px] uppercase">Nota:</span>
                          <p className="text-slate-600 italic">"{appt.notes}"</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                      <button
                        onClick={() => handleDelete(appt.id)}
                        className="p-3 text-red-600 hover:text-white hover:bg-red-600 bg-red-50 rounded-xl transition-all active:scale-95 flex items-center gap-1 text-xs font-bold"
                        title="Cancelar cita"
                      >
                        <Trash2 className="w-4 h-4" /> Cancelar Cita
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-[#e4eff9]/40 p-6 md:p-8 flex items-center justify-between border-t border-[#deeaf3]">
          <span className="text-xs text-slate-500">¿Desea cambiar de fecha? Cancele y vuelva a reservar su slot de forma inmediata.</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#2C3E48] text-white rounded-full hover:opacity-95 transition-all text-xs font-bold shrink-0"
          >
            Aceptar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
