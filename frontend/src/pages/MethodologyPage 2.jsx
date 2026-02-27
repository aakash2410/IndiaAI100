import React from 'react';

const MethodologyPage = () => {
    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Methodology</h1>
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Screening Process & Exclusion Criteria</h2>
                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
                    The selection mechanism relied on three distinct layers focused on ensuring genuine, population-scale impact:
                </p>

                <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <li>
                        <strong>Focus on essential and aspirational services:</strong> The startup must address population-scale impact needs
                        bridging gaps in services rather than products built for convenience (just serving "urban elite"). Hence, startups
                        with pro-social use cases in Health-tech, Agri-Tech, Ed-Tech, Justice-Tech, AI resources, and similar fields were prioritized.
                    </li>
                    <li>
                        <strong>Target Demographic Exclusions:</strong> Solutions built primarily for convenience, efficiency, or a small
                        urban elite are explicitly excluded from this compendium.
                    </li>
                    <li>
                        <strong>Evidence Requirement:</strong> Startups without credible usage data or demonstrable implementations
                        were excluded. The initiative requires verifiable proof of impact on the ground.
                    </li>
                </ul>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Data Collection</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>
                    The report relies on structured secondary research validated through data triangulation.
                    No primary research was conducted; instead, existing verified data points, recognized deployments,
                    and programmatic partnerships with government or institutional bodies served as the foundation for inclusion.
                </p>
            </div>
        </div>
    );
};

export default MethodologyPage;
