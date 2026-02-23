# Mapeo de Áreas de Proyectos Habitacionales

## 📍 Visión General

Esta funcionalidad permite a los administradores definir el área geográfica completa que cubre un proyecto habitacional mediante la selección de múltiples puntos en el mapa que forman un polígono.

## 🎯 Casos de Uso

### ¿Cuándo usar el Área del Proyecto?

**Usar Área (Polígono):**
- Proyectos habitacionales grandes que cubren múltiples manzanas
- Condominios horizontales con casas distribuidas en un terreno amplio
- Desarrollos habitacionales con fases en diferentes ubicaciones
- Proyectos con áreas verdes, amenidades y zonas comunes extensas

**Usar Punto Central:**
- Edificios verticales (apartamentos)
- Proyectos pequeños en una sola ubicación
- Torres residenciales

## 🛠️ Componentes Implementados

### 1. **AreaPicker** (`/components/AreaPicker.tsx`)

Componente interactivo para definir áreas en el mapa.

**Características:**
- ✅ Modo de dibujo interactivo
- ✅ Mínimo 3 puntos para formar un polígono válido
- ✅ Visualización en tiempo real del área
- ✅ Edición y eliminación de puntos
- ✅ Validación automática
- ✅ Marcadores numerados para cada punto
- ✅ Lista de coordenadas de todos los puntos

**Props:**
```typescript
interface AreaPickerProps {
  onAreaSelect: (area: Array<{ lat: number; lng: number }>) => void;
  initialArea?: Array<{ lat: number; lng: number }>;
  centerLocation?: { lat: number; lng: number };
}
```

### 2. **ProjectAreaMap** (`/components/ProjectAreaMap.tsx`)

Componente para visualizar el área de un proyecto.

**Características:**
- ✅ Muestra polígono con relleno semi-transparente
- ✅ Marcadores en cada vértice del polígono
- ✅ Fallback a punto central si no hay área
- ✅ Configurable (altura, título, etc.)

**Props:**
```typescript
interface ProjectAreaMapProps {
  projectName: string;
  center?: { lat: number; lng: number };
  projectArea?: Array<{ lat: number; lng: number }>;
  showTitle?: boolean;
  height?: string;
}
```

### 3. **Actualización de Tipos**

```typescript
export interface Project {
  // ... otros campos ...
  coordinates?: {
    lat: number;
    lng: number;
  };
  // Nuevo campo para el área del proyecto
  projectArea?: Array<{
    lat: number;
    lng: number;
  }>;
}
```

## 📋 Flujo de Uso

### Para Administradores

#### 1. Crear Proyecto con Área

1. Ve al Dashboard de Administrador
2. Haz clic en "Agregar Proyecto"
3. Llena la información básica
4. En la sección "Ubicación del Proyecto":
   - Selecciona la pestaña **"Área del Proyecto"**
5. Haz clic en **"Comenzar a Dibujar"**
6. Haz clic en el mapa para agregar puntos (mínimo 3)
7. Los puntos se conectan automáticamente formando un polígono
8. Haz clic en **"Completar Polígono"** cuando termines
9. Continúa con el resto del formulario

#### 2. Editar Área del Proyecto

1. Mientras dibujas, puedes:
   - Hacer clic en un marcador para eliminarlo
   - Hacer clic en "Editar Área" para agregar más puntos
   - Hacer clic en "Limpiar" para empezar de nuevo

### Para Usuarios Visitantes

El área del proyecto se muestra automáticamente en:

1. **Vista de Detalle del Proyecto**
   - Polígono verde semi-transparente
   - Marcadores en cada vértice
   - Información del área definida

2. **Catálogo de Proyectos**
   - (Futuro) Mapa general con todos los proyectos

## 🎨 Estilo Visual

### Colores del Polígono

```css
/* Relleno */
fillColor: #047857 (Verde esmeralda Costa Rica)
fillOpacity: 0.25

/* Borde */
strokeColor: #047857
strokeOpacity: 0.9
strokeWeight: 3
```

### Marcadores

- **Verde esmeralda** (#047857)
- Numerados del 1 al N
- Borde blanco para contraste
- Click para eliminar (modo edición)

## 🔄 Integración con Formulario

### ProjectForm.tsx

El formulario usa **Tabs** para alternar entre:

1. **Punto Central**: Para ubicación única (LocationPicker)
2. **Área del Proyecto**: Para definir polígono (AreaPicker)

```tsx
<Tabs defaultValue="point">
  <TabsList>
    <TabsTrigger value="point">Punto Central</TabsTrigger>
    <TabsTrigger value="area">Área del Proyecto</TabsTrigger>
  </TabsList>
  
  <TabsContent value="point">
    <LocationPicker ... />
  </TabsContent>
  
  <TabsContent value="area">
    <AreaPicker ... />
  </TabsContent>
</Tabs>
```

### Cálculo Automático de Centro

Si se define un área pero no un punto central, el sistema calcula automáticamente el centroide:

```typescript
const centerLat = area.reduce((sum, point) => sum + point.lat, 0) / area.length;
const centerLng = area.reduce((sum, point) => sum + point.lng, 0) / area.length;
```

## 💾 Almacenamiento

### LocalStorage

Los datos del área se guardan en `localStorage` con cada proyecto:

```json
{
  "id": "project-123",
  "name": "Residencial Costa Verde",
  "coordinates": {
    "lat": 9.9281,
    "lng": -84.0907
  },
  "projectArea": [
    { "lat": 9.9281, "lng": -84.0907 },
    { "lat": 9.9291, "lng": -84.0907 },
    { "lat": 9.9291, "lng": -84.0897 },
    { "lat": 9.9281, "lng": -84.0897 }
  ]
}
```

## 📐 Validaciones

### Mínimo de Puntos

- **Mínimo:** 3 puntos (para formar un triángulo)
- **Recomendado:** 4-8 puntos (para definir bien el área)

### Visual Feedback

```typescript
// Badge de estado
{polygonPoints.length >= 3 ? (
  <Badge variant="outline">✓ Área válida</Badge>
) : (
  <span>(Mínimo 3 puntos para formar un área)</span>
)}
```

## 🗺️ Visualización en Vistas

### ProjectDetailView

```tsx
{(project.projectArea && project.projectArea.length >= 3) || project.coordinates ? (
  <ProjectAreaMap
    projectName={project.name}
    center={project.coordinates}
    projectArea={project.projectArea}
    showTitle={true}
    height="500px"
  />
) : null}
```

## 🚀 Mejoras Futuras

### Fase 2
- [ ] Calcular área real en metros cuadrados
- [ ] Mostrar perímetro del polígono
- [ ] Snap to roads (ajustar a calles)
- [ ] Importar/exportar coordenadas (KML, GeoJSON)

### Fase 3
- [ ] Mapa general con todos los proyectos
- [ ] Filtrar proyectos por proximidad
- [ ] Mostrar densidad de proyectos por zona
- [ ] Comparar áreas de diferentes proyectos

### Fase 4
- [ ] Integración con catastro
- [ ] Capas adicionales (escuelas, comercios, etc.)
- [ ] Heatmap de disponibilidad
- [ ] Rutas y distancias a puntos de interés

## 🔧 Solución de Problemas

### El polígono no se cierra correctamente

**Problema:** Los puntos no forman un polígono cerrado.

**Solución:** Google Maps cierra automáticamente el polígono. Asegúrate de tener al menos 3 puntos.

### Los marcadores se superponen

**Problema:** Puntos muy cercanos dificultan la selección.

**Solución:** Haz zoom antes de agregar puntos cercanos.

### Error al guardar el área

**Problema:** El área no se guarda con el proyecto.

**Solución:** 
1. Verifica que hayas hecho clic en "Completar Polígono"
2. Asegúrate de tener mínimo 3 puntos
3. Revisa la consola para errores de validación

## 📱 Responsividad

El componente se adapta a diferentes tamaños de pantalla:

- **Desktop:** Mapa completo 500px altura
- **Tablet:** Mapa adaptado, controles apilados
- **Mobile:** Mapa reducido, lista de puntos scrollable

## 🎓 Ejemplos de Uso

### Proyecto Horizontal Grande

```typescript
// Condominio de 10 hectáreas con 50 casas
projectArea: [
  { lat: 9.9280, lng: -84.0920 },
  { lat: 9.9290, lng: -84.0920 },
  { lat: 9.9295, lng: -84.0910 },
  { lat: 9.9290, lng: -84.0900 },
  { lat: 9.9280, lng: -84.0900 },
  { lat: 9.9275, lng: -84.0910 }
]
```

### Torre Vertical

```typescript
// Edificio de 20 pisos - usar punto central
coordinates: { lat: 9.9285, lng: -84.0910 }
projectArea: undefined
```

## 🌟 Características Destacadas

1. **Intuitividad**: Dibujar en el mapa es natural y fácil
2. **Flexibilidad**: Soporta desde triángulos hasta polígonos complejos
3. **Precisión**: Coordenadas GPS exactas
4. **Visual**: Colores Costa Rica coherentes con la aplicación
5. **Validación**: Feedback inmediato sobre el estado del área

---

**Última actualización:** Octubre 2025  
**Versión:** 1.0.0
