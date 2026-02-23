import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMaps } from "./GoogleMapsProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MapPin, Loader2 } from "lucide-react";

interface CompanyLocationPreviewProps {
  coordinates: { lat: number; lng: number };
  address?: string;
  companyName: string;
}

const mapContainerStyle = {
  width: "100%",
  height: "200px",
  borderRadius: "0.5rem",
};

export function CompanyLocationPreview({ coordinates, address, companyName }: CompanyLocationPreviewProps) {
  const { isLoaded, loadError } = useGoogleMaps();

  if (loadError) {
    // Si el mapa no carga, solo mostramos la información de texto
    return (
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Ubicación de la Oficina
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {address && (
              <p className="text-sm text-muted-foreground">{address}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Lat: {coordinates.lat.toFixed(6)}, Lng: {coordinates.lng.toFixed(6)}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isLoaded) {
    return (
      <Card className="border-primary/20">
        <CardContent className="flex items-center justify-center h-[200px]">
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
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          Ubicación de la Oficina
        </CardTitle>
        {address && (
          <CardDescription className="text-sm">{address}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-0 px-6 pb-6">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={coordinates}
          zoom={15}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: true,
            scrollwheel: false,
          }}
        >
          <Marker position={coordinates} title={companyName} />
        </GoogleMap>
        <p className="text-xs text-muted-foreground mt-2">
          Lat: {coordinates.lat.toFixed(6)}, Lng: {coordinates.lng.toFixed(6)}
        </p>
      </CardContent>
    </Card>
  );
}
