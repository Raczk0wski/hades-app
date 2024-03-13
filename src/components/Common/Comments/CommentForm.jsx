import React, { useState } from 'react';
import './CreateComment.css'
const CommentForm = ({ onSave, onCancel }) => {
    const [commentContent, setCommentContent] = useState('');

    const handleCommentChange = (event) => {
        setCommentContent(event.target.value);
    };

    const handleSaveComment = () => {
        onSave(commentContent);
        setCommentContent('');
    };

    const handleCancelComment = () => {
        onCancel();
        setCommentContent('');
    };

    return (
        <div className="comment-form">
            <input type="text" value={commentContent} onChange={handleCommentChange} />
            <button onClick={handleSaveComment}>Save</button>
            <button onClick={handleCancelComment}>Cancel</button>
        </div>
    );
};

export default CommentForm;