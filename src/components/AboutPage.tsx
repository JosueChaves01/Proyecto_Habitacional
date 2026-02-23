import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Building2,
  Users,
  Award,
  Target,
  Heart,
  TrendingUp,
  CheckCircle2,
  Home,
  Shield,
  Sparkles,
  Leaf,
  Waves,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CostaRicaDecor } from "./CostaRicaDecor";

export function AboutPage() {
  const stats = [
    {
      icon: Building2,
      label: "Proyectos Completados",
      value: "150+",
    },
    { icon: Users, label: "Familias Felices", value: "5,000+" },
    { icon: Award, label: "Años de Experiencia", value: "15+" },
    { icon: Home, label: "Propiedades Activas", value: "300+" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Compromiso",
      description:
        "Nos comprometemos con cada cliente para encontrar el hogar perfecto que se adapte a sus necesidades y presupuesto.",
    },
    {
      icon: Shield,
      title: "Confianza",
      description:
        "Construimos relaciones basadas en la transparencia, honestidad y profesionalismo en cada transacción.",
    },
    {
      icon: Target,
      title: "Excelencia",
      description:
        "Buscamos la excelencia en cada proyecto, garantizando la más alta calidad en construcción y servicio.",
    },
    {
      icon: Sparkles,
      title: "Innovación",
      description:
        "Implementamos las últimas tecnologías y tendencias del mercado inmobiliario para ofrecer mejores soluciones.",
    },
  ];

  const milestones = [
    { year: "2010", event: "Fundación de la empresa" },
    { year: "2013", event: "Primer proyecto de 100+ unidades" },
    { year: "2016", event: "Expansión a múltiples zonas" },
    {
      year: "2020",
      event: "Certificación LEED en proyectos sostenibles",
    },
    {
      year: "2023",
      event: "Reconocimiento como Desarrolladora del Año",
    },
    {
      year: "2024",
      event: "Más de 5,000 familias con hogar propio",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 relative">
      <CostaRicaDecor variant="both" position="top" />
      
      {/* Hero Section */}
      <motion.div
        className="relative h-[400px] bg-gradient-to-r from-primary via-primary/90 to-secondary overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-white animate-pulse" />
              <Badge className="bg-white/20 text-white border-white/30 shadow-lg">
                Sobre Nosotros
              </Badge>
              <Waves className="h-6 w-6 text-white animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Viviendo en el Paraíso,
              <br />
              <span className="text-yellow-300">Pura Vida</span> Inmobiliaria
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Conectando familias con el sueño costarricense - Entre bosques tropicales y playas paradisíacas
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-30">
        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 -mt-24"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.4 + index * 0.1,
                duration: 0.5,
              }}
            >
              <Card className="text-center shadow-xl">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="h-full border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">
                    Nuestra Misión
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Facilitar el acceso a viviendas de calidad,
                  brindando soluciones habitacionales
                  innovadoras y sostenibles que mejoren la
                  calidad de vida de las familias. Nos
                  esforzamos por construir comunidades donde las
                  personas puedan crecer, prosperar y crear
                  recuerdos inolvidables.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Card className="h-full border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">
                    Nuestra Visión
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Ser la desarrolladora inmobiliaria líder en el
                  país, reconocida por la excelencia en diseño,
                  construcción y servicio al cliente. Aspiramos
                  a expandir nuestro impacto positivo en las
                  comunidades, desarrollando proyectos
                  sostenibles que establezcan nuevos estándares
                  en la industria.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          className="mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Nuestros Valores
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Los principios que guían cada decisión y acción en
              nuestra empresa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.8 + index * 0.1,
                  duration: 0.5,
                }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Card className="border-2 border-border/50">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Nuestra Historia
                </h2>
                <p className="text-muted-foreground">
                  Un recorrido por los hitos más importantes de
                  nuestra trayectoria
                </p>
              </div>

              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    className="flex items-start gap-4"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 1 + index * 0.1,
                      duration: 0.4,
                    }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                        <span className="font-bold text-primary">
                          {milestone.year}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 pt-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-muted-foreground">
                          {milestone.event}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}