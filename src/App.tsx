import { useState, useMemo } from 'react';
import { Property, Project, FilterOptions } from './types/property';
import { properties, projects } from './data/mockData';
import { Navbar } from './components/Navbar';
import { PropertyFilters } from './components/PropertyFilters';
import { PropertyDetail } from './components/PropertyDetail';
import { ProjectSection } from './components/ProjectSection';
import { ProjectDetailView } from './components/ProjectDetailView';
import { FilteredPropertiesList } from './components/FilteredPropertiesList';
import { Search } from 'lucide-react';
import { Input } from './components/ui/input';

type ViewMode = 'catalog' | 'property-detail' | 'project-detail';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('catalog');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    zone: [],
    priceRange: [100000, 500000],
    type: [],
    bedrooms: [],
    minArea: 0,
    maxArea: 1000,
    status: []
  });

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    const defaultFilters: FilterOptions = {
      zone: [],
      priceRange: [100000, 500000],
      type: [],
      bedrooms: [],
      minArea: 0,
      maxArea: 1000,
      status: []
    };

    return (
      searchTerm.trim() !== '' ||
      filters.zone.length > 0 ||
      filters.priceRange[0] !== defaultFilters.priceRange[0] ||
      filters.priceRange[1] !== defaultFilters.priceRange[1] ||
      filters.type.length > 0 ||
      filters.bedrooms.length > 0 ||
      filters.minArea !== defaultFilters.minArea ||
      filters.maxArea !== defaultFilters.maxArea ||
      filters.status.length > 0
    );
  }, [filters, searchTerm]);

  // Apply filters to properties
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Search term filter
      if (searchTerm && !property.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !property.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Zone filter
      if (filters.zone.length > 0 && !filters.zone.includes(property.zone)) {
        return false;
      }

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
  }, [filters, searchTerm]);

  // Group properties by project (only when no filters are active)
  const filteredProjectsWithProperties = useMemo(() => {
    if (hasActiveFilters) {
      return [];
    }

    // Group properties by project when no filters are active
    return projects.map(project => {
      const projectProperties = properties.filter(prop => prop.projectId === project.id);
      return {
        project,
        properties: projectProperties
      };
    }).filter(item => item.properties.length > 0);
  }, [hasActiveFilters]);

  const totalFilteredProperties = useMemo(() => {
    if (hasActiveFilters) {
      return filteredProperties.length;
    }
    return filteredProjectsWithProperties.reduce((total, item) => total + item.properties.length, 0);
  }, [filteredProjectsWithProperties, filteredProperties, hasActiveFilters]);

  const handleViewPropertyDetails = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setCurrentView('property-detail');
  };

  const handleViewProjectDetails = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentView('project-detail');
  };

  const handleBackToCatalog = () => {
    setCurrentView('catalog');
    setSelectedPropertyId(null);
    setSelectedProjectId(null);
  };

  const clearFilters = () => {
    setFilters({
      zone: [],
      priceRange: [100000, 500000],
      type: [],
      bedrooms: [],
      minArea: 0,
      maxArea: 1000,
      status: []
    });
    setSearchTerm('');
  };

  // Get selected items
  const selectedProperty = selectedPropertyId 
    ? properties.find(p => p.id === selectedPropertyId)
    : null;
  const selectedProject = selectedProperty 
    ? projects.find(p => p.id === selectedProperty.projectId)
    : selectedProjectId 
    ? projects.find(p => p.id === selectedProjectId)
    : null;

  if (currentView === 'property-detail' && selectedProperty && selectedProject) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar currentPage="detail" />
        <PropertyDetail 
          property={selectedProperty} 
          project={selectedProject}
          onBack={handleBackToCatalog}
        />
      </div>
    );
  }

  if (currentView === 'project-detail' && selectedProject) {
    const projectProperties = properties.filter(p => p.projectId === selectedProject.id);
    return (
      <div className="min-h-screen bg-background">
        <Navbar currentPage="project-detail" />
        <ProjectDetailView 
          project={selectedProject}
          properties={projectProperties}
          onBack={handleBackToCatalog}
          onViewPropertyDetails={handleViewPropertyDetails}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage="home" />
      
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Catálogo de Propiedades</h1>
          <p className="text-muted-foreground">
            Encuentra la propiedad ideal en nuestros desarrollos habitacionales
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar propiedades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <PropertyFilters
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={clearFilters}
          isOpen={isFiltersOpen}
          onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
        />

        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground">
            {hasActiveFilters ? (
              `Mostrando ${totalFilteredProperties} propiedades filtradas`
            ) : (
              `Mostrando ${totalFilteredProperties} propiedades en ${filteredProjectsWithProperties.length} proyectos`
            )}
          </p>
        </div>

        {/* Content */}
        {totalFilteredProperties === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No se encontraron propiedades</h3>
              <p>Intenta ajustar los filtros o el término de búsqueda</p>
            </div>
          </div>
        ) : hasActiveFilters ? (
          /* Filtered Properties List */
          <FilteredPropertiesList
            properties={filteredProperties}
            projects={projects}
            onViewPropertyDetails={handleViewPropertyDetails}
          />
        ) : (
          /* Project Sections */
          <div className="space-y-16">
            {filteredProjectsWithProperties.map(({ project, properties: projectProperties }) => (
              <ProjectSection
                key={project.id}
                project={project}
                properties={projectProperties}
                onViewProjectDetails={handleViewProjectDetails}
                onViewPropertyDetails={handleViewPropertyDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}