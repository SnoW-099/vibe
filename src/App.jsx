import React, { useState } from 'react';
import { Code, Link, Folder, FileText, Settings } from 'lucide-react';
import './App.css';
import { useLocalStorage, useLocalStorageString } from './hooks/useLocalStorage';

// Components (using original flat structure)
import Header from './components/Header';
import Toast from './components/Toast';
import Modal from './components/Modal';
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
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', inputs: [], onConfirm: () => { } });

  // Toast
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 2500);
  };

  // Modal Handler
  const openModal = (config) => {
    setModalConfig({ ...config, isOpen: true });
  };

  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  // Handlers
  const handleAddSnippet = () => {
    openModal({
      title: 'New Snippet',
      inputs: [
        { name: 'title', label: 'Title', placeholder: 'Snippet Name' },
        { name: 'code', label: 'Code', placeholder: 'Paste code here...' }
      ],
      onConfirm: (values) => {
        if (values.title && values.code) {
          setSnippets([...snippets, { id: Date.now(), title: values.title, code: values.code }]);
          showToast('Snippet added');
        }
      }
    });
  };

  const handleEditSnippet = (snippet) => {
    openModal({
      title: 'Edit Snippet',
      inputs: [
        { name: 'title', label: 'Title', defaultValue: snippet.title },
        { name: 'code', label: 'Code', defaultValue: snippet.code }
      ],
      onConfirm: (values) => {
        if (values.title && values.code) {
          setSnippets(snippets.map(s => s.id === snippet.id ? { ...s, title: values.title, code: values.code } : s));
          showToast('Snippet updated');
        }
      }
    });
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
    openModal({
      title: 'Add Link',
      inputs: [
        { name: 'name', label: 'Name', placeholder: 'Website Name' },
        { name: 'url', label: 'URL', placeholder: 'https://example.com' }
      ],
      onConfirm: (values) => {
        if (values.name && values.url) {
          setLinks([...links, { id: Date.now(), name: values.name, url: values.url }]);
          showToast('Link added');
        }
      }
    });
  };

  const handleDeleteLink = (id) => {
    setLinks(links.filter(l => l.id !== id));
    showToast('Link deleted');
  };

  const handleAddProject = () => {
    openModal({
      title: 'New Project',
      inputs: [
        { name: 'name', label: 'Project Name', placeholder: 'Project Title' }
      ],
      onConfirm: (values) => {
        if (values.name) {
          setProjects([...projects, { id: Date.now(), name: values.name, status: 'active', label: 'In Progress' }]);
          showToast('Project added');
        }
      }
    });
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
    { id: 'snippets', icon: <Code size={24} />, label: 'Snippets' },
    { id: 'links', icon: <Link size={24} />, label: 'Links' },
    { id: 'projects', icon: <Folder size={24} />, label: 'Projects' },
    { id: 'notes', icon: <FileText size={24} />, label: 'Notes' },
    { id: 'system', icon: <Settings size={24} />, label: 'System' },
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
      <Modal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        inputs={modalConfig.inputs}
        onClose={closeModal}
        onConfirm={modalConfig.onConfirm}
      />

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
