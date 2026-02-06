import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // ===== STATE =====
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

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('devpanel_projects');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'DevPanel Dashboard', status: 'active', label: 'In Progress' },
      { id: 2, name: 'Old Portfolio', status: 'inactive', label: 'Maintenance' }
    ];
  });

  const [toast, setToast] = useState({ show: false, message: '' });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [editingSnippet, setEditingSnippet] = useState(null);

  // ===== EFFECTS =====
  useEffect(() => {
    localStorage.setItem('devpanel_snippets', JSON.stringify(snippets));
  }, [snippets]);

  useEffect(() => {
    localStorage.setItem('devpanel_links', JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem('devpanel_notes', notes);
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('devpanel_projects', JSON.stringify(projects));
  }, [projects]);

  // Clock update every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ===== TOAST FUNCTION =====
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 2500);
  };

  // ===== SNIPPET FUNCTIONS =====
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard');
  };

  const addSnippet = () => {
    const title = prompt('Snippet Title:');
    const code = prompt('Code:');
    if (title && code) {
      setSnippets([...snippets, { id: Date.now(), title, code }]);
      showToast('Snippet added');
    }
  };

  const deleteSnippet = (id) => {
    setSnippets(snippets.filter(s => s.id !== id));
    showToast('Snippet deleted');
  };

  const editSnippet = (snippet) => {
    const newTitle = prompt('Edit Title:', snippet.title);
    const newCode = prompt('Edit Code:', snippet.code);
    if (newTitle && newCode) {
      setSnippets(snippets.map(s => s.id === snippet.id ? { ...s, title: newTitle, code: newCode } : s));
      showToast('Snippet updated');
    }
  };

  // ===== LINK FUNCTIONS =====
  const addLink = () => {
    const name = prompt('Link Name:');
    const url = prompt('URL:');
    if (name && url) {
      setLinks([...links, { id: Date.now(), name, url }]);
      showToast('Link added');
    }
  };

  const deleteLink = (id) => {
    setLinks(links.filter(l => l.id !== id));
    showToast('Link deleted');
  };

  // ===== PROJECT FUNCTIONS =====
  const addProject = () => {
    const name = prompt('Project Name:');
    if (name) {
      setProjects([...projects, { id: Date.now(), name, status: 'active', label: 'In Progress' }]);
      showToast('Project added');
    }
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    showToast('Project deleted');
  };

  const toggleProjectStatus = (id) => {
    setProjects(projects.map(p => {
      if (p.id === id) {
        const isActive = p.status === 'active';
        return { ...p, status: isActive ? 'inactive' : 'active', label: isActive ? 'Paused' : 'In Progress' };
      }
      return p;
    }));
  };

  // ===== FORMAT TIME =====
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="app-container">
      {/* Toast Notification */}
      <div className={`toast ${toast.show ? 'show' : ''}`}>
        {toast.message}
      </div>

      {/* Animated Vibe Background */}
      <div className="vibe-bg">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <header className="main-header">
        <div className="clock-widget">
          <span className="clock-time">{formatTime(currentTime)}</span>
          <span className="clock-date">{formatDate(currentTime)}</span>
        </div>
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
                <div className="snippet-info" onClick={() => editSnippet(snippet)}>
                  <h3>{snippet.title}</h3>
                  <code>{snippet.code.substring(0, 40)}{snippet.code.length > 40 ? '...' : ''}</code>
                </div>
                <div className="snippet-actions">
                  <button className="copy-btn" onClick={() => copyToClipboard(snippet.code)}>Copy</button>
                  <button className="delete-btn" onClick={() => deleteSnippet(snippet.id)}>×</button>
                </div>
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
                <div key={link.id} className="link-item-wrap">
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-item">
                    {link.name}
                  </a>
                  <button className="delete-btn-small" onClick={() => deleteLink(link.id)}>×</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="glass-card span-2-row">
          <div className="card-header">
            <h2 className="card-title">Projects</h2>
            <button className="add-btn" onClick={addProject}>+</button>
          </div>
          <div className="card-content">
            {projects.map(project => (
              <div key={project.id} className="project-item">
                <div className="project-wrap" onClick={() => toggleProjectStatus(project.id)}>
                  <span className={`dot ${project.status === 'active' ? 'active' : ''}`}></span>
                  {project.name}
                </div>
                <div className="project-actions">
                  <span className="project-status">{project.label}</span>
                  <button className="delete-btn-small" onClick={() => deleteProject(project.id)}>×</button>
                </div>
              </div>
            ))}
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

        {/* System Status */}
        <section className="glass-card">
          <div className="card-header">
            <h2 className="card-title">System</h2>
          </div>
          <div className="card-content terminal-style">
            <div className="status-text">Status: Online</div>
            <div className="status-text">Sync: OK</div>
            <div className="status-text">Snippets: {snippets.length}</div>
            <div className="status-text">Projects: {projects.length}</div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
