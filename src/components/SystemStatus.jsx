import React from 'react';
import './SystemStatus.css';

function SystemStatus({ snippetsCount, projectsCount, linksCount }) {
    return (
        <section className="glass-card">
            <div className="card-header">
                <h2 className="card-title">System</h2>
            </div>
            <div className="card-content terminal-style">
                <div className="status-text">Status: Online</div>
                <div className="status-text">Sync: OK</div>
                <div className="status-text">Snippets: {snippetsCount}</div>
                <div className="status-text">Projects: {projectsCount}</div>
                <div className="status-text">Links: {linksCount}</div>
            </div>
        </section>
    );
}

export default SystemStatus;
