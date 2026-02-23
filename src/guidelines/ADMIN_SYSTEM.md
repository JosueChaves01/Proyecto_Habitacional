# Sistema de Administración

## Visión General

El sistema de administración permite a los usuarios registrarse como administradores, registrar sus empresas constructoras y gestionar proyectos habitacionales y propiedades.

## Componentes Implementados

### 1. AdminAuth (`/components/AdminAuth.tsx`)
Modal de autenticación con dos pestañas:
- **Iniciar Sesión**: Para usuarios existentes
- **Registrarse**: Para nuevos administradores

**Características:**
- Validación de formularios
- Almacenamiento en localStorage
- Mensajes de error informativos
- Auto-login después del registro

### 2. CompanyRegistration (`/components/CompanyRegistration.tsx`)
Formulario para registrar o editar información de la empresa constructora.

**Campos requeridos:**
- Nombre de la empresa
- Descripción
- Email
- Teléfono

**Campos opcionales:**
- Sitio web
- Dirección
- URL del logo

**Características:**
- Validación completa
- Mensajes de éxito/error
- Modo edición para empresas existentes
- Diseño paso a paso (Paso 1 de 2)

### 3. AdminDashboard (`/components/AdminDashboard.tsx`)
Panel principal de administración del usuario.

**Secciones:**
- Vista general con estadísticas
- Información de la empresa
- Acciones rápidas
- Guía de inicio

**Estadísticas mostradas:**
- Proyectos activos
- Proyectos completados
- Total de propiedades

### 4. Navbar actualizado (`/components/Navbar.tsx`)
Incluye botón de "Iniciar Sesión" que:
- Muestra el estado de autenticación
- Permite iniciar sesión / cerrar sesión
- Muestra nombre del usuario y badge "Admin"

## Flujo de Usuario

### Primer Uso (Nuevo Administrador)

1. **Clic en "Iniciar Sesión"** en el Navbar
2. **Registrarse** en el modal de autenticación
   - Ingresar nombre completo
   - Ingresar email
   - Crear contraseña (mínimo 6 caracteres)
   - Confirmar contraseña
3. **Auto-login** y redirección al panel de administración
4. **Completar formulario de empresa** (Paso 1)
   - Información básica de la empresa
   - Datos de contacto
   - Logo (opcional)
5. **Vista del Dashboard** con guía de inicio
6. **Próximo paso**: Agregar proyectos habitacionales (próximamente)

### Usuario Existente

1. **Clic en "Iniciar Sesión"**
2. **Ingresar credenciales**
3. **Acceso directo al Dashboard**
4. **Gestión de empresa y proyectos**

## Almacenamiento de Datos

### localStorage Keys

- `adminUsers`: Array de usuarios registrados
  ```json
  {
    "id": "user-timestamp",
    "name": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "password": "password123",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
  ```

- `adminSession`: Sesión activa del usuario
  ```json
  {
    "email": "juan@ejemplo.com",
    "name": "Juan Pérez",
    "userId": "user-timestamp"
  }
  ```

- `companies`: Array de empresas registradas
  ```json
  {
    "id": "dev-timestamp",
    "name": "Constructora Ejemplo",
    "description": "...",
    "email": "contacto@ejemplo.com",
    "phone": "+506 2222-3333",
    "website": "https://ejemplo.com",
    "address": "San José, Costa Rica",
    "logoUrl": "https://...",
    "activeProjects": 0,
    "completedProjects": 0,
    "highlights": ["..."],
    "userId": "user-timestamp"
  }
  ```

## Características de Seguridad (Frontend)

⚠️ **Nota**: Esta es una implementación frontend-only para demostración.

En producción, se debe implementar:
- Autenticación real con backend
- Hashing de contraseñas
- Tokens JWT o sesiones seguras
- Validación del lado del servidor
- Protección CSRF
- Rate limiting

## Próximos Pasos

### Fase 2: Gestión de Proyectos
- [ ] Formulario para agregar proyectos habitacionales
- [ ] Lista de proyectos de la empresa
- [ ] Edición de proyectos
- [ ] Eliminación de proyectos

### Fase 3: Gestión de Propiedades
- [ ] Formulario para agregar propiedades a proyectos
- [ ] Gestión de imágenes de propiedades
- [ ] Edición de propiedades
- [ ] Estados de disponibilidad

### Fase 4: Estadísticas y Reportes
- [ ] Dashboard con gráficos
- [ ] Análisis de ventas
- [ ] Reportes exportables

## Integración con Supabase (Opcional)

Para una solución de producción real, se puede integrar Supabase para:
- Autenticación segura
- Base de datos PostgreSQL
- Almacenamiento de imágenes
- Row Level Security (RLS)
- Realtime subscriptions

## Uso

### Para Administradores

1. Haz clic en "Iniciar Sesión" en el navbar
2. Regístrate o inicia sesión
3. Completa la información de tu empresa
4. Comienza a agregar proyectos y propiedades

### Para Desarrolladores

```typescript
// Estado de autenticación en App.tsx
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [currentUser, setCurrentUser] = useState<{
  email: string;
  name: string;
  userId: string;
} | null>(null);

// Verificar sesión al cargar
useEffect(() => {
  const sessionData = localStorage.getItem('adminSession');
  if (sessionData) {
    const session = JSON.parse(sessionData);
    setCurrentUser(session);
    setIsAuthenticated(true);
  }
}, []);
```

## Estilos y Diseño

Todos los componentes utilizan:
- **Colores del tema Costa Rica**: Verde esmeralda, turquesa, crema
- **Componentes Shadcn/UI**: Card, Button, Input, Badge, etc.
- **Gradientes dinámicos**: Para destacar elementos importantes
- **Responsive design**: Funciona en móvil y desktop
- **Iconos Lucide React**: Consistentes en toda la aplicación

## Soporte

Para preguntas o problemas:
1. Revisar esta documentación
2. Verificar la consola del navegador
3. Verificar localStorage para datos almacenados
4. Limpiar localStorage si hay problemas de datos
