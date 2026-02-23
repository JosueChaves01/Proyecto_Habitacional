import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { AreaPicker } from './AreaPicker';
import { Layers, CheckCircle, AlertCircle, X, Plus, Home, Map } from 'lucide-react';
import { Project } from '../types/property';

interface ProjectFormProps {
  companyId: string;
  companyName: string;
  onProjectCreated: (project: Project) => void;
  onCancel: () => void;
}

const STATUS_OPTIONS = [
  { value: 'pre-venta', label: 'Pre-venta' },
  { value: 'en-construccion', label: 'En Construcción' },
  { value: 'terminado', label: 'Terminado' }
] as const;

export function ProjectForm({ companyId, companyName, onProjectCreated, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    deliveryDate: '',
    totalUnits: '',
    imageUrl: '',
    status: 'en-construccion' as 'pre-venta' | 'en-construccion' | 'terminado'
  });

  const [projectArea, setProjectArea] = useState<Array<{ lat: number; lng: number }>>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [newAmenity, setNewAmenity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleAreaSelect = (area: Array<{ lat: number; lng: number }>) => {
    setProjectArea(area);
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
      setAmenities(prev => [...prev, newAmenity.trim()]);
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (amenity: string) => {
    setAmenities(prev => prev.filter(a => a !== amenity));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation
      if (!formData.name || !formData.description) {
        setError('Por favor completa todos los campos requeridos');
        setLoading(false);
        return;
      }

      if (!formData.totalUnits || parseInt(formData.totalUnits) <= 0) {
        setError('El total de unidades debe ser mayor a 0');
        setLoading(false);
        return;
      }

      if (projectArea.length < 3) {
        setError('Por favor define el área del proyecto en el mapa (mínimo 3 puntos)');
        setLoading(false);
        return;
      }

      // Calculate center from project area
      const centerLat = projectArea.reduce((sum, point) => sum + point.lat, 0) / projectArea.length;
      const centerLng = projectArea.reduce((sum, point) => sum + point.lng, 0) / projectArea.length;
      const calculatedCenter = { lat: centerLat, lng: centerLng };

      // Generate location from coordinates
      const locationAddress = `${formData.name} - Costa Rica (${centerLat.toFixed(6)}, ${centerLng.toFixed(6)})`;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Create project object
      const newProject: Project = {
        id: `project-${Date.now()}`,
        name: formData.name,
        description: formData.description,
        location: locationAddress,
        zone: '', // Empty zone as it's no longer used
        amenities: amenities.length > 0 ? amenities : ['Seguridad 24/7', 'Estacionamiento'],
        deliveryDate: formData.deliveryDate || 'Por confirmar',
        totalUnits: parseInt(formData.totalUnits),
        availableUnits: parseInt(formData.totalUnits), // Initially all units are available
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        developer: companyName,
        status: formData.status,
        coordinates: calculatedCenter,
        projectArea: projectArea,
        zoneInfo: {
          climate: {
            temperature: '18-28°C',
            humidity: '70-80%',
            rainfall: 'Moderada',
            season: 'Tropical'
          },
          geography: {
            elevation: '1000-1200m',
            terrain: 'Valle',
            nearbyLandmarks: ['Centro Comercial', 'Parque Central'],
            naturalFeatures: ['Montañas', 'Ríos']
          },
          social: {
            population: '50,000+',
            demographics: 'Familias y profesionales',
            lifestyle: 'Urbano-residencial',
            community: ['Escuelas cercanas', 'Centros de salud']
          },
          infrastructure: {
            transportation: ['Ruta de buses', 'Acceso a autopista'],
            healthcare: ['Hospital público', 'Clínicas privadas'],
            education: ['Escuelas públicas', 'Colegios privados'],
            shopping: ['Supermercados', 'Centros comerciales'],
            recreation: ['Parques', 'Gimnasios', 'Restaurantes']
          }
        }
      };

      // Save to localStorage
      const projectsData = localStorage.getItem('userProjects');
      const projects = projectsData ? JSON.parse(projectsData) : [];
      projects.push({ ...newProject, companyId });
      localStorage.setItem('userProjects', JSON.stringify(projects));

      setSuccess(true);
      onProjectCreated(newProject);
    } catch (err) {
      setError('Error al crear el proyecto. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">¡Proyecto Creado Exitosamente!</h3>
              <p className="text-muted-foreground">
                El proyecto <span className="font-semibold text-foreground">{formData.name}</span> ha sido registrado.
              </p>
            </div>
            <div className="pt-4">
              <Button onClick={() => window.location.reload()}>
                Agregar Otro Proyecto
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Layers className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle>Nuevo Proyecto Habitacional</CardTitle>
              <CardDescription>
                Registra un nuevo proyecto para {companyName}
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="w-fit">
            Paso 2 de 2
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Home className="h-4 w-4 text-primary" />
              Información Básica
            </h4>

            <div className="space-y-2">
              <Label htmlFor="project-name" className="flex items-center gap-1">
                Nombre del Proyecto <span className="text-destructive">*</span>
              </Label>
              <Input
                id="project-name"
                placeholder="Ej: Residencial Vista Hermosa"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-description" className="flex items-center gap-1">
                Descripción <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="project-description"
                placeholder="Describe el proyecto, sus características principales y beneficios..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                required
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-status" className="flex items-center gap-1">
                Estado <span className="text-destructive">*</span>
              </Label>
              <Select value={formData.status} onValueChange={(value: any) => handleChange('status', value)}>
                <SelectTrigger id="project-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project-units" className="flex items-center gap-1">
                  Total de Unidades <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="project-units"
                  type="number"
                  min="1"
                  placeholder="50"
                  value={formData.totalUnits}
                  onChange={(e) => handleChange('totalUnits', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-delivery">
                  Fecha de Entrega
                </Label>
                <Input
                  id="project-delivery"
                  type="month"
                  value={formData.deliveryDate}
                  onChange={(e) => handleChange('deliveryDate', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-image">
                URL de Imagen Principal (opcional)
              </Label>
              <Input
                id="project-image"
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={formData.imageUrl}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Si no proporcionas una imagen, se usará una predeterminada
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Map className="h-4 w-4 text-primary" />
              Área del Proyecto <span className="text-destructive text-sm">*</span>
            </h4>

            <p className="text-sm text-muted-foreground">
              Define el área completa que cubre el proyecto habitacional dibujando un polígono en el mapa (mínimo 3 puntos)
            </p>
            
            <AreaPicker
              onAreaSelect={handleAreaSelect}
              initialArea={projectArea}
            />
            
            {projectArea.length >= 3 && (
              <Alert className="bg-secondary/5 border-secondary/20">
                <CheckCircle className="h-4 w-4 text-secondary" />
                <AlertDescription className="text-sm">
                  <strong>Área definida:</strong> {projectArea.length} puntos. La ubicación del proyecto se calculará automáticamente del centro del área.
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h4 className="font-medium">Amenidades del Proyecto</h4>
            
            <div className="flex gap-2">
              <Input
                placeholder="Ej: Piscina, Gimnasio, Área de BBQ..."
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAmenity())}
              />
              <Button type="button" onClick={handleAddAmenity} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {amenities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {amenity}
                    <button
                      type="button"
                      onClick={() => handleRemoveAmenity(amenity)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            
            <p className="text-xs text-muted-foreground">
              Agrega las amenidades que ofrece el proyecto (piscina, gimnasio, etc.)
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Creando Proyecto...' : 'Crear Proyecto'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
