import React, { useState } from 'react';
import './CreateComment.css';

const CommentForm = ({ articleId, updateComments }) => {
    const [commentContent, setCommentContent] = useState('');
    const [isTextareaActive, setIsTextareaActive] = useState(false);

    const handleCommentChange = (event) => {
        setCommentContent(event.target.value);
    };

    const handleTextareaFocus = () => {
        setIsTextareaActive(true);
    };

    const handleTextareaBlur = () => {
        if (commentContent.trim() === '') {
            setIsTextareaActive(false);
        }
    };

    const handleSaveComment = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/comments/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`,
                },
                body: JSON.stringify({
                    id: articleId,
                    content: commentContent,
                }),
            });

            if (response.ok) {
                setCommentContent('');
                setIsTextareaActive(false);
                const newCommentData = await response.json();
                updateComments(newCommentData);
            } else {
                // Obsługa przypadku, gdy odpowiedź nie jest ok (status !== 200)
                // Tutaj możesz dodać odpowiednią logikę lub wyświetlić komunikat błędu
            }
        } catch (error) {
            console.error('Error saving comment:', error);
            // Obsługa błędu w przypadku problemów z połączeniem lub innymi błędami
        }
    };

    const handleCancelComment = () => {
        setCommentContent('');
        setIsTextareaActive(false);
    };

    return (
        <div className="comment-form">
            <textarea
                className={`Comment-content ${isTextareaActive ? 'active' : ''}`}
                value={commentContent}
                onChange={handleCommentChange}
                onFocus={handleTextareaFocus}
                onBlur={handleTextareaBlur}
                placeholder='Write comment'
            />
            {commentContent && (
                <div className="button-group">
                    <button className="Comment-cancel" onClick={handleCancelComment}>Cancel</button>
                    <button className="Comment-save" onClick={handleSaveComment}>Save</button>
                </div>
            )}
        </div>
    );
};

export default CommentForm;
