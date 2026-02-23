import { useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Sparkles,
  X,
} from "lucide-react";
import { Separator } from "./ui/separator";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";

interface FooterProps {
  onNavigateHome?: () => void;
  onNavigateProjects?: () => void;
  onNavigateProperties?: () => void;
  onNavigateAbout?: () => void;
  onNavigateContact?: () => void;
}

export function Footer({
  onNavigateHome,
  onNavigateProjects,
  onNavigateProperties,
  onNavigateAbout,
  onNavigateContact,
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    callback?: () => void,
  ) => {
    e.preventDefault();
    if (callback) {
      callback();
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleComingSoonClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    setShowComingSoon(true);
  };

  return (
    <footer className="bg-gradient-to-br from-card via-muted/30 to-card border-t border-primary/20 mt-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-primary" />
              <h3 className="font-semibold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Costa Rica Residencial
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Tu hogar en el paraíso tropical. Conectando familias con propiedades 
              en las zonas más hermosas de Costa Rica desde {currentYear - 10}.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  onClick={(e) =>
                    handleLinkClick(e, onNavigateHome)
                  }
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) =>
                    handleLinkClick(e, onNavigateProjects)
                  }
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Proyectos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) =>
                    handleLinkClick(e, onNavigateProperties)
                  }
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Propiedades
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) =>
                    handleLinkClick(e, onNavigateAbout)
                  }
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) =>
                    handleLinkClick(e, onNavigateContact)
                  }
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  onClick={handleComingSoonClick}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  Compra de Propiedades
                  <Sparkles className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleComingSoonClick}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  Alquiler de Propiedades
                  <Sparkles className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleComingSoonClick}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  Publica tu Proyecto Habitacional
                  <Sparkles className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Av. Principal 123, Edificio Corporativo, Piso
                  5
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <a
                  href="tel:+50612345678"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  +506 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <a
                  href="mailto:info@inmobiliaria.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  info@inmobiliaria.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground">
                Horario de Atención:
                <br />
                Lunes - Viernes: 8:00 AM - 6:00 PM
                <br />
                Sábados: 9:00 AM - 2:00 PM
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} Inmobiliaria. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Términos y Condiciones
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Coming Soon Alert Dialog */}
      <AlertDialog
        open={showComingSoon}
        onOpenChange={setShowComingSoon}
      >
        <AlertDialogContent className="max-w-md overflow-hidden p-0 border-2 border-primary/20">
          <div className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            </div>

            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 h-8 w-8 rounded-full"
              onClick={() => setShowComingSoon(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            <AlertDialogHeader className="relative space-y-4">
              {/* Icon */}
              <motion.div
                className="mx-auto"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.1,
                }}
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>
                  {/* Pulse effect */}
                  <motion.div
                    className="absolute inset-0 w-20 h-20 rounded-full bg-primary/30"
                    animate={{
                      scale: [1, 1.2, 1.2, 1],
                      opacity: [0.5, 0, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <AlertDialogTitle className="text-center text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  ¡Próximamente!
                </AlertDialogTitle>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <AlertDialogDescription className="text-center text-base leading-relaxed">
                  Este servicio estará disponible muy pronto.
                  <br />
                  <span className="font-semibold text-foreground">
                    ¡Estamos trabajando en algo increíble para
                    ti!
                  </span>
                </AlertDialogDescription>
              </motion.div>

              {/* Decorative stars */}
              <motion.div
                className="flex justify-center gap-2 pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.6 + i * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <Sparkles className="h-4 w-4 text-primary/60" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Action button */}
              <motion.div
                className="pt-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Button
                  onClick={() => setShowComingSoon(false)}
                  className="w-full h-12 text-base shadow-lg"
                >
                  Entendido
                </Button>
              </motion.div>
            </AlertDialogHeader>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </footer>
  );
}