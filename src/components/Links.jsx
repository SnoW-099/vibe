import React from 'react';
import './Links.css';

function Links({ links, onAdd, onDelete }) {
    return (
        <section className="glass-card">
            <div className="card-header">
                <h2 className="card-title">Links</h2>
                <button className="add-btn" onClick={onAdd}>+</button>
            </div>
            <div className="card-content">
                <div className="link-list">
                    {links.map(link => (
                        <div key={link.id} className="link-item-wrap">
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-item">
                                {link.name}
                            </a>
                            <button className="delete-btn-small" onClick={() => onDelete(link.id)}>×</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Links;
