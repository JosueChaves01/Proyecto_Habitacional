import { Eye, Sparkles } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface AmenitiesListProps {
  amenities: string[];
  onAmenityClick: (amenity: string, image: string) => void;
  getAmenityImage: (amenity: string) => string | null;
}

export function AmenitiesList({ amenities, onAmenityClick, getAmenityImage }: AmenitiesListProps) {
  return (
    <Card className="border-2 border-border/50">
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Amenidades del Proyecto
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Click en cualquier amenidad para ver su imagen
        </p>
        <div className="space-y-2">
          {amenities.map((amenity, index) => {
            const amenityImage = getAmenityImage(amenity);
            const hasImage = amenityImage !== null;
            
            return (
              <button
                key={index}
                onClick={() => {
                  if (hasImage) {
                    onAmenityClick(amenity, amenityImage);
                  }
                }}
                className={`w-full flex items-center gap-2 text-sm p-3 rounded-lg transition-all ${
                  hasImage
                    ? 'hover:bg-primary/10 hover:border-primary/50 border border-transparent cursor-pointer group'
                    : 'bg-muted/30 cursor-default'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${hasImage ? 'bg-primary' : 'bg-muted-foreground'}`} />
                <span className="flex-1 text-left">{amenity}</span>
                {hasImage && (
                  <Eye className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
