# Configuración de Google Maps para Selector de Ubicación

## Introducción

Este proyecto utiliza Google Maps en el componente `LocationPicker` para permitir a los administradores seleccionar la ubicación exacta de sus proyectos habitacionales mediante:
- 🔍 Búsqueda de direcciones
- 📍 Clic en el mapa para seleccionar ubicación
- 🗺️ Geocodificación inversa (obtener dirección de coordenadas)

## Pasos para Obtener una API Key

### 1. Crear una Cuenta en Google Cloud Platform

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Inicia sesión con tu cuenta de Google
3. Si es tu primera vez, acepta los términos de servicio

### 2. Crear un Nuevo Proyecto

1. En la parte superior de la consola, haz clic en el selector de proyectos
2. Haz clic en "Nuevo Proyecto"
3. Asigna un nombre a tu proyecto (ej: "Costa Rica Residencial")
4. Haz clic en "Crear"

### 3. Habilitar las APIs Necesarias

1. En el menú lateral, ve a "APIs y servicios" > "Biblioteca"
2. Busca y habilita las siguientes APIs:
   - **Maps JavaScript API** (para mostrar el mapa) ✅
   - **Geocoding API** (para convertir direcciones en coordenadas) ✅
   - **Places API** (para búsqueda de ubicaciones) ✅

### 4. Crear una API Key

1. Ve a "APIs y servicios" > "Credenciales"
2. Haz clic en "+ CREAR CREDENCIALES"
3. Selecciona "Clave de API"
4. Se generará tu API Key - **¡guárdala en un lugar seguro!**

### 5. Configurar Restricciones de la API Key (Recomendado)

Por seguridad, es importante restringir el uso de tu API Key:

1. Haz clic en la API Key que acabas de crear
2. En "Restricciones de aplicación":
   - Selecciona "Referentes HTTP (sitios web)"
   - Agrega tus dominios permitidos:
     ```
     localhost:*
     *.localhost:*
     tu-dominio.com/*
     ```
3. En "Restricciones de API":
   - Selecciona "Restringir clave"
   - Marca las siguientes APIs:
     - Maps JavaScript API
     - Geocoding API
     - Places API
4. Haz clic en "Guardar"

## Configurar la API Key en el Proyecto

### Ubicación del Archivo

Abre el archivo `/components/LocationPicker.tsx`

### Reemplazar el Placeholder

Busca esta línea (aproximadamente línea 27):

```typescript
googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
```

Reemplázala con tu API Key:

```typescript
googleMapsApiKey: 'AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
```

## Características del LocationPicker

Una vez configurado, el componente ofrece:

### 1. Búsqueda de Direcciones
```typescript
// El usuario puede escribir una dirección
"San José, Costa Rica"
"Escazú, Costa Rica"
"Santa Ana, Pozos, San José"
```

### 2. Selección por Clic
- Haz clic en cualquier punto del mapa
- Obtiene automáticamente la dirección del punto seleccionado

### 3. Geocodificación Automática
- Convierte direcciones en coordenadas (lat/lng)
- Convierte coordenadas en direcciones legibles
- Limitado a Costa Rica para mayor precisión

### 4. Visualización de Ubicación
- Muestra un marcador en la posición seleccionada
- Despliega la dirección completa
- Muestra las coordenadas exactas

## Consideraciones Importantes

### 💰 Costos

Google Maps ofrece **$200 USD en créditos mensuales gratuitos**:

| Servicio | Crédito Gratuito Mensual |
|----------|--------------------------|
| Maps JavaScript API | ~28,000 cargas |
| Geocoding API | ~40,000 solicitudes |
| Places API | ~17,000 solicitudes |

Para la mayoría de proyectos en desarrollo, esto es **más que suficiente**.

### 📊 Uso Estimado del Proyecto

Para un proyecto habitacional típico:
- Cargas de mapa: ~10-50/día (creación de proyectos)
- Geocoding: ~10-50/día (búsquedas)
- Total mensual: ~600-1,500 solicitudes

**Muy por debajo del límite gratuito** ✅

### 🔒 Seguridad para Producción

**IMPORTANTE**: Para producción, considera:

1. **Variables de Entorno**
   ```typescript
   // .env file
   REACT_APP_GOOGLE_MAPS_KEY=AIzaSyXXXXXXXXXXXXXXXX
   
   // En LocationPicker.tsx
   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY || '',
   ```

2. **Backend Proxy** (Más seguro)
   - Tu API Key nunca se expone al cliente
   - El backend hace las llamadas a Google Maps
   - Mayor control sobre el uso

3. **Restricciones Estrictas**
   - Limita a dominios específicos
   - Restringe solo a las APIs necesarias
   - Monitorea el uso regularmente

### 🌍 Alternativas sin API Key

Si prefieres no usar Google Maps:

#### Opción 1: Coordenadas Manuales
```typescript
// Modificar LocationPicker para entrada manual
<Input label="Latitud" type="number" step="0.000001" />
<Input label="Longitud" type="number" step="0.000001" />
```

#### Opción 2: OpenStreetMap con Leaflet
```bash
npm install react-leaflet leaflet
```
- Completamente gratuito
- Sin límites de uso
- Menos características que Google Maps

#### Opción 3: Mapbox
```bash
npm install mapbox-gl
```
- 50,000 cargas gratuitas/mes
- API moderna y potente
- Requiere cuenta gratuita

## Solución de Problemas

### Error: "Google Maps JavaScript API error: ApiNotActivatedMapError"

**Causa**: La API no está habilitada en tu proyecto

**Solución**:
1. Ve a Google Cloud Console
2. Navega a "APIs y servicios" > "Biblioteca"
3. Busca "Maps JavaScript API"
4. Haz clic en "Habilitar"

### Error: "This API project is not authorized to use this API"

**Causa**: La API no está incluida en las restricciones de tu API Key

**Solución**:
1. Ve a "Credenciales" en Google Cloud Console
2. Edita tu API Key
3. En "Restricciones de API", selecciona las APIs necesarias
4. Guarda los cambios

### Error: "RefererNotAllowedMapError"

**Causa**: Tu dominio no está en la lista de referentes permitidos

**Solución**:
1. Edita tu API Key
2. Agrega `localhost:*` o tu dominio a los referentes HTTP
3. Guarda los cambios

### El mapa se carga pero la búsqueda no funciona

**Causa**: Places API o Geocoding API no están habilitadas

**Solución**:
1. Habilita ambas APIs en la Biblioteca
2. Agrégalas a las restricciones de tu API Key
3. Espera unos minutos para que se propaguen los cambios

### Error: "Loading chunk failed" o "Script loading error"

**Causa**: Problemas de red o bloqueadores de contenido

**Solución**:
1. Verifica tu conexión a internet
2. Desactiva bloqueadores de anuncios temporalmente
3. Revisa que no haya firewall bloqueando Google APIs

## Testing del Componente

### Prueba Básica
1. Inicia sesión como administrador
2. Ve a "Agregar Proyecto"
3. Desplázate hasta el mapa
4. Verifica que el mapa se carga correctamente

### Prueba de Búsqueda
1. Escribe "San José, Costa Rica" en el buscador
2. Haz clic en "Buscar"
3. Verifica que el mapa centra en San José
4. Verifica que aparece el marcador

### Prueba de Clic
1. Haz clic en cualquier punto del mapa
2. Verifica que aparece el marcador en ese punto
3. Verifica que se muestra la dirección obtenida

## Monitoreo de Uso

### Ver Estadísticas de Uso

1. Ve a Google Cloud Console
2. Selecciona tu proyecto
3. Ve a "APIs y servicios" > "Panel"
4. Verifica el uso de cada API

### Configurar Alertas de Cuota

1. Ve a "Cuotas y límites del sistema"
2. Selecciona las APIs
3. Configura alertas cuando llegues al 80% de tu cuota

### Establecer Límites Diarios

1. En "Cuotas", busca tu API
2. Haz clic en "Editar cuota"
3. Establece un límite diario razonable (ej: 1,000 solicitudes/día)

## Documentación Adicional

### Enlaces Útiles
- [Documentación de Google Maps Platform](https://developers.google.com/maps/documentation)
- [Calculadora de Precios](https://developers.google.com/maps/billing-and-pricing/pricing)
- [Mejores Prácticas de Seguridad](https://developers.google.com/maps/api-security-best-practices)
- [Ejemplos de Código](https://developers.google.com/maps/documentation/javascript/examples)

### Recursos de Aprendizaje
- [Tutorial de Google Maps React](https://www.npmjs.com/package/@react-google-maps/api)
- [Guía de Geocoding](https://developers.google.com/maps/documentation/geocoding/overview)
- [Stack Overflow - Google Maps](https://stackoverflow.com/questions/tagged/google-maps)

## Resumen de Configuración

✅ **Checklist Completo**:

- [ ] Cuenta de Google Cloud Platform creada
- [ ] Nuevo proyecto creado
- [ ] Maps JavaScript API habilitada
- [ ] Geocoding API habilitada
- [ ] Places API habilitada
- [ ] API Key creada
- [ ] Restricciones de dominio configuradas
- [ ] Restricciones de API configuradas
- [ ] API Key agregada a `LocationPicker.tsx`
- [ ] Mapa probado y funcionando

---

Una vez completada la configuración, el selector de ubicación estará completamente funcional y los administradores podrán:
- 🔍 Buscar y seleccionar ubicaciones precisas
- 📍 Guardar coordenadas exactas con cada proyecto
- 🗺️ Visualizar la ubicación en el mapa interactivo
- 💾 Almacenar la información de ubicación completa
