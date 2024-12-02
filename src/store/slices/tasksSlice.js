/**
 * tasksSlice.js
 * Slice de Redux para el manejo del estado de las tareas.
 * Incluye la lógica de filtrado, ordenamiento y persistencia en localStorage.
 */

import { createSlice, createSelector } from '@reduxjs/toolkit';

// Funciones auxiliares para el manejo de localStorage
/**
 * Carga las tareas desde localStorage
 * @returns {Array} Array de tareas o array vacío si no hay datos
 */
const loadTasksFromStorage = () => {
  try {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

/**
 * Guarda las tareas en localStorage
 * @param {Array} tasks - Array de tareas a guardar
 */
const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

// Estado inicial
const initialState = {
  tasks: loadTasksFromStorage(),
  filter: {
    search: '',
    status: 'all',
    priority: 'all',
    sortBy: 'date'
  }
};

// Slice de tareas
export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    /**
     * Añade una nueva tarea al estado
     * @param {Object} state - Estado actual
     * @param {Object} action - Action con la nueva tarea en payload
     */
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveTasksToStorage(state.tasks);
    },

    /**
     * Actualiza una tarea existente
     * @param {Object} state - Estado actual
     * @param {Object} action - Action con la tarea actualizada en payload
     */
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToStorage(state.tasks);
      }
    },

    /**
     * Elimina una tarea por su ID
     * @param {Object} state - Estado actual
     * @param {Object} action - Action con el ID de la tarea en payload
     */
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },

    /**
     * Reordena las tareas (usado para drag and drop)
     * @param {Object} state - Estado actual
     * @param {Object} action - Action con el nuevo orden de tareas en payload
     */
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
      saveTasksToStorage(state.tasks);
    },

    /**
     * Actualiza los filtros de tareas
     * @param {Object} state - Estado actual
     * @param {Object} action - Action con los nuevos filtros en payload
     */
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    }
  },
});

// Selectores

/**
 * Selector básico que devuelve todas las tareas
 * @param {Object} state - Estado de Redux
 * @returns {Array} Array de tareas
 */
export const selectTasks = createSelector(
  [(state) => state.tasks.tasks],
  (tasks) => tasks
);

/**
 * Selector que aplica filtros y ordenamiento a las tareas
 * @param {Object} state - Estado de Redux
 * @returns {Array} Array de tareas filtradas y ordenadas
 */
export const selectFilteredTasks = createSelector(
  [selectTasks, state => state.tasks.filter],
  (tasks, filter) => {
    let filteredTasks = [...tasks];

    // Aplicar filtro de búsqueda
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase();
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm)
      );
    }

    // Aplicar filtro por estado
    if (filter.status !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.status === filter.status);
    }

    // Aplicar filtro por prioridad
    if (filter.priority !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.priority === filter.priority);
    }

    // Aplicar ordenamiento
    switch (filter.sortBy) {
      case 'priority':
        // Ordenar por prioridad (high -> medium -> low)
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;

      case 'status':
        // Ordenar por estado (todo -> in-progress -> completed)
        const statusOrder = { 'todo': 1, 'in-progress': 2, 'completed': 3 };
        filteredTasks.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        break;

      case 'date':
      default:
        // Ordenar por fecha de creación (más reciente primero)
        filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return filteredTasks;
  }
);

// Exportar acciones
export const { addTask, updateTask, deleteTask, reorderTasks, setFilter } = tasksSlice.actions;

// Exportar reducer
export default tasksSlice.reducer;