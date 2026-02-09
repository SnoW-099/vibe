import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import Weather from '../Weather';
import '../Weather.css'; // Import global styles for weather widget

function Header() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <div className={styles.clock}>
                    <span className={styles.time}>{formatTime(currentTime)}</span>
                    <span className={styles.date}>{formatDate(currentTime)}</span>
                </div>
            </div>

            <h1 className={styles.title}>Dev<span>Panel</span></h1>

            <div className={styles.right}>
                <Weather />
            </div>
        </header>
    );
}

export default Header;
