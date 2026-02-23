import { useState, useEffect, useCallback } from "react";
import { GoogleMap, Polygon, Marker } from "@react-google-maps/api";
import { useGoogleMaps } from "./GoogleMapsProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  MapPin, 
  Loader2, 
  AlertCircle, 
  Pencil, 
  Trash2, 
  Map as MapIcon,
  MousePointerClick,
  CheckCircle
} from "lucide-react";
import { Badge } from "./ui/badge";

interface AreaPickerProps {
  onAreaSelect: (area: Array<{ lat: number; lng: number }>) => void;
  initialArea?: Array<{ lat: number; lng: number }>;
  centerLocation?: { lat: number; lng: number };
}

const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "0.5rem",
};

// Centro de Costa Rica como default
const defaultCenter = {
  lat: 9.7489,
  lng: -83.7534,
};

export function AreaPicker({ onAreaSelect, initialArea, centerLocation }: AreaPickerProps) {
  const [polygonPoints, setPolygonPoints] = useState<Array<{ lat: number; lng: number }>>(
    initialArea || []
  );
  const [isDrawing, setIsDrawing] = useState(false);
  const [center, setCenter] = useState(centerLocation || defaultCenter);

  const { isLoaded, loadError } = useGoogleMaps();

  useEffect(() => {
    if (centerLocation) {
      setCenter(centerLocation);
    }
  }, [centerLocation]);

  useEffect(() => {
    if (initialArea && initialArea.length > 0) {
      setPolygonPoints(initialArea);
    }
  }, [initialArea]);

  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!isDrawing || !e.latLng) return;

      const newPoint = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };

      const updatedPoints = [...polygonPoints, newPoint];
      setPolygonPoints(updatedPoints);
    },
    [isDrawing, polygonPoints]
  );

  const handleRemovePoint = (index: number) => {
    const updatedPoints = polygonPoints.filter((_, i) => i !== index);
    setPolygonPoints(updatedPoints);
    if (updatedPoints.length >= 3) {
      onAreaSelect(updatedPoints);
    }
  };

  const handleClearArea = () => {
    setPolygonPoints([]);
    setIsDrawing(false);
  };

  const handleSaveArea = () => {
    if (polygonPoints.length >= 3) {
      onAreaSelect(polygonPoints);
      setIsDrawing(false);
    }
  };

  const handleStartDrawing = () => {
    setIsDrawing(true);
  };

  const handleCompletePolygon = () => {
    if (polygonPoints.length >= 3) {
      setIsDrawing(false);
      onAreaSelect(polygonPoints);
    }
  };

  if (loadError) {
    return (
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            Error al Cargar el Mapa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No se pudo cargar Google Maps. Por favor, verifica tu conexión o intenta más tarde.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!isLoaded) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-[500px]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Cargando mapa...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapIcon className="h-5 w-5 text-primary" />
          Definir Área del Proyecto
        </CardTitle>
        <CardDescription>
          Haz clic en el mapa para agregar puntos y definir el área que cubre el proyecto habitacional
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Instructions */}
        <Alert className="bg-primary/5 border-primary/20">
          <MousePointerClick className="h-4 w-4 text-primary" />
          <AlertDescription className="text-sm">
            <strong>Instrucciones:</strong>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Haz clic en "Comenzar a Dibujar"</li>
              <li>Haz clic en el mapa para agregar puntos (mínimo 3 puntos)</li>
              <li>Los puntos se conectarán automáticamente formando un polígono</li>
              <li>Haz clic en "Completar Polígono" cuando termines</li>
            </ol>
          </AlertDescription>
        </Alert>

        {/* Controls */}
        <div className="flex flex-wrap gap-2">
          {!isDrawing && polygonPoints.length === 0 && (
            <Button onClick={handleStartDrawing} className="gap-2">
              <Pencil className="h-4 w-4" />
              Comenzar a Dibujar
            </Button>
          )}
          
          {isDrawing && (
            <>
              <Button 
                onClick={handleCompletePolygon} 
                disabled={polygonPoints.length < 3}
                className="gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Completar Polígono ({polygonPoints.length} puntos)
              </Button>
              <Button onClick={handleClearArea} variant="outline" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Limpiar
              </Button>
            </>
          )}

          {!isDrawing && polygonPoints.length >= 3 && (
            <>
              <Button onClick={handleStartDrawing} variant="outline" className="gap-2">
                <Pencil className="h-4 w-4" />
                Editar Área
              </Button>
              <Button onClick={handleClearArea} variant="outline" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Limpiar
              </Button>
            </>
          )}
        </div>

        {/* Status */}
        {polygonPoints.length > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant={polygonPoints.length >= 3 ? "default" : "secondary"}>
              {polygonPoints.length} punto{polygonPoints.length !== 1 ? 's' : ''} definido{polygonPoints.length !== 1 ? 's' : ''}
            </Badge>
            {polygonPoints.length >= 3 && (
              <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary">
                ✓ Área válida
              </Badge>
            )}
            {polygonPoints.length > 0 && polygonPoints.length < 3 && (
              <span className="text-xs text-muted-foreground">
                (Mínimo 3 puntos para formar un área)
              </span>
            )}
          </div>
        )}

        {/* Map */}
        <div className={`rounded-lg overflow-hidden border-2 ${isDrawing ? 'border-primary' : 'border-border'}`}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
            onClick={handleMapClick}
            options={{
              streetViewControl: false,
              mapTypeControl: true,
              fullscreenControl: true,
              zoomControl: true,
              scrollwheel: true,
              styles: isDrawing ? [
                {
                  featureType: "poi",
                  stylers: [{ visibility: "off" }]
                }
              ] : undefined,
            }}
          >
            {/* Polygon */}
            {polygonPoints.length >= 3 && (
              <Polygon
                paths={polygonPoints}
                options={{
                  fillColor: "#047857",
                  fillOpacity: 0.2,
                  strokeColor: "#047857",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  clickable: false,
                  draggable: false,
                  editable: false,
                  geodesic: false,
                  zIndex: 1,
                }}
              />
            )}

            {/* Markers for each point */}
            {polygonPoints.map((point, index) => (
              <Marker
                key={index}
                position={point}
                label={{
                  text: `${index + 1}`,
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: "#047857",
                  fillOpacity: 1,
                  strokeColor: "white",
                  strokeWeight: 2,
                  scale: 10,
                }}
                onClick={() => {
                  if (isDrawing) {
                    handleRemovePoint(index);
                  }
                }}
                title={isDrawing ? `Click para eliminar punto ${index + 1}` : `Punto ${index + 1}`}
              />
            ))}
          </GoogleMap>
        </div>

        {/* Points List */}
        {polygonPoints.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm">Puntos del Área:</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 bg-muted/30 rounded-md">
              {polygonPoints.map((point, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between text-xs bg-background p-2 rounded border"
                >
                  <span>
                    <strong>Punto {index + 1}:</strong> {point.lat.toFixed(6)}, {point.lng.toFixed(6)}
                  </span>
                  {isDrawing && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemovePoint(index)}
                      className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Helper Text */}
        {polygonPoints.length >= 3 && !isDrawing && (
          <Alert className="bg-primary/5 border-primary/20">
            <CheckCircle className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm">
              Área del proyecto definida correctamente. Esta área se mostrará en el mapa del proyecto.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
