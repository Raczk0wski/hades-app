import React, { useState, useEffect } from 'react';
import { getComments } from '../Request/Comments';
import './Comments.css';

function dateFormat(data) {
    const date = new Date(data);
    const rrrr = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const gg = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    return `${gg}:${mi} ${dd}-${mm}-${rrrr} `;
}

const CommentList = ({ articleId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                const response = await getComments(articleId);
                if (response.ok) {
                    const responseData = await response.json();
                    // Sprawdź, czy istnieje klucz items w odpowiedzi
                    if (responseData.items) {
                        // Jeśli klucz items istnieje, ustaw komentarze na jego wartość
                        setComments(responseData.items);
                    } else {
                        console.error('Invalid comments data:', responseData);
                    }
                } else {
                    console.error('Failed to fetch comments:', response);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [articleId]);


    const handleLikeClick = async (articleId) => { }
    return (
        <div>
            {comments.map((comment, index) => (
                <div key={comment.id} className={`Comment comment-${index + 1}`}>
                    <hr />
                    <p className='content'>{comment.content}</p>

                    <div className="author-container">
                        <p className='likes'>{"Likes: " + comment.likesNumber}</p>
                        <button className={`like-button ${comment.isLiked ? 'liked' : ''}`} onClick={() => handleLikeClick(comment.id)}>
                            {comment.isLiked ? 'Liked' : 'Like'}
                        </button>
                        <button className='author-button'>{comment.author ? `${comment.author.firstName} ${comment.author.lastName}` : 'Unknown'}</button>
                        <p className='date'>{comment.updated ? `Edited: ${dateFormat(comment.updatedAt)}` : `Posted: ${dateFormat(comment.postedDate)}`}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentList;
