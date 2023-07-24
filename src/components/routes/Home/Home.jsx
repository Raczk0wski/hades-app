import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query';
import './Home.css'

const addArticleQuery = async ({ title, content }) => {
    const response = await fetch('http://localhost:8080/api/v1/articles/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYWN6a293c2tpLmJhcnRla0BnbWFpbC5jb20iLCJleHAiOjE2OTAyNjc5NDgsImlhdCI6MTY5MDIzMTk0OH0.AYX7gT3Lg6fgsDYV76u1FFXD612oYsHPwE27QQFvsyw',
        },
        body: JSON.stringify({ title, content }),
    });
    if (!response.ok) {
        throw new Error('Failed to insert new article', response);
    }
    return await response.json();
};

const Home = () => {
    const navigate = useNavigate();
    const { mutate: addArticle, isLoading, error } = useMutation(addArticleQuery)
    const redirectToLogin = () => navigate('/login')
    const onAddArticle = () => addArticle({ title: 'test', content: 'lipsum' })
    return (
        <div className='home-route'>
            <h1>homepage</h1>
            <div>
                <a onClick={redirectToLogin}>go to login</a>
            </div>
            <div>
                <a onClick={onAddArticle}>add article</a>
            </div>
        </div>
    )
}

export default Home