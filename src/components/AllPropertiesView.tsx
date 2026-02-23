import { useState, useMemo } from 'react';
import { Property, Project, FilterOptions } from '../types/property';
import { PropertyCard } from './PropertyCard';
import { PropertyFilters } from './PropertyFilters';
import { MapView, MapLocation } from './MapView';
import { motion } from 'motion/react';
import { Building } from 'lucide-react';

interface AllPropertiesViewProps {
  properties: Property[];
  projects: Project[];
  onViewPropertyDetails: (propertyId: string) => void;
}

export function AllPropertiesView({ properties, projects, onViewPropertyDetails }: AllPropertiesViewProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  const [filters, setFilters] = useState<FilterOptions>({
    zone: [],
    priceRange: [100000, 800000],
    type: [],
    bedrooms: [],
    minArea: 0,
    maxArea: 1000,
    status: []
  });

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Price filter
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
        return false;
      }

      // Type filter
      if (filters.type.length > 0 && !filters.type.includes(property.type)) {
        return false;
      }

      // Bedrooms filter
      if (filters.bedrooms.length > 0 && !filters.bedrooms.includes(property.bedrooms)) {
        return false;
      }

      // Area filter
      if (property.area < filters.minArea || property.area > filters.maxArea) {
        return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(property.status)) {
        return false;
      }

      return true;
    });
  }, [properties, filters]);

  // Prepare map locations - show individual properties
  const mapLocations: MapLocation[] = useMemo(() => {
    // Group properties by project to assign unique coordinates
    const propertiesByProject = new Map<string, Property[]>();
    
    filteredProperties.forEach(property => {
      const existing = propertiesByProject.get(property.projectId) || [];
      existing.push(property);
      propertiesByProject.set(property.projectId, existing);
    });
    
    return filteredProperties.map(property => {
      const project = projects.find(p => p.id === property.projectId);
      
      // Use property coordinates if available
      if (property.coordinates) {
        return {
          id: property.id,
          name: property.title,
          lat: property.coordinates.lat,
          lng: property.coordinates.lng,
          type: 'property' as const
        };
      }
      
      // Otherwise, generate unique coordinates based on project location
      if (project?.coordinates) {
        const projectProperties = propertiesByProject.get(property.projectId) || [];
        const propertyIndex = projectProperties.findIndex(p => p.id === property.id);
        
        // Create a small offset for each property in a circular pattern
        const angle = (propertyIndex / projectProperties.length) * 2 * Math.PI;
        const radius = 0.001; // About 100 meters
        const latOffset = Math.cos(angle) * radius;
        const lngOffset = Math.sin(angle) * radius;
        
        return {
          id: property.id,
          name: property.title,
          lat: project.coordinates.lat + latOffset,
          lng: project.coordinates.lng + lngOffset,
          type: 'property' as const
        };
      }
      
      return null;
    }).filter((location): location is MapLocation => location !== null);
  }, [filteredProperties, projects]);

  const clearFilters = () => {
    setFilters({
      zone: [],
      priceRange: [100000, 800000],
      type: [],
      bedrooms: [],
      minArea: 0,
      maxArea: 1000,
      status: []
    });
    setSelectedPropertyId('');
  };

  const handleMapLocationClick = (location: MapLocation) => {
    setSelectedPropertyId(location.id);
    // Scroll to the property card
    const element = document.getElementById(`property-${location.id}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
              <Building className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Todas las Propiedades</h1>
              <p className="text-muted-foreground">
                Explora {properties.length} propiedades disponibles en todos nuestros proyectos
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <PropertyFilters
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
              selectedId={selectedPropertyId}
            />
          </motion.div>
        )}

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredProperties.length} de {properties.length} propiedades
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property, index) => {
            const project = projects.find(p => p.id === property.projectId);
            return (
              <motion.div
                key={property.id}
                id={`property-${property.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={selectedPropertyId === property.id ? 'ring-2 ring-primary rounded-lg' : ''}
              >
                <PropertyCard
                  property={property}
                  project={project}
                  onViewDetails={onViewPropertyDetails}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No hay propiedades disponibles</h3>
              <p>No se encontraron propiedades con los filtros seleccionados</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
