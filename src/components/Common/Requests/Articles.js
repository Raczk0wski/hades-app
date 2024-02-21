export const getArticles = async ({ page = 1 , items =10 } = {}) => {
    const response = await interceptedFetch(`http://localhost:8080/api/v1/articles/get/all?page=${page}&size=${items}&sortBy=postedDate&sort=desc`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
    if (!response.ok) {
        throw new Error('Failed to fetch articles', response);
    }
    return response.json();
};

export const addArticle = async (title, content) => {
    const response = await interceptedFetch('http://localhost:8080/api/v1/articles/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`,
            'Accept': '*'
        },
        body: JSON.stringify({ title, content }),
    });
    if (!response.ok) {
        throw new Error('Failed to insert new article', response);
    }
};

async function interceptedFetch(url, options) {
    
    const response = await fetch(url, options);

    if (response.status === 401) {
        window.location = '/login'
    }
    return response
}