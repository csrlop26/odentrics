import { Service, MembershipPlan, CaseStudy } from './types';

export const CLINIC_SERVICES: Service[] = [
  {
    id: 'caries',
    title: 'Tratamiento de Caries',
    description: 'Restauración de la integridad estructural con compuestos biocompatibles de primera calidad que se integran con tu esmalte natural.',
    longDescription: 'Nuestros tratamientos utilizan resinas compuestas de última generación, libres de metales, que imitan con total precisión la translucidez y el color de sus dientes originales. El procedimiento es mínimamente invasivo, preservando la mayor cantidad de estructura dental sana posible gracias a tecnologías de magnificación por microscopio asistido.',
    priceEstimate: 'Desde 85€',
    duration: '45 mins',
    imageUrl: 'https://lh3.googleusercontent.com/aida/ADBb0ujgGeYLJNUwPAaboERKfSetYb5BOg7PFQ-QkY4UaGrWHaD1RtZk_V9rOn7A-Umtt3rFg2l392TWval0YfXOGcyh0CEVSuPn2z-mLhwPcehAF5-ko9eQhocWMqE5l72BPHy4GaAsg_F7CV8VigWsvr8h6yB3cCr1CSWNC4ppEbb62PtLSYWfl9aOnMQL8UNRekNeBu89ZYEzwWiilrdl9pVoVCeguKRam3MC-O4z9faNceuP0gYgJvx7TUQ',
    iconName: 'Shield'
  },
  {
    id: 'limpieza',
    title: 'Limpieza Dental Profiláctica',
    description: 'Profilaxis profunda con tecnología de flujo de aire (Airflow) para un acabado brillante y fresco, sin la sensibilidad del raspado tradicional.',
    longDescription: 'Redefinimos la higiene dental con el sistema Airflow Guided Biofilm Therapy (GBT). Una mezcla templada de agua purificada, aire y polvo micro-fino remueve instantáneamente manchas, placa y biofilm de zonas de difícil acceso con absoluta delicadeza y cero dolor. Ideal para pacientes con encías sensibles o implantes.',
    priceEstimate: 'Desde 70€',
    duration: '30 mins',
    imageUrl: 'https://lh3.googleusercontent.com/aida/ADBb0ugd5O_p7JyGe3IuUweVMVUsLDzBC8CBHiZeXWNk5fQW0AG4P_6DhgMeL3cOGN3gLNZEE5MXX7tn7oZFvKZOBmnizyNE28tfp9bcB_arheK1xwkO9lgVTVO2GzYuH4rNX9TAyplJ8rkIWs5iIP592Ycjq8gGjrbVKnVaYqDR3z_sYA9yQAFuOKqMhBC3abTgTVLv6yYZiirQKUS2jLg_He5MJdOX7KL6wEaa0W5bgY5jVOJsVDmC9JE0v4gq',
    iconName: 'Sparkles'
  },
  {
    id: 'implantes',
    title: 'Implantes y Cirugía de Alta Precisión',
    description: 'Cirugía guiada por computadora para un reemplazo dental permanente que restaura el 100% de la fuerza de mordida y la estética natural.',
    longDescription: 'Utilizando tomografías 3D CBCT de última generación y guías quirúrgicas personalizadas impresas en 3D, colocamos implantes de titanio puro de grado médico con un nivel de exactitud micrométrica. Este enfoque guiado por computadora reduce al mínimo el tiempo quirúrgico, el dolor postoperatorio y acelera los tiempos de curación drásticamente.',
    priceEstimate: 'Desde 1.100€',
    duration: '60 mins',
    imageUrl: 'https://lh3.googleusercontent.com/aida/ADBb0uj4Y-ExsIgQouxZ_onBdhnCMd_XfzH4JLzNDPYPPzzeWErhBuxyd5wmCyYglqhyTBylF5e--4nQVKD6mvFtlULcQSJx7U8PKYwsDq_G1Y0qkRspj0Wth3kpT8kjh-RtxbTL-rJEIYsumvECOBiRAEnNWIoFSEqh5JFt_vJ0cryKuBhaMnI6rTUCwV_SCwnElkb1ycBykAMKHq5RY0poXAKe0-gLVIi9M6xnaw3mHv1DzK1VQL5Hy-2GCf_F',
    iconName: 'Activity'
  },
  {
    id: 'ortodoncia',
    title: 'Ortodoncia Invisible (Odentrics Aligners)',
    description: 'Diseño computarizado en 3D para la alineación dental mediante alineadores ultrafinos y transparentes, imperceptibles y removibles.',
    longDescription: 'Olvídese de los brackets tradicionales. Escaneamos digitalmente su dentadura con nuestro sensor intraoral iTero para simular en tiempo real la evolución de su sonrisa. Los alineadores se fabrican a medida, combinando fuerzas controladas de máxima suavidad y alta previsibilidad para optimizar su oclusión con total confort.',
    priceEstimate: 'Desde 2.400€',
    duration: '45 mins (Sesión Control)',
    imageUrl: 'https://lh3.googleusercontent.com/aida/ADBb0ugsa7vYDWYwjWXstGlAEpDR3HAKUxZoBHM3n9B73KksVUWvailVblGJHQWnMJONs4i80VSfIIdwAzJ_bdGl0icEUfPjGdlp2ZAyzMQh_3wNSLJY3PWgzAGfKyRtlm8KUZ4aRgdX70o_Zn5rdkye1AgnKPeyQAkpjC9NTxG6ryeG8TKYMdlKNpuN_G6XPX5Tet8zRAH01tK6JJ5BzeyMXUr_aG3TurviG1Y6SreclDd0Oa8kEgQlQXN5DNV8',
    iconName: 'Award'
  }
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'circulo_inicial',
    name: 'Círculo Inicial',
    description: 'Diseñado para quienes buscan una primera toma de contacto con la odontología preventiva avanzada.',
    percentageDiscount: '80%',
    typeLabel: 'CITA INICIAL',
    price: '49€ / único pago',
    features: [
      'Primera consulta integral de diagnóstico 3D',
      'Escaneo intraoral digital y simulación de resultados',
      'Diagnóstico completo de salud gingival y caries',
      'Planificación de tratamiento personalizada',
      'Limpieza exprés incluida'
    ],
    ctaText: 'Reservar Cita Inicial',
  },
  {
    id: 'circulo_odentrics',
    name: 'Odentrics Circle',
    description: 'El programa definitivo de prevención y salud para pacientes que valoran la atención constante y preferente.',
    percentageDiscount: '40%',
    typeLabel: 'RECURRENTE',
    price: '29€ / mes',
    isPopular: true,
    features: [
      'Descuento fijo del 40% en tratamientos recurrentes',
      '2 limpiezas anuales profunda con tecnología Airflow',
      'Reserva de citas prioritarias con huecos de emergencia dedicados',
      'Urgencias telefónicas 24/7 y asistencia por chat',
      'Estudio radiográfico completo anual',
      'Mantenimiento y blanqueamiento preferente'
    ],
    ctaText: 'Unirme al Círculo Ahora',
  }
];

export const CLINIC_DOCTORS = [
  { id: 'dra_ortega', name: 'Dra. María Elena Ortega', specialty: 'Ortodoncia Invisible y Estética' },
  { id: 'dr_ruiz', name: 'Dr. Carlos Ruiz', specialty: 'Rehabilitación y Restauración Biocompatible' },
  { id: 'dra_martinez', name: 'Dra. Sofía Martínez', specialty: 'Cirugía Maxilofacial e Implantología' }
];

export const TIME_SLOTS = [
  '09:00 - 09:45',
  '10:00 - 10:45',
  '11:00 - 11:45',
  '12:00 - 12:45',
  '15:00 - 15:45',
  '16:00 - 16:45',
  '17:00 - 17:45',
  '18:00 - 18:45'
];

export const CLINIC_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case_1',
    title: 'Restauración Estética Completa de Arco',
    subtitle: 'Caso de Carillas de Porcelana',
    description: 'Una restauración completa que recrea la translucidez natural y ajusta la simetría facial. Se utilizó mapeo 3D avanzado y carillas de porcelana ultrafinas.',
    duration: '2 Sesiones',
    doctor: 'Dr. Carlos Ruiz',
    testimonial: {
      text: 'La precisión del equipo de Odentrics superó todas mis expectativas. Cero dolor y un resultado de una naturalidad absoluta. Siento que recuperé mi seguridad para sonreír.',
      patient: 'Alejandra Vance'
    },
    imageUrl: 'https://images.unsplash.com/photo-1704455306251-b4634215d98f?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'case_2',
    title: 'Alineación Oclusal Invisible progresiva',
    subtitle: 'Caso de Alineadores Odentrics Aligners',
    description: 'Corrección de apiñamiento severo en el arco frontal superior e inferior utilizando 18 micro-alineadores removibles transparentes sin bracket tradicional.',
    duration: '6 Meses',
    doctor: 'Dra. María Elena Ortega',
    testimonial: {
      text: 'Lo mejor fue que nadie notaba que los llevaba puestos. Me los quitaba para comer de manera muy cómoda y las revisiones por fotos eran comodísimas.',
      patient: 'Ignacio Silva'
    },
    imageUrl: 'https://images.unsplash.com/photo-1722586663955-2f96a4c1f255?q=80&w=1200&auto=format&fit=crop'
  }
];
