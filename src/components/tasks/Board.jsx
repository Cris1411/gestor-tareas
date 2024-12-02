import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { reorderTasks } from '../../store/slices/tasksSlice';
import { selectFilteredTasks } from '../../store/slices/tasksSlice';
import TaskCard from './TaskCard';

const Board = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredTasks);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    dispatch(reorderTasks(items));
  };

  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Por hacer */}
        <div className="rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Por hacer
            <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
              {todoTasks.length}
            </span>
          </h2>
          <Droppable droppableId="todo">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-3 min-h-[50px]"
              >
                {todoTasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* En progreso */}
        <div className="rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            En progreso
            <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
              {inProgressTasks.length}
            </span>
          </h2>
          <Droppable droppableId="in-progress">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-3 min-h-[50px]"
              >
                {inProgressTasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* Completado */}
        <div className="rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Completado
            <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
              {completedTasks.length}
            </span>
          </h2>
          <Droppable droppableId="completed">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-3 min-h-[50px]"
              >
                {completedTasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;