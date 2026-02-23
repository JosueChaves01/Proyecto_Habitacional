import { Property, Project } from '../types/property';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin, Bed, Bath, Square, Car, Home, Trees } from 'lucide-react';
import { getPriceGradient } from './ui/price-utils';

interface PropertyCardProps {
  property: Property;
  project: Project;
  onViewDetails: (propertyId: string) => void;
}

export function PropertyCard({ property, project, onViewDetails }: PropertyCardProps) {
  const statusColors = {
    disponible: 'bg-green-600 text-white shadow-md border-green-700',
    reservado: 'bg-yellow-600 text-white shadow-md border-yellow-700',
    vendido: 'bg-red-600 text-white shadow-md border-red-700'
  };

  const typeLabels = {
    apartamento: 'Apartamento',
    casa: 'Casa',
    duplex: 'Dúplex',
    penthouse: 'Penthouse'
  };

  // Get dynamic price styling
  const priceStyle = getPriceGradient(property.price);

  return (
    <Card className="overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group border-border/50 hover:border-primary/30">
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3">
          <Badge className={`${statusColors[property.status]} shadow-md backdrop-blur-sm`}>
            {property.status}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="shadow-md backdrop-blur-sm">
            {typeLabels[property.type]}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className={`${priceStyle.bgColor} backdrop-blur-md px-3 py-1.5 rounded-lg shadow-xl ${priceStyle.borderColor} border-2 ${priceStyle.glowColor}`}>
            <span className={`font-semibold text-lg bg-gradient-to-r ${priceStyle.textGradient} bg-clip-text text-transparent`}>
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