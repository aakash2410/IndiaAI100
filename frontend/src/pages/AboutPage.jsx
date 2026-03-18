import React from 'react';

const AboutPage = () => {
    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>About the Report</h1>
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
                    This compendium, <strong>India’s AI Impact Startups: A Compendium of 100+ Startups and
                        Nonprofits Delivering Population-Scale Impact</strong>, was developed under the guidance of
                    the IndiaAI Impact Summit leadership. The purpose of this publication is to document
                    and showcase artificial intelligence deployments by startups delivering population-scale
                    social and economic impact across India.
                </p>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>
                    We are grateful to the Ministry of Electronics and Information Technology (MeitY) team
                    and the IndiaAI mission for their continuous support and vision in making this initiative
                    possible. This platform serves as a digital companion to the report, making the discovery
                    of these innovative organizations more interactive and accessible.
                </p>
            </div>
            <div className="glass-panel" style={{ padding: '2.5rem', marginTop: '2rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Contact Kalpa Impact</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                    For more information or to explore collaborations, reach out to us at:
                </p>
                <ul style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', paddingLeft: '1.25rem' }}>
                    <li>Email: <a href="mailto:connect@kalpaimpact.com">connect@kalpaimpact.com</a></li>
                    <li>Website: <a href="https://kalpaimpact.com" target="_blank" rel="noopener noreferrer">kalpaimpact.com</a></li>
                    <li>LinkedIn: <a href="https://www.linkedin.com/company/kalpaimpact/" target="_blank" rel="noopener noreferrer">/company/kalpaimpact</a></li>
                </ul>
            </div>
        </div>
    );
};

export default AboutPage;
