# Gestor de Tareas

Aplicación web para gestionar tareas, con soporte para prioridades, etiquetas, subtareas y estadísticas. Permite organizar tu flujo de trabajo de manera visual y eficiente.

## Captura de pantalla

A continuación puedes ver una vista de la interfaz principal de la aplicación:

![Captura de pantalla de la app](./assets/capturaGestorTareas.png)

*La imagen muestra la vista principal del gestor de tareas, donde puedes crear, organizar y gestionar tus tareas de manera visual, incluyendo prioridades, etiquetas y subtareas.*

---

## Tecnologías usadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [date-fns](https://date-fns.org/)
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)

---

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tuusuario/gestor-tareas.git
   cd gestor-tareas
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```

---

## Uso

- Para iniciar el servidor de desarrollo:
  ```sh
  npm run dev
  ```
- Para construir el proyecto para producción:
  ```sh
  npm run build
  ```
- Para previsualizar la build:
  ```sh
  npm run preview
  ```

---

## Contribución

¡Las contribuciones son bienvenidas!
Puedes abrir un issue para reportar bugs o sugerir mejoras.
Para contribuir con código:

1. Haz un fork del repositorio.
2. Crea una rama para tu feature/fix: `git checkout -b mi-feature`
3. Haz tus cambios y commitea: `git commit -am 'Añade nueva feature'`
4. Haz push a tu rama: `git push origin mi-feature`
5. Abre un Pull Request.

---

## Tests

Actualmente no hay tests automatizados.
(Si los agregas, describe aquí cómo correrlos).

---

## Licencia

MIT

- Crear una carpeta /src/pages para componentes de página completa
- Crear una carpeta /src/constants para valores constantes

3- Organización de componentes:
- Considera agrupar componentes relacionados en subcarpetas dentro de /components
- Por ejemplo: /components/forms, /components/ui, /components/tasks

4- Convenciones de nombrado:
- Usar PascalCase para componentes React (como ya lo haces con TaskColumn.jsx)
- Usar camelCase para archivos de utilidades
- Añadir sufijos descriptivos: .component.jsx, .service.js, .hook.js

5- Organización de pruebas y Testing:
- Crear una carpeta /__tests__ en cada directorio principal
- O una carpeta /src/tests para todas las pruebas

6- Definición de Tipos (si usas TypeScript):
- Crear una carpeta /src/types o /src/interfaces para definiciones de tipos

Esta estructura te ayudará a:

- Mantener el código organizado y fácil de encontrar
- Separar responsabilidades claramente
- Facilitar el mantenimiento y escalabilidad
- Mejorar la colaboración en el proyecto
- Aumentar la legibilidad y claridad del código
