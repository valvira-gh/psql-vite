import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import { AddDataForm } from "./components/addDataForm/index.jsx";

const App = () => {
    const [data, setData] = useState([]);
    const [showData, setShowData] = useState(true);
    const [showForm, setShowForm] = useState(true);
    const [submittedData, setSubmittedData] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/data")
            .then((response) => response.json())
            .then((data) => setData(data));
    }, [submittedData]);

    const handleFormSubmit = ({ title, body }) => {
        
        const formData = { title, body };
        fetch('http://localhost:3001/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
    };

    return (
        <div className={styles.App}>
            <div className={styles.container}>
                <h2 className={styles.containerTitle}>
                    Data from PostgreSQL -database
                </h2>
                {showData ? (
                    <div className={styles.dataWrapper}>
                        {data.map((item) => (
                            <div key={item.id} className={styles.item}>
                                <h3>{item.title}</h3>
                                <p>{item.body}</p>
                            </div>
                        ))}
                    </div>
                ) : null}

                <div className={styles.btnWrapper}>
                    <button
                        onClick={() => setShowData(!showData)}
                        className={styles.btn}
                    >
                        Näytä data
                    </button>
                    <button
                        onClick={() => setShowData(!showData)}
                        className={styles.btn}
                    >
                        Lisää dataa
                    </button>
                    <button className={styles.btn}>Päivitä dataa</button>
                    <button className={styles.btn}>Poista dataa</button>
                    <button className={styles.btn}>Tyhjennä taulu</button>
                </div>
                {showForm ? <AddDataForm handleSubmit={handleFormSubmit} /> : null}
            </div>
        </div>
    );
};

export default App;
