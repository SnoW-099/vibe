import React, { useState, useEffect } from 'react';
import './Modal.css';

function Modal({ isOpen, title, inputs = [], onClose, onConfirm }) {
    const [values, setValues] = useState({});

    useEffect(() => {
        if (isOpen) {
            // Initialize values based on inputs
            const initialValues = {};
            inputs.forEach(input => {
                initialValues[input.name] = input.defaultValue || '';
            });
            setValues(initialValues);
        }
    }, [isOpen, inputs]);

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(values);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
                <h3 className="modal-title">{title}</h3>

                <form onSubmit={handleSubmit}>
                    {inputs.map((input, index) => (
                        <div key={index} className="modal-input-group">
                            <label>{input.label}</label>
                            <input
                                type="text"
                                name={input.name}
                                value={values[input.name] || ''}
                                onChange={handleChange}
                                placeholder={input.placeholder}
                                autoFocus={index === 0}
                                required={input.required !== false}
                            />
                        </div>
                    ))}

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-confirm">
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;
