import { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import { useGoogleMaps } from "./GoogleMapsProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { MapPin, Search, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface LocationPickerProps {
  onLocationSelect: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
  initialLocation?: { lat: number; lng: number };
  initialAddress?: string;
}

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "0.75rem",
};

// Centro de Costa Rica (San José)
const defaultCenter = {
  lat: 9.9281,
  lng: -84.0907,
};

export function LocationPicker({
  onLocationSelect,
  initialLocation,
  initialAddress,
}: LocationPickerProps) {
  const [markerPosition, setMarkerPosition] = useState(
    initialLocation || defaultCenter,
  );
  const [searchAddress, setSearchAddress] = useState(
    initialAddress || "",
  );
  const [currentAddress, setCurrentAddress] = useState(
    initialAddress || "",
  );
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  const [useManualEntry, setUseManualEntry] = useState(false);
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");

  const { isLoaded, loadError } = useGoogleMaps();

  useEffect(() => {
    if (initialLocation) {
      setMarkerPosition(initialLocation);
    }
  }, [initialLocation]);

  const handleMapClick = useCallback(
    async (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setMarkerPosition({ lat, lng });

        // Reverse geocoding para obtener la dirección
        try {
          const geocoder = new google.maps.Geocoder();
          const result = await geocoder.geocode({
            location: { lat, lng },
          });

          if (result.results[0]) {
            const address = result.results[0].formatted_address;
            setCurrentAddress(address);
            setSearchAddress(address);
            onLocationSelect({ lat, lng, address });
          } else {
            // Si no hay resultado, usar coordenadas como dirección
            const coordAddress = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
            setCurrentAddress(coordAddress);
            setSearchAddress(coordAddress);
            onLocationSelect({ lat, lng, address: coordAddress });
          }
        } catch (err: any) {
          if (import.meta.env.DEV) {
            console.error("Error en geocoding:", err);
          }
          // Si falla geocoding, usar coordenadas como dirección
          const coordAddress = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
          setCurrentAddress(coordAddress);
          setSearchAddress(coordAddress);
          onLocationSelect({ lat, lng, address: coordAddress });
        }
      }
    },
    [onLocationSelect],
  );

  const handleSearch = async () => {
    if (!searchAddress.trim()) {
      setError("Por favor ingresa una dirección");
      return;
    }

    setIsSearching(true);
    setError("");

    try {
      const geocoder = new google.maps.Geocoder();
      const result = await geocoder.geocode({
        address: searchAddress,
        componentRestrictions: { country: "CR" }, // Limitar a Costa Rica
      });

      if (result.results[0]) {
        const location = result.results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        const address = result.results[0].formatted_address;

        setMarkerPosition({ lat, lng });
        setCurrentAddress(address);
        onLocationSelect({ lat, lng, address });
      } else {
        setError(
          "No se encontró la dirección. Intenta con otra búsqueda.",
        );
      }
    } catch (err: any) {
      // Error silenciado en producción
      // eslint-disable-next-line no-console
      if (import.meta.env.DEV) console.error("Error en búsqueda:", err);
      
      // Detectar error de API key
      if (err.code === 'REQUEST_DENIED') {
        setError(
          "La API key no tiene permisos para Geocoding. Usa entrada manual de coordenadas."
        );
        setUseManualEntry(true);
      } else {
        setError(
          "Error al buscar la dirección. Puedes usar entrada manual de coordenadas.",
        );
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleManualSubmit = () => {
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);

    if (isNaN(lat) || isNaN(lng)) {
      setError("Por favor ingresa coordenadas válidas");
      return;
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      setError("Coordenadas fuera de rango válido");
      return;
    }

    const coordAddress = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    setMarkerPosition({ lat, lng });
    setCurrentAddress(coordAddress);
    setSearchAddress(coordAddress);
    onLocationSelect({ lat, lng, address: coordAddress });
    setError("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (loadError) {
    // Fallback a entrada manual si el mapa no carga
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No se pudo cargar Google Maps. Usa entrada manual de coordenadas.
          </AlertDescription>
        </Alert>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Entrada Manual de Ubicación
            </CardTitle>
            <CardDescription>
              Ingresa las coordenadas manualmente o usa{" "}
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Maps
              </a>{" "}
              para obtenerlas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Latitud</Label>
                <Input
                  type="number"
                  step="0.000001"
                  placeholder="9.9281"
                  value={manualLat}
                  onChange={(e) => setManualLat(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Rango: -90 a 90
                </p>
              </div>
              <div className="space-y-2">
                <Label>Longitud</Label>
                <Input
                  type="number"
                  step="0.000001"
                  placeholder="-84.0907"
                  value={manualLng}
                  onChange={(e) => setManualLng(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Rango: -180 a 180
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Dirección (opcional)</Label>
              <Input
                placeholder="Ej: San José, Costa Rica"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button onClick={handleManualSubmit} className="w-full">
              Guardar Ubicación
            </Button>

            {currentAddress && (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-1">
                        Ubicación Guardada:
                      </p>
                      <p className="text-sm text-muted-foreground break-words">
                        {currentAddress}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Lat: {markerPosition.lat.toFixed(6)}, Lng:{" "}
                        {markerPosition.lng.toFixed(6)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        <Alert>
          <AlertDescription>
            <strong>Configuración de Google Maps:</strong> Para habilitar el mapa interactivo,
            configura una API key con permisos para Maps JavaScript API y Geocoding API.{" "}
            <a
              href="https://developers.google.com/maps/documentation/javascript/get-api-key"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Más información
            </a>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-[400px]">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Cargando mapa...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toggle between Map and Manual Entry */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant={!useManualEntry ? "default" : "outline"}
          onClick={() => setUseManualEntry(false)}
          className="flex-1"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Usar Mapa
        </Button>
        <Button
          type="button"
          variant={useManualEntry ? "default" : "outline"}
          onClick={() => setUseManualEntry(true)}
          className="flex-1"
        >
          Entrada Manual
        </Button>
      </div>

      {useManualEntry ? (
        /* Manual Entry Mode */
        <Card>
          <CardHeader>
            <CardTitle>Coordenadas Manuales</CardTitle>
            <CardDescription>
              Ingresa latitud y longitud o usa{" "}
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Maps
              </a>{" "}
              para obtenerlas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Latitud</Label>
                <Input
                  type="number"
                  step="0.000001"
                  placeholder="9.9281"
                  value={manualLat}
                  onChange={(e) => setManualLat(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Ej: 9.9281 (San José)
                </p>
              </div>
              <div className="space-y-2">
                <Label>Longitud</Label>
                <Input
                  type="number"
                  step="0.000001"
                  placeholder="-84.0907"
                  value={manualLng}
                  onChange={(e) => setManualLng(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Ej: -84.0907 (San José)
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Dirección (opcional)</Label>
              <Input
                placeholder="Ej: San José, Costa Rica"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button onClick={handleManualSubmit} className="w-full">
              Guardar Ubicación
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* Map Mode */
        <>
          {/* Search Bar */}
          <div className="space-y-2">
            <Label>Buscar Ubicación</Label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Ej: San José, Costa Rica"
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="shrink-0"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Buscando...
                  </>
                ) : (
                  "Buscar"
                )}
              </Button>
            </div>
            {error && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Map */}
          <Card>
            <CardContent className="p-0">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={markerPosition}
                zoom={15}
                onClick={handleMapClick}
                options={{
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: true,
                }}
              >
                <Marker position={markerPosition} />
              </GoogleMap>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground">
            💡 Haz clic en el mapa para seleccionar la ubicación exacta del proyecto
          </p>
        </>
      )}

      {/* Selected Location Info - Show in both modes */}
      {currentAddress && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium mb-1">
                  Ubicación Seleccionada:
                </p>
                <p className="text-sm text-muted-foreground break-words">
                  {currentAddress}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Lat: {markerPosition.lat.toFixed(6)}, Lng:{" "}
                  {markerPosition.lng.toFixed(6)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}