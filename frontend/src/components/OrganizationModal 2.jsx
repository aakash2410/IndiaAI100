import React, { useEffect } from 'react';
import { X, ExternalLink, Users, Navigation, Target } from 'lucide-react';

const OrganizationModal = ({ organization, onClose }) => {
    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    if (!organization) return null;

    return (
        <div className="modal-overlay" onClick={handleBackdropClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <div>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', marginTop: '0.5rem' }}>{organization.name}</h2>
                        {organization.stage && (
                            <span className={`org-stage ${organization.stage.toLowerCase().includes('growth') ? 'growth' : 'early'}`}>
                                {organization.stage}
                            </span>
                        )}
                    </div>
                    <button className="close-btn" onClick={onClose} aria-label="Close modal">
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="detail-section">
                        <h3 style={{ color: 'var(--color-text-primary)' }}><Target size={18} color="var(--color-primary)" /> The Problem</h3>
                        <p>{organization.problem}</p>
                    </div>

                    <div className="detail-section">
                        <h3 style={{ color: 'var(--color-text-primary)' }}><Navigation size={18} color="var(--color-primary)" /> The Solution</h3>
                        <p>{organization.solution}</p>
                    </div>

                    {organization.impact && (
                        <div className="detail-section" style={{ background: 'rgba(37,99,235,0.04)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(37,99,235,0.15)' }}>
                            <h3 style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}><Target size={20} color="var(--color-primary)" /> Measurable Impact</h3>
                            <p style={{ color: 'var(--color-text-primary)', fontSize: '1.15rem', fontWeight: '500', lineHeight: '1.7' }}>{organization.impact}</p>
                        </div>
                    )}

                    {organization.scale && (
                        <div className="detail-section" style={{ background: 'rgba(245,158,11,0.04)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(245,158,11,0.15)' }}>
                            <h3 style={{ color: 'var(--color-accent)', fontSize: '1.2rem' }}><ExternalLink size={20} color="var(--color-accent)" /> Scale & Reach</h3>
                            <p style={{ color: 'var(--color-text-primary)', fontSize: '1.15rem', fontWeight: '500', lineHeight: '1.7' }}>{organization.scale}</p>
                        </div>
                    )}

                    {(organization.founders || organization.funding) && (
                        <div className="detail-section" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
                            {organization.founders && (
                                <div style={{ flex: '1 1 300px' }}>
                                    <h3 style={{ color: 'var(--color-text-primary)' }}><Users size={18} color="var(--color-primary)" /> Founders Profile</h3>
                                    <p style={{ fontSize: '0.95rem' }}>{organization.founders}</p>
                                </div>
                            )}

                            {organization.funding && (
                                <div style={{ flex: '0 0 auto', background: 'var(--color-bg)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                                    <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)', marginBottom: '0.5rem' }}>Total Funding</h3>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>
                                        {organization.funding}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrganizationModal;
