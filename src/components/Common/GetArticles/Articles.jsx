import React, { useState, useEffect } from 'react';
import './Articles.css';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../Request/Requests';
import CommentList from '../Comments/Comments'
import CommentForm from '../Comments/CommentForm'
import { getComments } from '../Request/Comments';

function dateFormat(data) {
    const date = new Date(data);
    const rrrr = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const gg = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    return `${gg}:${mi} ${dd}-${mm}-${rrrr} `;
}

const ArticleList = ({ articlesProp }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isEditingArray, setIsEditingArray] = useState([]);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [editedTitleArray, setEditedTitleArray] = useState([]);
    const [editedContentArray, setEditedContentArray] = useState([]);

    useEffect(() => {
        setArticles(articlesProp);
        setIsEditingArray(new Array(articlesProp.length).fill(false));
    }, [articlesProp]);

    useEffect(() => {

        const likedArticles = articlesProp.filter(article => article.liked);

        setArticles(prevArticles => {
            return prevArticles.map(article => {
                if (likedArticles.some(likedArticle => likedArticle.id === article.id)) {
                    return { ...article, isLiked: true };
                }
                return article;
            });
        });
    }, [articlesProp]);

    const handleAuthorClick = async (authorId) => {
        setLoading(true);
        try {
            const response = await getUser(authorId);
            if (response.ok) {
                const userData = await response.json();
                navigate('/profile', { state: { authorData: userData } });
            } else {
                console.error('Failed to fetch user data:', response);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLikeClick = async (articleId) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/api/v1/articles/like?id=${articleId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch articles', response);
            }
            const updatedArticles = articles.map(article => {
                if (article.id === articleId) {
                    if (article.isLiked) {
                        return { ...article, likesCount: article.likesCount - 1, isLiked: false };
                    } else {
                        return { ...article, likesCount: article.likesCount + 1, isLiked: true };
                    }
                }
                return article;
            });
            setArticles(updatedArticles);
        } catch (error) {
            console.error('Error liking article:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleComments = (article) => {
        setSelectedArticle(prevSelected => prevSelected === article ? null : article);
    };

    const loggedInUserId = parseInt(localStorage.userId)

    const handleEditClick = (index) => {
        // Ustawiamy stan edycji na true dla konkretnego artykułu
        const newIsEditingArray = [...isEditingArray];
        newIsEditingArray[index] = true;
        setIsEditingArray(newIsEditingArray);

        // Ustawiamy edytowany tytuł i zawartość artykułu
        setEditedTitle(articles[index].title);
        setEditedContent(articles[index].content);
    };

    const handleSaveClick = async (index, updatedTitle, updatedContent) => {
        const newIsEditingArray = [...isEditingArray];
        newIsEditingArray[index] = false;
        setIsEditingArray(newIsEditingArray);

        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/api/v1/articles/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`,
                },
                body: JSON.stringify({
                    title: updatedTitle,
                    content: updatedContent,
                    id: articles[index].id
                }),
            });

            if (response.ok) {
                // Aktualizuj stan artykułu tylko wtedy, gdy odpowiedź jest udana
                const updatedArticles = [...articles];
                updatedArticles[index].title = updatedTitle;
                updatedArticles[index].content = updatedContent;
                setArticles(updatedArticles);
            } else {
                throw new Error('Failed to update article');
            }
        } catch (error) {
            console.error('Error updating article:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleEdit = (index) => {
        const newIsEditingArray = [...isEditingArray];
        newIsEditingArray[index] = !isEditingArray[index];
        setIsEditingArray(newIsEditingArray);

        // Jeśli tryb edycji jest aktywny, pobierz edytowane wartości dla tego artykułu z odpowiednich tablic
        if (!isEditingArray[index]) {
            setEditedTitle(editedTitleArray[index] || articles[index].title);
            setEditedContent(editedContentArray[index] || articles[index].content);
        }
    };

    const handleSaveComment = (index, commentContent) => {
        // Obsługa zapisywania komentarza
    };


    return (
        <div className='article-list'>
            <h1 className='list-title'>Lista Artykułów</h1>
            {articles.map((article, index) => (
                <div key={article.id} className={`Article article-${index + 1}`}>
                    <div className="title-container">
                        {isEditingArray[index] ? (
                            <input
                                className='editTitleInput'
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                            />
                        ) : (
                            <h2 className='title'>{article.title}</h2>
                        )}
                        {loggedInUserId === article.user.id && !isEditingArray[index] ? (
                            <button className="edit-button" onClick={() => toggleEdit(index)}>Edit</button>
                        ) : null}
                        {loggedInUserId === article.user.id && isEditingArray[index] ? (
                            <>
                                <button className="article-save-button" onClick={() => handleSaveClick(index, editedTitle, editedContent)}>Save</button>
                                <button className="article-close-button" onClick={() => toggleEdit(index)}>Close</button>
                            </>
                        ) : null}
                    </div>
                    {isEditingArray[index] ? (
                        <textarea
                            className='editContentInput'
                            rows="4"
                            cols="50"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                    ) : (
                        <p className='content'>{article.content}</p>
                    )}
                    <div className="author-container">
                        <button className='article-author-button' onClick={() => handleAuthorClick(article.user.id)} disabled={loading}>
                            {loading ? 'Loading...' : `${article.user.firstName} ${article.user.lastName}`}
                        </button>
                        <p className='article-author-date'>{article.updated ? `Edited: ${dateFormat(article.updatedAt)}` : `Posted: ${dateFormat(article.postedDate)}`}</p>
                    </div>
                    <div className="likes-container">
                        <p className='likes'>{"Likes: " + article.likesCount}</p>
                        <button className={`like-button ${article.isLiked ? 'liked' : ''}`} onClick={() => handleLikeClick(article.id)}>
                            {article.isLiked ? 'Liked' : 'Like'}
                        </button>
                        {article.commentsNumber > 0 && (
                        <button className='comment-button' onClick={() => toggleComments(article)}>
                            {selectedArticle === article ? 'Close Comments' : `Comments (${article.commentsNumber})`}
                        </button>
                        )}
                    </div>
                    {selectedArticle === article && (
                        <CommentList articleId={article.id} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default ArticleList;
