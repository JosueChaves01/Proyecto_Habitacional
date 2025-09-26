import { Property, Project } from '../types/property';

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Residencial Vista Verde',
    description: 'Desarrollo habitacional moderno con amplias áreas verdes y amenidades de primera clase.',
    location: 'Zona Norte, Ciudad',
    zone: 'Norte',
    amenities: ['Piscina', 'Gimnasio', 'Área de juegos', 'Salón de eventos', 'Seguridad 24/7', 'Área verde'],
    deliveryDate: 'Diciembre 2024',
    totalUnits: 120,
    availableUnits: 45,
    imageUrl: 'https://images.unsplash.com/photo-1559329146-807aff9ff1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc1ODkxMzk4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    developer: 'Constructora Premium',
    status: 'en-construccion',
    zoneInfo: {
      climate: {
        temperature: '18°C - 26°C promedio anual',
        humidity: '60-75% humedad relativa',
        rainfall: '1,200mm precipitación anual',
        season: 'Clima templado todo el año'
      },
      geography: {
        elevation: '2,640 metros sobre el nivel del mar',
        terrain: 'Terreno montañoso con pendientes suaves',
        nearbyLandmarks: ['Cerro de la Cruz', 'Parque Nacional Verde', 'Mirador Norte'],
        naturalFeatures: ['Bosque nativo', 'Quebradas naturales', 'Área de reserva ecológica']
      },
      social: {
        population: '45,000 habitantes en la zona',
        demographics: 'Familias jóvenes profesionales y ejecutivos',
        lifestyle: 'Estilo de vida tranquilo con acceso a naturaleza',
        community: ['Club deportivo local', 'Asociación de vecinos', 'Grupos de senderismo', 'Mercado orgánico semanal']
      },
      infrastructure: {
        transportation: ['Estación TransMilenio a 800m', 'Cicloruta conectada', 'Acceso directo Autopista Norte'],
        healthcare: ['Hospital Universitario Norte (2km)', 'Clínica Vista Verde (500m)', 'Centro de salud comunitario'],
        education: ['Colegio Internacional Norte', 'Universidad Pontificia (3km)', 'Jardín infantil bilingüe'],
        shopping: ['Centro Comercial Norte Plaza', 'Supermercado Éxito (300m)', 'Plaza de mercado local'],
        recreation: ['Parque Ecológico Norte', 'Centro deportivo municipal', 'Senderos ecológicos', 'Club ecuestre']
      }
    }
  },
  {
    id: 'proj-2',
    name: 'Torres del Centro',
    description: 'Exclusivo proyecto en el corazón de la ciudad con vista panorámica.',
    location: 'Centro Histórico, Ciudad',
    zone: 'Centro',
    amenities: ['Terraza común', 'Coworking', 'Restaurante', 'Valet parking', 'Concierge'],
    deliveryDate: 'Marzo 2025',
    totalUnits: 80,
    availableUnits: 22,
    imageUrl: 'https://images.unsplash.com/photo-1758448500872-0d31e905a9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVudGlhbCUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc1ODg0OTk5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    developer: 'Grupo Urbano',
    status: 'pre-venta',
    zoneInfo: {
      climate: {
        temperature: '16°C - 24°C promedio anual',
        humidity: '65-80% humedad relativa',
        rainfall: '1,000mm precipitación anual',
        season: 'Clima urbano estable'
      },
      geography: {
        elevation: '2,600 metros sobre el nivel del mar',
        terrain: 'Terreno plano urbanizado',
        nearbyLandmarks: ['Plaza de Bolívar', 'Catedral Primada', 'Palacio de Justicia', 'Teatro Colón'],
        naturalFeatures: ['Río San Francisco canalizado', 'Parques urbanos históricos']
      },
      social: {
        population: '120,000 habitantes en el centro',
        demographics: 'Profesionales, artistas y estudiantes universitarios',
        lifestyle: 'Vida urbana cosmopolita con rica oferta cultural',
        community: ['Asociación de comerciantes', 'Grupos culturales', 'Colectivos artísticos', 'Red de emprendedores']
      },
      infrastructure: {
        transportation: ['4 estaciones TransMilenio', 'Sistema de bicicletas públicas', 'Terminal de buses urbanos'],
        healthcare: ['Hospital San Juan de Dios (1km)', 'Clínicas especializadas', 'Centros médicos privados'],
        education: ['Universidad Nacional (2km)', 'Colegios históricos', 'Institutos técnicos', 'Bibliotecas públicas'],
        shopping: ['Centro Comercial Andino', 'Galerías tradicionales', 'Mercado de pulgas', 'Zona Rosa comercial'],
        recreation: ['Zona Rosa nocturna', 'Teatros y museos', 'Parque de la 93', 'Centros culturales']
      }
    }
  },
  {
    id: 'proj-3',
    name: 'Conjunto Residencial Sur',
    description: 'Tranquilo desarrollo familiar con casas y dúplex en zona residencial.',
    location: 'Zona Sur, Ciudad',
    zone: 'Sur',
    amenities: ['Parque infantil', 'Cancha deportiva', 'Área BBQ', 'Sendero peatonal', 'Seguridad'],
    deliveryDate: 'Junio 2024',
    totalUnits: 60,
    availableUnits: 18,
    imageUrl: 'https://images.unsplash.com/photo-1672508061327-6efaa65896e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHJlc2lkZW50aWFsJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzU4OTEzOTk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    developer: 'Familia Constructores',
    status: 'terminado',
    zoneInfo: {
      climate: {
        temperature: '20°C - 28°C promedio anual',
        humidity: '55-70% humedad relativa',
        rainfall: '800mm precipitación anual',
        season: 'Clima cálido y seco'
      },
      geography: {
        elevation: '2,500 metros sobre el nivel del mar',
        terrain: 'Terreno ligeramente ondulado',
        nearbyLandmarks: ['Parque Nacional del Sur', 'Embalse La Regadera', 'Cerro de Guadalupe'],
        naturalFeatures: ['Humedales naturales', 'Reserva de aves', 'Corredores ecológicos']
      },
      social: {
        population: '25,000 habitantes en la zona',
        demographics: 'Familias establecidas con niños y adultos mayores',
        lifestyle: 'Vida familiar tranquila con enfoque en comunidad',
        community: ['Junta de acción comunal', 'Club de madres', 'Liga deportiva amateur', 'Grupo de adulto mayor']
      },
      infrastructure: {
        transportation: ['Ruta alimentadora TransMilenio', 'Transporte público local', 'Cicloruta recreativa'],
        healthcare: ['Hospital del Sur (1.5km)', 'Centro de salud familiar', 'Consultorios médicos locales'],
        education: ['Colegios públicos de calidad', 'Jardines infantiles', 'Centro de formación técnica'],
        shopping: ['Centro comercial familiar', 'Supermercado local', 'Tiendas de barrio', 'Farmacia comunitaria'],
        recreation: ['Polideportivo comunitario', 'Parques vecinales', 'Biblioteca pública', 'Centro comunitario']
      }
    }
  }
];

export const properties: Property[] = [
  // Residencial Vista Verde
  {
    id: 'prop-1',
    title: 'Apartamento Ejecutivo 2 Habitaciones',
    description: 'Moderno apartamento con acabados de lujo y vista a las áreas verdes.',
    price: 185000,
    zone: 'Norte',
    type: 'apartamento',
    bedrooms: 2,
    bathrooms: 2,
    area: 78,
    imageUrl: 'https://images.unsplash.com/photo-1603072845032-7b5bd641a82a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzU4NzkxOTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Cocina integral', 'Closets empotrados', 'Pisos laminados', 'A/C central'],
    status: 'disponible',
    projectId: 'proj-1',
    floor: 5,
    parking: true,
    balcony: true
  },
  {
    id: 'prop-2',
    title: 'Apartamento Familiar 3 Habitaciones',
    description: 'Amplio apartamento ideal para familias con excelente iluminación natural.',
    price: 225000,
    zone: 'Norte',
    type: 'apartamento',
    bedrooms: 3,
    bathrooms: 2,
    area: 95,
    imageUrl: 'https://images.unsplash.com/photo-1603072845032-7b5bd641a82a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzU4NzkxOTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Cocina integral', 'Walk-in closet', 'Balcón privado', 'Zona de lavandería'],
    status: 'disponible',
    projectId: 'proj-1',
    floor: 8,
    parking: true,
    balcony: true
  },
  {
    id: 'prop-3',
    title: 'Penthouse Premium',
    description: 'Exclusivo penthouse con terraza privada y vista panorámica de la ciudad.',
    price: 450000,
    zone: 'Norte',
    type: 'penthouse',
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    imageUrl: 'https://images.unsplash.com/photo-1758448756350-3d0eec02ba37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW50aG91c2UlMjBhcGFydG1lbnQlMjB2aWV3fGVufDF8fHx8MTc1ODkxMzk5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Terraza privada', 'Jacuzzi', 'Cocina gourmet', 'Oficina privada', 'Doble estacionamiento'],
    status: 'disponible',
    projectId: 'proj-1',
    floor: 12,
    parking: true,
    balcony: false,
    garden: true
  },
  
  // Torres del Centro
  {
    id: 'prop-4',
    title: 'Loft Moderno Centro',
    description: 'Elegante loft en el corazón de la ciudad con diseño contemporáneo.',
    price: 280000,
    zone: 'Centro',
    type: 'apartamento',
    bedrooms: 1,
    bathrooms: 1,
    area: 65,
    imageUrl: 'https://images.unsplash.com/photo-1603072845032-7b5bd641a82a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzU4NzkxOTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Techos altos', 'Ventanales panorámicos', 'Cocina americana', 'Smart home'],
    status: 'reservado',
    projectId: 'proj-2',
    floor: 15,
    parking: true,
    balcony: false
  },
  {
    id: 'prop-5',
    title: 'Apartamento Ejecutivo Centro',
    description: 'Apartamento de lujo con todas las comodidades para profesionales.',
    price: 350000,
    zone: 'Centro',
    type: 'apartamento',
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    imageUrl: 'https://images.unsplash.com/photo-1603072845032-7b5bd641a82a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzU4NzkxOTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Automatización', 'Vista a la ciudad', 'Acabados premium', 'Balcón francés'],
    status: 'disponible',
    projectId: 'proj-2',
    floor: 20,
    parking: true,
    balcony: true
  },
  
  // Conjunto Residencial Sur
  {
    id: 'prop-6',
    title: 'Casa Familiar 3 Habitaciones',
    description: 'Cómoda casa con jardín privado en tranquilo conjunto residencial.',
    price: 195000,
    zone: 'Sur',
    type: 'casa',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    imageUrl: 'https://images.unsplash.com/photo-1672508061327-6efaa65896e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHJlc2lkZW50aWFsJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzU4OTEzOTk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Jardín privado', 'Garaje cubierto', 'Zona de lavandería', 'Patio trasero'],
    status: 'disponible',
    projectId: 'proj-3',
    parking: true,
    balcony: false,
    garden: true
  },
  {
    id: 'prop-7',
    title: 'Dúplex Premium Sur',
    description: 'Espacioso dúplex de dos plantas con diseño moderno y funcional.',
    price: 275000,
    zone: 'Sur',
    type: 'duplex',
    bedrooms: 4,
    bathrooms: 3,
    area: 160,
    imageUrl: 'https://images.unsplash.com/photo-1672508061327-6efaa65896e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHJlc2lkZW50aWFsJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzU4OTEzOTk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Doble altura', 'Terraza superior', 'Cocina isla', 'Master suite', 'Doble garaje'],
    status: 'vendido',
    projectId: 'proj-3',
    parking: true,
    balcony: true,
    garden: true
  },
  {
    id: 'prop-8',
    title: 'Casa Compacta 2 Habitaciones',
    description: 'Casa ideal para parejas o pequeñas familias con excelente distribución.',
    price: 155000,
    zone: 'Sur',
    type: 'casa',
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    imageUrl: 'https://images.unsplash.com/photo-1672508061327-6efaa65896e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHJlc2lkZW50aWFsJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzU4OTEzOTk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Patio delantero', 'Cocina integrada', 'Closets empotrados', 'Zona verde común'],
    status: 'disponible',
    projectId: 'proj-3',
    parking: true,
    balcony: false,
    garden: true
  }
];

export const zones = ['Norte', 'Centro', 'Sur'];
export const propertyTypes = ['apartamento', 'casa', 'duplex', 'penthouse'];
export const statusOptions = ['disponible', 'reservado', 'vendido'];