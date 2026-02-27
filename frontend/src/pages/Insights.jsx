import React from 'react';

const InsightPage = () => {
    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '800px' }}>

            <h1 style={{ fontSize: '2.5rem', marginTop: '1rem', marginBottom: '1.5rem' }}>Strategic Insights</h1>
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {['24-25', '26-27', '28-29', '30'].map((pageNum) => (
                        <div key={pageNum} style={{ textAlign: 'center' }}>
                            <img
                                src={`./pdf-pages/${pageNum}.jpg`}
                                alt={`Report Page ${pageNum}`}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '8px',
                                    display: 'block'
                                }}
                            />
                            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                Page {pageNum}
                            </p>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <a
                        href="./Report_Indias_AI_Impact_Startups.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-block',
                            padding: '0.75rem 1.5rem',
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            fontWeight: 'bold'
                        }}
                    >
                        Download Full PDF
                    </a>
                </div>
            </div>
        </div>
    );
};

export default InsightPage;
