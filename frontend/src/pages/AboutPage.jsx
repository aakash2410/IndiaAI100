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
        </div>
    );
};

export default AboutPage;
