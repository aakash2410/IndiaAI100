import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer" style={{ borderTop: '1px solid var(--color-border)', padding: '3rem 0', background: 'var(--color-bg-secondary)', marginTop: 'auto' }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
                <div className="footer-links" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Link to="/" className="nav-link" style={{ fontSize: '0.95rem' }}>Discovery</Link>
                    <Link to="/about" className="nav-link" style={{ fontSize: '0.95rem' }}>About</Link>
                    <Link to="/methodology" className="nav-link" style={{ fontSize: '0.95rem' }}>Methodology</Link>
                    <Link to="/insights" className="nav-link" style={{ fontSize: '0.95rem' }}>Insights</Link>
                </div>
                
                <div className="footer-contact" style={{ maxWidth: '600px' }}>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                        For more information or to explore collaborations, reach out to us at:
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="mailto:connect@kalpaimpact.com" style={{ color: 'var(--color-primary)', fontWeight: '500' }}>connect@kalpaimpact.com</a>
                        <span style={{ color: 'var(--color-text-tertiary)' }}>|</span>
                        <a href="https://kalpaimpact.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '500' }}>kalpaimpact.com</a>
                    </div>
                </div>

                <div className="footer-copyright" style={{ marginTop: '1rem', color: 'var(--color-text-tertiary)', fontSize: '0.85rem' }}>
                    © {new Date().getFullYear()} Kalpa Impact. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
