# Sistema de Gradientes Dinámicos para Precios

## Concepto

Este sistema aplica gradientes de color dinámicos a los precios de las propiedades basándose en su valor, utilizando la paleta de colores inspirada en Costa Rica:

- **Precios Bajos**: Colores cálidos de Guanacaste (rojos, naranjas, amarillos) - representan el atardecer y las playas del Pacífico
- **Precios Altos**: Colores frescos de los bosques y océanos (verde esmeralda, turquesa) - representan la naturaleza exuberante de Alajuela

## Rangos de Precios

### 1. Súper Accesible (< $150,000)
- **Gradiente**: Rojo → Naranja → Amarillo
- **Inspiración**: Atardeceres intensos de Guanacaste
- **Uso**: Propiedades más accesibles

### 2. Accesible ($150,000 - $250,000)
- **Gradiente**: Naranja → Ámbar → Amarillo claro
- **Inspiración**: Arenas doradas de las playas
- **Uso**: Propiedades de precio medio-bajo

### 3. Valor Intermedio ($250,000 - $350,000)
- **Gradiente**: Ámbar → Lima → Esmeralda
- **Inspiración**: Transición de playa a bosque tropical
- **Uso**: Propiedades de gama media

### 4. Premium ($350,000 - $450,000)
- **Gradiente**: Esmeralda → Verde → Teal
- **Inspiración**: Bosques tropicales de Alajuela
- **Uso**: Propiedades premium

### 5. Ultra Premium (> $450,000)
- **Gradiente**: Esmeralda oscuro → Teal → Cian
- **Inspiración**: Océano Pacífico profundo y bosques nubosos
- **Uso**: Propiedades de lujo

## Implementación

### Función Utilitaria

```typescript
import { getPriceGradient } from './components/ui/price-utils';

const priceStyle = getPriceGradient(property.price);
```

### Propiedades Retornadas

```typescript
{
  gradient: string;        // Clases de gradiente para fondos
  textGradient: string;    // Clases de gradiente para texto
  glowColor: string;       // Color de sombra/resplandor
  borderColor: string;     // Color de borde
  bgColor: string;         // Fondo con gradiente sutil
}
```

### Ejemplo de Uso

```tsx
<div className={`${priceStyle.bgColor} px-4 py-2 rounded-xl ${priceStyle.borderColor} border-2 ${priceStyle.glowColor}`}>
  <span className={`text-4xl font-bold bg-gradient-to-r ${priceStyle.textGradient} bg-clip-text text-transparent`}>
    ${property.price.toLocaleString()}
  </span>
</div>
```

## Componentes Actualizados

Los siguientes componentes ahora usan gradientes dinámicos:

1. **PropertyCard** - Precio en la esquina inferior de la imagen
2. **PropertyDetail** - Precio principal en la cabecera
3. **HomePage** - Precio en tarjetas de desarrolladores
4. **FilteredPropertiesList** - A través de PropertyCard
5. **AllPropertiesView** - A través de PropertyCard

## Visualización

Para ver una demostración visual de todos los rangos de precio, puedes importar:

```tsx
import { PriceScaleDemo } from './components/PriceScaleDemo';
```

## Beneficios

1. **Visual atractivo**: Los precios destacan con colores vibrantes
2. **Jerarquía clara**: Los usuarios identifican rápidamente el rango de precio
3. **Identidad de marca**: Refuerza los colores temáticos de Costa Rica
4. **Accesibilidad**: Buenos contrastes en modo claro y oscuro
5. **Consistencia**: Mismo sistema aplicado en toda la aplicación

## Personalización

Para ajustar los umbrales de precio, edita el archivo `/components/ui/price-utils.ts`:

```typescript
const PRICE_THRESHOLDS = {
  LOW: 150000,      // Ajusta según necesidad
  MID_LOW: 250000,
  MID_HIGH: 350000,
  HIGH: 450000
};
```
