import { useState } from 'react';
import styles from "./page.module.css";

export const AddDataForm = ({ handleSubmit }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleBodyChange = (event) => {
        setBody(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSubmit({ title, body });
        setTitle('');
        setBody('');
        
    };

    return (
        <form onSubmit={handleFormSubmit} className={styles.form}>
            <h3 className={styles.formTitle}>Lisää dataa</h3>

            <div className={styles.formGroup}>
                <label htmlFor="title">Title</label>
                <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="body">Body</label>
                <textarea placeholder="Body" value={body} onChange={handleBodyChange} />
            </div>
            <button className={styles.submitBtn} type="submit">
                Lisää
            </button>
        </form>
    );
};
