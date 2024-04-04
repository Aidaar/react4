import React, { useState } from 'react';
import iconMarker from './assets/marker.svg'

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleAddTask = () => {
    if (newTask) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleEditTask = (index) => {
    setEditingTask(index);
    setNewTask(tasks[index]);
  };

  const handleSaveTask = () => {
    if (newTask) {
      const updatedTasks = [...tasks];
      updatedTasks[editingTask] = newTask;
      setTasks(updatedTasks);
      setEditingTask(null);
      setNewTask('');
    }
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleMarkComplete = (index) => {
    const updatedTasks = [...tasks];
    const completedTask = updatedTasks.splice(index, 1)[0];
    setTasks(updatedTasks);
    setCompletedTasks([...completedTasks, completedTask]);
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleRemoveCompletedTask = (index) => {
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks.splice(index, 1);
    setCompletedTasks(updatedCompletedTasks);
  };

  return (
    <div>
      <h1>Список дел</h1>
      <input type="text" value={newTask} onChange={handleInputChange} />
      <button onClick={handleAddTask}>&#9745;</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editingTask === index ? (
              <input type="text" value={newTask} onChange={handleInputChange} />
            ) : (
              task
            )}
            {editingTask === index ? (
              <button onClick={handleSaveTask}>&#9745;</button>
            ) : (
              <>
                <button onClick={() => handleMarkComplete(index)}>&#10004;</button>
                <button onClick={() => handleEditTask(index)}>&#9998;</button>
                <button onClick={() => handleRemoveTask(index)}>&#10006;</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <h2>Завершенные задачи</h2>
      <ul>
        {completedTasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => handleRemoveCompletedTask(index)}>
						&#10006;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  return <TodoList />;
}

export default App;
