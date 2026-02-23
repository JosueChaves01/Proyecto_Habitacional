import { useState, useMemo } from 'react';
import { Project } from '../types/property';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProjectFilters, ProjectFilterOptions } from './ProjectFilters';
import { MapView, MapLocation } from './MapView';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Building, 
  Calendar, 
  Sparkles,
  Users,
  CheckCircle,
  Layers
} from 'lucide-react';

interface AllProjectsViewProps {
  projects: Project[];
  onViewProjectDetails: (projectId: string) => void;
}

export function AllProjectsView({ projects, onViewProjectDetails }: AllProjectsViewProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [filters, setFilters] = useState<ProjectFilterOptions>({
    developerSearch: '',
    status: []
  });

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Developer search filter (case-insensitive partial match)
      if (filters.developerSearch && 
          !project.developer.toLowerCase().includes(filters.developerSearch.toLowerCase())) {
        return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(project.status)) {
        return false;
      }

      return true;
    });
  }, [projects, filters]);

  // Prepare map locations
  const mapLocations: MapLocation[] = useMemo(() => {
    return filteredProjects
      .filter(p => p.coordinates)
      .map(project => ({
        id: project.id,
        name: project.name,
        lat: project.coordinates!.lat,
        lng: project.coordinates!.lng,
        type: 'project' as const
      }));
  }, [filteredProjects]);

  const clearFilters = () => {
    setFilters({
      developerSearch: '',
      status: []
    });
    setSelectedProjectId('');
  };

  const handleMapLocationClick = (location: MapLocation) => {
    setSelectedProjectId(location.id);
    // Scroll to the project card
    const element = document.getElementById(`project-${location.id}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponible':
        return 'bg-green-600 text-white border-green-700 shadow-lg';
      case 'en-construccion':
        return 'bg-blue-600 text-white border-blue-700 shadow-lg';
      case 'pre-venta':
        return 'bg-purple-600 text-white border-purple-700 shadow-lg';
      case 'terminado':
        return 'bg-green-600 text-white border-green-700 shadow-lg';
      default:
        return 'bg-gray-600 text-white border-gray-700 shadow-lg';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'disponible':
        return 'Disponible';
      case 'en-construccion':
        return 'En Construcción';
      case 'pre-venta':
        return 'Pre-venta';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Todos los Proyectos</h1>
              <p className="text-muted-foreground">
                Explora {projects.length} proyectos habitacionales disponibles
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <ProjectFilters
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={clearFilters}
          isOpen={isFiltersOpen}
          onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
        />

        {/* Map View */}
        {mapLocations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <MapView
              locations={mapLocations}
              onLocationClick={handleMapLocationClick}
              selectedId={selectedProjectId}
            />
          </motion.div>
        )}

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredProjects.length} de {projects.length} proyectos
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              id={`project-${project.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`group hover:shadow-xl transition-all duration-300 border-2 overflow-hidden h-full flex flex-col ${
                selectedProjectId === project.id 
                  ? 'border-primary shadow-lg' 
                  : 'border-border/50 hover:border-primary/50'
              }`}>
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className={`${getStatusColor(project.status)} border`}>
                        {getStatusLabel(project.status)}
                      </Badge>
                    </div>

                    {/* Developer Badge */}
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="default" className="bg-primary/95 text-primary-foreground backdrop-blur-sm shadow-lg border-primary">
                        <Building className="h-3 w-3 mr-1" />
                        {project.developer}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{project.name}</h3>
                    
                    <div className="flex items-start gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{project.location}</span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                      {project.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <Users className="h-3 w-3" />
                          <span>Total</span>
                        </div>
                        <p className="font-semibold">{project.totalUnits} unidades</p>
                      </div>
                      <div className="bg-primary/5 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>Disponibles</span>
                        </div>
                        <p className="font-semibold text-primary">{project.availableUnits} unidades</p>
                      </div>
                    </div>

                    {/* Delivery Date */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4" />
                      <span>Entrega: {project.deliveryDate}</span>
                    </div>

                    {/* Amenities Preview */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Sparkles className="h-3 w-3" />
                        <span>Amenidades destacadas</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.amenities.slice(0, 3).map((amenity, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {project.amenities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.amenities.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Button */}
                    <Button
                      onClick={() => onViewProjectDetails(project.id)}
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      variant="outline"
                    >
                      Ver Proyecto Completo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No hay proyectos disponibles</h3>
              <p>No se encontraron proyectos con los filtros seleccionados</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
