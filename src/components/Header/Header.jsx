import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import Weather from '../Weather';
import '../Weather.css';
import { Gamepad2, X } from 'lucide-react';
import SnakeGame from '../SnakeGame';
import '../SnakeGame.css';

function Header() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showGame, setShowGame] = useState(false);

    useEffect(() => {
        console.log("HEADER RELOADED! V2 - SNAKE & WEATHER");
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
        <>
            <header className={styles.header}>
                <div className={styles.left}>
                    <h1 className={styles.title} onClick={() => setShowGame(true)} style={{ cursor: 'pointer', pointerEvents: 'auto' }}>
                        Vibes
                    </h1>
                </div>

                <div className={styles.right}>
                    <div className={styles.clockWidget}>
                        <span className={styles.time}>{formatTime(currentTime)}</span>
                        <span className={styles.date}>{formatDate(currentTime)}</span>
                    </div>

                    <Weather />
                    <button
                        className={styles.gameBtn}
                        onClick={() => setShowGame(true)}
                        title="Secret Zone"
                    >
                        <Gamepad2 size={18} />
                    </button>
                </div>
            </header>

            {showGame && (
                <div className={styles.modalOverlay} onClick={() => setShowGame(false)}>
                    <div className={styles.gameContainer} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={() => setShowGame(false)}>
                            <X size={24} />
                        </button>
                        <h2 style={{ marginBottom: '1rem', textAlign: 'center', color: 'white' }}>Retro Zone</h2>
                        <SnakeGame />
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
