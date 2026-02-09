import React from 'react';
import './SnowBackground.css';

function SnowBackground() {
    return (
        {/* Increased snowflake count */ }
            {
        [...Array(50)].map((_, i) => (
            <div key={i} className="snowflake"></div>
        ))
    }
        </div >
    );
}

export default SnowBackground;
