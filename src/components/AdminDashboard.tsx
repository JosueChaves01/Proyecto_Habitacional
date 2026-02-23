import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CompanyRegistration } from './CompanyRegistration';
import { ProjectForm } from './ProjectForm';
import { CompanyLocationPreview } from './CompanyLocationPreview';
import { ProjectAreaMap } from './ProjectAreaMap';
import { Building2, Plus, Home, Layers, BarChart3, ArrowLeft, Calendar, MapPin, Rocket } from 'lucide-react';
import { Developer, Project } from '../types/property';
import { Alert, AlertDescription } from './ui/alert';

interface AdminDashboardProps {
  userId: string;
  userName: string;
  onBack: () => void;
  onNavigateToKickoff?: () => void;
}

export function AdminDashboard({ userId, userName, onBack, onNavigateToKickoff }: AdminDashboardProps) {
  const [company, setCompany] = useState<Developer | null>(null);
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [view, setView] = useState<'overview' | 'company' | 'pre-venta' | 'construccion' | 'terminados' | 'add-project'>('overview');
  const [userProjects, setUserProjects] = useState<Project[]>([]);

  // Load company data on mount
  useEffect(() => {
    const companiesData = localStorage.getItem('companies');
    if (companiesData) {
      const companies: Developer[] = JSON.parse(companiesData);
      const userCompany = companies.find(c => c.userId === userId);
      if (userCompany) {
        setCompany(userCompany);
      } else {
        setShowCompanyForm(true);
      }
    } else {
      setShowCompanyForm(true);
    }

    // Load user projects
    const projectsData = localStorage.getItem('userProjects');
    if (projectsData) {
      const allProjects = JSON.parse(projectsData);
      const companyProjects = allProjects.filter((p: any) => p.companyId === company?.id);
      setUserProjects(companyProjects);
    }
  }, [userId, company?.id]);

  const handleCompanyRegistered = (newCompany: Developer) => {
    setCompany(newCompany);
    setShowCompanyForm(false);
    setView('overview');
  };

  const handleProjectCreated = (newProject: Project) => {
    setUserProjects(prev => [...prev, newProject]);
    
    // Update company active projects count
    if (company) {
      const updatedCompany = {
        ...company,
        activeProjects: company.activeProjects + 1
      };
      setCompany(updatedCompany);
      
      // Update in localStorage
      const companiesData = localStorage.getItem('companies');
      if (companiesData) {
        const companies: Developer[] = JSON.parse(companiesData);
        const index = companies.findIndex(c => c.id === company.id);
        if (index !== -1) {
          companies[index] = updatedCompany;
          localStorage.setItem('companies', JSON.stringify(companies));
        }
      }
    }
    
    setView('overview');
  };

  // Filter projects by status
  const preVentaProjects = userProjects.filter(p => p.status === 'pre-venta');
  const construccionProjects = userProjects.filter(p => p.status === 'en-construccion');
  const terminadosProjects = userProjects.filter(p => p.status === 'terminado');

  const getStatusBadgeVariant = (status: Project['status']) => {
    switch (status) {
      case 'pre-venta':
        return 'secondary';
      case 'en-construccion':
        return 'default';
      case 'terminado':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: Project['status']) => {
    switch (status) {
      case 'pre-venta':
        return 'Pre-venta';
      case 'en-construccion':
        return 'En Construcción';
      case 'terminado':
        return 'Terminado';
      default:
        return status;
    }
  };

  // If no company registered, show registration form
  if (showCompanyForm || (!company && view === 'overview')) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Panel de Administración</h1>
            <p className="text-muted-foreground">
              Bienvenido/a, <span className="font-semibold text-foreground">{userName}</span>
            </p>
          </div>

          <CompanyRegistration 
            userId={userId}
            onCompanyRegistered={handleCompanyRegistered}
            existingCompany={company}
          />
        </div>
      </div>
    );
  }

  // Main dashboard view
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Sitio
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Administrador</Badge>
          </div>
        </div>

        {/* Company Info Header */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                  <img 
                    src={company.logoUrl} 
                    alt={company.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-1">{company.name}</CardTitle>
                  <CardDescription>{company.description}</CardDescription>
                  <div className="flex flex-wrap gap-4 mt-3">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Email:</span>{' '}
                      <span className="font-medium">{company.email}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Teléfono:</span>{' '}
                      <span className="font-medium">{company.phone}</span>
                    </div>
                    {company.address && (
                      <div className="text-sm flex items-center gap-1">
                        <Building2 className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">{company.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setView('company')}
                className="shrink-0"
              >
                Editar Empresa
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* View Selector */}
        {view === 'company' ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setView('overview')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Dashboard
              </Button>
            </div>
            <CompanyRegistration 
              userId={userId}
              onCompanyRegistered={(updatedCompany) => {
                handleCompanyRegistered(updatedCompany);
                setView('overview');
              }}
              existingCompany={company}
            />
          </div>
        ) : view === 'add-project' ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setView('overview')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Dashboard
              </Button>
            </div>
            <ProjectForm
              companyId={company.id}
              companyName={company.name}
              onProjectCreated={handleProjectCreated}
              onCancel={() => setView('overview')}
            />
          </div>
        ) : view === 'pre-venta' ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setView('overview')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Dashboard
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-secondary" />
                  Proyectos en Pre-venta
                </CardTitle>
                <CardDescription>
                  Gestiona reservas y compras de unidades en preventa
                </CardDescription>
              </CardHeader>
              <CardContent>
                {preVentaProjects.length === 0 ? (
                  <Alert>
                    <Layers className="h-4 w-4" />
                    <AlertDescription>
                      No tienes proyectos en pre-venta.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-6">
                    {preVentaProjects.map((project) => (
                      <Card key={project.id} className="border-2 hover:border-secondary/30 transition-all">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <CardTitle className="text-xl">{project.name}</CardTitle>
                                <Badge variant="secondary">Pre-venta</Badge>
                              </div>
                              <CardDescription className="text-base">
                                {project.description}
                              </CardDescription>
                            </div>
                            <img 
                              src={project.imageUrl} 
                              alt={project.name}
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Total Unidades</p>
                              <p className="font-semibold">{project.totalUnits}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Disponibles</p>
                              <p className="font-semibold text-secondary">{project.availableUnits}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Entrega
                              </p>
                              <p className="font-semibold">{project.deliveryDate}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                Ubicación
                              </p>
                              <p className="font-semibold text-sm line-clamp-1">{project.location}</p>
                            </div>
                          </div>

                          {project.amenities && project.amenities.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Amenidades</p>
                              <div className="flex flex-wrap gap-2">
                                {project.amenities.map((amenity, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {project.projectArea && project.projectArea.length >= 3 && (
                            <div className="mt-4">
                              <ProjectAreaMap
                                projectName={project.name}
                                center={project.coordinates}
                                projectArea={project.projectArea}
                                showTitle={false}
                                height="300px"
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : view === 'construccion' ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setView('overview')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Dashboard
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  Proyectos en Construcción
                </CardTitle>
                <CardDescription>
                  Gestiona y agrega propiedades a tus proyectos en construcción
                </CardDescription>
              </CardHeader>
              <CardContent>
                {construccionProjects.length === 0 ? (
                  <Alert>
                    <Layers className="h-4 w-4" />
                    <AlertDescription>
                      No tienes proyectos en construcción. Haz clic en "Agregar Proyecto" para crear uno nuevo.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-6">
                    {construccionProjects.map((project) => (
                      <Card key={project.id} className="border-2 hover:border-primary/30 transition-all">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <CardTitle className="text-xl">{project.name}</CardTitle>
                                <Badge variant="default">En Construcción</Badge>
                              </div>
                              <CardDescription className="text-base">
                                {project.description}
                              </CardDescription>
                            </div>
                            <img 
                              src={project.imageUrl} 
                              alt={project.name}
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Total Unidades</p>
                              <p className="font-semibold">{project.totalUnits}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Disponibles</p>
                              <p className="font-semibold text-primary">{project.availableUnits}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Entrega
                              </p>
                              <p className="font-semibold">{project.deliveryDate}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                Ubicación
                              </p>
                              <p className="font-semibold text-sm line-clamp-1">{project.location}</p>
                            </div>
                          </div>

                          {project.amenities && project.amenities.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Amenidades</p>
                              <div className="flex flex-wrap gap-2">
                                {project.amenities.map((amenity, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {project.projectArea && project.projectArea.length >= 3 && (
                            <div className="mt-4">
                              <ProjectAreaMap
                                projectName={project.name}
                                center={project.coordinates}
                                projectArea={project.projectArea}
                                showTitle={false}
                                height="300px"
                              />
                            </div>
                          )}

                          <div className="pt-4 border-t">
                            <Button className="w-full" disabled>
                              <Plus className="h-4 w-4 mr-2" />
                              Agregar Propiedades (Próximamente)
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : view === 'terminados' ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setView('overview')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Dashboard
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-accent" />
                  Proyectos Terminados
                </CardTitle>
                <CardDescription>
                  Control de pagos, alquileres y ventas de proyectos entregados
                </CardDescription>
              </CardHeader>
              <CardContent>
                {terminadosProjects.length === 0 ? (
                  <Alert>
                    <Building2 className="h-4 w-4" />
                    <AlertDescription>
                      No tienes proyectos terminados.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-6">
                    {terminadosProjects.map((project) => (
                      <Card key={project.id} className="border-2 hover:border-accent/30 transition-all">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <CardTitle className="text-xl">{project.name}</CardTitle>
                                <Badge variant="outline">Terminado</Badge>
                              </div>
                              <CardDescription className="text-base">
                                {project.description}
                              </CardDescription>
                            </div>
                            <img 
                              src={project.imageUrl} 
                              alt={project.name}
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Total Unidades</p>
                              <p className="font-semibold">{project.totalUnits}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Disponibles</p>
                              <p className="font-semibold text-accent">{project.availableUnits}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Entrega
                              </p>
                              <p className="font-semibold">{project.deliveryDate}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                Ubicación
                              </p>
                              <p className="font-semibold text-sm line-clamp-1">{project.location}</p>
                            </div>
                          </div>

                          {project.amenities && project.amenities.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Amenidades</p>
                              <div className="flex flex-wrap gap-2">
                                {project.amenities.map((amenity, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {project.projectArea && project.projectArea.length >= 3 && (
                            <div className="mt-4">
                              <ProjectAreaMap
                                projectName={project.name}
                                center={project.coordinates}
                                projectArea={project.projectArea}
                                showTitle={false}
                                height="300px"
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card 
                className="hover:shadow-lg transition-all cursor-pointer hover:border-secondary/30"
                onClick={() => setView('pre-venta')}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Pre-venta</CardTitle>
                  <Layers className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">{preVentaProjects.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Gestión de reservas y compras
                  </p>
                </CardContent>
              </Card>

              <Card 
                className="hover:shadow-lg transition-all cursor-pointer hover:border-primary/30"
                onClick={() => setView('construccion')}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">En Construcción</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{construccionProjects.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Agregar y gestionar propiedades
                  </p>
                </CardContent>
              </Card>

              <Card 
                className="hover:shadow-lg transition-all cursor-pointer hover:border-accent/30"
                onClick={() => setView('terminados')}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Terminados</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">{terminadosProjects.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Control de pagos y alquileres
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions - Left Column */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-semibold">Acciones Rápidas</h2>
                <div className="grid gap-4">
                  <Card 
                    className="hover:shadow-lg transition-all cursor-pointer group border-2 border-transparent hover:border-primary/20"
                    onClick={() => setView('add-project')}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Plus className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Agregar Proyecto</CardTitle>
                          <CardDescription>
                            Registra un nuevo proyecto habitacional
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                  
                  {onNavigateToKickoff && (
                    <Card 
                      className="hover:shadow-lg transition-all cursor-pointer group border-2 border-transparent hover:border-emerald-500/20 bg-gradient-to-r from-emerald-50/50 to-transparent"
                      onClick={onNavigateToKickoff}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                            <Rocket className="h-6 w-6 text-emerald-700" />
                          </div>
                          <div>
                            <CardTitle className="text-lg text-emerald-900">Project Kickoff</CardTitle>
                            <CardDescription>
                              Ver presentación del acta constitutiva del proyecto
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  )}
                </div>
              </div>

              {/* Company Location - Right Column */}
              {company.coordinates && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Mi Empresa</h2>
                  <CompanyLocationPreview
                    coordinates={company.coordinates}
                    address={company.address}
                    companyName={company.name}
                  />
                </div>
              )}
            </div>

            {/* Getting Started Guide */}
            <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  Guía de Inicio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5">1</Badge>
                    <div>
                      <p className="font-medium">Información de la empresa completada ✓</p>
                      <p className="text-sm text-muted-foreground">
                        Has registrado exitosamente tu empresa
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-0.5">2</Badge>
                    <div>
                      <p className="font-medium">Agrega tu primer proyecto habitacional</p>
                      <p className="text-sm text-muted-foreground">
                        Define las características y ubicación del proyecto
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-0.5">3</Badge>
                    <div>
                      <p className="font-medium">Registra las propiedades del proyecto</p>
                      <p className="text-sm text-muted-foreground">
                        Agrega apartamentos, casas o dúplex al proyecto
                      </p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
