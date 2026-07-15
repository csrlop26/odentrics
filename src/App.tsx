import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MembershipSection from './components/MembershipSection';
import ServicesSection from './components/ServicesSection';
import WorksSection from './components/WorksSection';
import ContactFooter from './components/ContactFooter';
import AppointmentModal from './components/AppointmentModal';
import DashboardModal from './components/DashboardModal';
import { Appointment } from './types';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Calendar, Smile, AlertCircle } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load bookings list count
  const refreshAppointmentsCount = () => {
    try {
      const saved = localStorage.getItem('odentrics_appointments');
      if (saved) {
        const list: Appointment[] = JSON.parse(saved);
        setAppointmentsCount(list.length);
      } else {
        setAppointmentsCount(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    refreshAppointmentsCount();
  }, []);

  const handleOpenBookingWithService = (serviceId: string = '') => {
    setPreselectedService(serviceId);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (newAppt: Appointment) => {
    setIsBookingOpen(false);
    refreshAppointmentsCount();
    setToastMessage(`¡Éxito! Su cita para ${newAppt.serviceName} ha sido confirmada para el ${newAppt.date} a las ${newAppt.timeSlot}. Código: ${newAppt.id}`);
    setTimeout(() => {
      setToastMessage(null);
    }, 8000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A252C] font-sans overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900 leading-normal">
      <div className="grain-overlay" aria-hidden="true" />

      {/* Dynamic Toast Alerts */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg p-4 px-6 bg-[#2C3E48] border border-emerald-400/30 text-white rounded-2xl shadow-xl flex items-start gap-3.5"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-300 block uppercase tracking-wider">Cita Grabada Correctamente</span>
              <p className="text-xs text-neutral-200">{toastMessage}</p>
              <button
                onClick={() => setIsDashboardOpen(true)}
                className="text-[10px] font-bold underline text-emerald-300 hover:text-white block pt-1 select-none"
              >
                Revisar en mi portal →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <Header
        onOpenBooking={() => handleOpenBookingWithService('')}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        activeAppointmentsCount={appointmentsCount}
      />

      {/* Main Sections */}
      <main>
        <Hero onOpenBooking={() => handleOpenBookingWithService('')} />
        
        <ServicesSection onOpenBooking={handleOpenBookingWithService} />

        <MembershipSection onOpenBooking={handleOpenBookingWithService} />

        <WorksSection />
      </main>

      {/* Integrated Contact & Footer */}
      <ContactFooter />

      {/* Dialog Modals */}
      <AnimatePresence>
        {isBookingOpen && (
          <AppointmentModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            preselectedServiceId={preselectedService}
            onSuccess={handleBookingSuccess}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDashboardOpen && (
          <DashboardModal
            isOpen={isDashboardOpen}
            onClose={() => setIsDashboardOpen(false)}
            onRefreshTrigger={refreshAppointmentsCount}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
