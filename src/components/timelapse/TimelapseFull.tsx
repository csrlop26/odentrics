import React, { useState, useEffect, useRef } from 'react';
import TimelapseHero from './TimelapseHero';
import TimelapseServices from './TimelapseServices';
import TimelapseMembership from './TimelapseMembership';
import TimelapseWorks from './TimelapseWorks';
import TimelapseFooter from './TimelapseFooter';
import Header from '../Header';

const SECTIONS = ['hero', 'services', 'membership', 'works', 'footer'];

interface TimelapseFullProps {
  onOpenBooking: (id?: string) => void;
  onOpenDashboard: () => void;
  activeAppointmentsCount: number;
}

export default function TimelapseFull({ onOpenBooking, onOpenDashboard, activeAppointmentsCount }: TimelapseFullProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);

  // Refs for smooth scrolling
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const membershipRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const refs = [heroRef, servicesRef, membershipRef, worksRef, footerRef];

  const moveToNextSection = () => {
    setActiveIndex((current) => {
      const next = Math.min(current + 1, SECTIONS.length - 1);
      if (next !== current) {
        refs[next].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return next;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Autoplay on Spacebar
      if (e.code === 'Space') {
        e.preventDefault();
        setIsAutoplay((prev) => !prev);
      }
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        moveToNextSection();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((current) => {
          const prev = Math.max(current - 1, 0);
          refs[prev].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return prev;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-[#FDFBF7] selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      {/* Header is global */}
      <Header
        onOpenBooking={() => onOpenBooking('')}
        onOpenDashboard={onOpenDashboard}
        activeAppointmentsCount={activeAppointmentsCount}
      />

      {/* Main helper overlay for the entire movie (Hidden in Autoplay) */}
      {!isAutoplay && (
        <div className="fixed top-24 left-2 z-50 flex flex-col gap-1 pointer-events-none select-none">
          <div className={`text-[10px] font-mono font-bold px-2 py-1 rounded bg-black/80 text-white`}>
            MANUAL TIMELAPSE MODE
          </div>
          <div className="text-[10px] font-mono text-gray-500 bg-white/80 px-2 py-0.5 rounded border border-gray-200">
            Current Section: {SECTIONS[activeIndex].toUpperCase()}
          </div>
        </div>
      )}

      <div ref={heroRef} className="w-full">
        <TimelapseHero isActive={activeIndex === 0} isAutoplay={isAutoplay} onComplete={moveToNextSection} onOpenBooking={() => onOpenBooking('')} />
      </div>
      
      <div ref={servicesRef} className="w-full">
        <TimelapseServices isActive={activeIndex === 1} isAutoplay={isAutoplay} onComplete={moveToNextSection} onOpenBooking={onOpenBooking} />
      </div>
      
      <div ref={membershipRef} className="w-full">
        <TimelapseMembership isActive={activeIndex === 2} isAutoplay={isAutoplay} onComplete={moveToNextSection} onOpenBooking={onOpenBooking} />
      </div>

      <div ref={worksRef} className="w-full">
        <TimelapseWorks isActive={activeIndex === 3} isAutoplay={isAutoplay} onComplete={moveToNextSection} />
      </div>

      <div ref={footerRef} className="w-full">
        <TimelapseFooter isActive={activeIndex === 4} isAutoplay={isAutoplay} onComplete={() => console.log('Timelapse Complete')} />
      </div>
    </div>
  );
}
