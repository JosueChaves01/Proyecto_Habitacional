import {
  useEffect,
  useRef,
  useState,
} from "react";
import { MapPin, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export interface MapLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: "project" | "property";
  count?: number; // For grouped properties
}

interface MapViewProps {
  locations: MapLocation[];
  onLocationClick?: (location: MapLocation) => void;
  selectedId?: string;
  className?: string;
}

// Google Maps API Key - Replace with your actual key
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

// Check if we should load the map (API key is configured)
const shouldLoadMap = GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== "YOUR_GOOGLE_MAPS_API_KEY";

export function MapView({
  locations,
  onLocationClick,
  selectedId,
  className = "",
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<(google.maps.marker.AdvancedMarkerElement | google.maps.Marker)[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<MapLocation | null>(null);
  const [useAdvancedMarkers, setUseAdvancedMarkers] = useState(false);

  // Load Google Maps API
  useEffect(() => {
    // Don't load if API key is not configured
    if (!shouldLoadMap) {
      setLoadError(true);
      return;
    }
    
    let timeoutId: NodeJS.Timeout | null = null;
    let checkInterval: NodeJS.Timeout | null = null;
    
    // Check if already loaded
    if (window.google && window.google.maps && window.google.maps.Map) {
      // Check if advanced markers are available
      const hasAdvancedMarkers = !!(window.google.maps.marker && window.google.maps.marker.AdvancedMarkerElement);
      setUseAdvancedMarkers(hasAdvancedMarkers);
      setIsLoaded(true);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector(
      `script[src*="maps.googleapis.com"]`
    );
    if (existingScript) {
      // Script exists, wait for it to load
      checkInterval = setInterval(() => {
        if (window.google && window.google.maps && window.google.maps.Map) {
          clearInterval(checkInterval);
          const hasAdvancedMarkers = !!(window.google.maps.marker && window.google.maps.marker.AdvancedMarkerElement);
          setUseAdvancedMarkers(hasAdvancedMarkers);
          setIsLoaded(true);
        }
      }, 100);
      
      // Timeout after 10 seconds
      timeoutId = setTimeout(() => {
        if (checkInterval) clearInterval(checkInterval);
        if (!window.google || !window.google.maps || !window.google.maps.Map) {
          setLoadError(true);
        }
      }, 10000);
      
      return () => {
        if (checkInterval) clearInterval(checkInterval);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }

    // Load the script with async loading and marker library
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=marker&loading=async`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // Wait a bit for the library to fully initialize
      checkInterval = setInterval(() => {
        if (window.google && window.google.maps && window.google.maps.Map) {
          if (checkInterval) clearInterval(checkInterval);
          const hasAdvancedMarkers = !!(window.google.maps.marker && window.google.maps.marker.AdvancedMarkerElement);
          setUseAdvancedMarkers(hasAdvancedMarkers);
          setIsLoaded(true);
        }
      }, 50);
      
      timeoutId = setTimeout(() => {
        if (checkInterval) clearInterval(checkInterval);
        if (window.google && window.google.maps && window.google.maps.Map) {
          const hasAdvancedMarkers = !!(window.google.maps.marker && window.google.maps.marker.AdvancedMarkerElement);
          setUseAdvancedMarkers(hasAdvancedMarkers);
          setIsLoaded(true);
        } else {
          setLoadError(true);
        }
      }, 5000);
    };
    
    script.onerror = () => {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error("Failed to load Google Maps API");
      }
      setLoadError(true);
    };
    
    document.head.appendChild(script);

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (timeoutId) clearTimeout(timeoutId);
      // Don't remove the script as it may be used by other components
    };
  }, []);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || googleMapRef.current)
      return;

    // Verify google.maps is available
    if (!window.google || !window.google.maps || !window.google.maps.Map) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error("Google Maps API not properly loaded");
      }
      setLoadError(true);
      return;
    }

    try {
      // Costa Rica center
      const center = { lat: 9.75, lng: -84.25 };

      const mapOptions: google.maps.MapOptions = {
        center,
        zoom: 8,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
      };

      // Add mapId if using advanced markers
      if (useAdvancedMarkers) {
        mapOptions.mapId = 'REAL_ESTATE_MAP';
      }

      googleMapRef.current = new google.maps.Map(mapRef.current, mapOptions);

      infoWindowRef.current = new google.maps.InfoWindow();
    } catch (error) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error("Error initializing map:", error);
      }
      setLoadError(true);
    }
  }, [isLoaded, useAdvancedMarkers]);

  // Create custom marker element for Advanced Markers
  const createAdvancedMarkerElement = (
    location: MapLocation,
    isSelected: boolean
  ): HTMLElement => {
    const size = location.count && location.count > 1 ? 28 : 20;
    const color = location.type === "project" ? "#3b82f6" : "#22c55e";
    const borderColor = isSelected ? "#fbbf24" : "#ffffff";
    const borderWidth = isSelected ? 3 : 2;
    
    const markerElement = document.createElement('div');
    markerElement.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background-color: ${color};
      border: ${borderWidth}px solid ${borderColor};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      color: #ffffff;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    `;
    
    if (location.count && location.count > 1) {
      markerElement.textContent = location.count.toString();
    }
    
    return markerElement;
  };

  // Create custom marker icon as SVG (for classic markers)
  const createMarkerIcon = (
    location: MapLocation,
    isSelected: boolean
  ): google.maps.Icon => {
    const size = location.count && location.count > 1 ? 28 : 20;
    const color = location.type === "project" ? "#3b82f6" : "#22c55e";
    const borderColor = isSelected ? "#fbbf24" : "#ffffff";
    const borderWidth = isSelected ? 3 : 2;
    const opacity = isSelected ? 1 : 0.9;
    
    // Create SVG for the marker
    const svg = `
      <svg width="${size + borderWidth * 2}" height="${size + borderWidth * 2}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${size / 2 + borderWidth}" cy="${size / 2 + borderWidth}" r="${size / 2}" 
          fill="${color}" stroke="${borderColor}" stroke-width="${borderWidth}" opacity="${opacity}"
          filter="drop-shadow(0 2px 6px rgba(0,0,0,0.3))"/>
        ${location.count && location.count > 1 
          ? `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
             fill="white" font-size="12" font-weight="bold" dy="0.05em">${location.count}</text>`
          : ''}
      </svg>
    `;
    
    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
      scaledSize: new google.maps.Size(size + borderWidth * 2, size + borderWidth * 2),
      anchor: new google.maps.Point((size + borderWidth * 2) / 2, (size + borderWidth * 2) / 2),
    };
  };

  // Update markers when locations change
  useEffect(() => {
    if (!isLoaded || !googleMapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      if ('setMap' in marker) {
        marker.setMap(null);
      }
    });
    markersRef.current = [];

    // Create new markers based on available API
    locations.forEach((location) => {
      const isSelected = selectedId === location.id;

      if (useAdvancedMarkers && window.google.maps.marker?.AdvancedMarkerElement) {
        // Use Advanced Marker Element (recommended)
        const markerElement = createAdvancedMarkerElement(location, isSelected);
        
        // Add hover effects
        markerElement.addEventListener('mouseenter', () => {
          markerElement.style.transform = 'scale(1.15)';
        });
        
        markerElement.addEventListener('mouseleave', () => {
          markerElement.style.transform = 'scale(1)';
        });

        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: { lat: location.lat, lng: location.lng },
          map: googleMapRef.current!,
          title: location.name,
          content: markerElement,
        });

        marker.addListener("click", () => {
          setSelectedLocation(location);
          onLocationClick?.(location);

          // Show info window
          if (infoWindowRef.current) {
            const content = `
              <div style="padding: 8px;">
                <h3 style="margin: 0 0 4px 0; font-weight: 600; font-size: 14px;">${location.name}</h3>
                <p style="margin: 0; font-size: 12px; color: #666;">
                  ${location.type === "project" ? "Proyecto" : "Propiedad"}
                  ${location.count && location.count > 1 ? ` - ${location.count} propiedades` : ""}
                </p>
              </div>
            `;
            infoWindowRef.current.setContent(content);
            infoWindowRef.current.open({
              anchor: marker,
              map: googleMapRef.current!,
            });
          }
        });

        markersRef.current.push(marker);
      } else {
        // Fallback to classic Marker (with deprecation warning suppressed)
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: googleMapRef.current!,
          title: location.name,
          icon: createMarkerIcon(location, isSelected),
          animation: isSelected ? google.maps.Animation.BOUNCE : undefined,
        });

        // Stop bounce animation after 2 seconds
        if (isSelected) {
          setTimeout(() => {
            marker.setAnimation(null);
          }, 2000);
        }

        marker.addListener("click", () => {
          setSelectedLocation(location);
          onLocationClick?.(location);

          // Show info window
          if (infoWindowRef.current) {
            const content = `
              <div style="padding: 8px;">
                <h3 style="margin: 0 0 4px 0; font-weight: 600; font-size: 14px;">${location.name}</h3>
                <p style="margin: 0; font-size: 12px; color: #666;">
                  ${location.type === "project" ? "Proyecto" : "Propiedad"}
                  ${location.count && location.count > 1 ? ` - ${location.count} propiedades` : ""}
                </p>
              </div>
            `;
            infoWindowRef.current.setContent(content);
            infoWindowRef.current.open({
              anchor: marker,
              map: googleMapRef.current!,
            });
          }
        });

        // Add hover effect
        marker.addListener("mouseover", () => {
          const icon = marker.getIcon() as google.maps.Icon;
          if (icon && icon.scaledSize) {
            const newSize = new google.maps.Size(
              icon.scaledSize.width * 1.1,
              icon.scaledSize.height * 1.1
            );
            marker.setIcon({
              ...icon,
              scaledSize: newSize,
            });
          }
        });

        marker.addListener("mouseout", () => {
          marker.setIcon(createMarkerIcon(location, isSelected));
        });

        markersRef.current.push(marker);
      }
    });

    // Fit bounds to show all markers
    if (locations.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      locations.forEach((location) => {
        bounds.extend({ lat: location.lat, lng: location.lng });
      });
      googleMapRef.current!.fitBounds(bounds);

      // Add padding and adjust zoom
      google.maps.event.addListenerOnce(
        googleMapRef.current!,
        "bounds_changed",
        () => {
          const currentZoom = googleMapRef.current!.getZoom();
          if (currentZoom && currentZoom > 12) {
            googleMapRef.current!.setZoom(12);
          }
        },
      );
    }
  }, [isLoaded, locations, selectedId, onLocationClick, useAdvancedMarkers]);

  // Update marker styles when selection changes
  useEffect(() => {
    if (!isLoaded) return;

    markersRef.current.forEach((marker, index) => {
      const location = locations[index];
      if (!location) return;

      const isSelected = selectedId === location.id;

      if (useAdvancedMarkers && 'content' in marker) {
        // Update Advanced Marker
        const markerElement = marker.content as HTMLElement;
        if (markerElement) {
          const size = location.count && location.count > 1 ? 28 : 20;
          const borderColor = isSelected ? "#fbbf24" : "#ffffff";
          const borderWidth = isSelected ? 3 : 2;
          markerElement.style.border = `${borderWidth}px solid ${borderColor}`;
        }
      } else if ('setIcon' in marker) {
        // Update Classic Marker
        const classicMarker = marker as google.maps.Marker;
        classicMarker.setIcon(createMarkerIcon(location, isSelected));
        
        // Add bounce animation to selected marker
        if (isSelected) {
          classicMarker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(() => {
            classicMarker.setAnimation(null);
          }, 2000);
        } else {
          classicMarker.setAnimation(null);
        }
      }
    });
  }, [selectedId, locations, isLoaded, useAdvancedMarkers]);

  if (loadError) {
    return (
      <div className={className}>
        <Card>
          <CardContent className="p-0">
            <div className="h-[500px] flex items-center justify-center bg-muted">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto text-destructive mb-2" />
                <p className="text-sm text-muted-foreground">
                  Error al cargar el mapa
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Verifica la API key de Google Maps
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={className}>
        <Card>
          <CardContent className="p-0">
            <div className="h-[500px] flex items-center justify-center bg-muted">
              <div className="text-center">
                <div className="animate-pulse mb-2">
                  <MapPin className="h-12 w-12 mx-auto text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Cargando mapa...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <div ref={mapRef} className="w-full h-[500px]" />

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm p-3 rounded-lg border shadow-lg z-10">
              <div className="text-xs font-semibold mb-2">
                Leyenda
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white" />
                  <span>Proyectos</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                  <span>Propiedades</span>
                </div>
              </div>
            </div>

            {/* Location Info Card */}
            {selectedLocation && (
              <div className="absolute top-4 right-4 max-w-xs z-10">
                <Card className="shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold">
                          {selectedLocation.name}
                        </h3>
                        {selectedLocation.count &&
                          selectedLocation.count > 1 && (
                            <p className="text-sm text-muted-foreground">
                              {selectedLocation.count}{" "}
                              propiedades en este proyecto
                            </p>
                          )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLocation(null);
                          if (infoWindowRef.current) {
                            infoWindowRef.current.close();
                          }
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Badge
                      variant={
                        selectedLocation.type === "project"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {selectedLocation.type === "project"
                        ? "Proyecto"
                        : "Propiedad"}
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* API Key Warning */}
            {GOOGLE_MAPS_API_KEY ===
              "YOUR_GOOGLE_MAPS_API_KEY" && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                  <CardContent className="p-3">
                    <p className="text-xs text-yellow-800 dark:text-yellow-200">
                      ⚠️ Configura tu Google Maps API Key en
                      MapView.tsx
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}