import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, status }) => {
  const tasks = useSelector(state => 
    state.tasks.tasks.filter(task => task.status === status)
  );

  return (
    <div className="board-column">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3"
          >
            {tasks.map((task, index) => (
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
  );
};

export default TaskColumn; 