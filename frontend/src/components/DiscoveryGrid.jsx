import React from 'react';
import { ArrowRight } from 'lucide-react';

const DiscoveryGrid = ({ organizations, onSelectOrg }) => {
    if (organizations.length === 0) {
        return (
            <section className="discovery-section container">
                <div className="empty-state">
                    <h3>No organizations found</h3>
                    <p>Try adjusting your search criteria.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="discovery-section container">
            <div className="grid-header">
                <h2 className="grid-title">Innovation Directory</h2>
                <span className="results-count">Showing {organizations.length} organizations</span>
            </div>

            <div className="org-grid">
                {organizations.map((org, index) => {
                    // Determine stage badge class
                    const isGrowth = org.stage.toLowerCase().includes('growth');
                    const stageClass = isGrowth ? 'growth' : 'early';

                    return (
                        <div
                            key={`${org.name}-${index}`}
                            className="org-card"
                            onClick={() => onSelectOrg(org)}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="card-header">
                                <h3 className="org-name">{org.name}</h3>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                    {org.sector && (
                                        <span className={`org-stage`} style={{ background: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                                            {org.sector}
                                        </span>
                                    )}
                                    {org.stage && (
                                        <span className={`org-stage ${stageClass}`}>
                                            {org.stage.replace('Stage', '').trim()}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="card-body">
                                <p className="org-problem">
                                    {org.problem || "Information about this organization's problem space."}
                                </p>
                            </div>

                            <div className="card-footer">
                                <span className="read-more">
                                    Read Impact Story <ArrowRight size={16} />
                                </span>
                                {org.funding && (
                                    <span className="org-stage" style={{ background: 'transparent', padding: 0 }}>
                                        {org.funding}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default DiscoveryGrid;
