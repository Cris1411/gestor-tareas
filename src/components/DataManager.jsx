import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../store/slices/tasksSlice';

const DataManager = ({ darkMode }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const fileInputRef = useRef();

  const exportTasks = () => {
    const data = JSON.stringify(tasks, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tareas_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importTasks = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTasks = JSON.parse(e.target.result);
        if (Array.isArray(importedTasks)) {
          importedTasks.forEach(task => {
            // Asegurarse de que cada tarea tenga un ID único
            const newTask = {
              ...task,
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
            };
            dispatch(addTask(newTask));
          });
          alert('Tareas importadas correctamente');
        } else {
          alert('El archivo no tiene el formato correcto');
        }
      } catch (error) {
        alert('Error al importar las tareas');
        console.error('Error importing tasks:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
      <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Gestión de Datos
      </h3>
      
      <div className="space-y-4">
        <div>
          <button
            onClick={exportTasks}
            className={`w-full px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 
              transition-colors flex items-center justify-center gap-2`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Exportar Tareas
          </button>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={importTasks}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className={`w-full px-4 py-2 rounded-lg border-2 border-dashed
              ${
                darkMode
                  ? 'border-gray-600 text-gray-300 hover:border-gray-500'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
              }
              transition-colors flex items-center justify-center gap-2`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Importar Tareas
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataManager;
