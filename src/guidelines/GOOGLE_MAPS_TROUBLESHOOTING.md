# Solución de Problemas - Google Maps

## ✅ Errores Corregidos Automáticamente

### Error: "Google Maps already loaded outside @googlemaps/js-api-loader"

**Causa**: Google Maps se estaba cargando múltiples veces

**Solución**: ✅ **Ya corregido**. El componente ahora usa una constante estática para `libraries`.

### Error: "Performance warning! LoadScript has been reloaded"

**Causa**: El array de libraries se estaba recreando en cada render

**Solución**: ✅ **Ya corregido**. Ahora usamos `GOOGLE_MAPS_LIBRARIES` como constante fuera del componente.

## 🔧 Modo de Entrada Manual (No Requiere Configuración)

El componente `LocationPicker` incluye un **modo de entrada manual** que te permite trabajar sin configurar Google Maps:

### Cómo Usarlo

1. Abre el formulario de "Agregar Proyecto"
2. Desplázate hasta la sección de ubicación
3. Haz clic en el botón **"Entrada Manual"**
4. Ingresa las coordenadas:
   - **Latitud**: Ej: `9.9281` (San José)
   - **Longitud**: Ej: `-84.0907` (San José)
5. Opcionalmente agrega una dirección
6. Haz clic en "Guardar Ubicación"

### Cómo Obtener Coordenadas

#### Opción 1: Desde Google Maps Web
1. Ve a [Google Maps](https://www.google.com/maps)
2. Busca tu ubicación
3. Haz clic derecho en el punto exacto
4. Selecciona las coordenadas (primer elemento del menú)
5. Se copiarán automáticamente al portapapeles

#### Opción 2: Desde la Barra de Búsqueda
1. Busca la ubicación en Google Maps
2. Las coordenadas aparecen en la URL o en la información del lugar

### Ventajas del Modo Manual

✅ No requiere API Key de Google  
✅ No tiene límites de uso  
✅ Funciona sin conexión a APIs externas  
✅ Perfecto para desarrollo rápido  
✅ Ideal cuando tienes coordenadas exactas  

## 🚨 Errores Comunes y Soluciones

### Error: "Geocoding Service: This API key is not authorized"

**Mensaje Completo**: 
```
Geocoding Service: This API key is not authorized to use this service or API.
```

**Causa**: La API Key no tiene permisos para Geocoding API

**Soluciones**:

#### Opción 1: Usar Modo Manual (Recomendado)
1. Haz clic en el botón **"Entrada Manual"**
2. El componente automáticamente sugerirá este modo si detecta el error
3. Continúa trabajando sin necesidad de configurar APIs

#### Opción 2: Habilitar Geocoding API
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto
3. Navega a "APIs y servicios" > "Biblioteca"
4. Busca **"Geocoding API"**
5. Haz clic en "Habilitar"
6. Ve a "Credenciales"
7. Edita tu API Key
8. En "Restricciones de API", agrega "Geocoding API"
9. Guarda los cambios
10. Espera 2-5 minutos para que se propague

### Error: "The webpage is not allowed to use the geocoder"

**Mensaje Completo**: 
```
REQUEST_DENIED: The webpage is not allowed to use the geocoder.
```

**Causa**: Restricciones de la API Key o falta de permisos

**Solución Automática**: 
El componente detecta este error y automáticamente:
- Muestra un mensaje sugiriendo entrada manual
- Cambia al modo manual si haces clic en el toggle

**Solución Manual**:
1. Verifica que **Geocoding API** esté habilitada
2. Revisa las restricciones de referentes HTTP:
   ```
   localhost:*
   *.localhost:*
   ```
3. Asegura que tu dominio esté en la lista permitida
4. Si usas restricciones de IP, verifica tu IP actual

### Error: "ApiNotActivatedMapError"

**Causa**: Maps JavaScript API no está habilitada

**Solución**:
1. Ve a Google Cloud Console
2. "APIs y servicios" > "Biblioteca"
3. Busca "Maps JavaScript API"
4. Haz clic en "Habilitar"
5. Espera unos minutos

**Solución Temporal**: Usa el modo de entrada manual mientras habilitas la API.

### Error: "RefererNotAllowedMapError"

**Causa**: Tu dominio no está en la lista de referentes permitidos

**Solución**:
1. Ve a Google Cloud Console > Credenciales
2. Edita tu API Key
3. En "Restricciones de aplicación":
   - Selecciona "Referentes HTTP (sitios web)"
4. Agrega los siguientes referentes:
   ```
   localhost:*
   *.localhost:*
   127.0.0.1:*
   tu-dominio.com/*
   *.tu-dominio.com/*
   ```
5. Guarda los cambios
6. Espera 2-5 minutos

### El mapa no se carga (Error General)

**Síntomas**: 
- Pantalla gris
- Mensaje de error
- Loader infinito

**Diagnóstico**:

1. **Abre la consola del navegador** (F12)
2. Busca errores rojos relacionados con Google Maps
3. Identifica el tipo de error específico (ver arriba)

**Solución Rápida**:
1. Haz clic en **"Entrada Manual"**
2. Continúa trabajando sin el mapa
3. Configura Google Maps más tarde si lo necesitas

**Solución Completa**:
1. Verifica que tu API key sea válida
2. Asegúrate de que Maps JavaScript API esté habilitada
3. Revisa las restricciones de la API Key
4. Verifica que no haya bloqueadores de contenido
5. Prueba en modo incógnito

### El mapa carga pero la búsqueda no funciona

**Síntomas**:
- El mapa se ve correctamente
- Puedes hacer clic y ver el marcador
- La búsqueda de direcciones falla

**Causa**: Geocoding API o Places API no habilitadas

**Solución**:
1. Habilita **Geocoding API** en la Biblioteca
2. Habilita **Places API** en la Biblioteca
3. Agrégalas a las restricciones de tu API Key
4. Guarda los cambios
5. Espera 2-5 minutos
6. Recarga la página

**Alternativa**: Usa el modo manual y haz clic directamente en el mapa para seleccionar ubicaciones.

### Error de Red o Timeout

**Síntomas**:
- "Loading chunk failed"
- "Script loading error"
- "Network error"

**Soluciones**:

1. **Verifica tu conexión a internet**
2. **Desactiva bloqueadores**:
   - Bloqueadores de anuncios
   - Extensiones de privacidad
   - VPN temporal
3. **Verifica firewall/proxy**:
   - Asegura que `googleapis.com` no esté bloqueado
4. **Prueba en otro navegador**
5. **Limpia caché del navegador**

## 📊 Testing del Componente

### Test Básico - Modo Manual

```
✅ Checklist:
1. [ ] El formulario de proyecto se carga
2. [ ] El botón "Entrada Manual" es visible
3. [ ] Al hacer clic, aparecen los campos de coordenadas
4. [ ] Puedes ingresar latitud y longitud
5. [ ] Al guardar, aparece la tarjeta de ubicación seleccionada
6. [ ] Las coordenadas se muestran correctamente
```

### Test Completo - Modo Mapa

```
✅ Checklist:
1. [ ] El mapa de Google se carga correctamente
2. [ ] Puedes hacer zoom in/out
3. [ ] Puedes arrastrar el mapa
4. [ ] Al buscar "San José, Costa Rica" se centra en San José
5. [ ] Al hacer clic en el mapa aparece el marcador
6. [ ] La dirección se obtiene automáticamente (geocoding inverso)
7. [ ] Las coordenadas se muestran correctamente
8. [ ] El toggle entre mapa y manual funciona
```

## 🔍 Información de Depuración

### Verificar API Key

Abre la consola del navegador y ejecuta:

```javascript
// Verifica si Google Maps está cargado
console.log('Google Maps:', typeof google !== 'undefined' ? 'Loaded' : 'Not loaded');

// Verifica si Geocoder está disponible
if (typeof google !== 'undefined') {
  console.log('Geocoder:', typeof google.maps.Geocoder !== 'undefined' ? 'Available' : 'Not available');
}
```

### Verificar Errores Específicos

En la consola, busca:
- `js?key=` - Muestra qué API key se está usando
- `REQUEST_DENIED` - Problema de permisos
- `OVER_QUERY_LIMIT` - Has excedido el límite de uso
- `INVALID_REQUEST` - Solicitud malformada

## 💡 Mejores Prácticas

### Para Desarrollo

✅ **Usa modo manual inicialmente**
- Desarrolla más rápido sin configurar APIs
- Evita gastar cuota de Google Maps durante desarrollo
- Configura Google Maps solo cuando lo necesites

### Para Producción

✅ **Configura Google Maps correctamente**
- Mejora la experiencia del usuario
- Permite búsqueda de direcciones
- Visualización interactiva

✅ **Establece límites de cuota**
- Configura alertas en Google Cloud Console
- Establece límites diarios razonables
- Monitorea el uso regularmente

## 📞 Soporte Adicional

### Recursos Útiles

- [Documentación oficial de Google Maps](https://developers.google.com/maps/documentation)
- [Estado de Google Maps](https://status.cloud.google.com/)
- [Stack Overflow - Google Maps](https://stackoverflow.com/questions/tagged/google-maps)
- [Comunidad de Google Maps Platform](https://groups.google.com/g/google-maps-js-api-v3)

### Si Nada Funciona

1. **Usa el modo manual** - Siempre funciona
2. **Revisa la guía completa** en `/guidelines/GOOGLE_MAPS_PROJECT_SETUP.md`
3. **Verifica el estado de Google APIs** en status.cloud.google.com
4. **Contacta soporte de Google Cloud** si tienes facturación activa

---

**Recuerda**: El modo de entrada manual te permite trabajar sin interrupciones mientras resuelves cualquier problema con Google Maps. Es una alternativa completamente funcional y profesional.
