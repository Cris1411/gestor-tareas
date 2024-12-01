import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { reorderTasks } from '../store/slices/tasksSlice';
import TaskCard from './TaskCard';

const Board = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    dispatch(reorderTasks(items));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Por hacer */}
        <div className={`rounded-lg p-4 bg-white shadow-sm`}>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Por hacer
            <span className="ml-auto text-sm text-gray-500">
              {tasks.filter(task => task.status === 'todo').length}
            </span>
          </h2>
          <Droppable droppableId="todo">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-3 min-h-[50px]"
              >
                {tasks
                  .filter(task => task.status === 'todo')
                  .map((task, index) => (
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
        <div className={`rounded-lg p-4 bg-white shadow-sm`}>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            En progreso
            <span className="ml-auto text-sm text-gray-500">
              {tasks.filter(task => task.status === 'inProgress').length}
            </span>
          </h2>
          <Droppable droppableId="inProgress">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-3 min-h-[50px]"
              >
                {tasks
                  .filter(task => task.status === 'inProgress')
                  .map((task, index) => (
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
        <div className={`rounded-lg p-4 bg-white shadow-sm`}>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Completado
            <span className="ml-auto text-sm text-gray-500">
              {tasks.filter(task => task.status === 'done').length}
            </span>
          </h2>
          <Droppable droppableId="done">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-3 min-h-[50px]"
              >
                {tasks
                  .filter(task => task.status === 'done')
                  .map((task, index) => (
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