# Configuración de Google Maps

Este documento explica cómo configurar correctamente Google Maps para esta aplicación.

## ⚠️ Advertencia de Consola - Google Maps Marker

Si ves este mensaje en la consola:
```
As of February 21st, 2024, google.maps.Marker is deprecated. Please use google.maps.marker.AdvancedMarkerElement instead.
```

**No te preocupes.** Esto es solo una advertencia, no un error:
- ✅ La aplicación funciona correctamente con `google.maps.Marker`
- ✅ Google continuará dando soporte a `Marker` por al menos 12 meses más
- ✅ Solo recibirá correcciones de bugs mayores
- ℹ️ La migración a `AdvancedMarkerElement` está planificada para futuras versiones
- ℹ️ Requiere configuración adicional de Map ID en Google Cloud Console

**Referencias:**
- [Aviso de Deprecación](https://developers.google.com/maps/deprecations)
- [Guía de Migración](https://developers.google.com/maps/documentation/javascript/advanced-markers/migration)

## Estado Actual

La aplicación actualmente usa:
- **API Key**: `AIzaSyBEy0sMDIrgAbQqsHqNQOu1ymVaKruKZJE`
- **Map ID**: `REAL_ESTATE_MAP` (necesita configuración)
- **Biblioteca**: `marker` (para AdvancedMarkerElement)
- **Carga**: `async` (mejor rendimiento)

## ¿Por qué AdvancedMarkerElement?

Desde febrero 21, 2024, `google.maps.Marker` está **deprecado**. Google recomienda usar `google.maps.marker.AdvancedMarkerElement` que ofrece:
- Mejor rendimiento
- Marcadores HTML personalizables
- Animaciones más fluidas
- Soporte a largo plazo

## Configuración Requerida

### 1. Crear un Map ID en Google Cloud Console

Para usar AdvancedMarkerElement, necesitas un **Map ID** válido:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto o crea uno nuevo
3. Ve a **APIs & Services** → **Credentials**
4. Busca tu API key y asegúrate de que tenga habilitada la **Maps JavaScript API**
5. Ve a **Maps** → **Map Management** → **Map IDs**
6. Haz clic en **Create Map ID**:
   - **Map name**: Real Estate Map
   - **Map type**: JavaScript
   - **Description**: Mapa para aplicación inmobiliaria
7. Copia el **Map ID** generado
8. Reemplaza `'REAL_ESTATE_MAP'` en `/components/MapView.tsx` (línea ~124) con tu Map ID

### 2. Habilitar APIs Requeridas

Asegúrate de que estas APIs estén habilitadas en tu proyecto:
- ✅ Maps JavaScript API
- ✅ Places API (opcional, para búsquedas)
- ✅ Geocoding API (opcional, para conversión de direcciones)

### 3. Actualizar el Map ID

En el archivo `/components/MapView.tsx`, busca:

```typescript
if (useAdvancedMarkers) {
  mapOptions.mapId = 'REAL_ESTATE_MAP'; // ← Reemplaza con tu Map ID
}
```

Reemplaza `'REAL_ESTATE_MAP'` con el Map ID que obtuviste en el paso 1.

## Fallback Automático

La aplicación incluye un **fallback inteligente**:
- Si AdvancedMarkerElement está disponible → lo usa (recomendado)
- Si no está disponible → usa marcadores clásicos automáticamente

Esto garantiza que el mapa siempre funcione, incluso durante la configuración.

## Solución de Problemas

### Error: "Google Maps JavaScript API has been loaded directly without loading=async"
✅ **Resuelto**: Ahora usamos `&loading=async` en la URL del script.

### Error: "google.maps.Marker is deprecated"
✅ **Resuelto**: Ahora usamos AdvancedMarkerElement cuando está disponible.

### El mapa no se muestra
1. Verifica que tu API key sea válida
2. Asegúrate de que Maps JavaScript API esté habilitada
3. Revisa la consola del navegador para errores específicos
4. Verifica que no haya restricciones de dominio en tu API key

### Los marcadores no aparecen
1. Verifica que hayas creado y configurado el Map ID
2. Asegúrate de que el Map ID esté correctamente copiado (sin espacios)
3. Espera unos minutos después de crear el Map ID (puede tardar en propagarse)

### "Map ID not found" o "Invalid Map ID"
1. Verifica que el Map ID esté correctamente escrito
2. Asegúrate de que el Map ID esté asociado con tu proyecto de Google Cloud
3. Verifica que la API key tenga permisos para usar ese Map ID

## Recursos Adicionales

- [Guía de Migración a AdvancedMarkerElement](https://developers.google.com/maps/documentation/javascript/advanced-markers/migration)
- [Documentación de Map IDs](https://developers.google.com/maps/documentation/javascript/cloud-based-map-styling#map-ids)
- [Deprecaciones de Google Maps](https://developers.google.com/maps/deprecations)
- [Best Practices de Carga](https://developers.google.com/maps/documentation/javascript/load-maps-js-api)

## Notas de Rendimiento

La configuración actual optimiza el rendimiento mediante:
- ✅ Carga asíncrona (`loading=async`)
- ✅ Atributos `async` y `defer` en el script
- ✅ Marcadores HTML personalizados (más livianos)
- ✅ Detección automática de capacidades
- ✅ Reutilización del script entre componentes

## Contacto y Soporte

Si tienes problemas con la configuración, consulta:
1. La consola del navegador para errores específicos
2. La consola de Google Cloud para el estado de las APIs
3. El registro de facturación (el exceso de solicitudes puede causar errores)
