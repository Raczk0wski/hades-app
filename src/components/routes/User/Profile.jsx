import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TrashIcon from '../../../components/Common/Comments/trash.jsx';
import './profile.css';
import { deleteArticle, getArticleForUser } from '../../Common/Request/Requests';
import { getCommentsForUser } from '../../Common/Request/Comments.js';
import { dateFormat } from '../../Common/Patterns/DatePattern.js';

const Profile = () => {
    const location = useLocation();
    const authorData = location.state?.authorData;
    const [articles, setArticles] = useState([]);
    const [commentsData, setCommentsData] = useState([]);
    const [followersData, setFollowersData] = useState([]);
    const [followingData, setFollowingData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showArticles, setShowArticles] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const handleDeleteClick = async (articleId) => {
        try {
            setLoading(true);
            const response = await deleteArticle(articleId);
            if (response.ok) {
                const updatedArticles = articles.filter(article => article.id !== articleId);
                setArticles(updatedArticles);
            } else {
                console.error('Failed to delete article:', response);
            }
        } catch (error) {
            console.error('Error deleting article:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleArticlesClick = async () => {
        setLoading(true);
        try {
            if (showArticles) {
                setShowArticles(false);
                return;
            }
            const data = await getArticleForUser(authorData.id);
            setArticles(data);
            setShowFollowing(false);
            setShowFollowers(false);
            setShowArticles(true);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleCommentsClick = async () => {
        setLoading(true);
        try {
            if (showComments) {
                setShowComments(false);
                return;
            }
            const data = await getCommentsForUser(authorData.id)
            setCommentsData(data);
            setShowFollowing(false);
            setShowFollowers(false);
            setShowArticles(false);
            setShowComments(true);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    }


    const handleFollowersClick = async () => {
        setLoading(true);
        try {
            if (showFollowers) {
                setFollowersData(false);
                return;
            }
            const response = await fetch(`http://localhost:8080/api/v1/users/${authorData.id}/followers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch followers');
            }
            const data = await response.json();
            setFollowersData(data);
            setShowArticles(false);
            setShowFollowers(true);
            setShowFollowing(false);
        } catch (error) {
            console.error('Error fetching followers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFollowingClick = async () => {
        setLoading(true);
        try {
            if (showFollowing) {
                setShowFollowing(false);
                return;
            }
            const response = await fetch(`http://localhost:8080/api/v1/users/${authorData.id}/following`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch following');
            }
            const data = await response.json();
            setFollowingData(data);
            setShowArticles(false);
            setShowFollowing(true);
            setShowFollowers(false);
        } catch (error) {
            console.error('Error fetching following:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleArticles = () => {
        setShowArticles(!showArticles);
    };

    return (
        <div className="profile-container">
            <div className='content-section profile-stats'>
                <div className="profile-info">
                    <strong>Imię Nazwisko:</strong>
                    <p>{authorData.firstName} {authorData.lastName}</p>
                </div>
                <div className="profile-info">
                    <strong>E-mail:</strong>
                    <p>{authorData.email}</p>
                </div>
                <div className="profile-info">
                    <strong>Role:</strong>
                    <p>{authorData.userRole}</p>
                </div>
                <div className="profile-info">
                    <strong>Comments:</strong>
                    <button className='counter' onClick={handleCommentsClick}>
                        {authorData.commentsCount}
                    </button>
                </div>
                <div className="profile-info">
                    <strong>Articles:</strong>
                    <button className='counter' onClick={handleArticlesClick}>
                        {authorData.articlesCount}
                    </button>
                </div>
                <div className="profile-info">
                    <strong>Followers:</strong>
                    <button className='counter' onClick={handleFollowersClick}>
                        {authorData.followersCount}
                    </button>
                </div>
                <div className="profile-info">
                    <strong>Following:</strong>
                    <button className='counter' onClick={handleFollowingClick}>
                        {authorData.followsCount}
                    </button>
                </div>
            </div>

            {loading && <p>Loading...</p>}

            {showFollowers && followersData.length > 0 && (
                <div className='followers-list'>
                    <h1 className='list-title'>Lista Obserwujących</h1>
                    {followersData.map((follower) => (
                        <div key={follower.id} className="follower-card">
                            <h3>Imie Nazwisko: {follower.firstName} {follower.lastName}</h3>
                            <p>Email: {follower.email}</p>

                        </div>
                    ))}
                </div>
            )}

            {showFollowing ? (followingData.length > 0 ? (
                <div className='following-list'>
                    <h1 className='list-title'>Lista Obserwowanych</h1>
                    {followingData.map((following) => (
                        <div key={following.id} className="follower-card">
                            <h3>{following.firstName} {following.lastName}</h3>
                            <p>Email: {following.email}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nie obserwujesz jeszcze nikogo.</p>
            )
            ) : null}

            {showComments && commentsData.length > 0 && (
                <div className='article-list'>
                    <h1 className='list-title'>Lista Komentarzy</h1>
                    {commentsData.map((comment, index) => (
                        <div key={comment.id} className={`MyComment comment-${index + 1}`}>
                            <TrashIcon onClick={() => handleDeleteClick()} />
                            <p className='content'>{comment.content}</p>
                            <p style={{ fontSize: '12px', margin: '0px' }}>Likes: {comment.likesNumber}</p>
                            <p style={{ fontSize: '12px', margin: '0px' }}>Posted: {dateFormat(comment.postedDate)}</p>
                        </div>

                    ))}
                </div>
            )}

            {loading && <p>Loading...</p>}

            {showArticles && articles && articles.length > 0 && (
                <div className='article-list'>
                    <h1 className='list-title'>Lista Artykułów</h1>
                    {articles.map((article, index) => (
                        <div key={article.id} className={`MyArticle article-${index + 1}`}>
                            <div className="title-container">
                                <h2 className='title'>{article.title}</h2>
                                <TrashIcon onClick={() => handleDeleteClick(article.id)} />
                            </div>
                            <p className='content'>{article.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Profile;
