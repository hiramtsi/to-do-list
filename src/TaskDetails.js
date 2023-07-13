import React, { useState } from 'react';

const TaskDetails = (props) => {
  const { task, addSubtask, addComment, close } = props;
  const [subtaskInput, setSubtaskInput] = useState('');
  const [commentInput, setCommentInput] = useState('');

  const handleSubtaskKeyPress = (e) => {
    if (e.key === 'Enter') {
      addSubtask(subtaskInput);
      setSubtaskInput('');
    }
  };

  const handleCommentKeyPress = (e) => {
    if (e.key === 'Enter') {
      addComment(commentInput);
      setCommentInput('');
    }
  };

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h4>{task.text}</h4>
      <button className="close-button" onClick={close}>
        X
      </button>
      <div className="subtasks">
        <h5>Subtasks:</h5>
        <ul>
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
        <button className="subtask-button" onClick={() => addSubtask(subtaskInput)}>
        Add Subtask
        </button>
      </div>
      <div className="comments">
        <h5>Comments:</h5>
        <ul>
          {task.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <input
          className="comment-input"
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          onKeyPress={handleCommentKeyPress}
          placeholder="Add a new comment"
        />
        <button className="comment-button" onClick={() => addComment(commentInput)}>
        Add Comment
        </button>
        
      </div>
    </div>
    </div>
  );
};

export default TaskDetails;