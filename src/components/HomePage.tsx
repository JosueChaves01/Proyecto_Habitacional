import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Developer } from "../types/property";
import {
  developers,
  properties,
  projects,
} from "../data/mockData";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { getPriceGradient } from "./ui/price-utils";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Building2,
  Phone,
  Mail,
  Globe,
  MapPin,
  Award,
  Users,
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles,
  Home,
  Send,
  Leaf,
  Shield,
  TrendingUp,
  Smartphone,
  Zap,
  Eye,
  Heart,
  Target,
  DollarSign,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomePageProps {
  onSelectDeveloper: (developerId: string) => void;
}

export function HomePage({ onSelectDeveloper }: HomePageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 200);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Developer Carousel */}
      {showContent && (
        <DeveloperCarousel
          onSelectDeveloper={onSelectDeveloper}
        />
      )}

      {/* Developer Showcase Sections */}
      {showContent && (
        <DeveloperShowcaseSections
          onSelectDeveloper={onSelectDeveloper}
        />
      )}

      {/* Why Choose Us Section */}
      {showContent && <WhyChooseUsSection />}

      {/* Request to Appear Section */}
      {showContent && <RequestToAppearSection />}
    </div>
  );
}

function LoadingSpinner() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-4"
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Cargando proyectos habitacionales...
        </motion.p>
      </div>
    </div>
  );
}

function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Costa Rica Nature */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://es.visitcostarica.com/sites/default/files/styles/scale_1440/public/2024-10/Beautiful%20aerial%20view%20of%20the%20Beach%20in%20Dominical%20and%20the%20Baru%20River%20in%20Costa%20Rica.jpg?itok=rYg-SU39"
          alt="Hermosos paisajes de Costa Rica"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-black/50 to-secondary/40" />
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <motion.div
          initial={
            shouldReduceMotion ? {} : { opacity: 0, y: 30 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Leaf className="h-10 w-10 text-primary animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold">
              Vive en{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Costa Rica
              </span>
            </h1>
            <Leaf className="h-10 w-10 text-secondary animate-pulse" />
          </div>

          <motion.p
            className="text-xl md:text-2xl mb-4 opacity-90"
            initial={
              shouldReduceMotion ? {} : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Entre Bosques Tropicales y Playas Paradisíacas
          </motion.p>

          <motion.p
            className="text-base md:text-lg mb-8 opacity-80"
            initial={
              shouldReduceMotion ? {} : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Descubre tu hogar ideal en los mejores proyectos
            habitacionales del país
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={
              shouldReduceMotion ? {} : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4" />
              <span>
                Explora proyectos habitacionales por
                desarrollador
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            animate={
              shouldReduceMotion ? {} : { y: [0, 10, 0] }
            }
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

interface DeveloperCardProps {
  developer: Developer;
  onSelect: () => void;
  variant: "corporate" | "gallery" | "minimal";
}

function DeveloperCard({
  developer,
  onSelect,
  variant,
}: DeveloperCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const featuredProperty = getFeaturedProperty(developer.id);
  const priceStyle = featuredProperty
    ? getPriceGradient(featuredProperty.price)
    : null;

  const cardVariants = {
    corporate:
      "border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10",
    gallery: "border border-border bg-card shadow-lg",
    minimal: "border border-border/50 bg-muted/30",
  };

  return (
    <Card
      className={`h-full hover:shadow-xl transition-all duration-300 cursor-pointer group ${cardVariants[variant]}`}
    >
      <CardHeader className="pb-4">
        {/* Company Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <ImageWithFallback
              src={developer.logoUrl}
              alt={`Logo de ${developer.name}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {developer.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {getDeveloperTagline(developer.id)}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <Building2 className="h-3 w-3" />
              Desde {developer.established}
            </div>
          </div>
        </div>

        {/* Hero Image or Gallery Preview */}
        {variant === "gallery" && featuredProperty && (
          <div className="relative h-48 rounded-lg overflow-hidden mb-4">
            <ImageWithFallback
              src={featuredProperty.imageUrl}
              alt={featuredProperty.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-sm font-medium">
                {featuredProperty.title}
              </p>
              <p className="text-xs opacity-90">
                {featuredProperty.zone}
              </p>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {developer.description}
        </p>

        {/* Specialties */}
        <div>
          <h4 className="font-medium mb-2 text-sm">
            Especialidades
          </h4>
          <div className="flex flex-wrap gap-1">
            {developer.specialties
              .slice(0, 3)
              .map((specialty) => (
                <Badge
                  key={specialty}
                  variant="secondary"
                  className="text-xs"
                >
                  {specialty}
                </Badge>
              ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-border/50">
          <div className="text-center">
            <div className="font-semibold text-primary text-lg">
              {developer.totalProjects}
            </div>
            <div className="text-xs text-muted-foreground">
              Total
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-green-600 text-lg">
              {developer.activeProjects}
            </div>
            <div className="text-xs text-muted-foreground">
              Activos
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-blue-600 text-lg">
              {developer.completedProjects}
            </div>
            <div className="text-xs text-muted-foreground">
              Terminados
            </div>
          </div>
        </div>

        {/* Featured Property */}
        {featuredProperty && variant !== "gallery" && (
          <div>
            <h4 className="font-medium mb-2 text-sm">
              Proyecto Destacado
            </h4>
            <div className="flex gap-3">
              <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={featuredProperty.imageUrl}
                  alt={featuredProperty.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">
                  {featuredProperty.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {featuredProperty.zone}
                </p>
                {priceStyle && (
                  <p
                    className={`text-xs font-semibold bg-gradient-to-r ${priceStyle.textGradient} bg-clip-text text-transparent`}
                  >
                    ${featuredProperty.price.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Highlights */}
        <div>
          <h4 className="font-medium mb-2 text-sm">
            Destacados
          </h4>
          <ul className="space-y-1">
            {developer.highlights
              .slice(0, 2)
              .map((highlight, index) => (
                <li
                  key={index}
                  className="text-xs text-muted-foreground flex items-start gap-2"
                >
                  <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-1">
                    {highlight}
                  </span>
                </li>
              ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-1 pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="h-3 w-3" />
            {developer.contact.phone}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="h-3 w-3" />
            {developer.contact.email}
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={onSelect}
          className="w-full mt-4 group/btn"
          variant={
            variant === "corporate" ? "default" : "outline"
          }
        >
          <span>Ver Proyectos</span>
          <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}

function WhyChooseUsSection() {
  const shouldReduceMotion = useReducedMotion();

  const features = [
    {
      icon: Award,
      title: "Desarrolladoras Certificadas",
      description:
        "Trabajamos solo con empresas certificadas y con amplia experiencia",
    },
    {
      icon: Users,
      title: "Asesoría Personalizada",
      description:
        "Te acompañamos en todo el proceso de búsqueda y compra",
    },
    {
      icon: CheckCircle,
      title: "Garantía de Calidad",
      description:
        "Todos los proyectos cumplen con los más altos estándares",
    },
    {
      icon: Building2,
      title: "Variedad de Opciones",
      description:
        "Desde apartamentos hasta casas, para todos los presupuestos",
    },
  ];

  return (
    <motion.section
      className="bg-muted/30 py-16"
      initial={shouldReduceMotion ? {} : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={
            shouldReduceMotion ? {} : { opacity: 0, y: 20 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Somos el puente entre las mejores desarrolladoras y
            tu hogar ideal
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-6 rounded-lg bg-background/50 backdrop-blur-sm"
              initial={
                shouldReduceMotion ? {} : { opacity: 0, y: 20 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function RequestToAppearSection() {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend or email service
    alert("¡Gracias por tu interés! Te contactaremos pronto.");
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <motion.section
      className="py-16 bg-gradient-to-br from-primary/5 to-primary/10"
      initial={shouldReduceMotion ? {} : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={
              shouldReduceMotion ? {} : { opacity: 0, y: 20 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              ¿Eres una Desarrolladora?
            </h2>
            <p className="text-muted-foreground text-lg">
              Únete a nuestro catálogo y conecta con miles de
              compradores potenciales
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            initial={
              shouldReduceMotion ? {} : { opacity: 0, y: 20 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Benefits */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">
                Beneficios de aparecer en nuestro portal:
              </h3>
              <div className="space-y-4">
                {[
                  "Mayor visibilidad para tus proyectos",
                  "Acceso a compradores calificados",
                  "Herramientas de marketing digital",
                  "Análisis de performance detallados",
                  "Soporte dedicado de nuestro equipo",
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-6">
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Nombre de la empresa
                    </label>
                    <Input
                      required
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          companyName: e.target.value,
                        }))
                      }
                      placeholder="Constructora ABC"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Nombre del contacto
                    </label>
                    <Input
                      required
                      value={formData.contactName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contactName: e.target.value,
                        }))
                      }
                      placeholder="Juan Pérez"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="contacto@empresa.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Teléfono
                    </label>
                    <Input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="+57 (1) 555-0123"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Cuéntanos sobre tu empresa
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    placeholder="Describe brevemente tu empresa, tipos de proyectos, experiencia..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Solicitar Aparecer en el Portal
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function DeveloperCarousel({
  onSelectDeveloper,
}: {
  onSelectDeveloper: (developerId: string) => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="py-24 bg-gradient-to-br from-muted/30 to-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={
            shouldReduceMotion ? {} : { opacity: 0, y: 20 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            Nuestras Desarrolladoras Especializadas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Cada desarrolladora se especializa en diferentes
            tipos de proyectos para satisfacer tus necesidades
            específicas
          </p>
        </motion.div>

        {/* Circular Carousel */}
        <div className="relative mb-16">
          <CircularCarousel
            onSelectDeveloper={onSelectDeveloper}
          />
        </div>

        {/* Infinite Horizontal Carousel */}
        <motion.div
          className="mt-16"
          initial={
            shouldReduceMotion ? {} : { opacity: 0, y: 20 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <InfiniteCarousel
            onSelectDeveloper={onSelectDeveloper}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}

function CircularCarousel({
  onSelectDeveloper,
}: {
  onSelectDeveloper: (developerId: string) => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  // Duplicate developers array to create infinite loop effect
  const infiniteDevelopers = [...developers, ...developers];

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Orbital Container */}
      <div className="relative w-96 h-96 md:w-[450px] md:h-[450px]">
        {/* Outer decorative rings */}
        <div className="absolute inset-0 rounded-full border border-primary/10" />
        <div className="absolute inset-4 rounded-full border border-primary/15" />
        <div className="absolute inset-8 rounded-full border-2 border-dashed border-primary/20" />

        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center shadow-lg"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 10px 25px rgba(0,0,0,0.1)",
                      "0 15px 35px rgba(0,0,0,0.15)",
                      "0 10px 25px rgba(0,0,0,0.1)",
                    ],
                  }
            }
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Building2 className="h-10 w-10 text-primary" />
          </motion.div>
        </div>

        {/* Orbiting Developer Cards */}
        <motion.div
          className="absolute inset-0"
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {developers.map((developer, index) => {
            const angle = (index * 360) / developers.length;
            const radius = 180; // Distance from center
            const x =
              Math.cos((angle * Math.PI) / 180) * radius;
            const y =
              Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <motion.div
                key={developer.id}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  scale: { duration: 0.6, delay: index * 0.15 },
                  opacity: {
                    duration: 0.6,
                    delay: index * 0.15,
                  },
                }}
              >
                {/* Counter-rotating container to keep cards upright */}
                <motion.div
                  animate={
                    shouldReduceMotion ? {} : { rotate: -360 }
                  }
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative"
                >
                  <motion.div
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group border-4 border-white bg-white"
                    whileHover={{
                      scale: 1.15,
                      rotate: shouldReduceMotion
                        ? 0
                        : [0, -5, 5, 0],
                      transition: { duration: 0.3 },
                    }}
                    onClick={() =>
                      onSelectDeveloper(developer.id)
                    }
                  >
                    <ImageWithFallback
                      src={developer.logoUrl}
                      alt={`Logo de ${developer.name}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>

                  {/* Hover Tooltip */}
                  <motion.div
                    className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                  >
                    <div className="bg-black/90 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                      <div className="font-semibold">
                        {developer.name}
                      </div>
                      <div className="text-xs opacity-80">
                        {getDeveloperTagline(developer.id)}
                      </div>
                      {/* Tooltip arrow */}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45" />
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional decorative rotating elements */}
        <motion.div
          className="absolute inset-12 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(var(--primary), 0.1) 50%, transparent 100%)",
          }}
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-16 rounded-full"
          style={{
            background:
              "conic-gradient(from 180deg, transparent 0%, rgba(var(--primary), 0.05) 50%, transparent 100%)",
          }}
          animate={shouldReduceMotion ? {} : { rotate: -360 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }
            }
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function InfiniteCarousel({
  onSelectDeveloper,
}: {
  onSelectDeveloper: (developerId: string) => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  // Duplicate developers array multiple times for seamless infinite scroll
  const duplicatedDevelopers = [
    ...developers,
    ...developers,
    ...developers,
  ];

  return (
    <div className="relative overflow-hidden">
      <h3 className="text-2xl font-semibold text-center mb-8">
        Explora todas nuestras desarrolladoras
      </h3>

      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Moving Track */}
        <motion.div
          className="flex gap-6 pb-5 w-max"
          animate={
            shouldReduceMotion
              ? {}
              : { x: `-${developers.length * (320 + 24)}px` }
          }
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedDevelopers.map((developer, index) => (
            <CompactDeveloperCard
              key={`${developer.id}-${index}`}
              developer={developer}
              onSelect={() => onSelectDeveloper(developer.id)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function CompactDeveloperCard({
  developer,
  onSelect,
}: {
  developer: Developer;
  onSelect: () => void;
}) {
  return (
    <motion.div
      className="w-80 bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-border/50"
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={onSelect}
    >
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <ImageWithFallback
              src={developer.logoUrl}
              alt={`Logo de ${developer.name}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">
              {developer.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {getDeveloperTagline(developer.id)}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <Building2 className="h-3 w-3" />
              Desde {developer.established}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {developer.specialties
            .slice(0, 2)
            .map((specialty) => (
              <Badge
                key={specialty}
                variant="secondary"
                className="text-xs"
              >
                {specialty}
              </Badge>
            ))}
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="font-semibold text-primary">
              {developer.totalProjects}
            </div>
            <div className="text-xs text-muted-foreground">
              Total
            </div>
          </div>
          <div>
            <div className="font-semibold text-green-600">
              {developer.activeProjects}
            </div>
            <div className="text-xs text-muted-foreground">
              Activos
            </div>
          </div>
          <div>
            <div className="font-semibold text-blue-600">
              {developer.completedProjects}
            </div>
            <div className="text-xs text-muted-foreground">
              Terminados
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DeveloperShowcaseSections({
  onSelectDeveloper,
}: {
  onSelectDeveloper: (developerId: string) => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-24">
      {/* Constructora Premium - Luxury & Sustainability Section */}
      <ConstructoraPremiumSection
        onSelectDeveloper={onSelectDeveloper}
      />

      {/* Grupo Urbano - Urban Innovation Section */}
      <GrupoUrbanoSection
        onSelectDeveloper={onSelectDeveloper}
      />

      {/* Familia Constructores - Accessible Homes Section */}
      <FamiliaConstructoresSection
        onSelectDeveloper={onSelectDeveloper}
      />
    </div>
  );
}

function ConstructoraPremiumSection({
  onSelectDeveloper,
}: {
  onSelectDeveloper: (developerId: string) => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const developer = developers.find((d) => d.id === "dev-1")!;
  const developerProjects = projects.filter(
    (p) => p.developer === developer.name,
  );

  return (
    <motion.section
      className="relative overflow-hidden"
      initial={shouldReduceMotion ? {} : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 -skew-y-1 scale-110" />

      <div className="relative max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={
              shouldReduceMotion ? {} : { opacity: 0, x: -30 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white shadow-lg">
                <ImageWithFallback
                  src={developer.logoUrl}
                  alt={`Logo de ${developer.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-primary">
                  {developer.name}
                </h2>
                <p className="text-muted-foreground">
                  Excelencia en construcción sostenible
                </p>
              </div>
            </div>

            <p className="text-lg mb-8 text-muted-foreground leading-relaxed">
              Desde {developer.established}, hemos sido pioneros
              en desarrollos residenciales de lujo que combinan
              elegancia, sostenibilidad y la más alta calidad de
              vida para nuestros residentes.
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <Leaf className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-semibold">
                    LEED Certified
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Construcción sostenible
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-semibold">
                    Garantía 5 años
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tranquilidad total
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <Award className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold">
                    22 años experiencia
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Trayectoria comprobada
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <TrendingUp className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-semibold">
                    +5,000 familias
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Satisfechas
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => onSelectDeveloper(developer.id)}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
              size="lg"
            >
              Explorar Proyectos Premium
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            className="relative"
            initial={
              shouldReduceMotion ? {} : { opacity: 0, x: 30 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758448617761-09367c1748d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzdXN0YWluYWJsZSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc1OTQ0MTg0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Luxury sustainable building"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              {/* Project Cards Overlay */}
              <div className="absolute bottom-4 left-4 right-4 space-y-2">
                {developerProjects
                  .slice(0, 2)
                  .map((project, index) => (
                    <div
                      key={project.id}
                      className="bg-white/90 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3"
                    >
                      <div className="w-12 h-12 rounded overflow-hidden">
                        <ImageWithFallback
                          src={project.imageUrl}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {project.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {project.location}
                        </p>
                      </div>
                      <Badge
                        variant="default"
                        className="text-xs bg-primary/90 shadow-md"
                      >
                        {project.availableUnits} unidades
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function GrupoUrbanoSection({
  onSelectDeveloper,
}: {
  onSelectDeveloper: (developerId: string) => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const developer = developers.find((d) => d.id === "dev-2")!;
  const developerProjects = projects.filter(
    (p) => p.developer === developer.name,
  );

  return (
    <motion.section
      className="bg-gradient-to-r from-slate-900 to-slate-800 text-white relative overflow-hidden"
      initial={shouldReduceMotion ? {} : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-24">
        <motion.div
          className="text-center mb-16"
          initial={
            shouldReduceMotion ? {} : { opacity: 0, y: 20 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shadow-lg">
              <ImageWithFallback
                src={developer.logoUrl}
                alt={`Logo de ${developer.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <h2 className="text-4xl font-bold">
                {developer.name}
              </h2>
              <p className="text-slate-300">
                Innovación urbana y diseño contemporáneo
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Innovation Features */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={
              shouldReduceMotion ? {} : { opacity: 0, x: -30 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <Smartphone className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="font-semibold mb-2">
                Smart Home Tech
              </h3>
              <p className="text-sm text-slate-300">
                Automatización y control inteligente en todos
                nuestros desarrollos
              </p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <Zap className="h-10 w-10 text-yellow-400 mb-4" />
              <h3 className="font-semibold mb-2">
                Diseño Galardonado
              </h3>
              <p className="text-sm text-slate-300">
                Arquitectura contemporánea reconocida
                internacionalmente
              </p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <MapPin className="h-10 w-10 text-green-400 mb-4" />
              <h3 className="font-semibold mb-2">
                Ubicaciones Premium
              </h3>
              <p className="text-sm text-slate-300">
                En el corazón de la zona rosa y centros
                financieros
              </p>
            </div>
          </motion.div>

          {/* Project Gallery */}
          <motion.div
            className="lg:col-span-2"
            initial={
              shouldReduceMotion ? {} : { opacity: 0, x: 30 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {/* Main project image */}
              <div className="relative rounded-xl overflow-hidden group">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1644985161251-eec915500f1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHNreWxpbmUlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU5NDQxODQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Urban skyline architecture"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="font-semibold text-lg">
                    Skyline Metropolitan
                  </p>
                  <p className="text-sm text-slate-300">
                    45 pisos • 360° views
                  </p>
                </div>
              </div>

              {/* Secondary projects */}
              <div className="space-y-4">
                {developerProjects
                  .slice(0, 2)
                  .map((project, index) => (
                    <div
                      key={project.id}
                      className="relative h-32 rounded-lg overflow-hidden group"
                    >
                      <ImageWithFallback
                        src={project.imageUrl}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-2 left-2">
                        <p className="font-medium text-sm">
                          {project.name}
                        </p>
                        <p className="text-xs text-slate-300">
                          {project.location}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={
            shouldReduceMotion ? {} : { opacity: 0, y: 20 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button
            onClick={() => onSelectDeveloper(developer.id)}
            variant="secondary"
            className="bg-white text-slate-900 hover:bg-white/90 px-8 py-3"
            size="lg"
          >
            <Eye className="mr-2 h-5 w-5" />
            Explorar Diseños Urbanos
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}

function FamiliaConstructoresSection({
  onSelectDeveloper,
}: {
  onSelectDeveloper: (developerId: string) => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const developer = developers.find((d) => d.id === "dev-3")!;
  const developerProjects = projects.filter(
    (p) => p.developer === developer.name,
  );

  return (
    <motion.section
      className="bg-gradient-to-br from-orange-50 to-amber-50 relative overflow-hidden"
      initial={shouldReduceMotion ? {} : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Image */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={
              shouldReduceMotion ? {} : { opacity: 0, x: -30 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1738686743225-ef5fd33d8c45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBuZWlnaGJvcmhvb2QlMjBob21lc3xlbnwxfHx8fDE3NTk0NDE4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Family neighborhood homes"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent" />

              {/* Family testimonial overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1606932250069-62f395a08602?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGZhbWlseSUyMG5ldyUyMGhvbWV8ZW58MXx8fHwxNzU5NDA5NDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Happy family"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm">
                        Familia González
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Residentes desde 2020
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "Encontramos el hogar perfecto para nuestra
                    familia, con precios justos y excelente
                    calidad."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={
              shouldReduceMotion ? {} : { opacity: 0, x: 30 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white shadow-md">
                <ImageWithFallback
                  src={developer.logoUrl}
                  alt={`Logo de ${developer.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-orange-900">
                  {developer.name}
                </h2>
                <p className="text-orange-700">
                  Construyendo hogares, fortaleciendo familias
                </p>
              </div>
            </div>

            <p className="text-lg mb-8 text-orange-800 leading-relaxed">
              Durante {developer.experience}, nos hemos dedicado
              a crear hogares accesibles y funcionales que
              permiten a las familias colombianas alcanzar el
              sueño de la casa propia.
            </p>

            {/* Family Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-white/60 rounded-lg">
                <Heart className="h-6 w-6 text-red-500 mt-1" />
                <div>
                  <p className="font-semibold text-orange-900">
                    Enfoque Familiar
                  </p>
                  <p className="text-sm text-orange-700">
                    Diseños pensados para la vida familiar
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/60 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <p className="font-semibold text-orange-900">
                    Precios Justos
                  </p>
                  <p className="text-sm text-orange-700">
                    Financiación flexible disponible
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/60 rounded-lg">
                <Users className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <p className="font-semibold text-orange-900">
                    Comunidad
                  </p>
                  <p className="text-sm text-orange-700">
                    Espacios comunes y áreas familiares
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/60 rounded-lg">
                <Target className="h-6 w-6 text-purple-600 mt-1" />
                <div>
                  <p className="font-semibold text-orange-900">
                    +8,000 Hogares
                  </p>
                  <p className="text-sm text-orange-700">
                    Familias felices entregadas
                  </p>
                </div>
              </div>
            </div>

            {/* Projects Highlight */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4 text-orange-900">
                Proyectos Destacados
              </h3>
              <div className="space-y-3">
                {developerProjects
                  .slice(0, 2)
                  .map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center gap-4 p-3 bg-white/60 rounded-lg"
                    >
                      <div className="w-16 h-12 rounded overflow-hidden">
                        <ImageWithFallback
                          src={project.imageUrl}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-orange-900">
                          {project.name}
                        </p>
                        <p className="text-sm text-orange-700">
                          {project.location}
                        </p>
                      </div>
                      <Badge className="bg-accent/90 text-accent-foreground border-accent shadow-md">
                        {project.availableUnits} disponibles
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>

            <Button
              onClick={() => onSelectDeveloper(developer.id)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3"
              size="lg"
            >
              <Heart className="mr-2 h-5 w-5" />
              Encuentra tu Hogar Ideal
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// Helper functions
function getCardVariant(
  developerId: string,
): "corporate" | "gallery" | "minimal" {
  switch (developerId) {
    case "dev-1":
      return "corporate"; // Constructora Premium - corporate style
    case "dev-2":
      return "gallery"; // Grupo Urbano - visual gallery style
    case "dev-3":
      return "minimal"; // Familia Constructores - minimal family-friendly
    case "dev-4":
      return "gallery"; // EcoVida - eco-friendly gallery
    case "dev-5":
      return "corporate"; // Élite - luxury corporate
    default:
      return "minimal";
  }
}

function getDeveloperTagline(developerId: string): string {
  switch (developerId) {
    case "dev-1":
      return "Proyectos de lujo y sostenibilidad";
    case "dev-2":
      return "Diseño urbano contemporáneo";
    case "dev-3":
      return "Hogares accesibles para familias";
    case "dev-4":
      return "Construcción eco-friendly";
    case "dev-5":
      return "Lujo exclusivo y personalizado";
    default:
      return "Construyendo sueños";
  }
}

function getFeaturedProperty(developerId: string) {
  // Get the first property for each developer as featured
  const developerProjects = projects.filter((project) => {
    const developer = developers.find(
      (dev) => dev.id === developerId,
    );
    return developer && project.developer === developer.name;
  });

  if (developerProjects.length === 0) return null;

  const featuredProjectId = developerProjects[0].id;
  return properties.find(
    (property) => property.projectId === featuredProjectId,
  );
}