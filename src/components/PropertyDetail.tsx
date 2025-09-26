import { Property, Project } from '../types/property';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Home, 
  Trees, 
  Building, 
  Calendar,
  Users,
  Shield,
  Phone,
  Mail
} from 'lucide-react';

interface PropertyDetailProps {
  property: Property;
  project: Project;
  onBack: () => void;
}

export function PropertyDetail({ property, project, onBack }: PropertyDetailProps) {
  const statusColors = {
    disponible: 'bg-green-100 text-green-800',
    reservado: 'bg-yellow-100 text-yellow-800',
    vendido: 'bg-red-100 text-red-800'
  };

  const typeLabels = {
    apartamento: 'Apartamento',
    casa: 'Casa',
    duplex: 'Dúplex',
    penthouse: 'Penthouse'
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver al Catálogo
        </Button>
        <div className="flex items-center gap-2">
          <Badge className={statusColors[property.status]}>
            {property.status}
          </Badge>
          <Badge variant="secondary">
            {typeLabels[property.type]}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Image */}
          <Card>
            <CardContent className="p-0">
              <ImageWithFallback
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-80 object-cover rounded-lg"
              />
            </CardContent>
          </Card>

          {/* Property Info */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{property.title}</CardTitle>
                  <div className="flex items-center text-muted-foreground mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{project.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    ${property.price.toLocaleString()}
                  </div>
                  {property.floor && (
                    <div className="text-sm text-muted-foreground">
                      Piso {property.floor}
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                {property.description}
              </p>

              {/* Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <Bed className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">{property.bedrooms}</div>
                    <div className="text-sm text-muted-foreground">Habitaciones</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <Bath className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">{property.bathrooms}</div>
                    <div className="text-sm text-muted-foreground">Baños</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <Square className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">{property.area} m²</div>
                    <div className="text-sm text-muted-foreground">Área</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <Building className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">{property.zone}</div>
                    <div className="text-sm text-muted-foreground">Zona</div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold mb-3">Características</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Features */}
              <div>
                <h3 className="font-semibold mb-3">Servicios Incluidos</h3>
                <div className="flex flex-wrap gap-4">
                  {property.parking && (
                    <div className="flex items-center gap-2 text-sm">
                      <Car className="h-4 w-4 text-primary" />
                      Estacionamiento
                    </div>
                  )}
                  {property.balcony && (
                    <div className="flex items-center gap-2 text-sm">
                      <Home className="h-4 w-4 text-primary" />
                      Balcón
                    </div>
                  )}
                  {property.garden && (
                    <div className="flex items-center gap-2 text-sm">
                      <Trees className="h-4 w-4 text-primary" />
                      Jardín
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle>Contactar Vendedor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Llamar Ahora
              </Button>
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Enviar Email
              </Button>
            </CardContent>
          </Card>

          {/* Project Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                {project.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ImageWithFallback
                src={project.imageUrl}
                alt={project.name}
                className="w-full h-32 object-cover rounded-lg"
              />
              
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Entrega: {project.deliveryDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{project.availableUnits} de {project.totalUnits} disponibles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>{project.developer}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Amenidades del Proyecto</h4>
                <div className="space-y-1">
                  {project.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              <Badge 
                className={
                  project.status === 'terminado' 
                    ? 'bg-green-100 text-green-800' 
                    : project.status === 'en-construccion'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-orange-100 text-orange-800'
                }
              >
                {project.status === 'terminado' 
                  ? 'Terminado' 
                  : project.status === 'en-construccion'
                  ? 'En Construcción'
                  : 'Pre-venta'}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}