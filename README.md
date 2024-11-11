# Proyecto Front-sincoayf

## Descripción

**Front-sincoayf** es una aplicación web desarrollada con React que gestiona vehículos y ventas. La aplicación permite a los usuarios agregar, editar y vender vehículos, así como generar reportes detallados de ventas.

## Estructura del Proyecto

- **.gitignore**: Archivo que especifica qué archivos y directorios deben ser ignorados por Git.
- **package.json**: Archivo de configuración que incluye las dependencias y scripts del proyecto.
- **public/**: Contiene archivos públicos como `index.html`, `manifest.json` y `robots.txt`.
- **README.md**: Archivo de documentación del proyecto.
- **src/**: Carpeta principal del código fuente.
  - **Components/**: Contiene todos los componentes de React divididos por funcionalidades.
    - **Body/**
      - `body.jsx`: Componente principal que maneja la estructura del contenido y las rutas de la aplicación.
    - **Context/**
      - `alertContext.jsx`: Proporciona un contexto para gestionar alertas en la aplicación.
      - `listaVentasContext.jsx`: Gestiona la lista de precios de ventas.
      - `vehiculosContext.jsx`: Gestiona el estado global de los vehículos.
    - **Footer/**
      - `footer.jsx`: Componente del pie de página de la aplicación.
    - **Header/**
      - `header.jsx`: Componente del encabezado de la aplicación.
    - **Login/**
      - `login.jsx`: Componente que maneja la autenticación de usuarios.
    - **Reportes/**
      - `reportes.jsx`: Componente encargado de generar y mostrar reportes de ventas.
    - **Services/**
      - `axioServices.js`: Configura Axios con interceptores para solicitudes y respuestas.
      - `listaVentas.js`: Funciones para obtener la lista de precios.
      - `login.js`: Funciones relacionadas con el inicio de sesión.
      - `vehiculoServices.js`: Funciones para manejar operaciones de vehículos, como agregar y editar.
      - `ventaServices.js`: Funciones para manejar operaciones de ventas.
    - **Vehiculos/**
      - `carVehiculo.jsx`: Componente que representa una tarjeta de vehículo con detalles y opciones para editar o vender.
      - `modalEditar.jsx`: Modal para editar detalles de un vehículo.
      - `modalVender.jsx`: Modal para registrar la venta de un vehículo.
      - `vehiculos.jsx`: Componente que lista todos los vehículos con opciones para paginar, editar o vender.
  - **index.css**: Archivo de estilos globales.
  - **index.js**: Punto de entrada de la aplicación que renderiza el componente principal.

## Versiones Utilizadas

- **React**: 18.3.1
- **React DOM**: 18.3.1
- **React Router DOM**: 6.28.0
- **Axios**: 1.7.7
- **Material-UI (MUI)**:
  - `@mui/material`: 6.1.6
  - `@mui/icons-material`: 6.1.6
  - `@mui/x-date-pickers`: 7.22.2
- **Recharts**: 2.13.3
- **Emotion**:
  - `@emotion/react`: 11.13.3
  - `@emotion/styled`: 11.13.0
- **@toolpad/core**: 0.8.1
- **date-fns**: 4.1.0
- **React Scripts**: 5.0.1
- **Testing Libraries**:
  - `@testing-library/jest-dom`: 5.17.0
  - `@testing-library/react`: 13.4.0
  - `@testing-library/user-event`: 13.5.0

## Scripts Disponibles

- **start**: Inicia la aplicación en modo de desarrollo.
- **build**: Compila la aplicación para producción.
- **test**: Ejecuta pruebas utilizando Jest.
- **eject**: Ejectúa la configuración para personalizarla.

## Repositorio para la Documentación

Para más detalles y documentación adicional, visita el repositorio de GitHub: https://github.com/kevega3/Front-sincoayf.git
