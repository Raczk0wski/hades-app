import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query';
import './Home.css'
import myFetch from '../../../api/fetch'

const addArticleQuery = async ({ title, content }) => {
    console.log("Add article button clicked");
    const response = fetch('http://localhost:8080/api/v1/articles/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    });
    if (!response.ok) {
        throw new Error('Failed to insert new article', response);
    }
    return await response.json();
};

const getArticles = async ({}) => {
    console.log("Add article button clicked");
    const response = await fetch('http://localhost:8080/api/v1/articles/get/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to get articles', response);
    }
    return await response.json();
};

const Home = () => {
    const navigate = useNavigate();
    const { mutate: addArticle, isLoading, error } = useMutation(addArticleQuery)
    const { mutate: getArt } = useMutation(getArticles)
    const redirectToLogin = () => navigate('/login')
    const onAddArticle = () => addArticle({ title: 'test', content: 'lipsum' })
    const onGetArticles = () => getArt({})
    return (
        <div className='home-route'>
            <h1>homepage</h1>
            <div>
                <a onClick={redirectToLogin}>go to login</a>
            </div>
            <div>
                <a onClick={onAddArticle}>add article</a>
            </div>
            <div>
                <a onClick={onGetArticles}>Get articles</a>
            </div>
        </div>
    )
}

export default Home