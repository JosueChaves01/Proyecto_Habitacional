import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { LocationPicker } from './LocationPicker';
import { Building2, CheckCircle, AlertCircle, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { Developer } from '../types/property';

interface CompanyRegistrationProps {
  userId: string;
  onCompanyRegistered: (company: Developer) => void;
  existingCompany?: Developer | null;
}

export function CompanyRegistration({ userId, onCompanyRegistered, existingCompany }: CompanyRegistrationProps) {
  const [formData, setFormData] = useState({
    name: existingCompany?.name || '',
    description: existingCompany?.description || '',
    email: existingCompany?.email || '',
    phone: existingCompany?.phone || '',
    website: existingCompany?.website || '',
    address: existingCompany?.address || '',
    logoUrl: existingCompany?.logoUrl || ''
  });
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(
    existingCompany?.coordinates || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Validation
      if (!formData.name || !formData.description || !formData.email || !formData.phone) {
        setError('Por favor completa todos los campos requeridos');
        setLoading(false);
        return;
      }

      // Create company object
      const companyId = existingCompany?.id || `dev-${Date.now()}`;
      const company: Developer = {
        id: companyId,
        name: formData.name,
        description: formData.description,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        address: formData.address,
        coordinates: coordinates || undefined,
        logoUrl: formData.logoUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
        activeProjects: existingCompany?.activeProjects || 0,
        completedProjects: existingCompany?.completedProjects || 0,
        highlights: existingCompany?.highlights || [
          'Empresa registrada',
          'En proceso de configuración'
        ],
        userId: userId
      };

      // Save to localStorage
      const companiesData = localStorage.getItem('companies');
      const companies = companiesData ? JSON.parse(companiesData) : [];
      
      if (existingCompany) {
        // Update existing company
        const index = companies.findIndex((c: Developer) => c.id === existingCompany.id);
        if (index !== -1) {
          companies[index] = company;
        }
      } else {
        // Add new company
        companies.push(company);
      }
      
      localStorage.setItem('companies', JSON.stringify(companies));

      setSuccess(true);
      onCompanyRegistered(company);
    } catch (err) {
      setError('Error al guardar la empresa. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
    setSuccess(false);
  };

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setCoordinates({ lat: location.lat, lng: location.lng });
    setFormData(prev => ({ ...prev, address: location.address }));
  };

  if (success && !existingCompany) {
    return (
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">¡Empresa Registrada Exitosamente!</h3>
              <p className="text-muted-foreground">
                Tu empresa <span className="font-semibold text-foreground">{formData.name}</span> ha sido registrada correctamente.
              </p>
            </div>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Ahora puedes comenzar a agregar tus proyectos habitacionales.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle>
              {existingCompany ? 'Editar Información de la Empresa' : 'Registrar Tu Empresa'}
            </CardTitle>
            <CardDescription>
              {existingCompany 
                ? 'Actualiza la información de tu empresa constructora'
                : 'Completa la información de tu empresa constructora para comenzar'
              }
            </CardDescription>
          </div>
        </div>
        {!existingCompany && (
          <Badge variant="outline" className="w-fit">
            Paso 1 de 2
          </Badge>
        )}
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name" className="flex items-center gap-1">
                Nombre de la Empresa <span className="text-destructive">*</span>
              </Label>
              <Input
                id="company-name"
                placeholder="Constructora Ejemplo S.A."
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-description" className="flex items-center gap-1">
                Descripción <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="company-description"
                placeholder="Describe tu empresa, experiencia y especialidades..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                required
                rows={4}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Información de Contacto
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-email" className="flex items-center gap-1">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="company-email"
                  type="email"
                  placeholder="contacto@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-phone" className="flex items-center gap-1">
                  Teléfono <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="company-phone"
                  type="tel"
                  placeholder="+506 2222-3333"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-website">
                Sitio Web
              </Label>
              <Input
                id="company-website"
                type="url"
                placeholder="https://www.ejemplo.com"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
              />
            </div>

          </div>

          {/* Location */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Ubicación de la Oficina
            </h4>
            
            <LocationPicker
              onLocationSelect={handleLocationSelect}
              initialLocation={coordinates || undefined}
              initialAddress={formData.address}
            />
            
            <p className="text-xs text-muted-foreground">
              Selecciona la ubicación de tu oficina principal o sede de la empresa
            </p>
          </div>

          {/* Logo URL */}
          <div className="space-y-2">
            <Label htmlFor="company-logo">
              URL del Logo (opcional)
            </Label>
            <Input
              id="company-logo"
              type="url"
              placeholder="https://ejemplo.com/logo.png"
              value={formData.logoUrl}
              onChange={(e) => handleChange('logoUrl', e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Si no proporcionas un logo, se usará una imagen predeterminada
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && existingCompany && (
            <Alert className="bg-primary/10 border-primary/20">
              <CheckCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-primary">
                Información actualizada exitosamente
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Guardando...' : existingCompany ? 'Actualizar Empresa' : 'Registrar Empresa'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
