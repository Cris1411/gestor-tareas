import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/slices/tasksSlice';

const TaskForm = ({ darkMode, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [],
    status: 'todo',
    dueDate: '',
    priority: 'normal',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask({
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...formData
    }));
    setFormData({
      title: '',
      description: '',
      tags: [],
      status: 'todo',
      dueDate: '',
      priority: 'normal',
    });
    onClose();
  };

  const handleTagChange = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={`p-6 rounded-lg shadow-md ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${
            darkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Título
          </label>
          <input
            type="text"
            placeholder="Título de la tarea"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className={`w-full p-2 rounded border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            required
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-1 ${
            darkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Descripción
          </label>
          <textarea
            placeholder="Descripción de la tarea"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className={`w-full p-2 rounded border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            rows="3"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${
            darkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Fecha de vencimiento
          </label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
            className={`w-full p-2 rounded border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${
            darkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Prioridad
          </label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
            className={`w-full p-2 rounded border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="low">Baja</option>
            <option value="normal">Normal</option>
            <option value="high">Alta</option>
            <option value="urgent">Urgente</option>
          </select>
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            darkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Etiquetas
          </label>
          <div className="flex flex-wrap gap-2">
            {['Urgente', 'Importante', 'Normal', 'Bajo'].map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagChange(tag)}
                className={`px-3 py-1 rounded transition-colors ${
                  formData.tags.includes(tag)
                    ? darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 mt-6">
        <button
          type="button"
          onClick={onClose}
          className={`px-4 py-2 rounded-lg border ${
            darkMode 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          } transition-colors`}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          Guardar Tarea
        </button>
      </div>
    </form>
  );
};

export default TaskForm;