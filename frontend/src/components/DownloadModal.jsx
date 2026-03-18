import React, { useState, useEffect } from 'react';
import { X, Download, Loader2 } from 'lucide-react';

const DownloadModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/download-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, work_email: email }),
            });

            if (!response.ok) {
                let errorMessage = 'Failed to submit details';
                try {
                    const errorData = await response.json();
                    if (errorData.detail && Array.isArray(errorData.detail)) {
                        errorMessage = errorData.detail[0].msg;
                    } else if (errorData.detail) {
                        errorMessage = errorData.detail;
                    }
                } catch (e) {
                    // fall back to default error message if json parsing fails
                }
                throw new Error(errorMessage);
            }

            // The backend handles the email dispatch now
            // Just show a success state or close modal
            alert("Thank you! The report has been sent to your work email.");

            // Clean up and close
            setName('');
            setEmail('');
            onClose();
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleBackdropClick} style={{ zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 0 }}>
            <style>
                {`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    .animate-spin {
                        animation: spin 1s linear infinite;
                    }
                `}
            </style>
            <div className="modal-content" style={{ maxWidth: '400px', width: '90%', margin: 'auto', transform: 'translateY(0)' }}>
                <div className="modal-header" style={{ borderBottom: 'none', paddingBottom: '0' }}>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', marginTop: '0.5rem' }}>Download Report</h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Please provide your details to access the full report.</p>
                    </div>
                    <button className="close-btn" onClick={onClose} aria-label="Close modal">
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body" style={{ paddingTop: '1rem' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {error && (
                            <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
                                {error}
                            </div>
                        )}
                        <div>
                            <label htmlFor="name" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem', color: 'var(--color-text-secondary)' }}>Name</label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    background: 'var(--color-bg)',
                                    color: 'var(--color-text-primary)'
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem', color: 'var(--color-text-secondary)' }}>Work Email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    background: 'var(--color-bg)',
                                    color: 'var(--color-text-primary)'
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary"
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginTop: '0.5rem'
                            }}
                        >
                            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                            {isSubmitting ? 'Processing...' : 'Get the Report'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DownloadModal;
