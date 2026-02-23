import { Property, Project, Developer } from '../types/property';

export const projects: Project[] = [
  // Constructora Premium Projects
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
    coordinates: {
      lat: 10.0033,
      lng: -84.1167
    },
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
    id: 'proj-4',
    name: 'Jardines de Lujo Premium',
    description: 'Exclusivo complejo de apartamentos de lujo con jardines botánicos privados y spa de clase mundial.',
    location: 'Zona Norte Elite, Ciudad',
    zone: 'Norte',
    amenities: ['Spa de lujo', 'Jardín botánico', 'Wine cellar', 'Sala de cine privada', 'Heliport', 'Concierge 24/7', 'Piscina infinity'],
    deliveryDate: 'Agosto 2025',
    totalUnits: 85,
    availableUnits: 72,
    imageUrl: 'https://images.unsplash.com/photo-1580041065738-e72023775cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBjb21wbGV4JTIwZ2FyZGVufGVufDF8fHx8MTc1OTQzODU1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    developer: 'Constructora Premium',
    status: 'pre-venta',
    coordinates: {
      lat: 10.0233,
      lng: -84.1467
    },
    zoneInfo: {
      climate: {
        temperature: '17°C - 25°C promedio anual',
        humidity: '65-75% humedad relativa',
        rainfall: '1,100mm precipitación anual',
        season: 'Clima templado de montaña'
      },
      geography: {
        elevation: '2,700 metros sobre el nivel del mar',
        terrain: 'Terreno escarpado con vistas panorámicas',
        nearbyLandmarks: ['Club de Golf El Rincón', 'Reserva Natural La Calera', 'Mirador de los Andes'],
        naturalFeatures: ['Bosque de niebla', 'Cascadas naturales', 'Senderos ecológicos privados']
      },
      social: {
        population: '15,000 habitantes elite',
        demographics: 'Empresarios, diplomáticos y profesionales de alto nivel',
        lifestyle: 'Estilo de vida exclusivo con privacidad y naturaleza',
        community: ['Club privado de golf', 'Asociación de residentes premium', 'Grupo de arte y cultura', 'Club ecuestre exclusivo']
      },
      infrastructure: {
        transportation: ['Heliport privado', 'Vía privada al centro', 'Servicio de transporte ejecutivo'],
        healthcare: ['Clínica premium (1km)', 'Centro médico especializado', 'Servicio médico domiciliario'],
        education: ['Colegio internacional bilingüe', 'Academia de artes', 'Centro de idiomas'],
        shopping: ['Boutiques exclusivas', 'Market gourmet', 'Galería de arte'],
        recreation: ['Club de golf privado', 'Spa y wellness center', 'Centro ecuestre', 'Observatory astronómico']
      }
    }
  },
  {
    id: 'proj-5',
    name: 'EcoVerde Residencial',
    description: 'Primer desarrollo 100% sostenible certificado LEED Platinum con tecnología verde avanzada.',
    location: 'Zona Norte Ecológica, Ciudad',
    zone: 'Norte',
    amenities: ['Paneles solares', 'Huerta comunitaria', 'Centro de reciclaje', 'Bicisendas', 'Lago artificial', 'Área de compostaje', 'Observatorio de aves'],
    deliveryDate: 'Febrero 2026',
    totalUnits: 95,
    availableUnits: 89,
    imageUrl: 'https://images.unsplash.com/photo-1758526116323-b5159ade5bde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjByZXNpZGVudGlhbCUyMGRldmVsb3BtZW50JTIwZ3JlZW4lMjBidWlsZGluZ3xlbnwxfHx8fDE3NTk0Mzg1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    developer: 'Constructora Premium',
    status: 'pre-venta',
    coordinates: {
      lat: 9.9881,
      lng: -84.1067
    },
    zoneInfo: {
      climate: {
        temperature: '19°C - 27°C promedio anual',
        humidity: '55-70% humedad relativa',
        rainfall: '1,300mm precipitación anual',
        season: 'Clima tropical de montaña'
      },
      geography: {
        elevation: '2,580 metros sobre el nivel del mar',
        terrain: 'Valle ecológico con biodiversidad única',
        nearbyLandmarks: ['Reserva Natural Chicaque', 'Parque Ecológico Matarredonda', 'Cerro de Monserrate'],
        naturalFeatures: ['Corredor biológico', 'Humedal natural', 'Bosque de robles nativos', 'Nacimiento de agua']
      },
      social: {
        population: '8,500 habitantes eco-conscientes',
        demographics: 'Familias ambientalistas y profesionales verdes',
        lifestyle: 'Vida sustentable en armonía con la naturaleza',
        community: ['Cooperativa ecológica', 'Grupo de permacultura', 'Club de observación de aves', 'Red de trueque comunitario']
      },
      infrastructure: {
        transportation: ['Transporte eléctrico comunitario', 'Red de ciclorrutas integradas', 'Estación de carga solar'],
        healthcare: ['Centro de medicina natural', 'Clínica holística (2km)', 'Farmacia homeopática'],
        education: ['Escuela ecológica Waldorf', 'Centro de educación ambiental', 'Laboratorio de permacultura'],
        shopping: ['Mercado orgánico local', 'Tienda de productos naturales', 'Cooperative store'],
        recreation: ['Senderos interpretativos', 'Centro de yoga al aire libre', 'Lago de pesca deportiva', 'Camping ecológico']
      }
    }
  },

  // Grupo Urbano Projects
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
    coordinates: {
      lat: 9.9281,
      lng: -84.0907
    },
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
    id: 'proj-6',
    name: 'Skyline Metropolitan',
    description: 'Innovadora torre residencial de 45 pisos con tecnología smart city y vistas de 360° de la ciudad.',
    location: 'Centro Financiero, Ciudad',
    zone: 'Centro',
    amenities: ['Sky lounge', 'Helipuerto', 'Smart home technology', 'Gimnasio high-tech', 'Roof garden', 'Business center', 'Wine cellar'],
    deliveryDate: 'Noviembre 2025',
    totalUnits: 180,
    availableUnits: 165,
    imageUrl: 'https://images.unsplash.com/photo-1746046936854-b3432592b1a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBza3lzY3JhcGVyJTIwcmVzaWRlbnRpYWwlMjB0b3dlcnxlbnwxfHx8fDE3NTk0Mzg1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    developer: 'Grupo Urbano',
    status: 'pre-venta',
    coordinates: {
      lat: 9.9350,
      lng: -84.0850
    },
    zoneInfo: {
      climate: {
        temperature: '15°C - 23°C promedio anual',
        humidity: '70-85% humedad relativa',
        rainfall: '950mm precipitación anual',
        season: 'Clima urbano metropolitano'
      },
      geography: {
        elevation: '2,590 metros sobre el nivel del mar',
        terrain: 'Centro financiero densamente urbanizado',
        nearbyLandmarks: ['World Trade Center', 'Bolsa de Valores', 'Torre Colpatria', 'Edificio Bavaria'],
        naturalFeatures: ['Parques urbanos verticales', 'Jardines en altura']
      },
      social: {
        population: '200,000 trabajadores diurnos, 80,000 residentes',
        demographics: 'Ejecutivos, banqueros, profesionales financieros',
        lifestyle: 'Vida urbana ultra-moderna con enfoque profesional',
        community: ['Club de ejecutivos', 'Asociación financiera', 'Red de networking', 'Grupo de innovación tecnológica']
      },
      infrastructure: {
        transportation: ['6 estaciones TransMilenio conectadas', 'Parking inteligente', 'Helipuerto ejecutivo'],
        healthcare: ['Hospital Militar Central (800m)', 'Clínicas corporativas', 'Centro médico ejecutivo'],
        education: ['Universidad de los Andes (1.5km)', 'Escuelas de negocios', 'Centros de capacitación empresarial'],
        shopping: ['Centro Comercial Gran Estación', 'Zona de Gourmet', 'Almacenes de lujo', 'Distrito financiero'],
        recreation: ['Club deportivo ejecutivo', 'Rooftop restaurants', 'Galerías de arte moderno', 'Teatro mayor']
      }
    }
  },
  {
    id: 'proj-7',
    name: 'Urban Loft District',
    description: 'Complejo de uso mixto con lofts contemporáneos, oficinas co-working y espacios comerciales integrados.',
    location: 'Zona Rosa, Ciudad',
    zone: 'Centro',
    amenities: ['Co-working spaces', 'Café bar', 'Arte galleries', 'Roof terrace', 'Bike storage', 'Pet care center', 'Urban garden'],
    deliveryDate: 'Mayo 2025',
    totalUnits: 110,
    availableUnits: 88,
    imageUrl: 'https://images.unsplash.com/photo-1758750394367-a5f2ff9ba44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBtaXhlZCUyMHVzZSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc1OTQzODU1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    developer: 'Grupo Urbano',
    status: 'en-construccion',
    coordinates: {
      lat: 9.9400,
      lng: -84.0950
    },
    zoneInfo: {
      climate: {
        temperature: '17°C - 25°C promedio anual',
        humidity: '60-75% humedad relativa',
        rainfall: '1,050mm precipitación anual',
        season: 'Clima urbano temperado'
      },
      geography: {
        elevation: '2,610 metros sobre el nivel del mar',
        terrain: 'Distrito creativo en desarrollo',
        nearbyLandmarks: ['Zona Rosa', 'Parque de la 93', 'Centro Andino', 'Museo del Oro'],
        naturalFeatures: ['Parques urbanos lineales', 'Plazoletas con arte urbano']
      },
      social: {
        population: '95,000 habitantes jóvenes y creativos',
        demographics: 'Artistas, diseñadores, emprendedores, millennials',
        lifestyle: 'Vida bohemia urbana con enfoque creativo',
        community: ['Colectivo de artistas', 'Hub de emprendedores', 'Grupo de diseñadores', 'Red de freelancers']
      },
      infrastructure: {
        transportation: ['Estaciones TransMilenio zona rosa', 'Bike sharing stations', 'E-scooter parking'],
        healthcare: ['Clínica del Country (1km)', 'Centro médico especializado', 'Clínicas estéticas'],
        education: ['Escuelas de diseño', 'Academia de artes digitales', 'Centro de idiomas'],
        shopping: ['Boutiques de diseñadores', 'Galerías de arte', 'Mercado gourmet', 'Tiendas vintage'],
        recreation: ['Galerías de arte contemporáneo', 'Bares temáticos', 'Restaurantes fusion', 'Espacios culturales']
      }
    }
  },

  // Familia Constructores Projects
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
    coordinates: {
      lat: 9.8626,
      lng: -83.9191
    },
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
  },
  {
    id: 'proj-8',
    name: 'Villa Familiar Los Cedros',
    description: 'Amplio conjunto cerrado con casas campestres, zonas verdes extensas y ambiente familiar seguro.',
    location: 'Zona Sur Campestre, Ciudad',
    zone: 'Sur',
    amenities: ['Piscina comunitaria', 'Cancha múltiple', 'Salón social', 'Parque de mascotas', 'Huerta comunitaria', 'Senderos ecológicos', 'Portería 24/7'],
    deliveryDate: 'Septiembre 2024',
    totalUnits: 140,
    availableUnits: 87,
    imageUrl: 'https://images.unsplash.com/photo-1758304481190-225844ac82de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBob3VzaW5nJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzU5NDM4NTU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    developer: 'Familia Constructores',
    status: 'en-construccion',
    coordinates: {
      lat: 10.0162,
      lng: -84.2117
    },
    zoneInfo: {
      climate: {
        temperature: '18°C - 26°C promedio anual',
        humidity: '50-65% humedad relativa',
        rainfall: '900mm precipitación anual',
        season: 'Clima campestre agradable'
      },
      geography: {
        elevation: '2,450 metros sobre el nivel del mar',
        terrain: 'Terreno campestre con colinas suaves',
        nearbyLandmarks: ['Parque Simón Bolívar Sur', 'Reserva Natural El Delirio', 'Laguna de Fúquene'],
        naturalFeatures: ['Bosque de eucaliptos', 'Quebrada natural', 'Mirador natural', 'Zona de avistamiento']
      },
      social: {
        population: '12,000 habitantes familiares',
        demographics: 'Familias con niños, parejas jóvenes, abuelos',
        lifestyle: 'Vida campestre familiar con tranquilidad',
        community: ['Asociación de padres', 'Club juvenil', 'Grupo de jardinería', 'Liga de fútbol familiar']
      },
      infrastructure: {
        transportation: ['Ruta escolar', 'Transporte comunitario', 'Acceso pavimentado'],
        healthcare: ['IPS familiar (1km)', 'Droguería comunitaria', 'Puesto de salud'],
        education: ['Colegio campestre Los Cedros', 'Jardín infantil', 'Ludoteca comunitaria'],
        shopping: ['Minimercado interno', 'Panadería artesanal', 'Tienda veterinaria'],
        recreation: ['Canchas deportivas múltiples', 'Zona de camping', 'Área de picnic', 'Biblioteca comunitaria']
      }
    }
  },
  {
    id: 'proj-9',
    name: 'Hogares de Interés Social Esperanza',
    description: 'Proyecto de vivienda digna y accesible para familias trabajadoras con financiación social.',
    location: 'Zona Sur Popular, Ciudad',
    zone: 'Sur',
    amenities: ['Parque infantil', 'Cancha comunitaria', 'Salón comunal', 'Biblioteca', 'Centro de salud', 'Guardería comunitaria'],
    deliveryDate: 'Diciembre 2024',
    totalUnits: 200,
    availableUnits: 156,
    imageUrl: 'https://images.unsplash.com/photo-1504202302068-15fc2055f7f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZmZvcmRhYmxlJTIwaG91c2luZyUyMGNvbXBsZXh8ZW58MXx8fHwxNzU5NDM4NTU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    developer: 'Familia Constructores',
    status: 'en-construccion',
    coordinates: {
      lat: 9.8800,
      lng: -84.1100
    },
    zoneInfo: {
      climate: {
        temperature: '19°C - 27°C promedio anual',
        humidity: '60-75% humedad relativa',
        rainfall: '850mm precipitación anual',
        season: 'Clima urbano cálido'
      },
      geography: {
        elevation: '2,480 metros sobre el nivel del mar',
        terrain: 'Terreno plano ideal para desarrollo',
        nearbyLandmarks: ['Terminal del Sur', 'Centro de Salud del Sur', 'Parque Metropolitano del Sur'],
        naturalFeatures: ['Corredor verde urbano', 'Arborización nativa']
      },
      social: {
        population: '35,000 habitantes trabajadores',
        demographics: 'Familias trabajadoras, empleados, técnicos',
        lifestyle: 'Vida comunitaria solidaria y trabajadora',
        community: ['Cooperativa de ahorro', 'Grupo de madres emprendedoras', 'Liga deportiva comunitaria', 'Comité de convivencia']
      },
      infrastructure: {
        transportation: ['Terminal de transporte Sur', 'Rutas alimentadoras múltiples', 'Paradas de bus cercanas'],
        healthcare: ['Hospital público del Sur (2km)', 'Centro de salud comunitario', 'Puesto de salud interno'],
        education: ['Colegio distrital', 'Jardín infantil público', 'Centro de formación laboral', 'Biblioteca comunitaria'],
        shopping: ['Plaza de mercado popular', 'Supermercado económico', 'Tiendas comunitarias', 'Farmacia popular'],
        recreation: ['Polideportivo público', 'Casa de la cultura', 'Parque comunitario', 'Centro juvenil']
      }
    }
  }
];

export const properties: Property[] = [
  // Residencial Vista Verde (Constructora Premium)
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

  // Jardines de Lujo Premium (Constructora Premium)
  {
    id: 'prop-9',
    title: 'Suite Presidencial',
    description: 'Lujosa suite con jacuzzi privado, vista al jardín botánico y acabados de primera.',
    price: 680000,
    zone: 'Norte',
    type: 'penthouse',
    bedrooms: 3,
    bathrooms: 3,
    area: 220,
    imageUrl: 'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzU5NDIzMzEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Jacuzzi privado', 'Wine cellar personal', 'Domótica avanzada', 'Terraza jardín', 'Butler service'],
    status: 'disponible',
    projectId: 'proj-4',
    floor: 8,
    parking: true,
    balcony: true,
    garden: true
  },
  {
    id: 'prop-10',
    title: 'Apartamento Garden',
    description: 'Exclusivo apartamento con acceso directo al jardín botánico privado.',
    price: 520000,
    zone: 'Norte',
    type: 'apartamento',
    bedrooms: 3,
    bathrooms: 2,
    area: 145,
    imageUrl: 'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzU5NDIzMzEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Acceso jardín privado', 'Pisos de mármol', 'Cocina gourmet', 'Chimenea', 'Terraza cubierta'],
    status: 'disponible',
    projectId: 'proj-4',
    floor: 1,
    parking: true,
    balcony: true,
    garden: true
  },

  // EcoVerde Residencial (Constructora Premium)
  {
    id: 'prop-11',
    title: 'Eco-Apartamento Solar',
    description: 'Apartamento 100% sostenible con paneles solares y sistemas de ahorro energético.',
    price: 240000,
    zone: 'Norte',
    type: 'apartamento',
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    imageUrl: 'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzU5NDIzMzEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Paneles solares', 'Recolección agua lluvia', 'Materiales eco-friendly', 'Huerta en balcón', 'Iluminación LED'],
    status: 'disponible',
    projectId: 'proj-5',
    floor: 4,
    parking: true,
    balcony: true
  },
  {
    id: 'prop-12',
    title: 'Penthouse Ecológico',
    description: 'Penthouse con terraza verde, sistema de compostaje y energía 100% renovable.',
    price: 380000,
    zone: 'Norte',
    type: 'penthouse',
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    imageUrl: 'https://images.unsplash.com/photo-1642976975710-1d8890dbf5ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW50aG91c2UlMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzU5NDM4NTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Terraza verde extensiva', 'Sistema de compostaje', 'Paneles solares', 'Cisterna de lluvia', 'Jardín orgánico'],
    status: 'disponible',
    projectId: 'proj-5',
    floor: 6,
    parking: true,
    balcony: false,
    garden: true
  },
  
  // Torres del Centro (Grupo Urbano)
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

  // Skyline Metropolitan (Grupo Urbano)
  {
    id: 'prop-13',
    title: 'Sky Suite 360°',
    description: 'Suite de lujo en el piso 42 con vistas panorámicas de 360° de la ciudad.',
    price: 720000,
    zone: 'Centro',
    type: 'penthouse',
    bedrooms: 3,
    bathrooms: 3,
    area: 200,
    imageUrl: 'https://images.unsplash.com/photo-1642976975710-1d8890dbf5ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW50aG91c2UlMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzU5NDM4NTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Vista 360°', 'Smart home total', 'Heliport access', 'Wine cellar', 'Terraza sky lounge'],
    status: 'disponible',
    projectId: 'proj-6',
    floor: 42,
    parking: true,
    balcony: true
  },
  {
    id: 'prop-14',
    title: 'Apartamento Smart Tower',
    description: 'Moderno apartamento con tecnología inteligente y vista al distrito financiero.',
    price: 420000,
    zone: 'Centro',
    type: 'apartamento',
    bedrooms: 2,
    bathrooms: 2,
    area: 90,
    imageUrl: 'https://images.unsplash.com/photo-1603621776288-a6a06af35675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1cmJhbiUyMGxvZnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTk0Mzg1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Domótica completa', 'Pisos inteligentes', 'Clima automatizado', 'Seguridad biométrica', 'Vista financiera'],
    status: 'disponible',
    projectId: 'proj-6',
    floor: 25,
    parking: true,
    balcony: true
  },

  // Urban Loft District (Grupo Urbano)
  {
    id: 'prop-15',
    title: 'Loft Artístico',
    description: 'Loft de diseño con espacios amplios ideales para artistas y creativos.',
    price: 290000,
    zone: 'Centro',
    type: 'apartamento',
    bedrooms: 1,
    bathrooms: 1,
    area: 75,
    imageUrl: 'https://images.unsplash.com/photo-1603621776288-a6a06af35675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1cmJhbiUyMGxvZnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTk0Mzg1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Techos altos', 'Espacio de trabajo', 'Iluminación artística', 'Acceso a galería', 'Co-working incluido'],
    status: 'disponible',
    projectId: 'proj-7',
    floor: 3,
    parking: true,
    balcony: false
  },
  {
    id: 'prop-16',
    title: 'Studio Creativo',
    description: 'Compacto studio con diseño funcional perfecto para jóvenes profesionales.',
    price: 180000,
    zone: 'Centro',
    type: 'apartamento',
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    imageUrl: 'https://images.unsplash.com/photo-1633505765486-e404bbbec654?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdHVkaW8lMjBhcGFydG1lbnR8ZW58MXx8fHwxNzU5NDEyMDIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Diseño compacto', 'Mobiliario integrado', 'Internet alta velocidad', 'Zona de café', 'Almacenamiento inteligente'],
    status: 'disponible',
    projectId: 'proj-7',
    floor: 2,
    parking: false,
    balcony: true
  },
  
  // Conjunto Residencial Sur (Familia Constructores)
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
  },

  // Villa Familiar Los Cedros (Familia Constructores)
  {
    id: 'prop-17',
    title: 'Casa Campestre Premium',
    description: 'Hermosa casa campestre con amplios jardines y vista a las montañas.',
    price: 240000,
    zone: 'Sur',
    type: 'casa',
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    imageUrl: 'https://images.unsplash.com/photo-1758687125910-c233b47f47b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBob3VzZSUyMGludGVyaW9yfGVufDF8fHx8MTc1OTQzODU2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Vista montañas', 'Jardín 200m²', 'Kiosco BBQ', 'Chimenea', 'Garaje doble', 'Zona de mascotas'],
    status: 'disponible',
    projectId: 'proj-8',
    parking: true,
    balcony: false,
    garden: true
  },
  {
    id: 'prop-18',
    title: 'Casa Tradicional Familiar',
    description: 'Casa de diseño tradicional con espacios cómodos para toda la familia.',
    price: 185000,
    zone: 'Sur',
    type: 'casa',
    bedrooms: 3,
    bathrooms: 2,
    area: 130,
    imageUrl: 'https://images.unsplash.com/photo-1661099548731-fc8f74fc9dd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjaW91cyUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5NDM4NTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Diseño tradicional', 'Patio central', 'Sala de estar amplia', 'Comedor independiente', 'Estudio'],
    status: 'disponible',
    projectId: 'proj-8',
    parking: true,
    balcony: false,
    garden: true
  },

  // Hogares de Interés Social Esperanza (Familia Constructores)
  {
    id: 'prop-19',
    title: 'Casa VIS 3 Habitaciones',
    description: 'Casa de interés social con excelente distribución y acabados de calidad.',
    price: 95000,
    zone: 'Sur',
    type: 'casa',
    bedrooms: 3,
    bathrooms: 2,
    area: 65,
    imageUrl: 'https://images.unsplash.com/photo-1661099548731-fc8f74fc9dd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjaW91cyUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5NDM4NTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Financiación VIS', 'Cocina integral básica', 'Espacio para ampliación', 'Patio funcional', 'Acabados resistentes'],
    status: 'disponible',
    projectId: 'proj-9',
    parking: true,
    balcony: false,
    garden: true
  },
  {
    id: 'prop-20',
    title: 'Casa VIS 2 Habitaciones',
    description: 'Cómoda casa de interés social ideal para familias pequeñas.',
    price: 85000,
    zone: 'Sur',
    type: 'casa',
    bedrooms: 2,
    bathrooms: 1,
    area: 50,
    imageUrl: 'https://images.unsplash.com/photo-1661099548731-fc8f74fc9dd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjaW91cyUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5NDM4NTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Subsidio de vivienda', 'Diseño funcional', 'Materiales duraderos', 'Espacio optimizado', 'Zona común cercana'],
    status: 'disponible',
    projectId: 'proj-9',
    parking: false,
    balcony: false,
    garden: true
  }
];

export const developers: Developer[] = [
  {
    id: 'dev-1',
    name: 'Constructora Premium',
    description: 'Empresa líder en desarrollo de proyectos residenciales de lujo con más de 20 años de experiencia en el mercado inmobiliario.',
    logoUrl: 'https://images.unsplash.com/photo-1581626216082-f8497d54e0a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBjb21wYW55JTIwbG9nbyUyMGJ1aWxkaW5nfGVufDF8fHx8MTc1OTM5MTYyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    established: '2002',
    specialties: ['Apartamentos de lujo', 'Desarrollos verdes', 'Amenidades premium'],
    totalProjects: 45,
    activeProjects: 8,
    completedProjects: 37,
    experience: '22 años',
    contact: {
      phone: '+57 (1) 555-0123',
      email: 'contacto@constructorapremium.com',
      website: 'www.constructorapremium.com',
      address: 'Av. El Dorado #123-45, Bogotá'
    },
    highlights: [
      'Proyectos sostenibles certificados LEED',
      'Más de 5,000 familias satisfechas',
      'Garantía extendida de 5 años',
      'Financiación directa disponible'
    ]
  },
  {
    id: 'dev-2',
    name: 'Grupo Urbano',
    description: 'Especialistas en desarrollos urbanos modernos que combinan diseño contemporáneo con ubicaciones estratégicas en el centro de la ciudad.',
    logoUrl: 'https://images.unsplash.com/photo-1641060272821-df59e2c0b5ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBmaXJtJTIwb2ZmaWNlfGVufDF8fHx8MTc1OTQzNzU0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    established: '2010',
    specialties: ['Torres residenciales', 'Lofts urbanos', 'Mixed-use developments'],
    totalProjects: 28,
    activeProjects: 5,
    completedProjects: 23,
    experience: '14 años',
    contact: {
      phone: '+57 (1) 555-0456',
      email: 'info@grupourbano.co',
      website: 'www.grupourbano.co',
      address: 'Carrera 11 #93-45, Bogotá'
    },
    highlights: [
      'Pioneros en smart homes en Colombia',
      'Diseño arquitectónico galardonado',
      'Tecnología de automatización incluida',
      'Ubicaciones premium en zona rosa'
    ]
  },
  {
    id: 'dev-3',
    name: 'Familia Constructores',
    description: 'Constructora familiar enfocada en crear hogares accesibles y funcionales para familias colombianas, con énfasis en la calidad y el precio justo.',
    logoUrl: 'https://images.unsplash.com/photo-1708432335606-eeb089345e3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwY29uc3RydWN0aW9uJTIwY29tcGFueXxlbnwxfHx8fDE3NTk0Mzc1NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    established: '1995',
    specialties: ['Casas familiares', 'Conjuntos cerrados', 'Vivienda de interés social'],
    totalProjects: 67,
    activeProjects: 12,
    completedProjects: 55,
    experience: '29 años',
    contact: {
      phone: '+57 (1) 555-0789',
      email: 'ventas@familiaconstructores.com',
      website: 'www.familiaconstructores.com',
      address: 'Calle 26 #68-35, Bogotá'
    },
    highlights: [
      'Más de 8,000 hogares entregados',
      'Planes de financiación flexibles',
      'Acompañamiento post-venta integral',
      'Compromiso social y comunitario'
    ]
  },
  {
    id: 'dev-4',
    name: 'EcoVida Desarrollos',
    description: 'Empresa pionera en construcción sostenible y eco-friendly, especializada en desarrollos que respetan el medio ambiente y promueven la vida saludable.',
    logoUrl: 'https://images.unsplash.com/photo-1701844279504-e3a974aaafb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlY28lMjBjb25zdHJ1Y3Rpb24lMjBjb21wYW55fGVufDF8fHx8MTc1OTQ0NDAwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    established: '2015',
    specialties: ['Edificios eco-friendly', 'Energía solar', 'Construcción verde'],
    totalProjects: 18,
    activeProjects: 4,
    completedProjects: 14,
    experience: '9 años',
    contact: {
      phone: '+57 (1) 555-0321',
      email: 'contacto@ecovidadesarrollos.com',
      website: 'www.ecovidadesarrollos.com',
      address: 'Calle 72 #10-45, Bogotá'
    },
    highlights: [
      'Certificación LEED Platinum',
      'Reducción del 40% en consumo energético',
      'Materiales 100% sostenibles',
      'Bienestar y salud de los residentes'
    ]
  },
  {
    id: 'dev-5',
    name: 'Élite Residencial',
    description: 'Desarrolladora boutique especializada en proyectos residenciales de ultra-lujo con servicios personalizados y atención exclusiva para clientes VIP.',
    logoUrl: 'https://images.unsplash.com/photo-1757924330358-a48d65664dac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlJTIwZGV2ZWxvcGVyfGVufDF8fHx8MTc1OTQ0NDAwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    established: '2008',
    specialties: ['Penthouses exclusivos', 'Servicios de concierge', 'Desarrollos boutique'],
    totalProjects: 12,
    activeProjects: 3,
    completedProjects: 9,
    experience: '16 años',
    contact: {
      phone: '+57 (1) 555-0654',
      email: 'vip@eliteresidencial.com',
      website: 'www.eliteresidencial.com',
      address: 'Av. 82 #11-45, Bogotá'
    },
    highlights: [
      'Servicio concierge 24/7',
      'Acabados importados de Europa',
      'Máximo 20 unidades por proyecto',
      'Asesoría personalizada VIP'
    ]
  }
];

export const zones = ['Norte', 'Centro', 'Sur'];
export const propertyTypes = ['apartamento', 'casa', 'duplex', 'penthouse'];
export const statusOptions = ['disponible', 'reservado', 'vendido'];