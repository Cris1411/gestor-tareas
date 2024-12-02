import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../store/slices/tasksSlice';

const SubTaskList = ({ task, darkMode }) => {
  const dispatch = useDispatch();
  const [newSubTask, setNewSubTask] = useState('');

  const handleAddSubTask = (e) => {
    e.preventDefault();
    if (!newSubTask.trim()) return;

    const updatedTask = {
      ...task,
      subtasks: [
        ...(task.subtasks || []),
        {
          id: Date.now().toString(),
          title: newSubTask,
          completed: false
        }
      ]
    };
    dispatch(updateTask(updatedTask));
    setNewSubTask('');
  };

  const toggleSubTask = (subtaskId) => {
    const updatedSubtasks = task.subtasks.map(subtask =>
      subtask.id === subtaskId
        ? { ...subtask, completed: !subtask.completed }
        : subtask
    );
    dispatch(updateTask({ ...task, subtasks: updatedSubtasks }));
  };

  const deleteSubTask = (subtaskId) => {
    const updatedSubtasks = task.subtasks.filter(subtask => subtask.id !== subtaskId);
    dispatch(updateTask({ ...task, subtasks: updatedSubtasks }));
  };

  const getProgress = () => {
    if (!task.subtasks?.length) return 0;
    const completed = task.subtasks.filter(subtask => subtask.completed).length;
    return Math.round((completed / task.subtasks.length) * 100);
  };

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-2">
        <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Subtareas ({getProgress()}% completado)
        </h4>
        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${getProgress()}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleAddSubTask} className="flex gap-2 mb-2">
        <input
          type="text"
          value={newSubTask}
          onChange={(e) => setNewSubTask(e.target.value)}
          placeholder="Nueva subtarea..."
          className={`flex-1 px-2 py-1 text-sm rounded border ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-700 placeholder-gray-500'
          }`}
        />
        <button
          type="submit"
          className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Añadir
        </button>
      </form>

      <ul className="space-y-1">
        {task.subtasks?.map(subtask => (
          <li
            key={subtask.id}
            className={`flex items-center gap-2 p-1 rounded ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            }`}
          >
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={() => toggleSubTask(subtask.id)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span
              className={`flex-1 text-sm ${
                subtask.completed
                  ? darkMode
                    ? 'line-through text-gray-500'
                    : 'line-through text-gray-400'
                  : darkMode
                  ? 'text-gray-300'
                  : 'text-gray-700'
              }`}
            >
              {subtask.title}
            </span>
            <button
              onClick={() => deleteSubTask(subtask.id)}
              className={`p-1 rounded hover:bg-red-100 ${
                darkMode ? 'text-red-400 hover:bg-red-900/30' : 'text-red-500'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubTaskList;
