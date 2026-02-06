// Default data for the Dev Panel
// Centralized so it can be easily modified

export const DEFAULT_SNIPPETS = [
    { id: 1, title: 'React Hook', code: 'const [state, setState] = useState(initialState);' },
    { id: 2, title: 'CSS Glassmorphism', code: 'background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);' }
];

export const DEFAULT_LINKS = [
    { id: 1, name: 'GitHub', url: 'https://github.com' },
    { id: 2, name: 'Documentation', url: 'https://developer.mozilla.org' }
];

export const DEFAULT_PROJECTS = [
    { id: 1, name: 'DevPanel Dashboard', status: 'active', label: 'In Progress' },
    { id: 2, name: 'Old Portfolio', status: 'inactive', label: 'Maintenance' }
];

export const STORAGE_KEYS = {
    SNIPPETS: 'devpanel_snippets',
    LINKS: 'devpanel_links',
    PROJECTS: 'devpanel_projects',
    NOTES: 'devpanel_notes'
};
