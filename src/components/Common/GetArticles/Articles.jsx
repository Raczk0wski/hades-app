import React, { useState, useEffect } from 'react';
import './Articles.css';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../Request/Requests';
import CommentList from '../Comments/Comments'

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

    useEffect(() => {
        setArticles(articlesProp);
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

   
    return (
        <div className='article-list'>
            <h1 className='list-title'>Lista Artykułów</h1>
            {articles.map((article, index) => (
                <div key={article.id} className={`Article article-${index + 1}`}>
                    <h2 className='title'>{article.title}</h2>
                    <p className='content'>{article.content}</p>
                    <div className="author-container">
                        <button className='author-button' onClick={() => handleAuthorClick(article.user.id)} disabled={loading}>
                            {loading ? 'Loading...' : `${article.user.firstName} ${article.user.lastName}`}
                        </button>
                        <p className='date'>{article.updated ? `Edited: ${dateFormat(article.updatedAt)}` : `Posted: ${dateFormat(article.postedDate)}`}</p>
                    </div>
                    <div className="likes-container">
                        <p className='likes'>{"Likes: " + article.likesCount}</p>
                        <button className={`like-button ${article.isLiked ? 'liked' : ''}`} onClick={() => handleLikeClick(article.id)}>
                            {article.isLiked ? 'Liked' : 'Like'}
                        </button>
                        <button className='comment-button' onClick={() => toggleComments(article)}>
                            {selectedArticle === article ? 'Close Comments' : 'Comments'}
                        </button>
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
