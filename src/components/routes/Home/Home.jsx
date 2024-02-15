import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query';
import './Home.css'

const token = localStorage.token

const addArticleQuery = async ({ title, content }) => {
    const response = await fetch('http://localhost:8080/api/v1/articles/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
    });
    if (!response.ok) {
        throw new Error('Failed to insert new article', response);
    }
    return await response.json();
};

const getArticles = async ({ }) => {
    const response = await fetch('http://localhost:8080/api/v1/articles/get/from/?id=2', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to get articles', response);
    }
    return await response.json();
};

const Home = () => {
    const navigate = useNavigate();
    if(!localStorage.getItem('token')){
        navigate('/login')
    }
    const { mutate: addArticle } = useMutation(addArticleQuery)
    const { mutate: getArt } = useMutation(getArticles)
    const logOut = () => {
        navigate('/LogIn')
        localStorage.removeItem('token');
    }
    const onAddArticle = () => addArticle({ title: 'test', content: 'lipsum' })
    const onGetArticles = () => getArt({})
    
    return (
        <div className='home-route'>
            <h1>homepage</h1>
            <div>
                <button className='login-button' onClick={onAddArticle}>Add article</button>
            </div>
            <div>
                <button className='login-button' onClick={onGetArticles}>Get articles</button>
            </div>
            <div>
                <button className='log-out-button' onClick={logOut}>log out</button>
            </div>
        </div>
    )
}

export default Home