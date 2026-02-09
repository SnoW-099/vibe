import React from 'react';
import { Plus, X } from 'lucide-react';
import './Links.css';

function Links({ links = [], onAdd, onDelete }) {
    const getFavicon = (url) => {
        try {
            const domain = new URL(url).hostname;
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
        } catch {
            return '';
        }
    };

    return (
        <section className="links-section">
            <h2 className="section-title" style={{ marginBottom: '1.5rem', marginLeft: '0.5rem' }}>Quick Links</h2>
            <div className="links-grid">
                {links.map(link => (
                    <div key={link.id} className="link-card-wrap">
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-card glass-card" title={link.url}>
                            <div className="icon-wrapper">
                                <img
                                    src={getFavicon(link.url)}
                                    alt={link.name}
                                    className="link-icon"
                                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                                />
                                <span className="fallback-icon" style={{ display: 'none' }}>{link.name[0]}</span>
                            </div>
                            <span className="link-name">{link.name}</span>
                        </a>
                        <button className="link-delete-btn" onClick={(e) => { e.preventDefault(); onDelete(link.id); }}>
                            <X size={14} />
                        </button>
                    </div>
                ))}

                <button className="add-link-card glass-card" onClick={onAdd}>
                    <Plus size={24} />
                    <span>Add New</span>
                </button>
            </div>
        </section>
    );
}

export default Links;
