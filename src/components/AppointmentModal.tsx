import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Mail, Phone, ArrowLeft, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { CLINIC_SERVICES, CLINIC_DOCTORS, TIME_SLOTS } from '../data';
import { Appointment } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  onSuccess: (appointment: Appointment) => void;
}

export default function AppointmentModal({
  isOpen,
  onClose,
  preselectedServiceId = '',
  onSuccess
}: AppointmentModalProps) {
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState(preselectedServiceId || CLINIC_SERVICES[0].id);
  const [doctorId, setDoctorId] = useState(CLINIC_DOCTORS[0].id);
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errorStatus, setErrorStatus] = useState('');

  // Generate dynamic date options for the next 14 days
  const getDateOptions = () => {
    const dates = [];
    const daysSpanish = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const monthsSpanish = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    for (let i = 1; i <= 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      // Skip Sundays (clinic is closed)
      if (d.getDay() !== 0) {
        dates.push({
          raw: d.toISOString().split('T')[0],
          dayName: daysSpanish[d.getDay()],
          dayNum: d.getDate(),
          monthName: monthsSpanish[d.getMonth()],
          year: d.getFullYear()
        });
      }
    }
    return dates;
  };

  const datesList = getDateOptions();

  // Handle preselected updates
  React.useEffect(() => {
    if (isOpen && preselectedServiceId) {
      setServiceId(preselectedServiceId);
      setStep(1); // Reset to step 1
    }
  }, [isOpen, preselectedServiceId]);

  const validateStep = () => {
    setErrorStatus('');
    if (step === 1) {
      if (!serviceId) {
        setErrorStatus('Por favor seleccione un servicio.');
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!selectedDate) {
        setErrorStatus('Por favor seleccione una fecha válida.');
        return false;
      }
      if (!selectedSlot) {
        setErrorStatus('Por favor seleccione un horario de atención.');
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (!patientName.trim()) {
        setErrorStatus('El nombre completo es obligatorio.');
        return false;
      }
      if (!patientEmail.trim() || !patientEmail.includes('@')) {
        setErrorStatus('Introduzca un correo electrónico válido.');
        return false;
      }
      if (!patientPhone.trim() || patientPhone.length < 9) {
        setErrorStatus('Introduzca un número de teléfono válido (mínimo 9 dígitos).');
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setErrorStatus('');
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    const selectedService = CLINIC_SERVICES.find((s) => s.id === serviceId);
    const selectedDoctor = CLINIC_DOCTORS.find((d) => d.id === doctorId);

    const newAppt: Appointment = {
      id: 'OD-' + Math.floor(100000 + Math.random() * 900000),
      patientName,
      patientEmail,
      patientPhone,
      serviceId,
      serviceName: selectedService?.title || 'Tratamiento Dental',
      doctorName: selectedDoctor?.name || 'Clínica Odentrics',
      date: selectedDate,
      timeSlot: selectedSlot,
      notes,
      createdAt: new Date().toISOString(),
      status: 'confirmada'
    };

    // Save to localStorage
    const saved = localStorage.getItem('odentrics_appointments');
    const existing = saved ? JSON.parse(saved) : [];
    existing.push(newAppt);
    localStorage.setItem('odentrics_appointments', JSON.stringify(existing));

    onSuccess(newAppt);
    // Reset fields
    setPatientName('');
    setPatientEmail('');
    setPatientPhone('');
    setNotes('');
    setStep(1);
  };

  if (!isOpen) return null;

  const currentServiceObj = CLINIC_SERVICES.find((s) => s.id === serviceId);

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

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.95, y: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 15, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="relative bg-[#FDFBF7] w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl z-10 border border-black/8"
      >
        {/* Header Indicator */}
        <div className="bg-[#2C3E48] text-white p-6 md:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-xs uppercase tracking-widest text-[#dae5de] font-mono font-medium block mb-2">
            Paso {step} de 3
          </span>
          <h3 className="text-2xl font-bold tracking-tight">Reserva tu Cita en Odentrics</h3>
          <p className="text-sm text-[#dae5de] mt-1">Cuidado dental de máxima precisión y confort sin fricciones.</p>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-6 overflow-hidden">
            <div
              className="bg-[#dae5de] h-full transition duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
          {errorStatus && (
            <div className="bg-red-50 text-red-700 p-4 rounded-2xl mb-6 flex items-start gap-2 border border-red-100">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
              <p className="text-sm">{errorStatus}</p>
            </div>
          )}

          {/* STEP 1: Servicios y Profesional */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#1A252C] mb-3">
                  1. Seleccione el tratamiento o servicio:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CLINIC_SERVICES.map((serv) => (
                    <button
                      key={serv.id}
                      type="button"
                      onClick={() => setServiceId(serv.id)}
                      className={`text-left p-4 rounded-2xl border transition flex flex-col justify-between ${
                        serviceId === serv.id
                          ? 'border-[#2C3E48] bg-[#EAF5EE] text-[#1A252C]'
                          : 'border-[#F0EDE3] bg-white text-[#6B7A82] hover:border-black/8'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="text-base font-bold text-[#1A252C]">{serv.title}</span>
                        {serviceId === serv.id && <Sparkles className="w-4 h-4 text-[#2C3E48] fill-[#2C3E48]/20" />}
                      </div>
                      <span className="text-xs text-[#6B7A82] line-clamp-2 mt-1 mb-3">{serv.description}</span>
                      <div className="flex justify-between items-center w-full pt-2 border-t border-[#F0EDE3]/60">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white text-[#2C3E48] shadow-sm">
                          {serv.priceEstimate}
                        </span>
                        <span className="text-xs text-[#2C3E48] font-mono">{serv.duration}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0EDE3]">
                <label className="block text-sm font-semibold text-[#1A252C] mb-3">
                  2. Asignar Profesional Odontólogo:
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {CLINIC_DOCTORS.map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setDoctorId(doc.id)}
                      className={`text-left p-3 px-4 rounded-2xl border transition flex items-center justify-between ${
                        doctorId === doc.id
                          ? 'border-[#2C3E48] bg-[#EAF5EE] text-[#1A252C]'
                          : 'border-[#F0EDE3] bg-white text-[#6B7A82] hover:border-black/8'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-sm text-[#1A252C] block">{doc.name}</span>
                        <span className="text-xs text-[#6B7A82]">{doc.specialty}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {doctorId === doc.id && (
                          <span className="text-xs bg-[#2C3E48] text-white px-2 py-0.5 rounded-lg">Asignado</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Agenda y Horario */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#1A252C] mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#2C3E48]" />
                  Seleccione una fecha (Lunes a Sábado):
                </label>
                {/* Custom Horizon Calendar Scroll */}
                <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin">
                  {datesList.map((dt) => {
                    const isSelected = selectedDate === dt.raw;
                    return (
                      <button
                        key={dt.raw}
                        type="button"
                        onClick={() => setSelectedDate(dt.raw)}
                        className={`flex-none w-16 p-3 rounded-2xl border transition flex flex-col items-center justify-center ${
                          isSelected
                            ? 'border-[#2C3E48] bg-[#2C3E48] text-white shadow-md'
                            : 'border-[#F0EDE3] bg-white text-[#6B7A82] hover:border-black/8'
                        }`}
                      >
                        <span className={`text-[10px] uppercase font-bold ${isSelected ? 'text-[#dae5de]' : 'text-neutral-400'}`}>
                          {dt.dayName}
                        </span>
                        <span className="text-lg font-extrabold leading-none my-1">{dt.dayNum}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-[#dae5de]' : 'text-neutral-500'}`}>
                          {dt.monthName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0EDE3]">
                <label className="block text-sm font-semibold text-[#1A252C] mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#2C3E48]" />
                  Espacios de atención disponibles:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-xl border text-center transition font-mono text-xs ${
                          isSelected
                            ? 'border-[#2C3E48] bg-[#EAF5EE] text-[#1A252C] font-semibold shadow-sm'
                            : 'border-[#F0EDE3] bg-white text-[#6B7A82] hover:border-black/8'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 bg-[#EAF5EE]/50 p-3 rounded-xl border border-[#dae5de]/50 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#2C3E48]" />
                  <span className="text-xs text-[#1A252C]/90 font-medium">
                    Su reserva cuenta con 15 min de margen y esterilización reforzada del gabinete.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Datos de Contacto */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A252C] uppercase tracking-wider mb-1">
                  Nombre Completo:
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-[#6B7A82] w-4 h-4" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Ej. Carmen López"
                    className="w-full pl-11 p-3.5 bg-white border border-[#F0EDE3] rounded-2xl text-sm focus:outline-none focus:border-[#2C3E48]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A252C] uppercase tracking-wider mb-1">
                  Correo Electrónico:
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-[#6B7A82] w-4 h-4" />
                  <input
                    type="email"
                    required
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="carmen@ejemplo.com"
                    className="w-full pl-11 p-3.5 bg-white border border-[#F0EDE3] rounded-2xl text-sm focus:outline-none focus:border-[#2C3E48]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A252C] uppercase tracking-wider mb-1">
                  Teléfono Móvil:
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 text-[#6B7A82] w-4 h-4" />
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="Ej. +34 612 345 678"
                    className="w-full pl-11 p-3.5 bg-white border border-[#F0EDE3] rounded-2xl text-sm focus:outline-none focus:border-[#2C3E48]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A252C] uppercase tracking-wider mb-1">
                  Notas de Interés o Síntomas (Opcional):
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej. Tengo sensibilidad al frío en el molar superior izquierdo o prefiero sedación."
                  rows={2}
                  className="w-full p-3.5 bg-white border border-[#F0EDE3] rounded-2xl text-sm focus:outline-none focus:border-[#2C3E48] resize-none"
                />
              </div>

              <div className="bg-[#fdfbf7] border border-[#F0EDE3] rounded-2xl p-4 space-y-2 mt-4">
                <h4 className="text-xs font-bold text-[#1A252C] uppercase tracking-wide">Resumen De Reserva:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#6B7A82]">
                  <div>
                    <span className="block font-medium text-[#1A252C]">Tratamiento:</span>
                    <span>{currentServiceObj?.title}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-[#1A252C]">Odontólogo:</span>
                    <span>{CLINIC_DOCTORS.find((d) => d.id === doctorId)?.name}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-[#1A252C]">Fecha:</span>
                    <span className="font-mono">{selectedDate}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-[#1A252C]">Horario:</span>
                    <span className="font-mono">{selectedSlot}</span>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-[#F0EDE3]/40 p-6 md:p-8 flex items-center justify-between border-t border-black/8">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="px-6 py-3 rounded-full hover:bg-white/60 transition-colors text-sm text-[#2C3E48] font-bold flex items-center gap-2 border border-black/8"
            >
              <ArrowLeft className="w-4 h-4" /> Atrás
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={handleNext}
              className="bg-[#2C3E48] text-white px-8 py-3.5 rounded-full flex items-center gap-2 hover:opacity-90 active:scale-95 transition text-sm font-bold ml-auto"
            >
              Continuar <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-10 py-3.5 rounded-full flex items-center gap-2 active:scale-95 transition text-sm font-bold ml-auto"
            >
              Confirmar Cita Médica <ShieldCheck className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
