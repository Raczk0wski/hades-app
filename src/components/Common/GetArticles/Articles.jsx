import React from 'react';
import './Articles.css';

function dateFormat(data) {
    const date = new Date(data);
    const rrrr = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const gg = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    return `${gg}:${mi} ${dd}-${mm}-${rrrr} `;
}

const ArticleList = ({ articles }) => {
    if (!Array.isArray(articles)) {
        console.error('Invalid articles data:', articles);
        return <div>Error: Invalid articles data</div>;
    }

    return (
        <ol>
            <h1 className='list-title'>Lista Artykułów</h1>
            {articles.map((article, index) => (
                <div key={article.id} className={`Article article-${index + 1}`}>
                    <h2 className='title'>{article.title}</h2>
                    <p className='content'>{article.content}</p>
                    <p className='author'>{article.user.firstName + " " + article.user.lastName + " " + dateFormat(article.postedDate)} </p>
                    <p className='likes'>{"likes: " + article.likesCount}</p>
                </div>
            ))}

        </ol>
    );
};

export default ArticleList;
