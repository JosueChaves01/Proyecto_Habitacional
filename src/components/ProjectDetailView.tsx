import { Project, Property } from '../types/property';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { PropertyCard } from './PropertyCard';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProjectAreaMap } from './ProjectAreaMap';
import { 
  ArrowLeft,
  MapPin, 
  Calendar,
  Users,
  Shield,
  Building2,
  Thermometer,
  Droplets,
  Cloud,
  Sun,
  Mountain,
  MapIcon,
  TreePine,
  Heart,
  GraduationCap,
  ShoppingBag,
  Car,
  Stethoscope,
  Dumbbell
} from 'lucide-react';

interface ProjectDetailViewProps {
  project: Project;
  properties: Property[];
  onBack: () => void;
  onViewPropertyDetails: (propertyId: string) => void;
}

export function ProjectDetailView({ 
  project, 
  properties, 
  onBack, 
  onViewPropertyDetails 
}: ProjectDetailViewProps) {
  const availableProperties = properties.filter(p => p.status === 'disponible');
  const reservedProperties = properties.filter(p => p.status === 'reservado');
  const soldProperties = properties.filter(p => p.status === 'vendido');

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver al Catálogo
        </Button>
      </div>

      {/* Project Hero */}
      <Card className="overflow-hidden">
        <div className="relative">
          <ImageWithFallback
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{project.name}</h1>
                <div className="flex items-center text-white/90 mb-2">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-xl">{project.location}</span>
                </div>
              </div>
              <Badge 
                className={
                  project.status === 'terminado' 
                    ? 'bg-green-600 text-white shadow-lg border-green-700' 
                    : project.status === 'en-construccion'
                    ? 'bg-blue-600 text-white shadow-lg border-blue-700'
                    : 'bg-purple-600 text-white shadow-lg border-purple-700'
                }
              >
                {project.status === 'terminado' 
                  ? 'Terminado' 
                  : project.status === 'en-construccion'
                  ? 'En Construcción'
                  : 'Pre-venta'}
              </Badge>
            </div>
          </div>
        </div>

        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {project.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{project.totalUnits}</div>
                  <div className="text-sm text-muted-foreground">Total Unidades</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{availableProperties.length}</div>
                  <div className="text-sm text-muted-foreground">Disponibles</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{reservedProperties.length}</div>
                  <div className="text-sm text-muted-foreground">Reservadas</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{soldProperties.length}</div>
                  <div className="text-sm text-muted-foreground">Vendidas</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>Entrega: {project.deliveryDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span>{project.developer}</span>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Amenidades</h4>
                <div className="space-y-1">
                  {project.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zone Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Climate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-primary" />
              Información Climática
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-orange-500" />
                <div>
                  <div className="font-medium text-sm">Temperatura</div>
                  <div className="text-xs text-muted-foreground">{project.zoneInfo.climate.temperature}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="font-medium text-sm">Humedad</div>
                  <div className="text-xs text-muted-foreground">{project.zoneInfo.climate.humidity}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="font-medium text-sm">Precipitación</div>
                  <div className="text-xs text-muted-foreground">{project.zoneInfo.climate.rainfall}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-yellow-500" />
                <div>
                  <div className="font-medium text-sm">Estación</div>
                  <div className="text-xs text-muted-foreground">{project.zoneInfo.climate.season}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Geography */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mountain className="h-5 w-5 text-primary" />
              Geografía y Ubicación
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{project.zoneInfo.geography.elevation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mountain className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{project.zoneInfo.geography.terrain}</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Puntos de Referencia</h4>
              <div className="space-y-1">
                {project.zoneInfo.geography.nearbyLandmarks.map((landmark, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                    {landmark}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Características Naturales</h4>
              <div className="space-y-1">
                {project.zoneInfo.geography.naturalFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <TreePine className="h-3 w-3 text-green-600 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Social and Infrastructure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Social */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Información Social y Comunitaria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{project.zoneInfo.social.population}</span>
              </div>
              <p className="text-sm text-muted-foreground">{project.zoneInfo.social.demographics}</p>
              <p className="text-sm text-muted-foreground">{project.zoneInfo.social.lifestyle}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Organizaciones Comunitarias</h4>
              <div className="space-y-1">
                {project.zoneInfo.social.community.map((org, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                    {org}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Infrastructure */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Infraestructura y Servicios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Transporte
                </h4>
                <div className="space-y-1">
                  {project.zoneInfo.infrastructure.transportation.map((transport, index) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                      {transport}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Stethoscope className="h-4 w-4" />
                  Salud
                </h4>
                <div className="space-y-1">
                  {project.zoneInfo.infrastructure.healthcare.map((health, index) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                      {health}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Educación
                </h4>
                <div className="space-y-1">
                  {project.zoneInfo.infrastructure.education.map((edu, index) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                      {edu}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Comercio
                </h4>
                <div className="space-y-1">
                  {project.zoneInfo.infrastructure.shopping.map((shop, index) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                      {shop}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Dumbbell className="h-4 w-4" />
                  Recreación
                </h4>
                <div className="space-y-1">
                  {project.zoneInfo.infrastructure.recreation.map((rec, index) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map - Show project area if available */}
      {(project.projectArea && project.projectArea.length >= 3) || project.coordinates ? (
        <ProjectAreaMap
          projectName={project.name}
          center={project.coordinates}
          projectArea={project.projectArea}
          showTitle={true}
          height="500px"
        />
      ) : null}

      {/* Available Properties */}
      {availableProperties.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Propiedades Disponibles ({availableProperties.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  project={project}
                  onViewDetails={onViewPropertyDetails}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}