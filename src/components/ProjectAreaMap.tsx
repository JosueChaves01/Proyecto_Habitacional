import { GoogleMap, Polygon, Marker } from "@react-google-maps/api";
import { useGoogleMaps } from "./GoogleMapsProvider";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin, Loader2, Map as MapIcon } from "lucide-react";
import { Badge } from "./ui/badge";

interface ProjectAreaMapProps {
  projectName: string;
  center?: { lat: number; lng: number };
  projectArea?: Array<{ lat: number; lng: number }>;
  showTitle?: boolean;
  height?: string;
}

export function ProjectAreaMap({ 
  projectName, 
  center, 
  projectArea,
  showTitle = true,
  height = "400px"
}: ProjectAreaMapProps) {
  const { isLoaded, loadError } = useGoogleMaps();

  // Si no hay área ni centro, no mostrar nada
  if (!projectArea && !center) {
    return null;
  }

  const mapContainerStyle = {
    width: "100%",
    height: height,
    borderRadius: "0.5rem",
  };

  // Calcular el centro si hay área pero no centro
  const mapCenter = center || (projectArea && projectArea.length > 0 ? {
    lat: projectArea.reduce((sum, point) => sum + point.lat, 0) / projectArea.length,
    lng: projectArea.reduce((sum, point) => sum + point.lng, 0) / projectArea.length,
  } : { lat: 9.7489, lng: -83.7534 });

  if (loadError) {
    return (
      <Card className="border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Mapa no disponible</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isLoaded) {
    return (
      <Card className="border-primary/20">
        <CardContent className="flex items-center justify-center" style={{ height }}>
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-xs text-muted-foreground">Cargando mapa...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20">
      {showTitle && (
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <MapIcon className="h-4 w-4 text-primary" />
              Ubicación del Proyecto
            </CardTitle>
            {projectArea && projectArea.length >= 3 && (
              <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary">
                Área Definida
              </Badge>
            )}
          </div>
        </CardHeader>
      )}
      <CardContent className={showTitle ? "p-0 px-6 pb-6" : "p-0"}>
        <div className="rounded-lg overflow-hidden">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={projectArea && projectArea.length >= 3 ? 16 : 15}
            options={{
              streetViewControl: false,
              mapTypeControl: true,
              fullscreenControl: true,
              zoomControl: true,
              scrollwheel: true,
            }}
          >
            {/* Polygon for project area */}
            {projectArea && projectArea.length >= 3 && (
              <Polygon
                paths={projectArea}
                options={{
                  fillColor: "#047857",
                  fillOpacity: 0.25,
                  strokeColor: "#047857",
                  strokeOpacity: 0.9,
                  strokeWeight: 3,
                  clickable: false,
                  draggable: false,
                  editable: false,
                  geodesic: false,
                  zIndex: 1,
                }}
              />
            )}

            {/* Center marker if no area or as fallback */}
            {center && (!projectArea || projectArea.length < 3) && (
              <Marker 
                position={center} 
                title={projectName}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: "#047857",
                  fillOpacity: 1,
                  strokeColor: "white",
                  strokeWeight: 3,
                  scale: 12,
                }}
              />
            )}

            {/* Markers for polygon vertices */}
            {projectArea && projectArea.length >= 3 && projectArea.map((point, index) => (
              <Marker
                key={index}
                position={point}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: "#047857",
                  fillOpacity: 0.8,
                  strokeColor: "white",
                  strokeWeight: 2,
                  scale: 6,
                }}
                title={`Vértice ${index + 1} del área`}
              />
            ))}
          </GoogleMap>
        </div>
        
        {projectArea && projectArea.length >= 3 && (
          <div className="mt-3 text-xs text-muted-foreground">
            <p>
              <strong>Área del proyecto:</strong> Definida por {projectArea.length} puntos
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
