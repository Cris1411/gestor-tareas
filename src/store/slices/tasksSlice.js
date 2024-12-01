import { createSlice, createSelector } from '@reduxjs/toolkit';

const loadTasksFromStorage = () => {
  try {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

const initialState = {
  tasks: loadTasksFromStorage(),
  filter: {
    search: '',
    status: 'all',
    priority: 'all',
    sortBy: 'date'
  }
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveTasksToStorage(state.tasks);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToStorage(state.tasks);
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
      saveTasksToStorage(state.tasks);
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    }
  },
});

// Selectores
export const selectTasks = createSelector(
  [(state) => state.tasks.tasks, (state) => state.tasks.filter],
  (tasks, filter) => {
    let filteredTasks = [...tasks];

    // Filtrar por búsqueda
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      );
    }

    // Filtrar por estado
    if (filter.status !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.status === filter.status);
    }

    // Filtrar por prioridad
    if (filter.priority !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.priority === filter.priority);
    }

    // Ordenar tareas
    switch (filter.sortBy) {
      case 'date':
        filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'dueDate':
        filteredTasks.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
        break;
      case 'priority': {
        const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
        filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;
      }
      case 'title':
        filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filteredTasks;
  }
);

export const { addTask, updateTask, deleteTask, reorderTasks, setFilter } = tasksSlice.actions;

export default tasksSlice.reducer;