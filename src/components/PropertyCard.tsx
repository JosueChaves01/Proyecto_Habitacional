import { Property, Project } from '../types/property';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin, Bed, Bath, Square, Car, Home, Trees } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  project: Project;
  onViewDetails: (propertyId: string) => void;
}

export function PropertyCard({ property, project, onViewDetails }: PropertyCardProps) {
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <ImageWithFallback
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className={statusColors[property.status]}>
            {property.status}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary">
            {typeLabels[property.type]}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
            <span className="font-semibold text-lg text-primary">
              ${property.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{project.name} - {property.zone}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {property.description}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{property.bedrooms} hab.</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{property.bathrooms} baños</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{property.area} m²</span>
            </div>
            <div className="flex items-center space-x-1">
              {property.parking && <Car className="h-4 w-4 text-muted-foreground" />}
              {property.balcony && <Home className="h-4 w-4 text-muted-foreground" />}
              {property.garden && <Trees className="h-4 w-4 text-muted-foreground" />}
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {property.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {property.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{property.features.length - 3} más
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onViewDetails(property.id)}
          className="w-full"
          disabled={property.status === 'vendido'}
        >
          {property.status === 'vendido' ? 'Vendido' : 'Ver Detalles'}
        </Button>
      </CardFooter>
    </Card>
  );
}