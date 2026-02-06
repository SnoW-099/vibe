import React, { useState } from 'react';
import './App.css';
import { useLocalStorage, useLocalStorageString } from './hooks/useLocalStorage';

// Components (using original flat structure)
import Header from './components/Header';
import Toast from './components/Toast';
import Snippets from './components/Snippets';
import Links from './components/Links';
import Projects from './components/Projects';
import Notes from './components/Notes';
import SystemStatus from './components/SystemStatus';

function App() {
  // Active section for sidebar navigation
  const [activeSection, setActiveSection] = useState('snippets');

  // Data state
  const [snippets, setSnippets] = useLocalStorage('devpanel_snippets', [
    { id: 1, title: 'React Hook', code: 'const [state, setState] = useState(initialState);' },
    { id: 2, title: 'CSS Glassmorphism', code: 'background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);' }
  ]);

  const [links, setLinks] = useLocalStorage('devpanel_links', [
    { id: 1, name: 'GitHub', url: 'https://github.com' },
    { id: 2, name: 'Documentation', url: 'https://developer.mozilla.org' }
  ]);

  const [projects, setProjects] = useLocalStorage('devpanel_projects', [
    { id: 1, name: 'DevPanel Dashboard', status: 'active', label: 'In Progress' },
    { id: 2, name: 'Old Portfolio', status: 'inactive', label: 'Maintenance' }
  ]);

  const [notes, setNotes] = useLocalStorageString('devpanel_notes', '');
  const [toast, setToast] = useState({ show: false, message: '' });

  // Toast
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 2500);
  };

  // Handlers
  const handleAddSnippet = () => {
    const title = prompt('Snippet Title:');
    const code = prompt('Code:');
    if (title && code) {
      setSnippets([...snippets, { id: Date.now(), title, code }]);
      showToast('Snippet added');
    }
  };

  const handleEditSnippet = (snippet) => {
    const newTitle = prompt('Edit Title:', snippet.title);
    const newCode = prompt('Edit Code:', snippet.code);
    if (newTitle && newCode) {
      setSnippets(snippets.map(s => s.id === snippet.id ? { ...s, title: newTitle, code: newCode } : s));
      showToast('Snippet updated');
    }
  };

  const handleDeleteSnippet = (id) => {
    setSnippets(snippets.filter(s => s.id !== id));
    showToast('Snippet deleted');
  };

  const handleCopySnippet = (code) => {
    navigator.clipboard.writeText(code);
    showToast('Copied to clipboard');
  };

  const handleAddLink = () => {
    const name = prompt('Link Name:');
    const url = prompt('URL:');
    if (name && url) {
      setLinks([...links, { id: Date.now(), name, url }]);
      showToast('Link added');
    }
  };

  const handleDeleteLink = (id) => {
    setLinks(links.filter(l => l.id !== id));
    showToast('Link deleted');
  };

  const handleAddProject = () => {
    const name = prompt('Project Name:');
    if (name) {
      setProjects([...projects, { id: Date.now(), name, status: 'active', label: 'In Progress' }]);
      showToast('Project added');
    }
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    showToast('Project deleted');
  };

  const handleToggleProject = (id) => {
    setProjects(projects.map(p => {
      if (p.id === id) {
        const isActive = p.status === 'active';
        return { ...p, status: isActive ? 'inactive' : 'active', label: isActive ? 'Paused' : 'In Progress' };
      }
      return p;
    }));
  };

  // Navigation items
  const navItems = [
    { id: 'snippets', icon: '{ }', label: 'Snippets' },
    { id: 'links', icon: '🔗', label: 'Links' },
    { id: 'projects', icon: '📁', label: 'Projects' },
    { id: 'notes', icon: '📝', label: 'Notes' },
    { id: 'system', icon: '⚙️', label: 'System' },
  ];

  // Render section based on active
  const renderSection = () => {
    switch (activeSection) {
      case 'snippets':
        return (
          <Snippets
            snippets={snippets}
            onAdd={handleAddSnippet}
            onEdit={handleEditSnippet}
            onDelete={handleDeleteSnippet}
            onCopy={handleCopySnippet}
          />
        );
      case 'links':
        return <Links links={links} onAdd={handleAddLink} onDelete={handleDeleteLink} />;
      case 'projects':
        return <Projects projects={projects} onAdd={handleAddProject} onDelete={handleDeleteProject} onToggle={handleToggleProject} />;
      case 'notes':
        return <Notes notes={notes} onChange={setNotes} />;
      case 'system':
        return <SystemStatus snippetsCount={snippets.length} projectsCount={projects.length} linksCount={links.length} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Toast show={toast.show} message={toast.message} />

      {/* Animated Background */}
      <div className="vibe-bg">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-logo">V</h1>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
              title={item.label}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Header />
        <div className="content-area">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}

export default App;
