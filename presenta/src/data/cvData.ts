export interface CVData {
  fullName: string;
  title: string;
  location: string;
  country: string;
  email: string;
  phone: string;
  website: string;
  availability: string;
  education: Array<{
    title: string;
    institution: string;
    location: string;
  }>;
  experience: Array<{
    role: string;
    company: string;
    period: string;
    description?: string;
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  languages: Array<{
    name: string;
    level: string;
  }>;
  offer: string[];
}

export const defaultCVDataES: CVData = {
  fullName: "Francisco José Bermejo Tarifa",
  title: "Diseñador de Apps y soluciones Telemáticas",
  location: "Cáceres",
  country: "España",
  email: "franciscojosebermejotarifa@gmail.com",
  phone: "+34 651 159 088",
  website: "franbt.github.io",
  availability: "Indiferente / Inmediata",
  education: [
    {
      title: "Bachillerato Artes",
      institution: "Escuela Artes y Oficios",
      location: "Mérida",
    },
    {
      title: "Certificado Diseño de Instalaciones Fotovoltaicas",
      institution: "Sexpe",
      location: "Cáceres",
    },
    {
      title: "Certificado Diseño Gráfico",
      institution: "Sexpe",
      location: "Cáceres",
    },
  ],
  experience: [
    {
      role: "Atención al Cliente 1002 - Grupo Expertos Tecnológicos",
      company: "Movistar - Atento",
      period: "2015 / 2024",
      description: "Soporte técnico avanzado, resolución telemática de incidencias y gestión de clientes.",
    },
    {
      role: "Atención al Cliente Philips Ibérica",
      company: "BackOffice PAE y CE para SAT a nivel nacional - Barcelona",
      period: "2007 / 2011",
      description: "Coordinación técnica con servicios de asistencia técnica y soporte centralizado.",
    },
    {
      role: "Trabajos freelance para productoras y particulares",
      company: "Fotografía, diseño y desarrollo web",
      period: "2001 / Actualidad",
      description: "Diseño multimedia, interfaces web, producción fotográfica y soluciones digitales a medida.",
    },
  ],
  skills: [
    {
      category: "Diseño UI/UX y Prototipado",
      items: ["Stitch", "Figma", "Design Systems", "Wireframing"],
    },
    {
      category: "Desarrollo Web, Apps y Soluciones Telemáticas",
      items: ["HTML5", "CSS3", "JavaScript", "CMS", "Python", "AI Studio"],
    },
    {
      category: "Fotografía, Edición Digital y Producción Multimedia",
      items: ["Suite Adobe (Photoshop, Premiere)", "Nano Banana", "Grok Imagine"],
    },
    {
      category: "Manejo de aplicaciones remotas para Gestión y Soporte Técnico",
      items: ["Anydesk", "LogMeIn", "RDP", "Diagnóstico de redes"],
    },
    {
      category: "Generación de contenido gráfico 3D interactivo",
      items: ["AutoCAD", "Blender", "Unreal Engine"],
    },
  ],
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "Profesional / Competencia laboral" },
  ],
  offer: [
    "Una persona responsable, proactiva e interesada siempre en aprender.",
    "Adaptabilidad a las tareas y el entorno de trabajo.",
    "Retos y mejoras son bienvenidos.",
    "Capacidad para encajar en dinámicas y flujos de trabajo.",
  ],
};

export const defaultCVDataEN: CVData = {
  fullName: "Francisco José Bermejo Tarifa",
  title: "App Designer & Telematics Solutions Specialist",
  location: "Cáceres",
  country: "Spain",
  email: "franciscojosebermejotarifa@gmail.com",
  phone: "+34 651 159 088",
  website: "franbt.github.io",
  availability: "Immediate / Flexible",
  education: [
    {
      title: "Arts Baccalaureate",
      institution: "School of Arts and Crafts",
      location: "Mérida",
    },
    {
      title: "Photovoltaic Systems Design Certificate",
      institution: "Sexpe",
      location: "Cáceres",
    },
    {
      title: "Graphic Design Professional Certificate",
      institution: "Sexpe",
      location: "Cáceres",
    },
  ],
  experience: [
    {
      role: "Customer Support 1002 - Technological Experts Group",
      company: "Movistar - Atento Cáceres",
      period: "2015 / 2024",
      description: "Advanced technical diagnosis, telematics incident resolution, customer experience.",
    },
    {
      role: "Customer Service Philips Ibérica",
      company: "BackOffice PAE & CE for nationwide SAT - Barcelona",
      period: "2007 / 2011",
      description: "Technical network coordination with technical assistance centers nationwide.",
    },
    {
      role: "Freelance Producer & Web Consultant",
      company: "Photography, design & web solutions for agencies",
      period: "2001 / Present",
      description: "Multimedia design, web apps, photographic production, and tailored digital solutions.",
    },
  ],
  skills: [
    {
      category: "UI/UX Design & Prototyping",
      items: ["Stitch", "Figma", "Design Systems", "Wireframing"],
    },
    {
      category: "Web & App Development, Telematics Solutions",
      items: ["HTML5", "CSS3", "JavaScript", "CMS", "Python", "AI Studio"],
    },
    {
      category: "Photography, Digital Editing & Multimedia Production",
      items: ["Adobe Creative Suite", "Nano Banana", "Grok Imagine"],
    },
    {
      category: "Remote Support & Technical Client Management",
      items: ["Anydesk", "LogMeIn", "RDP", "Network Diagnostics"],
    },
    {
      category: "Interactive 3D Content Generation",
      items: ["AutoCAD", "Blender", "Unreal Engine"],
    },
  ],
  languages: [
    { name: "Spanish", level: "Native" },
    { name: "English", level: "Professional working proficiency" },
  ],
  offer: [
    "A responsible, proactive individual continually driven to learn and improve.",
    "Proven adaptability to varied tasks, environments, and multidisciplinary teams.",
    "Enthusiasm for challenges, technological upgrades, and optimized processes.",
    "Strong ability to integrate seamlessly into team dynamics and collaborative workflows.",
  ],
};
