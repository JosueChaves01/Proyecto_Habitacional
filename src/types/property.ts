export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  zone: string;
  type: 'apartamento' | 'casa' | 'duplex' | 'penthouse';
  bedrooms: number;
  bathrooms: number;
  area: number; // en m²
  imageUrl: string;
  features: string[];
  status: 'disponible' | 'reservado' | 'vendido';
  projectId: string;
  floor?: number;
  parking: boolean;
  balcony: boolean;
  garden?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  zone: string;
  amenities: string[];
  deliveryDate: string;
  totalUnits: number;
  availableUnits: number;
  imageUrl: string;
  developer: string;
  status: 'en-construccion' | 'terminado' | 'pre-venta';
  coordinates?: {
    lat: number;
    lng: number;
  };
  // Área del proyecto definida por polígono o múltiples puntos
  projectArea?: Array<{
    lat: number;
    lng: number;
  }>;
  zoneInfo: {
    climate: {
      temperature: string;
      humidity: string;
      rainfall: string;
      season: string;
    };
    geography: {
      elevation: string;
      terrain: string;
      nearbyLandmarks: string[];
      naturalFeatures: string[];
    };
    social: {
      population: string;
      demographics: string;
      lifestyle: string;
      community: string[];
    };
    infrastructure: {
      transportation: string[];
      healthcare: string[];
      education: string[];
      shopping: string[];
      recreation: string[];
    };
  };
}

export interface FilterOptions {
  zone: string[];
  priceRange: [number, number];
  type: string[];
  bedrooms: number[];
  minArea: number;
  maxArea: number;
  status: string[];
}

export interface Developer {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  established?: string;
  specialties?: string[];
  totalProjects?: number;
  activeProjects: number;
  completedProjects: number;
  experience?: string;
  contact?: {
    phone: string;
    email: string;
    website: string;
    address: string;
  };
  // Alternative simplified contact fields
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  highlights: string[];
  userId?: string; // Link to admin user
}