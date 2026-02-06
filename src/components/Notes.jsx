import React from 'react';
import './Notes.css';

function Notes({ notes, onChange }) {
    return (
        <section className="glass-card span-2-col">
            <div className="card-header">
                <h2 className="card-title">Quick Notes</h2>
            </div>
            <div className="card-content">
                <textarea
                    placeholder="Ideas, tasks, or commands..."
                    className="note-input"
                    value={notes}
                    onChange={(e) => onChange(e.target.value)}
                ></textarea>
            </div>
        </section>
    );
}

export default Notes;
