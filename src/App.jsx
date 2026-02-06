import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [snippets, setSnippets] = useState(() => {
    const saved = localStorage.getItem('devpanel_snippets');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'React Hook', code: 'const [state, setState] = useState(initialState);' },
      { id: 2, title: 'CSS Glassmorphism', code: 'background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);' }
    ];
  });

  const [links, setLinks] = useState(() => {
    const saved = localStorage.getItem('devpanel_links');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'GitHub', url: 'https://github.com' },
      { id: 2, name: 'Documentation', url: 'https://developer.mozilla.org' }
    ];
  });

  const [notes, setNotes] = useState(() => {
    return localStorage.getItem('devpanel_notes') || '';
  });

  useEffect(() => {
    localStorage.setItem('devpanel_snippets', JSON.stringify(snippets));
  }, [snippets]);

  useEffect(() => {
    localStorage.setItem('devpanel_links', JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem('devpanel_notes', notes);
  }, [notes]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const addSnippet = () => {
    const title = prompt('Snippet Title:');
    const code = prompt('Code:');
    if (title && code) {
      setSnippets([...snippets, { id: Date.now(), title, code }]);
    }
  };

  const addLink = () => {
    const name = prompt('Link Name:');
    const url = prompt('URL:');
    if (name && url) {
      setLinks([...links, { id: Date.now(), name, url }]);
    }
  };

  return (
    <div className="app-container">
      <header className="main-header">
        <h1>Dev<span>Panel</span></h1>
        <p>Your personal developer dashboard</p>
      </header>

      <main className="dashboard">
        {/* Snippets Area */}
        <section className="glass-card span-2-col span-2-row">
          <div className="card-header">
            <h2 className="card-title">Code Snippets</h2>
            <button className="add-btn" onClick={addSnippet}>+</button>
          </div>
          <div className="card-content snippet-grid">
            {snippets.map(snippet => (
              <div key={snippet.id} className="snippet-item">
                <div className="snippet-info">
                  <h3>{snippet.title}</h3>
                  <code>{snippet.code.substring(0, 40)}{snippet.code.length > 40 ? '...' : ''}</code>
                </div>
                <button className="copy-btn" onClick={() => copyToClipboard(snippet.code)}>Copy</button>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section className="glass-card">
          <div className="card-header">
            <h2 className="card-title">Links</h2>
            <button className="add-btn" onClick={addLink}>+</button>
          </div>
          <div className="card-content">
            <div className="link-list">
              {links.map(link => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="link-item">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Preview */}
        <section className="glass-card span-2-row">
          <div className="card-header">
            <h2 className="card-title">Current Projects</h2>
          </div>
          <div className="card-content">
            <div className="project-item">
              <div className="project-wrap">
                <span className="dot active"></span>
                DevPanel Dashboard
              </div>
              <span className="project-status">In Progress</span>
            </div>
            <div className="project-item">
              <div className="project-wrap">
                <span className="dot"></span>
                Old Portfolio
              </div>
              <span className="project-status">Maintenance</span>
            </div>
          </div>
        </section>

        {/* Quick Notes */}
        <section className="glass-card span-2-col">
          <div className="card-header">
            <h2 className="card-title">Quick Notes</h2>
          </div>
          <div className="card-content">
            <textarea
              placeholder="Ideas, tasks, or commands..."
              className="note-input"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
        </section>

        {/* Status / Terminal style */}
        <section className="glass-card">
          <div className="card-header">
            <h2 className="card-title">System</h2>
          </div>
          <div className="card-content terminal-style">
            <div className="status-text">Status: Online</div>
            <div className="status-text">Local Storage Sync: OK</div>
            <div className="status-text">Snippets: {snippets.length}</div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
