import React from 'react';
import './Snippets.css';

function Snippets({ snippets, onAdd, onEdit, onDelete, onCopy }) {
    return (
        <section className="glass-card span-2-col span-2-row">
            <div className="card-header">
                <h2 className="card-title">Code Snippets</h2>
                <button className="add-btn" onClick={onAdd}>+</button>
            </div>
            <div className="card-content snippet-grid">
                {snippets.map(snippet => (
                    <div key={snippet.id} className="snippet-item">
                        <div className="snippet-info" onClick={() => onEdit(snippet)}>
                            <h3>{snippet.title}</h3>
                            <code>{snippet.code.substring(0, 40)}{snippet.code.length > 40 ? '...' : ''}</code>
                        </div>
                        <div className="snippet-actions">
                            <button className="copy-btn" onClick={() => onCopy(snippet.code)}>Copy</button>
                            <button className="delete-btn" onClick={() => onDelete(snippet.id)}>×</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Snippets;
