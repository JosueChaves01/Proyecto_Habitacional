import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Target,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Users,
  Calendar,
  FileText,
  Lightbulb,
  Shield,
  Building2,
  BarChart3,
  Rocket,
  ArrowLeft,
  User,
} from "lucide-react";

interface ProjectKickoffProps {
  onBack?: () => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

interface Slide {
  id: number;
  title: string;
  component: React.ReactNode;
}

export default function ProjectKickoff({
  onBack,
}: ProjectKickoffProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides: Slide[] = [
    {
      id: 0,
      title: "Portada",
      component: <CoverSlide />,
    },
    {
      id: 1,
      title: "🏁 Apertura - Bienvenida",
      component: <WelcomeSlide />,
    },
    {
      id: 2,
      title: "💼 Caso de Negocio",
      component: <BusinessCaseSlide />,
    },
    {
      id: 3,
      title: "🎯 Alcance y Objetivos",
      component: <ScopeObjectivesSlide />,
    },
    {
      id: 4,
      title: "🧭 Roadmap General",
      component: <RoadmapSlide />,
    },
    {
      id: 5,
      title: "👥 Roles y Responsabilidades",
      component: <RolesSlide />,
    },
    {
      id: 6,
      title: "📡 Estrategia de Comunicación",
      component: <CommunicationSlide />,
    },
    {
      id: 7,
      title: "⚠️ Riesgos y Supuestos",
      component: <RisksSlide />,
    },
    {
      id: 8,
      title: "💪 Fortalezas y Oportunidades",
      component: <StrengthsSlide />,
    },
    {
      id: 9,
      title: "💰 Presupuesto",
      component: <BudgetSlide />,
    },
    {
      id: 10,
      title: "🚀 Siguientes Pasos",
      component: <NextStepsSlide />,
    },
    {
      id: 11,
      title: "🙌 Cierre",
      component: <ClosingSlide />,
    },
  ];

  const paginate = (newDirection: number) => {
    const newSlide = currentSlide + newDirection;
    if (newSlide >= 0 && newSlide < slides.length) {
      setDirection(newDirection);
      setCurrentSlide(newSlide);
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3EF] via-white to-[#E8F5E9] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button
                variant="outline"
                onClick={onBack}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </Button>
            )}
            <h1 className="text-emerald-800">
              Project Kickoff
            </h1>
          </div>
          <Badge
            variant="outline"
            className="border-emerald-600 text-emerald-700"
          >
            {currentSlide + 1} / {slides.length}
          </Badge>
        </div>

        {/* Slide Container */}
        <Card className="relative overflow-hidden bg-white shadow-xl min-h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-transparent pointer-events-none" />

          <AnimatePresence
            initial={false}
            custom={direction}
            mode="wait"
          >
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                },
                opacity: { duration: 0.2 },
              }}
              className="p-8 md:p-12 relative"
            >
              {slides[currentSlide].component}
            </motion.div>
          </AnimatePresence>
        </Card>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            onClick={() => paginate(-1)}
            disabled={currentSlide === 0}
            variant="outline"
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>

          <div className="flex gap-2 overflow-x-auto max-w-md">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-emerald-600 w-8"
                    : "bg-emerald-200 hover:bg-emerald-300"
                }`}
                aria-label={`Ir a diapositiva ${index + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={() => paginate(1)}
            disabled={currentSlide === slides.length - 1}
            variant="outline"
            className="gap-2"
          >
            Siguiente
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Slide Navigation Menu */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`p-3 rounded-lg text-left text-sm transition-all ${
                index === currentSlide
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs opacity-75">
                  {index + 1}
                </span>
                <span className="truncate">{slide.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Cover Slide
function CoverSlide() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full mb-6">
          <Rocket className="w-12 h-12 text-white" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-emerald-800 mb-4"
      >
        Kickoff del Proyecto
      </motion.h1>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-emerald-700 mb-6 max-w-2xl"
      >
        Aplicación para la Colocación y Venta de Propiedades en
        Costa Rica
      </motion.h2>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <Badge className="bg-emerald-600 text-white px-4 py-2">
          <Calendar className="w-4 h-4 mr-2" />
          12 Meses
        </Badge>
        <Badge className="bg-cyan-600 text-white px-4 py-2">
          <DollarSign className="w-4 h-4 mr-2" />
          $288,000
        </Badge>
        <Badge className="bg-amber-600 text-white px-4 py-2">
          <Users className="w-4 h-4 mr-2" />8 Miembros
        </Badge>
      </motion.div>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-emerald-600 mt-8"
      >
        Octubre 2025
      </motion.p>
    </div>
  );
}

// Welcome Slide
function WelcomeSlide() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 rounded-lg">
          <Users className="w-6 h-6 text-emerald-700" />
        </div>
        <h2 className="text-emerald-800">
          🏁 Apertura - Bienvenida
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 bg-white border-2 border-emerald-200">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-3" />
          <h4 className="text-emerald-800 mb-2">
            Acta Aprobada
          </h4>
          <p className="text-emerald-700 text-sm">
            Autorización formal de Gerencia General
          </p>
        </Card>
        <Card className="p-4 bg-white border-2 border-cyan-200">
          <Target className="w-8 h-8 text-cyan-600 mb-3" />
          <h4 className="text-cyan-800 mb-2">
            Equipo Completo
          </h4>
          <p className="text-cyan-700 text-sm">
            8 profesionales comprometidos
          </p>
        </Card>
        <Card className="p-4 bg-white border-2 border-amber-200">
          <Calendar className="w-8 h-8 text-amber-600 mb-3" />
          <h4 className="text-amber-800 mb-2">12 Meses</h4>
          <p className="text-amber-700 text-sm">
            Metodología Ágil (SCRUM)
          </p>
        </Card>
      </div>
    </div>
  );
}

// Business Case Slide
function BusinessCaseSlide() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 rounded-lg">
          <Briefcase className="w-6 h-6 text-emerald-700" />
        </div>
        <h2 className="text-emerald-800">💼 Caso de Negocio</h2>
      </div>

      <Card className="p-8 bg-gradient-to-r from-emerald-50 to-transparent border-l-4 border-emerald-600">
        <div className="space-y-6">
          <div className="space-y-4 text-emerald-700 leading-relaxed">
            <p>
              "La empresa ha identificado la necesidad de{" "}
              <span className="text-emerald-800">
                digitalizar y centralizar
              </span>{" "}
              el proceso de colocación y venta de propiedades.
            </p>
            <p>
              Actualmente, parte del trabajo se hace de forma
              manual, lo que genera{" "}
              <span className="text-emerald-800">
                demoras y pérdida de trazabilidad
              </span>
              .
            </p>
            <p>
              Este proyecto forma parte de nuestra{" "}
              <span className="text-emerald-800">
                estrategia de transformación digital
              </span>
              , y busca aumentar la eficiencia operativa,
              mejorar la experiencia del cliente y dar mayor
              visibilidad a la gerencia sobre las operaciones en
              todo el país."
            </p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5 bg-gradient-to-br from-red-50 to-white border-l-4 border-red-500">
          <h4 className="text-red-800 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Situación Actual
          </h4>
          <ul className="space-y-2 text-red-700 text-sm">
            <li>• Procesos manuales y dispersos</li>
            <li>• Demoras en gestión de clientes</li>
            <li>• Falta de trazabilidad</li>
            <li>• Información fragmentada</li>
            <li>• Baja visibilidad gerencial</li>
          </ul>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-emerald-50 to-white border-l-4 border-emerald-500">
          <h4 className="text-emerald-800 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Situación Deseada
          </h4>
          <ul className="space-y-2 text-emerald-700 text-sm">
            <li>• Plataforma digital integrada</li>
            <li>• Gestión eficiente y rápida</li>
            <li>• Trazabilidad completa</li>
            <li>• Información centralizada</li>
            <li>• Reportes en tiempo real</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

// Scope and Objectives Slide
function ScopeObjectivesSlide() {
  const objectives = [
    {
      icon: Target,
      color: "emerald",
      text: "Digitalizar el proceso de ventas desde la prospección hasta la firma de contratos notariales",
    },
    {
      icon: CheckCircle2,
      color: "cyan",
      text: "Brindar a los clientes información clara y en tiempo real sobre propiedades disponibles",
    },
    {
      icon: Users,
      color: "emerald",
      text: "Integrar un módulo CRM para la gestión de prospectos y clientes",
    },
    {
      icon: BarChart3,
      color: "cyan",
      text: "Proveer a la gerencia reportes estratégicos sobre ventas, ingresos y desempeño regional",
    },
    {
      icon: Building2,
      color: "emerald",
      text: "Facilitar la planificación de proyectos habitacionales (desde terrenos hasta construcción)",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 rounded-lg">
          <Target className="w-6 h-6 text-emerald-700" />
        </div>
        <h2 className="text-emerald-800">
          🎯 Alcance y Objetivos
        </h2>
      </div>

      <Card className="p-6 bg-gradient-to-r from-emerald-50 to-transparent border-l-4 border-emerald-600 mb-6">
        <div className="space-y-4 text-emerald-700 leading-relaxed">
          <p>
            "El propósito del proyecto es implementar una{" "}
            <span className="text-emerald-800">
              plataforma web y móvil
            </span>{" "}
            que permita gestionar proyectos habitacionales y
            clientes en un solo lugar.
          </p>
          <p>
            Todo esto bajo un{" "}
            <span className="text-emerald-800">
              modelo ágil (Scrum)
            </span>
            , con entregas incrementales cada tres semanas."
          </p>
        </div>
      </Card>

      <h3 className="text-emerald-800 mb-4">
        Objetivos Principales
      </h3>
      <div className="grid md:grid-cols-2 gap-3">
        {objectives.map((objective, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 bg-white hover:shadow-md transition-shadow">
              <div className="flex gap-3">
                <objective.icon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-emerald-700 text-sm leading-relaxed">
                  {objective.text}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Roadmap Slide
function RoadmapSlide() {
  const phases = [
    {
      period: "Mes 1-2",
      title: "Análisis y Diseño",
      icon: FileText,
      color: "emerald",
      items: [
        "Requerimientos y prototipos",
        "Diseño de arquitectura",
        "Validación con stakeholders",
      ],
    },
    {
      period: "Mes 3-7",
      title: "Desarrollo de Módulos Núcleo",
      icon: Building2,
      color: "cyan",
      items: [
        "Modulo de Proyectos",
        "CRM para gestión de clientes",
        "Procesos de contacto digitales",
      ],
    },
    {
      period: "Mes 8-9",
      title: "Reportes",
      icon: Briefcase,
      color: "emerald",
      items: [
        "Gestion de proyectos habitacionales",
        "Reportes estratégicos",
      ],
    },
    {
      period: "Mes 10-11",
      title: "Pruebas y Ajustes",
      icon: CheckCircle2,
      color: "cyan",
      items: [
        "Pruebas funcionales",
        "Pruebas de carga",
        "Ajustes finales",
      ],
    },
    {
      period: "Mes 12",
      title: "Despliegue y Capacitación",
      icon: Rocket,
      color: "emerald",
      items: [
        "Capacitación usuarios",
        "Go Live",
        "Soporte inicial",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 rounded-lg">
          <Calendar className="w-6 h-6 text-emerald-700" />
        </div>
        <h2 className="text-emerald-800">🧭 Roadmap General</h2>
      </div>

      <Card className="p-6 bg-gradient-to-r from-emerald-50 to-transparent border-l-4 border-emerald-600 mb-6">
        <div className="space-y-3 text-emerald-700 leading-relaxed">
          <p>
            "El proyecto tendrá una{" "}
            <span className="text-emerald-800">
              duración de 12 meses
            </span>
            , divididos en 5 hitos principales:
          </p>
          <p className="text-sm">
            Durante el desarrollo trabajaremos con{" "}
            <span className="text-emerald-800">
              sprints de 3 semanas
            </span>{" "}
            y revisiones con los stakeholders."
          </p>
        </div>
      </Card>

      <div className="space-y-3">
        {phases.map((phase, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`p-4 bg-gradient-to-r from-${phase.color}-50 to-white border-l-4 border-${phase.color}-500`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 bg-${phase.color}-100 rounded-lg`}
                >
                  <phase.icon
                    className={`w-5 h-5 text-${phase.color}-700`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge
                      className={`bg-${phase.color}-600 text-white`}
                    >
                      {phase.period}
                    </Badge>
                    <h4 className="text-emerald-800">
                      {phase.title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {phase.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-emerald-600 bg-white px-2 py-1 rounded border border-emerald-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Roles Slide
function RolesSlide() {
  const roles = [
    {
      role: "Patrocinador",
      responsible: "Gerencia General",
      description:
        "Responsable de aprobar y respaldar el proyecto",
      icon: Shield,
      color: "emerald",
    },
    {
      role: "Líder del Proyecto",
      responsible: "1 Persona",
      description:
        "Coordinar el equipo, seguimiento de avances y comunicación",
      icon: Target,
      color: "cyan",
    },
    {
      role: "Equipo de Desarrollo",
      responsible: "6 Personas (TI)",
      description: "Diseño, programación y pruebas",
      icon: Users,
      color: "emerald",
    },
    {
      role: "Área de Gestion Proyectos",
      responsible: "Departamento Propiedades",
      description: "Validación de proyectos digitales",
      icon: FileText,
      color: "cyan",
    },
    {
      role: "Área de Ventas",
      responsible: "Usuarios Principales",
      description:
        "Validación de funcionalidades y retroalimentación",
      icon: TrendingUp,
      color: "emerald",
    },
    {
      role: "Área de Finanzas",
      responsible: "Departamento Financiero",
      description:
        "Control de reportes e indicadores de rentabilidad",
      icon: BarChart3,
      color: "cyan",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 rounded-lg">
          <Users className="w-6 h-6 text-emerald-700" />
        </div>
        <h2 className="text-emerald-800">
          👥 Roles y Responsabilidades
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {roles.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`p-5 bg-gradient-to-br from-${item.color}-50 to-white hover:shadow-lg transition-all`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 bg-${item.color}-100 rounded-lg`}
                >
                  <item.icon
                    className={`w-5 h-5 text-${item.color}-700`}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-emerald-800 mb-1">
                    {item.role}
                  </h4>
                  <Badge
                    variant="outline"
                    className={`text-xs border-${item.color}-300 text-${item.color}-700 mb-2`}
                  >
                    {item.responsible}
                  </Badge>
                  <p className="text-emerald-700 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Communication Slide
function CommunicationSlide() {
  const strategies = [
    {
      type: "Reuniones de Seguimiento",
      frequency: "Semanales",
      description: "Daily Scrum con el equipo de desarrollo",
      icon: Users,
      color: "emerald",
    },
    {
      type: "Revisión de Sprint",
      frequency: "Cada 3 semanas",
      description: "Con Gerencia y usuarios clave",
      icon: Calendar,
      color: "cyan",
    },
    {
      type: "Reportes Ejecutivos",
      frequency: "Mensuales",
      description: "Dashboard de avances y métricas",
      icon: BarChart3,
      color: "emerald",
    },
    {
      type: "Documentación",
      frequency: "Continuo",
      description: "Compartida en Drive y GitHub",
      icon: FileText,
      color: "cyan",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 rounded-lg">
          <Users className="w-6 h-6 text-emerald-700" />
        </div>
        <h2 className="text-emerald-800">
          📡 Estrategia de Comunicación
        </h2>
      </div>

      <Card className="p-6 bg-gradient-to-r from-emerald-50 to-transparent border-l-4 border-emerald-600 mb-6">
        <p className="text-emerald-700 leading-relaxed">
          "Nos basaremos en una{" "}
          <span className="text-emerald-800">
            comunicación ágil y transparente
          </span>{" "}
          con diferentes niveles de detalle según la audiencia:"
        </p>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {strategies.map((strategy, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <Card
              className={`p-5 bg-gradient-to-br from-${strategy.color}-50 to-white border-l-4 border-${strategy.color}-500`}
            >
              <div className="flex items-start gap-3">
                <strategy.icon
                  className={`w-6 h-6 text-${strategy.color}-600 flex-shrink-0 mt-1`}
                />
                <div>
                  <h4 className="text-emerald-800 mb-1">
                    {strategy.type}
                  </h4>
                  <Badge
                    className={`bg-${strategy.color}-100 text-${strategy.color}-800 mb-2`}
                  >
                    {strategy.frequency}
                  </Badge>
                  <p className="text-emerald-700 text-sm">
                    {strategy.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="p-4 bg-cyan-50 border-l-4 border-cyan-500 mt-6">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-cyan-600" />
          <p className="text-cyan-800">
            Canales: Slack, Email, Jira, Google Drive, GitHub
          </p>
        </div>
      </Card>
    </div>
  );
}

// Risks Slide
function RisksSlide() {
  const risks = [
    {
      risk: "Resistencia al cambio",
      description:
        "Usuarios tradicionales pueden rechazar el sistema digital",
      mitigation:
        "Capacitación temprana y pruebas piloto por fases",
      level: "medium",
    },
    {
      risk: "Aprendizaje complejo",
      description:
        "Usuarios pueden requerir aprendizaje técnicos",
      mitigation: "Capacitacion con prototipos para usuarios",
      level: "high",
    },
  ];

  const assumptions = [
    "Disponibilidad del equipo durante todo el proyecto",
    "Acceso a stakeholders para validaciones",
    "Presupuesto aprobado y disponible",
    "Infraestructura cloud disponible",
    "Soporte legal para contratos digitales",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-amber-100 rounded-lg">
          <AlertTriangle className="w-6 h-6 text-amber-700" />
        </div>
        <h2 className="text-amber-800">
          ⚠️ Riesgos y Supuestos
        </h2>
      </div>

      <Card className="p-6 bg-gradient-to-r from-amber-50 to-transparent border-l-4 border-amber-600 mb-6">
        <p className="text-amber-700 leading-relaxed">
          "Hemos identificado algunos{" "}
          <span className="text-amber-800">
            riesgos iniciales
          </span>{" "}
          que debemos monitorear y mitigar a lo largo del
          proyecto:"
        </p>
      </Card>

      <h3 className="text-emerald-800">
        Riesgos Identificados
      </h3>
      <div className="space-y-3">
        {risks.map((item, index) => (
          <Card
            key={index}
            className="p-4 bg-white border-l-4 border-orange-500"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-emerald-800">
                    {item.risk}
                  </h4>
                  <Badge
                    variant={
                      item.level === "high"
                        ? "destructive"
                        : item.level === "medium"
                          ? "default"
                          : "secondary"
                    }
                    className="text-xs"
                  >
                    {item.level === "high"
                      ? "Alto"
                      : item.level === "medium"
                        ? "Medio"
                        : "Bajo"}
                  </Badge>
                </div>
                <p className="text-emerald-700 text-sm mb-2">
                  {item.description}
                </p>
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <p className="text-emerald-600 text-sm">
                    <span className="">Mitigación:</span>{" "}
                    {item.mitigation}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <h3 className="text-emerald-800 mt-6">
        Supuestos del Proyecto
      </h3>
      <Card className="p-4 bg-emerald-50">
        <div className="space-y-2">
          {assumptions.map((assumption, index) => (
            <div
              key={index}
              className="flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <p className="text-emerald-700 text-sm">
                {assumption}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Strengths Slide
function StrengthsSlide() {
  const strengths = [
    "Apoyo total de la Gerencia General y patrocinio estratégico",
    "Presupuesto sólido que cubre personal, infraestructura y soporte",
    "Uso de tecnologías modernas (Google Cloud Run, Node.js, TypeScript)",
    "Alta motivación del equipo y alineación con transformación digital",
    "Integración planificada entre áreas de ventas, legal y administración",
  ];

  const opportunities = [
    "Crecimiento del mercado inmobiliario digital en Costa Rica",
    "Tendencia regional hacia la digitalización de procesos empresariales",
    "Posibilidad de expansión del sistema a otros países de la región",
    "Reducción de costos operativos gracias a la automatización",
    "Mayor capacidad de análisis de datos (Business Intelligence)",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 rounded-lg">
          <TrendingUp className="w-6 h-6 text-emerald-700" />
        </div>
        <h2 className="text-emerald-800">
          💪 Fortalezas y Oportunidades
        </h2>
      </div>

      <Card className="p-6 bg-gradient-to-r from-emerald-50 to-transparent border-l-4 border-emerald-600 mb-6">
        <p className="text-emerald-700 leading-relaxed">
          "Contamos con una{" "}
          <span className="text-emerald-800">base sólida</span>{" "}
          para el éxito de este proyecto, así como oportunidades
          de crecimiento significativas:"
        </p>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-emerald-800">
              Fortalezas Internas
            </h3>
          </div>
          <div className="space-y-2">
            {strengths.map((strength, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-3 bg-gradient-to-r from-emerald-50 to-white border-l-2 border-emerald-500">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <p className="text-emerald-700 text-sm">
                      {strength}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-cyan-600" />
            <h3 className="text-cyan-800">
              Oportunidades de Mercado
            </h3>
          </div>
          <div className="space-y-2">
            {opportunities.map((opportunity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-3 bg-gradient-to-r from-cyan-50 to-white border-l-2 border-cyan-500">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <p className="text-cyan-700 text-sm">
                      {opportunity}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Budget Slide
function BudgetSlide() {
  const personnel = [
    {
      role: "Líder de Proyecto",
      rate: "$3,000/mes",
      months: 12,
      total: "$36,000",
    },
    {
      role: "Arquitecto de Software",
      rate: "$2,500/mes",
      months: 12,
      total: "$30,000",
    },
    {
      role: "4 Desarrolladores",
      rate: "$2,000/mes",
      months: 12,
      total: "$96,000",
    },
    {
      role: "Diseñador UX/UI",
      rate: "$1,800/mes",
      months: 12,
      total: "$21,600",
    },
    {
      role: "QA Tester",
      rate: "$1,800/mes",
      months: 12,
      total: "$21,600",
    },
  ];

  const resources = [
    {
      item: "Servicios en la nube / servidores / licencias",
      cost: "$20,000",
    },
    {
      item: "Herramientas de diseño, testing, integración",
      cost: "$10,000",
    },
    {
      item: "Indirectos y operativos (capacitación, documentación)",
      cost: "$15,000",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 rounded-lg">
          <DollarSign className="w-6 h-6 text-emerald-700" />
        </div>
        <h2 className="text-emerald-800">
          💰 Presupuesto del Proyecto
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-emerald-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Costos de Personal
          </h3>
          <div className="space-y-2">
            {personnel.map((item, index) => (
              <Card
                key={index}
                className="p-3 bg-gradient-to-r from-emerald-50 to-white"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-emerald-800">
                      {item.role}
                    </p>
                    <p className="text-emerald-600 text-sm">
                      {item.rate} × {item.months} meses
                    </p>
                  </div>
                  <Badge className="bg-emerald-600 text-white">
                    {item.total}
                  </Badge>
                </div>
              </Card>
            ))}
            <Card className="p-3 bg-emerald-600 text-white">
              <div className="flex justify-between items-center">
                <p>Subtotal Personal</p>
                <p>$205,200</p>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="text-cyan-800 mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Otros Recursos
          </h3>
          <div className="space-y-2">
            {resources.map((item, index) => (
              <Card
                key={index}
                className="p-3 bg-gradient-to-r from-cyan-50 to-white"
              >
                <div className="flex justify-between items-start gap-4">
                  <p className="text-cyan-800 text-sm">
                    {item.item}
                  </p>
                  <Badge className="bg-cyan-600 text-white">
                    {item.cost}
                  </Badge>
                </div>
              </Card>
            ))}
            <Card className="p-3 bg-cyan-600 text-white">
              <div className="flex justify-between items-center">
                <p>Subtotal Recursos</p>
                <p>$45,000</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="space-y-3 mt-6">
        <Card className="p-4 bg-gradient-to-r from-emerald-100 to-white border-2 border-emerald-600">
          <div className="flex justify-between items-center">
            <h3 className="text-emerald-800">
              Presupuesto Base
            </h3>
            <p className="text-emerald-800">$250,200</p>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-amber-100 to-white border-2 border-amber-600">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-700" />
              <h3 className="text-amber-800">
                Reserva de Contingencia (15%)
              </h3>
            </div>
            <p className="text-amber-800">$37,800</p>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg">
          <div className="flex justify-between items-center">
            <h2>Presupuesto Total</h2>
            <h2>$288,000</h2>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Next Steps Slide
function NextStepsSlide() {
  const nextSteps = [
    {
      step: "1",
      title: "Confirmar el equipo de trabajo",
      description:
        "Validar disponibilidad y cronograma detallado de todos los miembros",
      icon: Users,
      color: "emerald",
    },
    {
      step: "2",
      title: "Sprint 0 - Preparación",
      description:
        "Configurar ambiente, herramientas y repositorios (Jira, GitHub, Slack)",
      icon: Building2,
      color: "cyan",
    },
    {
      step: "3",
      title: "Levantamiento de Requerimientos",
      description:
        "Iniciar sesiones con Área de Ventas y stakeholders clave",
      icon: FileText,
      color: "emerald",
    },
    {
      step: "4",
      title: "Definir canales de comunicación",
      description:
        "Establecer canales y soporte durante los sprints",
      icon: Users,
      color: "cyan",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 rounded-lg">
          <Rocket className="w-6 h-6 text-emerald-700" />
        </div>
        <h2 className="text-emerald-800">
          🚀 Siguientes Pasos
        </h2>
      </div>

      <Card className="p-6 bg-gradient-to-r from-emerald-50 to-transparent border-l-4 border-emerald-600 mb-6">
        <p className="text-emerald-700 leading-relaxed">
          "Después de esta reunión, los{" "}
          <span className="text-emerald-800">
            próximos pasos inmediatos
          </span>{" "}
          son:"
        </p>
      </Card>

      <div className="space-y-4">
        {nextSteps.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <Card
              className={`p-5 bg-gradient-to-r from-${item.color}-50 to-white border-l-4 border-${item.color}-500 hover:shadow-lg transition-all`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 bg-${item.color}-100 rounded-lg`}
                >
                  <item.icon
                    className={`w-6 h-6 text-${item.color}-700`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      className={`bg-${item.color}-600 text-white`}
                    >
                      {item.step}
                    </Badge>
                    <h3 className="text-emerald-800">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-emerald-700 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-r from-cyan-50 to-transparent border-l-4 border-cyan-600 mt-6">
        <div className="flex items-start gap-3">
          <Calendar className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-cyan-800 mb-2">
              Primera Sprint Planning
            </h4>
            <p className="text-cyan-700 text-sm">
              Programada para inicios de{" "}
              <span className="text-cyan-800">
                Noviembre 2025
              </span>{" "}
              - Una vez completado el Sprint 0
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Closing Slide
function ClosingSlide() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 rounded-lg">
          <CheckCircle2 className="w-6 h-6 text-emerald-700" />
        </div>
        <h2 className="text-emerald-800">🙌 Cierre</h2>
      </div>

      <Card className="p-8 bg-gradient-to-r from-emerald-50 to-transparent border-l-4 border-emerald-600">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <p className="text-emerald-600">
                Patrocinador Ejecutivo
              </p>
              <p className="text-emerald-800">
                Gerencia General
              </p>
            </div>
          </div>

          <div className="space-y-5 text-emerald-700 leading-relaxed text-lg">
            <p>
              "Agradezco el{" "}
              <span className="text-emerald-800">
                compromiso de todos
              </span>
              ."
            </p>
            <p>
              Este proyecto representa un{" "}
              <span className="text-emerald-800">
                paso importante en la modernización
              </span>{" "}
              de nuestra compañía y en cómo atendemos a nuestros
              clientes.
            </p>
            <p>
              Con su{" "}
              <span className="text-emerald-800">
                apoyo y colaboración
              </span>{" "}
              lograremos cumplir los objetivos planteados.
            </p>
            <p className="text-2xl text-emerald-800 mt-8">
              ¡Damos por iniciada oficialmente la ejecución del
              proyecto!"
            </p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-white text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 flex items-center justify-center">
            <Target className="w-6 h-6 text-emerald-700" />
          </div>
          <h4 className="text-emerald-800 mb-2">
            Visión Clara
          </h4>
          <p className="text-emerald-600 text-sm">
            Transformación digital inmobiliaria
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-cyan-50 to-white text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cyan-100 flex items-center justify-center">
            <Users className="w-6 h-6 text-cyan-700" />
          </div>
          <h4 className="text-cyan-800 mb-2">
            Equipo Comprometido
          </h4>
          <p className="text-cyan-600 text-sm">
            8 profesionales dedicados
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-amber-50 to-white text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-100 flex items-center justify-center">
            <Rocket className="w-6 h-6 text-amber-700" />
          </div>
          <h4 className="text-amber-800 mb-2">
            Listo para Despegar
          </h4>
          <p className="text-amber-600 text-sm">
            Inicio oficial: Noviembre 2025
          </p>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white mt-8 text-center">
        <h2 className="mb-2">¡Éxito en este nuevo proyecto!</h2>
        <p className="text-emerald-100">
          Juntos transformaremos el sector inmobiliario de Costa
          Rica
        </p>
      </Card>
    </div>
  );
}