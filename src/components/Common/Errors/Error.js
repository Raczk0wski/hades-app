import React from 'react';

const Error = ({ error, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default Error;