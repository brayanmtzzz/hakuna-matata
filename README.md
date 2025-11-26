# Hakuna Matata - Veterinaria

Plataforma web moderna y profesional para la **Clínica Veterinaria Hakuna Matata**, diseñada para gestionar y presentar servicios veterinarios con autenticación de usuarios y administración de contenidos. Construida con tecnologías actuales para ofrecer una experiencia fluida, segura y responsive que mejore la comunicación con nuestros clientes y optimice la gestión interna de la clínica.

## Equipo

- **Brayan Anuhar Martínez García** - [Perfil de GitHub](https://github.com/brayanmtzzz)
- **Jesús Alejandro Ramírez Terán** - [Perfil de GitHub](https://github.com/AlexRamirezT)

## Descripción del Proyecto

**Hakuna Matata** es una aplicación web fullstack profesional diseñada específicamente para la gestión y administración de una clínica veterinaria. La plataforma permite a los veterinarios y personal administrativo gestionar eficientemente los servicios ofrecidos, mientras que los clientes pueden consultar y conocer los tratamientos disponibles.

### Funcionalidades Principales

- **Gestión de Servicios Veterinarios**: Crear, actualizar y administrar servicios como consultas, vacunas, cirugías, limpiezas dentales, esterilizaciones y otros tratamientos con descripciones detalladas e imágenes
- **Catálogo de Servicios**: Presentación profesional de los servicios ofrecidos en la clínica para que los clientes puedan conocer todas las opciones disponibles
- **Autenticación de Usuarios**: Sistema seguro de registro e inicio de sesión para clientes y personal de la clínica
- **Almacenamiento de Medios en la Nube**: Integración con Supabase para gestionar imágenes de servicios, mascotas y documentación
- **Interfaz Responsiva y Moderna**: Diseño adaptativo usando Tailwind CSS y animaciones fluidas con Framer Motion para una experiencia profesional en cualquier dispositivo

## Requisitos Previos

Antes de instalar el proyecto, asegúrate de tener los siguientes requisitos:

- **Node.js**: Versión 18 o superior ([descargar aquí](https://nodejs.org/))
- **npm**: Incluido con Node.js
- **PostgreSQL**: Base de datos relacional ([instrucciones de instalación](https://www.postgresql.org/download/))
- **Cuenta de Supabase**: Para almacenamiento de imágenes ([crear cuenta](https://supabase.com/))

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

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Base de Datos - PostgreSQL
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/hakuna_matata_vet

# Supabase - Almacenamiento en la nube para imágenes de servicios
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# NextAuth - Autenticación y gestión de sesiones
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-seguro-aqui-genera-uno-aleatorio
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

### Base de Datos
- **PostgreSQL**: Base de datos relacional
- **Prisma Client**: Acceso a datos tipado

### Almacenamiento
- **Supabase Storage**: Almacenamiento de archivos en la nube

### Validación
- **Zod**: Validación de esquemas TypeScript-first
- **bcrypt**: Hash seguro de contraseñas

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

- `npm run dev`: Inicia servidor de desarrollo
- `npm run build`: Crea build optimizado para producción
- `npm start`: Ejecuta la aplicación en modo producción
- `npm run lint`: Ejecuta análisis de código (ESLint)
- `npm run db:generate`: Genera cliente de Prisma
- `npm run db:seed`: Ejecuta script de semilla de datos

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

## Desarrollo y Contribuciones

### Bifurcar el Repositorio

1. Haz clic en "Fork" en la esquina superior derecha
2. Clona tu repositorio bifurcado
3. Crea una rama para tu feature: `git checkout -b feature/mi-feature`
4. Realiza tus cambios y commits
5. Haz push a tu rama: `git push origin feature/mi-feature`
6. Abre un Pull Request

### Buenas Prácticas

- Usa TypeScript: Mantén tipado seguro todo el código
- Sigue la estructura del proyecto: Respeta las carpetas establecidas
- Prueba localmente: Verifica que todo funcione antes de hacer PR
- Mensajes de commit claros: Describe qué cambios realizas
- Respeta ESLint: Ejecuta `npm run lint` antes de hacer push

## Despliegue

La aplicación se puede desplegar en plataformas como:

- **Vercel**: [Guía de despliegue](https://nextjs.org/docs/deployment)
- **Railway**: Base de datos PostgreSQL incluida
- **Heroku**: Requiere configuración adicional
- **AWS/Azure**: Máquinas virtuales o contenedores

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
