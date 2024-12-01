import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../store/slices/tasksSlice';

const SearchBar = ({ darkMode }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilter({ [filterType]: value }));
  };

  return (
    <div className={`w-full sm:w-auto ${isExpanded ? 'bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg' : ''}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar tareas..."
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className={`pl-10 pr-4 py-2 rounded-lg border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <svg
            className={`absolute left-3 top-2.5 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            darkMode
              ? 'bg-gray-800 text-gray-100 hover:bg-gray-700'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          } border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filtros
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Estado
            </label>
            <select
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className={`w-full rounded-lg border ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-gray-100'
                  : 'bg-white border-gray-300 text-gray-900'
              } p-2`}
            >
              <option value="all">Todos</option>
              <option value="todo">Por hacer</option>
              <option value="in-progress">En progreso</option>
              <option value="done">Completado</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Prioridad
            </label>
            <select
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className={`w-full rounded-lg border ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-gray-100'
                  : 'bg-white border-gray-300 text-gray-900'
              } p-2`}
            >
              <option value="all">Todas</option>
              <option value="urgent">Urgente</option>
              <option value="high">Alta</option>
              <option value="normal">Normal</option>
              <option value="low">Baja</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Ordenar por
            </label>
            <select
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className={`w-full rounded-lg border ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-gray-100'
                  : 'bg-white border-gray-300 text-gray-900'
              } p-2`}
            >
              <option value="date">Fecha de creación</option>
              <option value="dueDate">Fecha de vencimiento</option>
              <option value="priority">Prioridad</option>
              <option value="title">Título</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
