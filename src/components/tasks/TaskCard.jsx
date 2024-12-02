import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { deleteTask, updateTask } from '../../store/slices/tasksSlice';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import SubTaskList from './SubTaskList';

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  normal: 'bg-blue-100 text-blue-800',
  high: 'bg-yellow-100 text-yellow-800',
  urgent: 'bg-red-100 text-red-800'
};

const priorityLabels = {
  low: 'Baja',
  normal: 'Normal',
  high: 'Alta',
  urgent: 'Urgente'
};

const TaskCard = ({ task, index, darkMode }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      dispatch(deleteTask(task.id));
    }
  };

  const handleStatusChange = (newStatus) => {
    const updatedTask = {
      ...task,
      status: newStatus,
      completedAt: newStatus === 'done' ? new Date().toISOString() : null
    };
    dispatch(updateTask(updatedTask));
    setIsStatusMenuOpen(false);
  };

  const handleToggleComplete = () => {
    dispatch(updateTask({ 
      ...task, 
      status: task.status === 'done' ? 'todo' : 'done',
      completedAt: task.status !== 'done' ? new Date().toISOString() : null
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return format(new Date(dateString), "d 'de' MMMM, yyyy", { locale: es });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`rounded-lg shadow-sm p-3 sm:p-4 border-l-4 ${
            task.status === 'done'
              ? 'border-green-500 opacity-75'
              : task.status === 'inProgress'
                ? 'border-yellow-500'
                : isOverdue
                  ? 'border-red-500'
                  : 'border-blue-500'
          } ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} transition-colors duration-200`}
        >
          <div className="flex flex-col gap-2 sm:gap-3">
            {/* Encabezado de la tarea */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-grow">
                <h3 className={`font-semibold text-sm sm:text-base mb-1 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-xs sm:text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {task.description}
                  </p>
                )}
              </div>
              <button
                onClick={handleDelete}
                className={`p-1 rounded hover:bg-red-100 ${
                  darkMode ? 'text-red-400 hover:bg-red-900/30' : 'text-red-500'
                }`}
                title="Eliminar tarea"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            {/* Metadatos y acciones */}
            <div className="flex flex-wrap items-center gap-2">
              <div className={`flex items-center gap-1 text-xs sm:text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(task.createdAt)}</span>
              </div>

              <select
                value={task.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className={`px-2 py-1 text-xs sm:text-sm rounded border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-200' 
                    : 'bg-white border-gray-300 text-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="todo">Por hacer</option>
                <option value="inProgress">En progreso</option>
                <option value="done">Completado</option>
              </select>

              <button
                onClick={handleToggleComplete}
                className={`px-2 py-1 text-xs sm:text-sm rounded-full ${
                  task.status === 'done'
                    ? darkMode
                      ? 'bg-green-900/30 text-green-400'
                      : 'bg-green-100 text-green-800'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {task.status === 'done' ? '✓ Completado' : 'Marcar como completado'}
              </button>
            </div>

            {/* Etiquetas */}
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {task.tags?.map(tag => (
                <span
                  key={tag}
                  className={`px-2 py-0.5 text-xs sm:text-sm rounded-full ${
                    darkMode
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Prioridad */}
            <div className={`flex items-center gap-1 text-xs sm:text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className={`text-xs sm:text-sm ${priorityColors[task.priority]}`}>
                {priorityLabels[task.priority]}
              </span>
            </div>

            {/* Fecha de vencimiento */}
            {task.dueDate && (
              <div className={`flex items-center gap-1 text-xs sm:text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className={isOverdue ? 'text-red-500 font-medium' : ''}>
                  Vence: {formatDate(task.dueDate)}
                </span>
              </div>
            )}
          </div>

          {isExpanded && (
            <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <SubTaskList task={task} darkMode={darkMode} />
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;