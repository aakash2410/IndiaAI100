import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Header = ({ onDownloadClick }) => {
    const location = useLocation();

    return (
        <header className="header glass">
            <div className="container header-container">
                <div className="logo-section">
                    <div className="partner-logos">
                        <a href="https://kalpaimpact.com" target="_blank" rel="noopener noreferrer" aria-label="Kalpa Impact">
                            <img src="/kalpaimpact 2.png" alt="Kalpa Impact" className="partner-logo kalpaimpact-logo" style={{ width: 'auto', padding: '4px 8px' }} />
                        </a>
                        <a href="https://indiaai.gov.in" target="_blank" rel="noopener noreferrer" aria-label="IndiaAI">
                            <img src="/indiaai-logo.png" alt="IndiaAI" className="partner-logo indiaai-logo" />
                        </a>
                    </div>
                </div>

                <nav className="nav-links">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Discovery</Link>
                    <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
                    <Link to="/methodology" className={`nav-link ${location.pathname === '/methodology' ? 'active' : ''}`}>Methodology</Link>
                    <Link to="/insights" className={`nav-link ${location.pathname === '/insights' ? 'active' : ''}`}>Insights</Link>
                </nav>

                <div className="header-actions">
                    <button onClick={onDownloadClick} className="btn-primary" style={{ display: 'inline-block' }}>Download full report</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
