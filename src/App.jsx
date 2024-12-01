import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Board from './components/Board';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import Statistics from './components/Statistics';
import DataManager from './components/DataManager';
import Footer from './components/Footer';
import { setFilter } from './store/slices/tasksSlice';

function App() {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSearch = (searchTerm) => {
    dispatch(setFilter({ search: searchTerm }));
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <header className="sticky top-0 z-50 bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src="/tareas.png" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Gestor de Tareas</h1>
                <p className="text-xs sm:text-sm text-blue-200 font-medium">
                  Desarrollado por Cristian R. Sanchez C.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-blue-700/50 transition-colors"
                title={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
              >
                {darkMode ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setShowTaskForm(!showTaskForm)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors text-sm sm:text-base font-medium shadow-sm"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Nueva Tarea
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-start sm:items-center">
            {showTaskForm && <TaskForm darkMode={darkMode} />}
            <SearchBar onSearch={handleSearch} darkMode={darkMode} />
          </div>
          <Board darkMode={darkMode} />
          {showStats && <Statistics darkMode={darkMode} />}
          <DataManager darkMode={darkMode} />
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
