import { createContext, useContext, ReactNode } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

// IMPORTANTE: Mantener libraries como constante para evitar re-renders
const GOOGLE_MAPS_LIBRARIES: ("places" | "geometry" | "drawing")[] = ["places", "drawing", "geometry"];

// Google Maps API Key - Replace with your actual key
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

interface GoogleMapsContextType {
  isLoaded: boolean;
  loadError: Error | undefined;
}

const GoogleMapsContext = createContext<GoogleMapsContextType>({
  isLoaded: false,
  loadError: undefined,
});

export function useGoogleMaps() {
  return useContext(GoogleMapsContext);
}

interface GoogleMapsProviderProps {
  children: ReactNode;
}

export function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  // If no API key is configured, don't load the map
  const shouldLoadMaps = GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== "YOUR_GOOGLE_MAPS_API_KEY";
  
  // Only call useJsApiLoader if we should load maps
  const loaderResult = useJsApiLoader({
    googleMapsApiKey: shouldLoadMaps ? GOOGLE_MAPS_API_KEY : "",
    libraries: shouldLoadMaps ? GOOGLE_MAPS_LIBRARIES : [],
    id: shouldLoadMaps ? 'google-map-script' : undefined,
    preventGoogleFontsLoading: !shouldLoadMaps,
  });

  const contextValue = shouldLoadMaps 
    ? { isLoaded: loaderResult.isLoaded, loadError: loaderResult.loadError }
    : { isLoaded: false, loadError: new Error('Google Maps API Key not configured') };

  return (
    <GoogleMapsContext.Provider value={contextValue}>
      {children}
    </GoogleMapsContext.Provider>
  );
}