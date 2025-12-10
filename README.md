# Hakuna Matata - Veterinaria

Plataforma web para la **Clínica Veterinaria Hakuna Matata** que presenta información institucional de la clínica, catálogo de servicios veterinarios y permite gestionar contenido de forma dinámica mediante un panel administrativo. Implementa autenticación de usuarios, almacenamiento en la nube, y diseño responsivo optimizado para dispositivos móviles y desktop.

## Equipo

- **Brayan Anuhar Martínez García** - [Perfil de GitHub](https://github.com/brayanmtzzz)
- **Jesús Alejandro Ramírez Terán** - [Perfil de GitHub](https://github.com/AlexRamirezT)

## Descripción del Proyecto

Aplicación web fullstack construida con Next.js 16 que presenta información de la clínica y permite la gestión integral de servicios veterinarios. Incluye un sistema de autenticación basado, CRUD completo de servicios, y almacenamiento de imágenes en la nube, proporcionando una solución completa para la presentación institucional y administración de contenidos.

### Funcionalidades Principales

- **Gestión de Servicios Veterinarios**: Crear, actualizar y administrar servicios como consultas, vacunas, cirugías, limpiezas dentales, esterilizaciones y otros tratamientos con descripciones detalladas e imágenes
- **Catálogo de Servicios**: Presentación profesional de los servicios ofrecidos en la clínica para que los clientes puedan conocer todas las opciones disponibles
- **Autenticación de Usuarios**: Sistema seguro de registro e inicio de sesión para clientes y personal de la clínica
- **Almacenamiento de Medios en la Nube**: Integración con Supabase para gestionar imágenes de servicios, mascotas y documentación
- **Interfaz Responsiva y Moderna**: Diseño adaptativo usando Tailwind CSS y animaciones fluidas con Framer Motion para una experiencia profesional en cualquier dispositivo

## Requisitos Previos

Requisitos necesarios antes de la instalación:

- **Node.js**: Versión 18 o superior ([descargar aquí](https://nodejs.org/))
- **npm**: Incluido con Node.js
- **Cuenta de Supabase**: Para base de datos PostgreSQL y almacenamiento de imágenes ([crear cuenta](https://supabase.com/))

## Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/brayanmtzzz/hakuna-matata.git
cd hakuna-matata
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
SUPABASE_URL=
SUPABASE_KEY=
```

### 4. Configurar la Base de Datos

```bash
# Generar cliente de Prisma
npm run db:generate

# Aplicar migraciones y crear tablas
npx prisma migrate dev --name init

# (Opcional) Ejecutar seed de datos
npm run db:seed
```

## Ejecución

### Modo Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### Modo Producción

Para crear una build optimizada y ejecutarla:

```bash
npm run build
npm start
```

## Stack Tecnológico

### Frontend
- **Next.js 16**: Framework React con SSR y optimizaciones
- **React 19**: Librería UI
- **TypeScript**: Tipado seguro
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animaciones suaves
- **Lottie React**: Animaciones avanzadas

### Backend
- **Next.js API Routes**: Endpoints serverless
- **NextAuth 4**: Autenticación y gestión de sesiones
- **Prisma 6**: ORM moderno para PostgreSQL

### Base de Datos y Almacenamiento
- **Supabase PostgreSQL**: Base de datos relacional gestionada en la nube
- **Prisma Client**: ORM para acceso a datos tipado y seguro
- **Supabase Storage**: Almacenamiento de imágenes y archivos en la nube

### Validación
- **Zod**: Validación de esquemas TypeScript-first
- **bcrypt**: Hash seguro de contraseñas

### Testing
- **Vitest**: Framework de testing moderno y rápido
- **React Testing Library**: Testing de componentes React
- **Happy DOM**: Entorno DOM para pruebas
- **MSW**: Mock Service Worker para interceptar requests

## Estructura del Proyecto

```
hakuna-matata/
├── app/                    # Carpeta de rutas Next.js (App Router)
├── components/             # Componentes React reutilizables
├── lib/                    # Utilidades y funciones auxiliares
├── prisma/                 # Configuración y modelos de Prisma
│   └── schema.prisma       # Definición de modelos de datos
├── providers/              # Proveedores de contexto (NextAuth, etc.)
├── public/                 # Archivos estáticos
├── types/                  # Definiciones de tipos TypeScript
├── auth.ts                 # Configuración de NextAuth
├── next.config.ts          # Configuración de Next.js
├── tailwind.config.ts      # Configuración de Tailwind CSS
├── tsconfig.json           # Configuración de TypeScript
└── package.json            # Dependencias del proyecto
```

## Scripts Disponibles

### Desarrollo
- `npm run dev`: Inicia servidor de desarrollo
- `npm run build`: Crea build optimizado para producción
- `npm start`: Ejecuta la aplicación en modo producción
- `npm run lint`: Ejecuta análisis de código (ESLint)

### Base de Datos
- `npm run db:generate`: Genera cliente de Prisma
- `npm run db:seed`: Ejecuta script de semilla de datos

### Testing
- `npm test`: Ejecuta todas las pruebas
- `npm run test:watch`: Ejecuta pruebas en modo watch
- `npm run test:ui`: Abre interfaz visual de Vitest
- `npm run test:coverage`: Genera reporte de cobertura

## Modelo de Datos

### User
- **id**: Identificador único
- **nombre**: Nombre del usuario
- **email**: Email único
- **password**: Contraseña hasheada
- **role**: Role (USER o ADMIN)
- **createdAt**: Fecha de creación
- **updatedAt**: Fecha de actualización

### Service (Servicios Veterinarios)
- **id**: Identificador único
- **title**: Nombre del servicio (único) - ej: "Consulta General", "Vacunación", "Cirugía"
- **description**: Descripción detallada del servicio y beneficios
- **img**: URL de imagen del servicio (opcional) - foto ilustrativa del tratamiento
- **is_active**: Estado del servicio (activo/inactivo) - para controlar qué servicios se muestran
- **createdAt**: Fecha de creación del registro
- **updated_at**: Fecha de última actualización

## Testing

El proyecto cuenta con una suite completa de pruebas automatizadas:

- **28 pruebas** cubriendo API Routes y componentes React
- **Tests unitarios** para funcionalidad crítica
- **Tests de integración** para API endpoints

### Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Modo watch para desarrollo
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage
```

## Desarrollo y Contribuciones

### Bifurcar el Repositorio

1. Hacer clic en "Fork" en la esquina superior derecha
2. Clonar el repositorio bifurcado
3. Crear una rama para la feature: `git checkout -b feature/mi-feature`
4. Realizar los cambios y commits
5. Hacer push a la rama: `git push origin feature/mi-feature`
6. Abrir un Pull Request

### Buenas Prácticas

- **Utilizar TypeScript**: Mantener tipado seguro todo el código
- **Seguir la estructura del proyecto**: Respetar las carpetas establecidas
- **Escribir tests**: Agregar pruebas para nueva funcionalidad
- **Probar localmente**: Verificar que todo funcione antes de hacer PR
- **Mensajes de commit claros**: Describir qué cambios se realizan
- **Respetar ESLint**: Ejecutar `npm run lint` antes de hacer push

## Despliegue

La aplicación se puede desplegar en plataformas como:

- **Vercel**: Plataforma recomendada para Next.js ([Guía de despliegue](https://nextjs.org/docs/deployment))
- **Railway**: Despliegue simplificado con integración continua
- **Netlify**: Alternativa con funciones serverless
- **AWS/Azure**: Despliegue en infraestructura personalizada

## Recursos Útiles

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Prisma](https://www.prisma.io/docs/)
- [Documentación de NextAuth](https://next-auth.js.org/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de Supabase](https://supabase.com/docs)

---

## Acerca de Hakuna Matata Veterinaria

Clínica Veterinaria comprometida con el bienestar y la salud de tus mascotas. Esta plataforma digital es nuestro medio para acercarnos a ti, facilitando el acceso a información sobre nuestros servicios y mejorando la comunicación con nuestros clientes.

---

**Última actualización**: Noviembre 2025
