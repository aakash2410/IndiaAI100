import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Header = () => {
    return (
        <header className="header glass">
            <div className="container header-container">
                <div className="logo-section">
                    <div className="partner-logos">
                        <a href="https://kalpaimpact.com" target="_blank" rel="noopener noreferrer" aria-label="Kalpa Impact">
                                <img src="/kalpaimpact.png" alt="Kalpa Impact" className="partner-logo"/>
                        </a>
                        <a href="https://indiaai.gov.in" target="_blank" rel="noopener noreferrer" aria-label="IndiaAI">
                                <img src="/indiaai-logo.png" alt="IndiaAI" className="partner-logo indiaai-logo" />
                        </a>
                    </div>
                </div>

                <nav className="nav-links">
                    <Link to="/" className="nav-link">Discovery</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/methodology" className="nav-link">Methodology</Link>
                    <Link to="/insights" className="nav-link">Insights</Link>
                </nav>

                <div className="header-actions">
                    <a href="/Report_Indias_AI_Impact_Startups.pdf" download className="btn-primary" style={{ display: 'inline-block' }}>Download Full Report</a>
                </div>
            </div>
        </header>
    );
};

export default Header;
