import React from 'react';
import './Projects.css';

function Projects({ projects, onAdd, onDelete, onToggle }) {
    return (
        <section className="glass-card span-2-row">
            <div className="card-header">
                <h2 className="card-title">Projects</h2>
                <button className="add-btn" onClick={onAdd}>+</button>
            </div>
            <div className="card-content">
                {projects.map(project => (
                    <div key={project.id} className="project-item">
                        <div className="project-wrap" onClick={() => onToggle(project.id)}>
                            <span className={`dot ${project.status === 'active' ? 'active' : ''}`}></span>
                            {project.name}
                        </div>
                        <div className="project-actions">
                            <span className="project-status">{project.label}</span>
                            <button className="delete-btn-small" onClick={() => onDelete(project.id)}>×</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Projects;
