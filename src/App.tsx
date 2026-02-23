import { useState, useMemo, useEffect } from 'react';
import { Property, Project, FilterOptions, Developer } from './types/property';
import { properties, projects, developers } from './data/mockData';
import { GoogleMapsProvider } from './components/GoogleMapsProvider';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PropertyFilters } from './components/PropertyFilters';
import { PropertyDetail } from './components/PropertyDetail';
import { ProjectSection } from './components/ProjectSection';
import { ProjectDetailView } from './components/ProjectDetailView';
import { FilteredPropertiesList } from './components/FilteredPropertiesList';
import { HomePage } from './components/HomePage';
import { AllProjectsView } from './components/AllProjectsView';
import { AllPropertiesView } from './components/AllPropertiesView';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { AdminAuth } from './components/AdminAuth';
import { AdminDashboard } from './components/AdminDashboard';
import ProjectKickoff from './components/ProjectKickoff';
import { Search } from 'lucide-react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

type ViewMode = 'home' | 'catalog' | 'property-detail' | 'project-detail' | 'all-projects' | 'all-properties' | 'about' | 'contact' | 'admin-dashboard' | 'kickoff';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedDeveloperId, setSelectedDeveloperId] = useState<string | null>(null);
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

  // Auth state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string; userId: string } | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const sessionData = localStorage.getItem('adminSession');
    if (sessionData) {
      const session = JSON.parse(sessionData);
      setCurrentUser(session);
      setIsAuthenticated(true);
    }
  }, []);

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

  // Filter properties by selected developer (if any)
  const developerProjects = useMemo(() => {
    if (!selectedDeveloperId) return projects;
    return projects.filter(project => {
      const developer = developers.find(dev => dev.id === selectedDeveloperId);
      return developer && project.developer === developer.name;
    });
  }, [selectedDeveloperId]);

  const developerProperties = useMemo(() => {
    if (!selectedDeveloperId) return properties;
    const projectIds = developerProjects.map(project => project.id);
    return properties.filter(property => projectIds.includes(property.projectId));
  }, [selectedDeveloperId, developerProjects]);

  // Apply filters to properties
  const filteredProperties = useMemo(() => {
    return developerProperties.filter((property) => {
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
  }, [filters, searchTerm, developerProperties]);

  // Group properties by project (only when no filters are active)
  const filteredProjectsWithProperties = useMemo(() => {
    if (hasActiveFilters) {
      return [];
    }

    // Group properties by project when no filters are active
    return developerProjects.map(project => {
      const projectProperties = developerProperties.filter(prop => prop.projectId === project.id);
      return {
        project,
        properties: projectProperties
      };
    }).filter(item => item.properties.length > 0);
  }, [hasActiveFilters, developerProjects, developerProperties]);

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

  const handleSelectDeveloper = (developerId: string) => {
    setSelectedDeveloperId(developerId);
    setCurrentView('catalog');
    // Reset filters when switching developers
    clearFilters();
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedDeveloperId(null);
    setSelectedPropertyId(null);
    setSelectedProjectId(null);
    clearFilters();
  };

  const handleBackToCatalog = () => {
    setCurrentView('catalog');
    setSelectedPropertyId(null);
    setSelectedProjectId(null);
  };

  const handleNavigateToAllProjects = () => {
    setCurrentView('all-projects');
    setSelectedDeveloperId(null);
    setSelectedPropertyId(null);
    setSelectedProjectId(null);
    clearFilters();
  };

  const handleNavigateToAllProperties = () => {
    setCurrentView('all-properties');
    setSelectedDeveloperId(null);
    setSelectedPropertyId(null);
    setSelectedProjectId(null);
    clearFilters();
  };

  const handleNavigateToAbout = () => {
    setCurrentView('about');
    setSelectedDeveloperId(null);
    setSelectedPropertyId(null);
    setSelectedProjectId(null);
    clearFilters();
  };

  const handleNavigateToContact = () => {
    setCurrentView('contact');
    setSelectedDeveloperId(null);
    setSelectedPropertyId(null);
    setSelectedProjectId(null);
    clearFilters();
  };

  const handleNavigateToKickoff = () => {
    setCurrentView('kickoff');
    setSelectedDeveloperId(null);
    setSelectedPropertyId(null);
    setSelectedProjectId(null);
    clearFilters();
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

  // Auth handlers
  const handleLoginClick = () => {
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (userData: { email: string; name: string; userId: string }) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('adminSession', JSON.stringify(userData));
    setIsAuthOpen(false);
    setCurrentView('admin-dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminSession');
    setCurrentView('home');
  };

  const handleNavigateToAdminDashboard = () => {
    if (isAuthenticated) {
      setCurrentView('admin-dashboard');
    } else {
      setIsAuthOpen(true);
    }
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

  const selectedDeveloper = selectedDeveloperId 
    ? developers.find(d => d.id === selectedDeveloperId)
    : null;

  // Admin Dashboard View
  if (currentView === 'admin-dashboard' && isAuthenticated && currentUser) {
    return (
      <GoogleMapsProvider>
        <AdminDashboard 
          userId={currentUser.userId}
          userName={currentUser.name}
          onBack={handleBackToHome}
          onNavigateToKickoff={handleNavigateToKickoff}
        />
        <AdminAuth
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </GoogleMapsProvider>
    );
  }

  if (currentView === 'kickoff') {
    return <ProjectKickoff onBack={() => setCurrentView('admin-dashboard')} />;
  }

  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar 
          currentPage="home"
          onNavigateHome={handleBackToHome}
          onNavigateProjects={handleNavigateToAllProjects}
          onNavigateProperties={handleNavigateToAllProperties}
          onLoginClick={handleLoginClick}
          isAuthenticated={isAuthenticated}
          userName={currentUser?.name}
          onLogout={handleLogout}
          onNavigateToDashboard={handleNavigateToAdminDashboard}
          onNavigateToKickoff={handleNavigateToKickoff}
        />
        <HomePage onSelectDeveloper={handleSelectDeveloper} />
        <Footer 
          onNavigateHome={handleBackToHome}
          onNavigateProjects={handleNavigateToAllProjects}
          onNavigateProperties={handleNavigateToAllProperties}
          onNavigateAbout={handleNavigateToAbout}
          onNavigateContact={handleNavigateToContact}
        />
        <AdminAuth
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  if (currentView === 'about') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar 
          currentPage="about"
          onNavigateHome={handleBackToHome}
          onNavigateProjects={handleNavigateToAllProjects}
          onNavigateProperties={handleNavigateToAllProperties}
          onLoginClick={handleLoginClick}
          isAuthenticated={isAuthenticated}
          userName={currentUser?.name}
          onLogout={handleLogout}
          onNavigateToDashboard={handleNavigateToAdminDashboard}
          onNavigateToKickoff={handleNavigateToKickoff}
        />
        <AboutPage />
        <Footer 
          onNavigateHome={handleBackToHome}
          onNavigateProjects={handleNavigateToAllProjects}
          onNavigateProperties={handleNavigateToAllProperties}
          onNavigateAbout={handleNavigateToAbout}
          onNavigateContact={handleNavigateToContact}
        />
        <AdminAuth
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  if (currentView === 'contact') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar 
          currentPage="contact"
          onNavigateHome={handleBackToHome}
          onNavigateProjects={handleNavigateToAllProjects}
          onNavigateProperties={handleNavigateToAllProperties}
          onLoginClick={handleLoginClick}
          isAuthenticated={isAuthenticated}
          userName={currentUser?.name}
          onLogout={handleLogout}
          onNavigateToDashboard={handleNavigateToAdminDashboard}
          onNavigateToKickoff={handleNavigateToKickoff}
        />
        <ContactPage />
        <Footer 
          onNavigateHome={handleBackToHome}
          onNavigateProjects={handleNavigateToAllProjects}
          onNavigateProperties={handleNavigateToAllProperties}
          onNavigateAbout={handleNavigateToAbout}
          onNavigateContact={handleNavigateToContact}
        />
        <AdminAuth
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  if (currentView === 'all-projects') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar 
          currentPage="all-projects"
          onNavigateHome={handleBackToHome}
          onNavigateProjects={handleNavigateToAllProjects}
          onNavigateProperties={handleNavigateToAllProperties}
          onLoginClick={handleLoginClick}
          isAuthenticated={isAuthenticated}
          userName={currentUser?.name}
          onLogout={handleLogout}
          onNavigateToDashboard={handleNavigateToAdminDashboard}
          onNavigateToKickoff={handleNavigateToKickoff}
        />
        <AllProjectsView 
          projects={projects}
          onViewProjectDetails={handleViewProjectDetails}
        />
        <Footer 
          onNavigateHome={handleBackToHome}
          onNavigateProjects={handleNavigateToAllProjects}
          onNavigateProperties={handleNavigateToAllProperties}
          onNavigateAbout={handleNavigateToAbout}
          onNavigateContact={handleNavigateToContact}
        />
        <AdminAuth
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  if (currentView === 'all-properties') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar 
          currentPage="all-properties"
          onNavigateHome={handleBackToHome}
          onNavigateProjects={handleNavigateToAllProjects}
          onNavigateProperties={handleNavigateToAllProperties}
          onLoginClick={handleLoginClick}
          isAuthenticated={isAuthenticated}
          userName={currentUser?.name}
          onLogout={handleLogout}
          onNavigateToDashboard={handleNavigateToAdminDashboard}
          onNavigateToKickoff={handleNavigateToKickoff}
        />
        <AllPropertiesView 
          properties={properties}
          projects={projects}
          onViewPropertyDetails={handleViewPropertyDetails}
        />
        <Footer 
          onNavigateHome={handleBackToHome}
          onNavigateProjects={handleNavigateToAllProjects}
          onNavigateProperties={handleNavigateToAllProperties}
          onNavigateAbout={handleNavigateToAbout}
          onNavigateContact={handleNavigateToContact}
        />
        <AdminAuth
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  if (currentView === 'property-detail' && selectedProperty && selectedProject) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar 
          currentPage="detail"
          onNavigateHome={handleBackToHome}
          onNavigateProjects={handleNavigateToAllProjects}
          onNavigateProperties={handleNavigateToAllProperties}
          onLoginClick={handleLoginClick}
          isAuthenticated={isAuthenticated}
          userName={currentUser?.name}
          onLogout={handleLogout}
          onNavigateToDashboard={handleNavigateToAdminDashboard}
          onNavigateToKickoff={handleNavigateToKickoff}
        />
        <PropertyDetail 
          property={selectedProperty} 
          project={selectedProject}
          onBack={handleBackToCatalog}
        />
        <Footer 
          onNavigateHome={handleBackToHome}
          onNavigateProjects={handleNavigateToAllProjects}
          onNavigateProperties={handleNavigateToAllProperties}
          onNavigateAbout={handleNavigateToAbout}
          onNavigateContact={handleNavigateToContact}
        />
        <AdminAuth
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  if (currentView === 'project-detail' && selectedProject) {
    const projectProperties = properties.filter(p => p.projectId === selectedProject.id);
    return (
      <GoogleMapsProvider>
        <div className="min-h-screen bg-background flex flex-col">
          <Navbar 
            currentPage="project-detail"
            onNavigateHome={handleBackToHome}
            onNavigateProjects={handleNavigateToAllProjects}
            onNavigateProperties={handleNavigateToAllProperties}
            onLoginClick={handleLoginClick}
            isAuthenticated={isAuthenticated}
            userName={currentUser?.name}
            onLogout={handleLogout}
            onNavigateToDashboard={handleNavigateToAdminDashboard}
            onNavigateToKickoff={handleNavigateToKickoff}
          />
          <ProjectDetailView 
            project={selectedProject}
            properties={projectProperties}
            onBack={handleBackToCatalog}
            onViewPropertyDetails={handleViewPropertyDetails}
          />
          <Footer 
            onNavigateHome={handleBackToHome}
            onNavigateProjects={handleNavigateToAllProjects}
            onNavigateProperties={handleNavigateToAllProperties}
            onNavigateAbout={handleNavigateToAbout}
            onNavigateContact={handleNavigateToContact}
          />
          <AdminAuth
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      </GoogleMapsProvider>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar 
        currentPage="catalog"
        onNavigateHome={handleBackToHome}
        onNavigateProjects={handleNavigateToAllProjects}
        onNavigateProperties={handleNavigateToAllProperties}
        onLoginClick={handleLoginClick}
        isAuthenticated={isAuthenticated}
        userName={currentUser?.name}
        onLogout={handleLogout}
        onNavigateToDashboard={handleNavigateToAdminDashboard}
        onNavigateToKickoff={handleNavigateToKickoff}
      />
      
      <div className="max-w-7xl mx-auto p-4 flex-1">
        {/* Header */}
        <div className="mb-8">
          {selectedDeveloper ? (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Button 
                  variant="outline" 
                  onClick={handleBackToHome}
                  className="mb-2"
                >
                  ← Volver a Desarrolladoras
                </Button>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={selectedDeveloper.logoUrl}
                    alt={`Logo de ${selectedDeveloper.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{selectedDeveloper.name}</h1>
                  <p className="text-muted-foreground">
                    {selectedDeveloper.description}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold mb-2">Catálogo de Propiedades</h1>
              <p className="text-muted-foreground">
                Encuentra la propiedad ideal en nuestros desarrollos habitacionales
              </p>
            </div>
          )}
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

      <Footer 
        onNavigateHome={handleBackToHome}
        onNavigateProjects={handleNavigateToAllProjects}
        onNavigateProperties={handleNavigateToAllProperties}
        onNavigateAbout={handleNavigateToAbout}
        onNavigateContact={handleNavigateToContact}
      />
      <AdminAuth
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}