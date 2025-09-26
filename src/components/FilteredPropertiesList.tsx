import { Property, Project } from '../types/property';
import { PropertyCard } from './PropertyCard';

interface FilteredPropertiesListProps {
  properties: Property[];
  projects: Project[];
  onViewPropertyDetails: (propertyId: string) => void;
}

export function FilteredPropertiesList({ 
  properties, 
  projects, 
  onViewPropertyDetails 
}: FilteredPropertiesListProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-semibold mb-2">Propiedades Filtradas</h2>
        <p className="text-sm text-muted-foreground">
          Resultados de búsqueda y filtros aplicados
        </p>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => {
          const project = projects.find(p => p.id === property.projectId);
          if (!project) return null; // Skip if project is not found
          
          return (
            <PropertyCard
              key={property.id}
              property={property}
              project={project}
              onViewDetails={onViewPropertyDetails}
            />
          );
        })}
      </div>
    </div>
  );
}