import React from 'react';
import styles from './Toast.module.css';

function Toast({ show, message }) {
    return (
        <div className={`${styles.toast} ${show ? styles.show : ''}`}>
            {message}
        </div>
    );
}

export default Toast;
