/**
 * App.jsx
 * Componente principal de la aplicación Gestor de Tareas.
 * Maneja el estado global, el modo oscuro y la disposición general de la interfaz.
 */

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Componentes
import Board from './components/Board';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import Statistics from './components/Statistics';
import DataManager from './components/DataManager';
import Footer from './components/Footer';
import FilterBar from './components/FilterBar';

// Actions de Redux
import { setFilter } from './store/slices/tasksSlice';

function App() {
  // Redux dispatch
  const dispatch = useDispatch();

  // Estados locales
  const [darkMode, setDarkMode] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Efecto para cargar la preferencia de modo oscuro al iniciar
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  /**
   * Alterna entre modo claro y oscuro
   * Guarda la preferencia en localStorage
   */
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
    document.documentElement.classList.toggle('dark');
  };

  /**
   * Maneja la búsqueda de tareas
   * @param {string} searchTerm - Término de búsqueda
   */
  const handleSearch = (searchTerm) => {
    dispatch(setFilter({ search: searchTerm }));
  };

  /**
   * Alterna la visibilidad del panel de filtros
   */
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header con logo y controles principales */}
      <header className="sticky top-0 z-50 bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Logo y título */}
            <div className="flex items-center gap-3">
              <img src="/tareas.png" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Gestor de Tareas</h1>
                <p className="text-xs sm:text-sm text-blue-200 font-medium">
                  Desarrollado por Cristian R. Sanchez C.
                </p>
              </div>
            </div>

            {/* Controles de modo oscuro */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-blue-700 transition-colors"
                title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                {darkMode ? '🌞' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          {/* Barra de búsqueda */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1">
              <SearchBar onSearch={handleSearch} darkMode={darkMode} />
            </div>
          </div>

          {/* Componentes principales */}
          {showTaskForm && <TaskForm darkMode={darkMode} />}
          <Board darkMode={darkMode} />
          {showStats && <Statistics darkMode={darkMode} />}
          <DataManager darkMode={darkMode} />
          
          {/* Modal de filtros */}
          {showFilters && <FilterBar onClose={toggleFilters} darkMode={darkMode} />}
        </div>
      </main>

      {/* Footer */}
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
