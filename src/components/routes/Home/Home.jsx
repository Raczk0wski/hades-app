import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleList from '../../Common/GetArticles/Articles';
import { getArticles } from '../../Common/Requests/Articles';
import CreateArticleForm from '../../Common/Forms/createArticle';
import './Home.css'
import '../../Common/Forms/createArticle.css'

const Home = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [showArticles, setShowArticles] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [creatingArticle, setCreatingArticle] = useState(false);

    const fetchArticles = async () => {
        try {
            const data = await getArticles({ page: 1 });
            setArticles(data.items);
            setShowArticles(true);
            setShowForm(false);
            setCreatingArticle(false);
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

    const showGetArticlesButton = !showForm && !showArticles;

    useEffect(() => {
    }, []);

    return (
        <div>
            <div className='home'>
                <container className='navButtons'>
                    <div>
                        {showGetArticlesButton && <button className='button' onClick={fetchArticles}>Get articles</button>}
                    </div>
                    {showArticles &&
                        <div className='close-container'>
                            <button className='close-button' onClick={reset}>close</button>
                        </div>}
                    <div>
                        {showArticles && !creatingArticle && articles.length > 0 && <ArticleList articles={articles} />}
                    </div>

                    <div>
                        {!showForm && showGetArticlesButton && <button className='button' onClick={openCreateArticleForm}>Create Article</button>}
                    </div>
                    <div className='formContainer'>
                        {showForm && <CreateArticleForm onSuccess={reset} onCancel={cancelForm} onTitleChange={handleTitleChange} onContentChange={handleContentChange} />}
                    </div>
                    <div>
                        <button className='button' onClick={logOut}>log out</button>
                    </div>
                </container>
            </div>
        </div >
    );
}

export default Home;
