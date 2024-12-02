/**
 * FilterBar.jsx
 * Componente modal para filtrar y ordenar tareas.
 * Proporciona opciones para filtrar por estado, prioridad y criterios de ordenamiento.
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/slices/tasksSlice';

/**
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {boolean} props.darkMode - Estado del modo oscuro
 */
const FilterBar = ({ onClose, darkMode }) => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.tasks.filter);

  /**
   * Maneja los cambios en los filtros
   * @param {string} filterType - Tipo de filtro (status, priority, sortBy)
   * @param {string} value - Nuevo valor del filtro
   */
  const handleFilterChange = (filterType, value) => {
    dispatch(setFilter({ ...filter, [filterType]: value }));
  };

  /**
   * Restablece todos los filtros a sus valores por defecto
   */
  const resetFilters = () => {
    dispatch(setFilter({
      search: '',
      status: 'all',
      priority: 'all',
      sortBy: 'date'
    }));
  };

  // Manejo de teclas para accesibilidad
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Clases comunes para los selects
  const selectClassName = `w-full rounded-md px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    darkMode 
      ? 'bg-gray-700 border-gray-600 text-white' 
      : 'bg-white border-gray-300 text-gray-900'
  }`;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="filter-title"
    >
      {/* Overlay con efecto de desenfoque */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenedor del modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className={`relative rounded-lg shadow-xl max-w-md w-full ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}>
          {/* Encabezado del modal */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 id="filter-title" className="text-lg font-medium">Filtros</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Cerrar filtros"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Contenido del modal */}
          <div className="p-4 space-y-4">
            {/* Filtro por estado */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1">
                Estado
              </label>
              <select
                id="status"
                value={filter.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className={selectClassName}
              >
                <option value="all">Todos</option>
                <option value="todo">Por hacer</option>
                <option value="in-progress">En Progreso</option>
                <option value="completed">Completado</option>
              </select>
            </div>

            {/* Filtro por prioridad */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium mb-1">
                Prioridad
              </label>
              <select
                id="priority"
                value={filter.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className={selectClassName}
              >
                <option value="all">Todas</option>
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
              </select>
            </div>

            {/* Ordenamiento */}
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium mb-1">
                Ordenar por
              </label>
              <select
                id="sortBy"
                value={filter.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className={selectClassName}
              >
                <option value="date">Fecha de creación</option>
                <option value="priority">Prioridad</option>
                <option value="status">Estado</option>
              </select>
            </div>
          </div>

          {/* Pie del modal con botones de acción */}
          <div className="flex justify-end gap-3 p-4 border-t border-gray-700">
            <button
              onClick={resetFilters}
              className={`px-4 py-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              Restablecer
            </button>
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
