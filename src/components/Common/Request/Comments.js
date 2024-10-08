export const getComments = async (articleId) => {
    const response = await interceptedFetch(`http://localhost:8080/api/v1/comments?id=${articleId}&page=1&size=100&sort=desc`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch Comments', response);
    }
    return response;
};

export const likeComment = async (articleId) => {
    const response = await interceptedFetch(`http://localhost:8080/api/v1/comments/like?id=${articleId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch Comments', response);
    }
    return response;
};

export const deleteComment = async (articleId) => {
    const response = await interceptedFetch(`http://localhost:8080/api/v1/comments/delete?id=${articleId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch Comments', response);
    }
    return response;
};

export const getCommentsForUser = async (userId) => {
    const response = await interceptedFetch(`http://localhost:8080/api/v1/comments/user?id=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch Comments', response);
    }
    return response.json();
};

async function interceptedFetch(url, options) {
    
    const response = await fetch(url, options);

    if (response.status === 401) {
        window.location = '/login'
    }
    return response
}