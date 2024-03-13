import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleList from '../../Common/GetArticles/Articles';
import { getArticles, getUser } from '../../Common/Request/Requests';
import CreateArticleForm from '../../Common/Forms/createArticle';
import './Home.css'
import '../../Common/Forms/createArticle.css'
import getComments from '../../Common/Request/Comments';

const Home = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [articles, setArticles] = useState([]);
    const [showArticles, setShowArticles] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [creatingArticle, setCreatingArticle] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(1);

    const fetchArticles = async () => {
        try {
            const data = await getArticles({ page: currentPage, items: itemsPerPage });
            setArticles(data.items);
            setShowArticles(true);
            setShowForm(false);
            setCreatingArticle(false);
            setTotalPages(data.meta.totalPages);
            setTotalItems(data.meta.totalItems);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const reset = () => {
        setArticles([])
        setShowArticles(false)
        setShowForm(false);
        setCreatingArticle(false);
    }

    const cancelForm = () => {
        setShowForm(false);
        setTitle('');
        setContent('');
        setCreatingArticle(false);
    }

    const logOut = () => {
        navigate('/LogIn');
        localStorage.removeItem('token');
    };

    const openCreateArticleForm = () => {
        setShowForm(true);
        setShowArticles(false);
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const showGetArticlesButton = !showForm && !showArticles;

    const userData = async () => {
        const res = await getUser(localStorage.userId);
        const data = await res.json()
        setUserName(data.firstName)
    }

    useEffect(() => {
        userData()
        if (showArticles) {
            fetchArticles();
        }
    }, [itemsPerPage, currentPage]);

    const handleAuthorClick = async (authorId) => {
        //setLoading(true);
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
            //setLoading(false);
        }
    };

    return (
        <div>
            <div className='home'>
                {!showArticles && showGetArticlesButton && <h1 className='main-copy'>Witaj, {userName}</h1>}
                <container className='navButtons'>
                    <div>
                        {showGetArticlesButton && <button className='button' onClick={fetchArticles}>Articles</button>}
                    </div>
                    {showArticles &&
                        <container className='main-container'>
                            <div>
                                <select className='pagination-select' id="itemsPerPage" value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)}>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                    <option value={20}>20</option>
                                </select>
                            </div>
                            <button className='close-button' onClick={reset}>close</button>
                        </container>
                    }
                    <div>
                        {showArticles && !creatingArticle && articles.length > 0 && <ArticleList articlesProp={articles} />}
                    </div>

                    <div>
                        {!showForm && showGetArticlesButton && <button className='button' onClick={openCreateArticleForm}>Create Article</button>}
                    </div>
                    <div className='formContainer'>
                        {showForm && <CreateArticleForm onSuccess={reset} onCancel={cancelForm} onTitleChange={handleTitleChange} onContentChange={handleContentChange} />}
                    </div>
                    {showArticles && (
                        <div>
                            <div className='pagination'>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToPage(index + 1)}
                                        className={currentPage === index + 1 ? 'active' : ''}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {!showArticles && showGetArticlesButton && <div>
                        <button className='button' onClick={() => handleAuthorClick(localStorage.userId)}>Your profile</button>
                    </div>}
                    {!showArticles && showGetArticlesButton && <div>
                        <button className='button' onClick={logOut}>log out</button>
                    </div>}
                </container>
            </div>
        </div >
    );
}

export default Home;
