import { useState, useCallback } from 'react';
import { Property, Project } from '../types/property';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { getPriceGradient, getPriceCategory } from './ui/price-utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AmenitiesList } from './AmenitiesList';
import { PropertyImageGallery } from './PropertyImageGallery';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Home, 
  Trees, 
  Building, 
  Calendar,
  Users,
  Shield,
  Phone,
  Mail,
  MessageSquare,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Check,
  Star,
  TrendingUp,
  Zap,
  Eye,
  Sparkles
} from 'lucide-react';

interface PropertyDetailProps {
  property: Property;
  project: Project;
  onBack: () => void;
}

// Feature images mapping
const featureImages: Record<string, string> = {
  balcony: 'https://images.unsplash.com/photo-1618237693938-0fbc85b93774?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBiYWxjb255JTIwdmlld3xlbnwxfHx8fDE3NjAwMzMyNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  parking: 'https://images.unsplash.com/photo-1620726068483-d4d53738ba48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJraW5nJTIwZ2FyYWdlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYwMDMzMjUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  kitchen: 'https://images.unsplash.com/photo-1603072819161-e864800276cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBraXRjaGVufGVufDF8fHx8MTc1OTkyNTEwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  bathroom: 'https://images.unsplash.com/photo-1638799869566-b17fa794c4de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MDAwMzA4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  garden: 'https://images.unsplash.com/photo-1759244568572-d4401703d378?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBnYXJkZW4lMjB0ZXJyYWNlfGVufDF8fHx8MTc2MDAzMzI1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  bedroom: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWRyb29tJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzU5OTM3NTQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
};

// Amenity images mapping for projects
const amenityImages: Record<string, string> = {
  'piscina': 'https://images.unsplash.com/photo-1661333587575-25c87c14f398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwb29sJTIwc3dpbW1pbmd8ZW58MXx8fHwxNzYwMDMzNTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'gimnasio': 'https://images.unsplash.com/photo-1721394747060-7cfc57104f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBneW0lMjBmaXRuZXNzJTIwY2VudGVyfGVufDF8fHx8MTc2MDAwNzcxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'área de juegos': 'https://images.unsplash.com/photo-1597137642623-7f1d44ed0731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF5Z3JvdW5kJTIwY2hpbGRyZW4lMjBhcmVhfGVufDF8fHx8MTc2MDAzMzU4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'salón de eventos': 'https://images.unsplash.com/photo-1759519238029-689e99c6d19e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMGhhbGwlMjBiYWxscm9vbXxlbnwxfHx8fDE3NjAwMzM1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'seguridad 24/7': 'https://images.unsplash.com/photo-1758514474995-390bfe57c5be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMHN1cnZlaWxsYW5jZSUyMHN5c3RlbXxlbnwxfHx8fDE3NjAwMjc3ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'área verde': 'https://images.unsplash.com/photo-1705864827362-2f05df95fbd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHBhcmslMjBnYXJkZW58ZW58MXx8fHwxNzYwMDMzNTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'spa de lujo': 'https://images.unsplash.com/photo-1667235195726-a7c440bca9bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjAwMDc5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'wine cellar': 'https://images.unsplash.com/photo-1616330488969-38bfbb7d9851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwY2VsbGFyJTIwYm90dGxlc3xlbnwxfHx8fDE3NTk5NDk2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'sala de cine privada': 'https://images.unsplash.com/photo-1759230766134-e3ff1c27d20e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwY2luZW1hJTIwdGhlYXRlcnxlbnwxfHx8fDE3NjAwMzM1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'terraza': 'https://images.unsplash.com/photo-1723119832675-0031e0f0408c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwdGVycmFjZSUyMGxvdW5nZXxlbnwxfHx8fDE3NjAwMDc3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'coworking': 'https://images.unsplash.com/photo-1560821630-1a7c45c3286e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBvZmZpY2UlMjBzcGFjZXxlbnwxfHx8fDE3NjAwMzM1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'zona de bbq': 'https://images.unsplash.com/photo-1705509444110-e1c9392dbed1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYnElMjBncmlsbCUyMGFyZWF8ZW58MXx8fHwxNzYwMDMzNTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'jardín botánico': 'https://images.unsplash.com/photo-1705864827362-2f05df95fbd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHBhcmslMjBnYXJkZW58ZW58MXx8fHwxNzYwMDMzNTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'piscina infinity': 'https://images.unsplash.com/photo-1661333587575-25c87c14f398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwb29sJTIwc3dpbW1pbmd8ZW58MXx8fHwxNzYwMDMzNTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
};

// Specification images - for clickable specs
const specificationImages = {
  bedrooms: [
    'https://images.unsplash.com/photo-1758448755969-8791367cf5c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXN0ZXIlMjBiZWRyb29tJTIwc3VpdGV8ZW58MXx8fHwxNzYwMDcxMTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1759951710201-3210361245c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWVzdCUyMGJlZHJvb20lMjBtb2Rlcm58ZW58MXx8fHwxNzYwMDcxMTUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1721395288477-b546804ce392?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGJlZHJvb20lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjAwNzExNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1750420556288-d0e32a6f517b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzYwMDcwNTk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  ],
  bathrooms: [
    'https://images.unsplash.com/photo-1621215065447-28744f6b9e87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXN0ZXIlMjBiYXRocm9vbSUyMGx1eHVyeXxlbnwxfHx8fDE3NjAwNzExNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1759262151424-7b8ed20a31a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWVzdCUyMGJhdGhyb29tJTIwbW9kZXJufGVufDF8fHx8MTc2MDA3MTE1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1638799869566-b17fa794c4de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MDAwMzA4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  ],
  floorplan: 'https://images.unsplash.com/photo-1721244653580-79577d2822a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwZmxvb3IlMjBwbGFuJTIwYmx1ZXByaW50fGVufDF8fHx8MTc2MDAyMzEzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  zonemap: 'https://images.unsplash.com/photo-1713862032476-f75077d3221c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3N0YSUyMHJpY2ElMjBtYXAlMjBsb2NhdGlvbnxlbnwxfHx8fDE3NjAwNzA1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
};

// Function to get amenity image
function getAmenityImage(amenity: string): string | null {
  const lowerAmenity = amenity.toLowerCase();
  // Try exact match first
  if (amenityImages[lowerAmenity]) {
    return amenityImages[lowerAmenity];
  }
  // Try partial match
  for (const key in amenityImages) {
    if (lowerAmenity.includes(key) || key.includes(lowerAmenity)) {
      return amenityImages[key];
    }
  }
  return null;
}

// Feature descriptions for tooltips
const featureDescriptions: Record<string, string> = {
  // Pisos y materiales
  'pisos de mármol': 'Elegantes pisos de mármol importado que aportan distinción y fácil mantenimiento a todos los espacios',
  'pisos de madera': 'Pisos de madera natural que brindan calidez y confort, con acabado de alta durabilidad',
  'pisos de porcelanato': 'Pisos de porcelanato de alta resistencia con variedad de diseños modernos',
  'pisos inteligentes': 'Sistema de pisos con tecnología de calefacción radiante y sensores de temperatura',
  
  // Cocina
  'cocina gourmet': 'Cocina equipada con electrodomésticos de alta gama, encimeras de cuarzo y amplios espacios de almacenamiento',
  'cocina americana': 'Concepto abierto que integra cocina, comedor y sala en un espacio fluido y moderno',
  'cocina equipada': 'Cocina completamente equipada con estufa, horno, campana extractora y muebles empotrados',
  
  // Tecnología
  'smart home': 'Sistema de automatización integral que controla iluminación, clima, seguridad y entretenimiento desde tu smartphone',
  'domótica completa': 'Control total del hogar mediante tecnología IoT: luces, persianas, temperatura, seguridad y más',
  'automatización': 'Sistemas automatizados para mayor comodidad: iluminación inteligente, control de clima y escenas personalizadas',
  'domótica': 'Tecnología de automatización del hogar para control inteligente de todos los sistemas',
  'smart home total': 'Sistema de domótica de última generación con control por voz, app móvil y programación avanzada',
  'clima automatizado': 'Sistema de climatización inteligente que ajusta automáticamente temperatura y humedad según preferencias',
  'seguridad biométrica': 'Sistema de acceso mediante huella dactilar y reconocimiento facial para máxima seguridad',
  
  // Vistas y espacios exteriores
  'vista a la ciudad': 'Impresionantes vistas panorámicas del skyline urbano desde ventanas de piso a techo',
  'vista panorámica': 'Vistas 360° de la ciudad y paisajes circundantes desde ubicación privilegiada',
  'vista 360°': 'Vistas completas de 360 grados que abarcan toda la ciudad desde una altura privilegiada',
  'ventanales panorámicos': 'Grandes ventanales de piso a techo que maximizan la luz natural y las vistas',
  'balcón francés': 'Pequeño balcón decorativo con puertas de vidrio que permite acceso visual al exterior',
  'terraza cubierta': 'Amplia terraza techada para disfrutar al aire libre en cualquier clima',
  'terraza verde extensiva': 'Terraza con jardín extenso y sistema de vegetación sostenible',
  'terraza sky lounge': 'Terraza de lujo en altura con área lounge, bar y vistas espectaculares',
  'acceso jardín privado': 'Acceso directo a jardín privado exclusivo para tu unidad',
  'jardín orgánico': 'Espacio de jardín para cultivar vegetales y hierbas orgánicas',
  'jardín privado': 'Jardín exclusivo de uso privado para tu disfrute y relajación',
  
  // Acabados premium
  'acabados premium': 'Materiales de primera calidad en toda la unidad: porcelanato, madera noble y accesorios de diseño',
  'acabados de lujo': 'Los más finos acabados con materiales importados y detalles de diseñador',
  'chimenea': 'Chimenea decorativa que aporta calidez y elegancia al espacio',
  
  // Altura y arquitectura
  'techos altos': 'Techos de doble altura que amplían el espacio y mejoran la sensación de amplitud',
  'doble altura': 'Espacios con techos de hasta 6 metros de altura para mayor luminosidad y amplitud',
  
  // Espacios especiales
  'walk-in closet': 'Vestidor amplio con sistema de organización completo y espacio para accesorios',
  'estudio privado': 'Habitación dedicada para oficina en casa, completamente equipada',
  'espacio de trabajo': 'Área dedicada para trabajo desde casa con conexiones y almacenamiento',
  'wine cellar': 'Cava climatizada privada para almacenar tu colección de vinos en condiciones óptimas',
  
  // Ecológico y sostenible
  'paneles solares': 'Sistema de paneles fotovoltaicos que genera energía limpia y reduce costos eléctricos hasta 70%',
  'recolección agua lluvia': 'Sistema de captación y filtrado de agua lluvia para uso en jardines y sanitarios',
  'materiales eco-friendly': 'Construcción con materiales sostenibles certificados de bajo impacto ambiental',
  'iluminación led': 'Sistema completo de iluminación LED de bajo consumo y larga durabilidad',
  'huerta en balcón': 'Espacio equipado en el balcón para cultivar hierbas y vegetales frescos',
  'sistema de compostaje': 'Sistema integrado para compostaje de residuos orgánicos y fertilización natural',
  'cisterna de lluvia': 'Tanque de almacenamiento de agua lluvia filtrada para múltiples usos',
  
  // Espacios creativos y urbanos
  'iluminación artística': 'Sistema de iluminación diseñado para resaltar espacios y crear ambientes únicos',
  'acceso a galería': 'Acceso directo a galería de arte del edificio con exposiciones mensuales',
  'co-working incluido': 'Membresía incluida al espacio de co-working del edificio',
  'roof access': 'Acceso a terraza en azotea con área social y vistas panorámicas',
  'pet-friendly design': 'Diseño adaptado para mascotas con espacios y facilidades especiales',
  
  // Accesos especiales
  'heliport access': 'Acceso directo al helipuerto del edificio para máxima exclusividad',
  'vista financiera': 'Vista directa al distrito financiero y edificios corporativos emblemáticos',
  
  // Default para características no listadas
  'default': 'Característica especial que agrega valor y confort a la propiedad'
};

// Function to get feature description
function getFeatureDescription(feature: string): string {
  const lowerFeature = feature.toLowerCase();
  
  // Try exact match first
  if (featureDescriptions[lowerFeature]) {
    return featureDescriptions[lowerFeature];
  }
  
  // Try partial match
  for (const key in featureDescriptions) {
    if (key !== 'default' && (lowerFeature.includes(key) || key.includes(lowerFeature))) {
      return featureDescriptions[key];
    }
  }
  
  // Return default description
  return featureDescriptions['default'];
}

export function PropertyDetail({ property, project, onBack }: PropertyDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [selectedAmenity, setSelectedAmenity] = useState<{ name: string; image: string } | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<{ 
    type: 'bedroom' | 'bathroom' | 'area' | 'zone'; 
    title: string; 
    description: string;
    images: string[];
    currentImageIndex: number;
  } | null>(null);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const statusColors = {
    disponible: 'bg-green-600 text-white shadow-md border-green-700',
    reservado: 'bg-yellow-600 text-white shadow-md border-yellow-700',
    vendido: 'bg-red-600 text-white shadow-md border-red-700'
  };

  const typeLabels = {
    apartamento: 'Apartamento',
    casa: 'Casa',
    duplex: 'Dúplex',
    penthouse: 'Penthouse'
  };

  // Get dynamic price styling
  const priceStyle = getPriceGradient(property.price);
  const priceCategory = getPriceCategory(property.price);

  // Create gallery with main image and feature images - memoized
  const galleryImages = useState(() => [
    property.imageUrl,
    ...(property.balcony ? [featureImages.balcony] : []),
    ...(property.parking ? [featureImages.parking] : []),
    ...(property.garden ? [featureImages.garden] : []),
    featureImages.bedroom,
    featureImages.bathroom,
    featureImages.kitchen,
  ])[0];

  const handleContactClick = useCallback(() => {
    // Placeholder for contact action
    alert('Contactando con el vendedor...');
  }, []);

  const handleAmenityClick = useCallback((name: string, image: string) => {
    setSelectedAmenity({ name, image });
  }, []);

  const handleSpecClick = useCallback((type: 'bedroom' | 'bathroom' | 'area' | 'zone') => {
    const specs = {
      bedroom: {
        type: 'bedroom' as const,
        title: `${property.bedrooms} Habitaciones`,
        description: 'Amplias habitaciones diseñadas para tu comodidad, con acabados de primera calidad y excelente iluminación natural.',
        images: specificationImages.bedrooms.slice(0, property.bedrooms),
        currentImageIndex: 0
      },
      bathroom: {
        type: 'bathroom' as const,
        title: `${property.bathrooms} Baños`,
        description: 'Baños modernos con accesorios de lujo, acabados premium y diseño funcional para tu día a día.',
        images: specificationImages.bathrooms.slice(0, property.bathrooms),
        currentImageIndex: 0
      },
      area: {
        type: 'area' as const,
        title: `${property.area} m² Totales`,
        description: 'Distribución inteligente del espacio que maximiza cada metro cuadrado para tu comodidad y funcionalidad.',
        images: [specificationImages.floorplan],
        currentImageIndex: 0
      },
      zone: {
        type: 'zone' as const,
        title: `Zona ${property.zone}`,
        description: `Ubicación privilegiada en ${property.zone}, ${project.location}. Una zona con excelente conectividad y servicios cercanos.`,
        images: [specificationImages.zonemap],
        currentImageIndex: 0
      }
    };
    setSelectedSpec(specs[type]);
  }, [property, project]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Floating Header */}
      <motion.div 
        className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="flex items-center gap-2 hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          
          <div className="flex items-center gap-3">
            <Badge className={statusColors[property.status]}>
              {property.status}
            </Badge>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
              className={isFavorite ? 'text-red-500' : ''}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PropertyImageGallery
                images={galleryImages}
                title={property.title}
                onOpenLightbox={() => setIsLightboxOpen(true)}
                currentIndex={currentImageIndex}
                onIndexChange={setCurrentImageIndex}
              />
            </motion.div>

            {/* Property Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-2 border-border/50">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                      <div className="flex items-center text-muted-foreground gap-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                        </div>
                        <Badge variant="secondary">{typeLabels[property.type]}</Badge>
                      </div>
                    </div>
                    <div className="text-left md:text-right">
                      <div className="space-y-2">
                        <div className={`inline-block ${priceStyle.bgColor} px-4 py-2 rounded-xl ${priceStyle.borderColor} border-2 ${priceStyle.glowColor}`}>
                          <div className={`text-4xl font-bold bg-gradient-to-r ${priceStyle.textGradient} bg-clip-text text-transparent`}>
                            ${property.price.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <Badge variant="outline" className={`${priceStyle.borderColor} ${priceStyle.bgColor}`}>
                            <span className={`bg-gradient-to-r ${priceStyle.textGradient} bg-clip-text text-transparent`}>
                              {priceCategory}
                            </span>
                          </Badge>
                        </div>
                      </div>
                      {property.floor && (
                        <div className="text-sm text-muted-foreground mt-2">
                          Piso {property.floor}
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1 justify-end">
                        <TrendingUp className="h-3 w-3" />
                        <span>Precio por m²: ${Math.round(property.price / property.area).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Key Specs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-2 border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Especificaciones
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Haz clic en cada especificación para ver más detalles
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <motion.div 
                      className="relative p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800 cursor-pointer group"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => handleSpecClick('bedroom')}
                    >
                      <Bed className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                        {property.bedrooms}
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        Habitaciones
                      </div>
                      <Eye className="absolute top-2 right-2 h-4 w-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>

                    <motion.div 
                      className="relative p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 border border-purple-200 dark:border-purple-800 cursor-pointer group"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => handleSpecClick('bathroom')}
                    >
                      <Bath className="h-8 w-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                        {property.bathrooms}
                      </div>
                      <div className="text-sm text-purple-700 dark:text-purple-300">
                        Baños
                      </div>
                      <Eye className="absolute top-2 right-2 h-4 w-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>

                    <motion.div 
                      className="relative p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 border border-green-200 dark:border-green-800 cursor-pointer group"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => handleSpecClick('area')}
                    >
                      <Square className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                        {property.area}
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300">
                        m² Totales
                      </div>
                      <Eye className="absolute top-2 right-2 h-4 w-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>

                    <motion.div 
                      className="relative p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 border border-orange-200 dark:border-orange-800 cursor-pointer group"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => handleSpecClick('zone')}
                    >
                      <Building className="h-8 w-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                        {property.zone}
                      </div>
                      <div className="text-sm text-orange-700 dark:text-orange-300">
                        Zona
                      </div>
                      <Eye className="absolute top-2 right-2 h-4 w-4 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Interactive Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-2 border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Servicios Especiales
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {property.parking && (
                      <motion.div
                        className="relative group cursor-pointer"
                        onHoverStart={() => setHoveredFeature('parking')}
                        onHoverEnd={() => setHoveredFeature(null)}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="relative h-48 rounded-xl overflow-hidden">
                          <ImageWithFallback
                            src={featureImages.parking}
                            alt="Estacionamiento"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-2 text-white">
                              <Car className="h-6 w-6" />
                              <span className="font-semibold">Estacionamiento Privado</span>
                            </div>
                          </div>
                          <AnimatePresence>
                            {hoveredFeature === 'parking' && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/40 flex items-center justify-center"
                              >
                                <Eye className="h-12 w-12 text-white" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}

                    {property.balcony && (
                      <motion.div
                        className="relative group cursor-pointer"
                        onHoverStart={() => setHoveredFeature('balcony')}
                        onHoverEnd={() => setHoveredFeature(null)}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="relative h-48 rounded-xl overflow-hidden">
                          <ImageWithFallback
                            src={featureImages.balcony}
                            alt="Balcón"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-2 text-white">
                              <Home className="h-6 w-6" />
                              <span className="font-semibold">Balcón con Vista</span>
                            </div>
                          </div>
                          <AnimatePresence>
                            {hoveredFeature === 'balcony' && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/40 flex items-center justify-center"
                              >
                                <Eye className="h-12 w-12 text-white" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}

                    {property.garden && (
                      <motion.div
                        className="relative group cursor-pointer"
                        onHoverStart={() => setHoveredFeature('garden')}
                        onHoverEnd={() => setHoveredFeature(null)}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="relative h-48 rounded-xl overflow-hidden">
                          <ImageWithFallback
                            src={featureImages.garden}
                            alt="Jardín"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-2 text-white">
                              <Trees className="h-6 w-6" />
                              <span className="font-semibold">Jardín Privado</span>
                            </div>
                          </div>
                          <AnimatePresence>
                            {hoveredFeature === 'garden' && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/40 flex items-center justify-center"
                              >
                                <Eye className="h-12 w-12 text-white" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-2 border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    Características Adicionales
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Pasa el cursor sobre cada característica para ver más información
                  </p>
                  <TooltipProvider>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.features.map((feature, index) => (
                        <Tooltip key={index} delayDuration={200}>
                          <TooltipTrigger asChild>
                            <motion.div
                              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-primary/5 hover:border-primary/20 border border-transparent transition-all cursor-help"
                              whileHover={{ scale: 1.02, x: 4 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Check className="h-4 w-4 text-primary" />
                              </div>
                              <span className="text-sm font-medium">{feature}</span>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="top" 
                            className="max-w-xs p-3 bg-primary text-primary-foreground shadow-xl border-primary/50"
                            sideOffset={5}
                          >
                            <p className="text-sm leading-relaxed">
                              {getFeatureDescription(feature)}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </TooltipProvider>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contact Card - DESTACADO */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-2 border-primary shadow-2xl shadow-primary/20">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        <Phone className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">¿Interesado en esta propiedad?</h3>
                      <p className="text-sm text-muted-foreground">
                        Contacta con un asesor especializado
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          className="w-full h-12 text-base shadow-lg"
                          onClick={handleContactClick}
                        >
                          <Phone className="h-5 w-5 mr-2" />
                          Llamar Ahora
                        </Button>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          variant="outline" 
                          className="w-full h-12 text-base border-2"
                          onClick={handleContactClick}
                        >
                          <MessageSquare className="h-5 w-5 mr-2" />
                          WhatsApp
                        </Button>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          variant="outline" 
                          className="w-full h-12 text-base border-2"
                          onClick={handleContactClick}
                        >
                          <Mail className="h-5 w-5 mr-2" />
                          Enviar Email
                        </Button>
                      </motion.div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span>Respuesta en menos de 24 horas</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Project Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border-2 border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Building className="h-5 w-5 text-primary" />
                      Información del Proyecto
                    </h3>
                    
                    <div className="mb-4 rounded-xl overflow-hidden">
                      <ImageWithFallback
                        src={project.imageUrl}
                        alt={project.name}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                    
                    <h4 className="font-semibold mb-2">{project.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span>Entrega: {project.deliveryDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span>{project.availableUnits} de {project.totalUnits} disponibles</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span>{project.developer}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Badge 
                        className={
                          project.status === 'terminado' 
                            ? 'bg-green-500 text-white' 
                            : project.status === 'en-construccion'
                            ? 'bg-blue-500 text-white'
                            : 'bg-orange-500 text-white'
                        }
                      >
                        {project.status === 'terminado' 
                          ? 'Terminado' 
                          : project.status === 'en-construccion'
                          ? 'En Construcción'
                          : 'Pre-venta'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <AmenitiesList
                  amenities={project.amenities}
                  onAmenityClick={handleAmenityClick}
                  getAmenityImage={getAmenityImage}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <Button
              variant="default"
              size="icon"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 h-12 w-12 rounded-full bg-primary/95 hover:bg-primary text-primary-foreground shadow-xl border-2 border-primary"
            >
              <X className="h-6 w-6" />
            </Button>
            
            <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <ImageWithFallback
                  src={galleryImages[currentImageIndex]}
                  alt={`${property.title} - Fullscreen`}
                  className="max-w-full max-h-full object-contain"
                />
                
                <Button
                  variant="default"
                  size="icon"
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-primary/95 hover:bg-primary text-primary-foreground shadow-xl border-2 border-primary"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <Button
                  variant="default"
                  size="icon"
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-primary/95 hover:bg-primary text-primary-foreground shadow-xl border-2 border-primary"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary/95 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-primary">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Amenity Image Modal */}
      <AnimatePresence>
        {selectedAmenity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedAmenity(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="overflow-hidden border-2 border-primary/50 shadow-2xl">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="relative bg-gradient-to-r from-primary/90 to-primary/70 p-6 text-white">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedAmenity(null)}
                      className="absolute top-4 right-4 text-white hover:bg-white/20 h-10 w-10"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{selectedAmenity.name}</h3>
                        <p className="text-sm text-white/80">Amenidad del Proyecto</p>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative h-96 bg-black">
                    <ImageWithFallback
                      src={selectedAmenity.image}
                      alt={selectedAmenity.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Footer */}
                  <div className="p-6 bg-muted/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building className="h-4 w-4" />
                        <span>{project.name}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedAmenity(null)}
                        className="gap-2"
                      >
                        <Check className="h-4 w-4" />
                        Cerrar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Decorative elements */}
              {!prefersReducedMotion && (
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl -z-10 blur-2xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Specification Image Modal */}
      <Dialog open={!!selectedSpec} onOpenChange={() => setSelectedSpec(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedSpec && (
            <>
              <DialogHeader className="bg-gradient-to-r from-primary/90 to-primary/70 p-6 text-white space-y-2">
                <DialogTitle className="text-2xl flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {selectedSpec.type === 'bedroom' && <Bed className="h-6 w-6" />}
                    {selectedSpec.type === 'bathroom' && <Bath className="h-6 w-6" />}
                    {selectedSpec.type === 'area' && <Square className="h-6 w-6" />}
                    {selectedSpec.type === 'zone' && <Building className="h-6 w-6" />}
                  </div>
                  {selectedSpec.title}
                </DialogTitle>
                <DialogDescription className="text-white/90 text-base">
                  {selectedSpec.description}
                </DialogDescription>
              </DialogHeader>

              {/* Image Gallery */}
              <div className="relative h-96 bg-black group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedSpec.currentImageIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <ImageWithFallback
                      src={selectedSpec.images[selectedSpec.currentImageIndex]}
                      alt={`${selectedSpec.title} - ${selectedSpec.currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                
                {/* Navigation Buttons - only show if multiple images */}
                {selectedSpec.images.length > 1 && (
                  <>
                    <Button
                      variant="default"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSpec(prev => prev ? {
                          ...prev,
                          currentImageIndex: (prev.currentImageIndex - 1 + prev.images.length) % prev.images.length
                        } : null);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary/95 hover:bg-primary text-primary-foreground shadow-xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="default"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSpec(prev => prev ? {
                          ...prev,
                          currentImageIndex: (prev.currentImageIndex + 1) % prev.images.length
                        } : null);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary/95 hover:bg-primary text-primary-foreground shadow-xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-primary/95 text-primary-foreground px-3 py-1 rounded-full text-sm backdrop-blur-sm shadow-lg border border-primary">
                      {selectedSpec.currentImageIndex + 1} / {selectedSpec.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Footer Info */}
              <div className="p-6 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Home className="h-4 w-4" />
                    <span>{property.title}</span>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <MapPin className="h-3 w-3" />
                    {project.location}
                  </Badge>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
