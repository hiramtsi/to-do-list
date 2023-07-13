import React, { useState } from 'react';
import './App.css';
import TaskDetails from './TaskDetails';

const TodoList = () => {
  const [board, setBoard] = useState({ new: [], inProgress: [], done: [] });
  const [inputValue, setInputValue] = useState('');
  const [selectedSection, setSelectedSection] = useState('new');
  const [selectedTask, setSelectedTask] = useState(null);
  const [subtaskInput, setSubtaskInput] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const closeModal = () => {
    setShowTaskDetails(false);
  };

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTask = { 
        text: inputValue.trim(), 
        subtasks: [], 
        comments: [], 
        startDate: new Date() // Add startDate property
      };
      setBoard({ ...board, [selectedSection]: [...board[selectedSection], newTask] });
      setInputValue('');
    }
  };

  const handleSubtaskKeyPress = (e) => {
    if (e.key === 'Enter') {
      addSubtask();
    }
  };

  const handleCommentKeyPress = (e) => {
    if (e.key === 'Enter') {
      addComment();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  

  const moveTask = (from, to, index) => {
    const task = board[from][index];
    const newBoard = { ...board };
    newBoard[from].splice(index, 1);
    if (to === 'done') {
      task.endDate = new Date();
    }
    if (task.startDate === undefined) {
      task.startDate = new Date();
    }
    newBoard[to].push(task);
    setBoard(newBoard);
  };

  const handleTaskClick = (section, index) => {
    const task = board[section][index];
    if (task) {
      setSelectedTask({ task, section, index });
      setShowTaskDetails(true);
    } else {
      setSelectedTask(null);
      setShowTaskDetails(false);
    }
  };

  const addSubtask = (subtaskInput) => {
    if (subtaskInput.trim() && selectedTask) {
      const { section, index } = selectedTask;
      const task = board[section][index];
      task.subtasks.push(subtaskInput.trim());
      setBoard({ ...board });
    }
  };

  const addComment = (commentInput) => {
    if (commentInput.trim() && selectedTask) {
      const { section, index } = selectedTask;
      const task = board[section][index];
      task.comments.push(commentInput.trim());
      setBoard({ ...board });
    }
  };

  const renderSection = (section) => (
    <div className="section">
      <h3>{section.toUpperCase()}</h3>
      <ul className="todo-list">
        {board[section].map((task, index) => (
          <li className="todo-item" key={index} onClick={() => handleTaskClick(section, index)}>
            <span
              style={{
                textDecoration: section === 'done' ? 'line-through' : 'none',
              }}
            >
              {task.text}
            </span>
            {task.endDate && (
              <div className="task-details">
                <div className="date">Start: {task.startDate.toLocaleString()}</div>
                <div className="date">End: {task.endDate.toLocaleString()}</div>
              </div>
            )}
            {!task.endDate && task.startDate && (
              <div className="task-details">
                <div className="date">Start: {task.startDate.toLocaleString()}</div>
              </div>
            )}
            <div className="move-buttons">
              {section !== 'new' && (
                <button onClick={() => moveTask(section, 'new', index)}>Move to New</button>
              )}
              {section !== 'inProgress' && (
                <button onClick={() => moveTask(section, 'inProgress', index)}>
                  Move to In Progress
                </button>
              )}
              {section !== 'done' && (
                <button onClick={() => moveTask(section, 'done', index)}>Move to Done</button>
              )}
            </div>
            {selectedTask && selectedTask.task === task && showTaskDetails && (
              <TaskDetails
                task={task}
                addSubtask={addSubtask}
                addComment={addComment}
                close={closeModal}
                subtaskInput={subtaskInput}
                setSubtaskInput={setSubtaskInput}
                commentInput={commentInput}
                setCommentInput={setCommentInput}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderSubtaskUI = () => {
    if (!selectedTask) return null;
    const task = selectedTask;
  
    return (
      <div className="subtask-ui">
        <h3>Subtasks for: {task.text}</h3>
        <ul className="subtask-list">
          {task.subtasks.map((subtask, index) => (
            <li key={index}>{subtask}</li>
          ))}
        </ul>
        <input
          className="subtask-input"
          type="text"
          value={subtaskInput}
          onChange={(e) => setSubtaskInput(e.target.value)}
          onKeyPress={handleSubtaskKeyPress}
          placeholder="Add a new subtask"
        />
        <button className="subtask-button" onClick={addSubtask}>
          Add Subtask
        </button>
      </div>
    );
  };

  return (
    <div className="container">
      <h2>Todo List</h2>
      <div className="input-container">
        <input
          className="todo-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task"
        />
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          <option value="new">New</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button className="todo-button" onClick={addTodo}>
          Add
        </button>
      </div>
      <div className="kanban-board" style={{ display: 'flex' }}>
        {renderSection('new')}
        {renderSection('inProgress')}
        {renderSection('done')}
      </div>
    </div>
  );
};

export default TodoList;