export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceId: string;
  serviceName: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  notes?: string;
  createdAt: string;
  status: 'confirmada' | 'pendiente_pago' | 'completada';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  priceEstimate: string;
  duration: string;
  imageUrl: string;
  iconName: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  percentageDiscount: string;
  typeLabel: string;
  features: string[];
  ctaText: string;
  price: string;
  isPopular?: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  doctor: string;
  testimonial: {
    text: string;
    patient: string;
  };
  imageUrl: string;
}
