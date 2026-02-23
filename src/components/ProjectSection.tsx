import { Property, Project } from '../types/property';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { PropertyCard } from './PropertyCard';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  MapPin, 
  Thermometer, 
  Mountain, 
  Users, 
  Building2, 
  ArrowRight,
  Calendar,
  Shield
} from 'lucide-react';

interface ProjectSectionProps {
  project: Project;
  properties: Property[];
  onViewProjectDetails: (projectId: string) => void;
  onViewPropertyDetails: (propertyId: string) => void;
}

export function ProjectSection({ 
  project, 
  properties, 
  onViewProjectDetails, 
  onViewPropertyDetails 
}: ProjectSectionProps) {
  const availableProperties = properties.filter(p => p.status === 'disponible');

  return (
    <section className="mb-16">
      {/* Project Header */}
      <Card className="mb-8 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" 
            onClick={() => onViewProjectDetails(project.id)}>
        <div className="relative">
          <ImageWithFallback
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{project.name}</h2>
                <div className="flex items-center text-white/90 mb-2">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{project.location}</span>
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

        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project Description */}
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Entrega: {project.deliveryDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>{project.developer}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{availableProperties.length}</div>
                  <div className="text-sm text-muted-foreground">Disponibles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{project.totalUnits}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
              </div>
            </div>

            {/* Zone Information Preview */}
            <div className="space-y-4">
              <h3 className="font-semibold">Información de la Zona</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Thermometer className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Clima</div>
                    <div className="text-xs text-muted-foreground">
                      {project.zoneInfo.climate.temperature}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mountain className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Geografía</div>
                    <div className="text-xs text-muted-foreground">
                      {project.zoneInfo.geography.elevation}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Comunidad</div>
                    <div className="text-xs text-muted-foreground">
                      {project.zoneInfo.social.population}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Infraestructura</div>
                    <div className="text-xs text-muted-foreground">
                      Excelente conectividad
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewProjectDetails(project.id);
                }}
              >
                Ver Información Completa de la Zona
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      {availableProperties.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">
              Propiedades Disponibles ({availableProperties.length})
            </h3>
          </div>
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
        </div>
      ) : (
        <Card className="p-8 text-center">
          <div className="text-muted-foreground">
            <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No hay propiedades disponibles</h3>
            <p>Todas las unidades de este proyecto han sido vendidas o reservadas.</p>
          </div>
        </Card>
      )}
    </section>
  );
}