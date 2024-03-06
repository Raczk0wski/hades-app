import React, { useState } from 'react';
import { addArticle } from '../Request/Requests';
import './createArticle.css'

const CreateArticleForm = ({ onSuccess, onCancel }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await addArticle(title, content);
            setTitle('');
            setContent('');
            onSuccess();
        } catch (error) {
            console.error('Error creating article:', error);
        }
    };

    const handleCancel = () => {
        onCancel();
        setTitle('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <container className='formContainer'>
                <div>
                    <label className='label'>Title:</label>
                    <input className='titleInput' type='text' value={title} onChange={handleTitleChange} required />
                </div>
                <div>
                    <label className='label'>Content:</label>
                    <textarea className='contentInput' rows="4" cols="50" value={content} onChange={handleContentChange} required />
                </div>
                <container className='formButtons'>
                    <button className='close' type='button' onClick={onCancel}>Cancel</button>
                    <button className='create' type='submit'>CREATE</button>
                </container>
            </container>
        </form>
    );
};

export default CreateArticleForm;
