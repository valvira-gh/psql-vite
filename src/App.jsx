import React, { useState, useEffect } from "react";
import styles from "./App.module.css";

const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/data")
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);

    return (
        <div className={styles.App}>
            <h1>React App</h1>
            <div className={styles.container}>
                {data.map((item) => (
                    <div key={item.id} className={styles.item}>
                        <h2>{item.title}</h2>
                        <p>{item.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
