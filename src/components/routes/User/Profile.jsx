import React from 'react';
import { useLocation } from 'react-router-dom';

const Profile = () => {
    const location = useLocation();
    const authorData = location.state?.authorData;

    if (!authorData) {
        return <div>Error: Author data not found</div>;
    }

    const onClickArtcile = async() => {
        const response = await fetch(`http://localhost:8080/api/v1/articles/get/from?id=${authorData.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch articles', response);
        }
        return response.json();
    }

    return (
        <div>
            <h1>{authorData.firstName} {authorData.lastName}</h1>
            <h1>E-mail: {authorData.email}</h1>
            <h1>Role: {authorData.userRole}</h1>
            <div>
                <h1>Artciles: {authorData.articlesCount}</h1>
            <button onClick={onClickArtcile}>Zobacz</button>
            </div>
            <h1>Comments: {authorData.commentsCount}</h1>
        </div>
    );
};

export default Profile;
