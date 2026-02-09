import React, { useState } from 'react';
import { Trash2, Plus, Check } from 'lucide-react';
import './Tasks.css';
import { useLocalStorage } from '../hooks/useLocalStorage';

function Tasks() {
    const [tasks, setTasks] = useLocalStorage('devpanel_tasks', [
        { id: 1, text: 'Check daily emails', completed: false },
        { id: 2, text: 'Update project documentation', completed: true }
    ]);
    const [newTask, setNewTask] = useState('');

    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTask.trim()) {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const activeTasks = tasks.filter(t => !t.completed).length;

    return (
        <div className="tasks-container">
            <div className="glass-card full-height">
                <div className="tasks-header">
                    <div>
                        <h2>Daily Tasks</h2>
                        <p className="subtitle">{activeTasks} remaining</p>
                    </div>
                </div>

                <form onSubmit={handleAddTask} className="task-input-form">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="task-input"
                    />
                    <button type="submit" className="add-task-btn">
                        <Plus size={20} />
                    </button>
                </form>

                <div className="tasks-list">
                    {tasks.length === 0 ? (
                        <div className="empty-state">
                            <p>No tasks yet. Add one above!</p>
                        </div>
                    ) : (
                        tasks.map(task => (
                            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                                <div className="task-left" onClick={() => toggleTask(task.id)}>
                                    <div className={`checkbox ${task.completed ? 'checked' : ''}`}>
                                        {task.completed && <Check size={14} color="black" />}
                                    </div>
                                    <span className="task-text">{task.text}</span>
                                </div>
                                <button className="delete-task-btn" onClick={() => deleteTask(task.id)}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Tasks;
