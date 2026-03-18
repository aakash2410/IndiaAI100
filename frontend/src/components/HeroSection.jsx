import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';

const HeroSection = ({ searchQuery, setSearchQuery, selectedStage, setSelectedStage, selectedSector, setSelectedSector, availableSectors }) => {
    const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
    const stages = ['All', 'Early Stage', 'Growth Stage', 'Non-profit'];

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedStage('All');
        setSelectedSector('All Sectors');
    };

    return (
        <section className="hero-section">
            <div className="container text-center animate-fade-in">
                {/* Replace textual hero with the report frontpage image scaled for the hero */}
                <a href="/Report_Indias_AI_Impact_Startups.pdf" download className="hero-cover-wrapper" style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem', cursor: 'pointer' }}>
                    <img src="/cover-transparent.png" alt="India AI 100 Startups report cover featuring the title and year, presenting the comprehensive guide to India's leading artificial intelligence startups, set against a professional and modern design background" className="hero-cover-image" />
                    <div className="hero-cover-decor" aria-hidden="true" />
                </a>

                <div className="search-filter-container glass-panel" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                    <div className="search-bar" style={{ width: '100%', display: 'flex' }}>
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search for startups using the vibecoded website...."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <button
                            className="filter-toggle-btn hover-elevate"
                            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.2rem', background: isFiltersExpanded ? 'var(--color-bg-secondary)' : 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-full)', color: 'var(--color-text-primary)', fontWeight: '600', transition: 'all var(--transition-fast)', border: '1px solid var(--color-border)' }}
                        >
                            <Filter size={16} />
                            Filters
                            {isFiltersExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {(searchQuery || selectedStage !== 'All' || selectedSector !== 'All Sectors') && (
                            <button
                                className="filter-clear-btn hover-elevate"
                                onClick={handleClearFilters}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.2rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-full)', color: '#ef4444', fontWeight: '600', transition: 'all var(--transition-fast)', border: '1px solid rgba(239, 68, 68, 0.2)', marginLeft: '8px' }}
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {isFiltersExpanded && (
                        <div className="expanded-filters animate-fade-in" style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
                            <div className="filter-section">
                                <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Filter by Stage</h4>
                                <div className="tags-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {stages.map(stage => (
                                        <button
                                            key={stage}
                                            className={`stage-btn ${selectedStage === stage ? 'active' : ''}`}
                                            onClick={() => setSelectedStage(stage)}
                                        >
                                            {stage}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="filter-section">
                                <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Filter by Sector</h4>
                                <div className="tags-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {(availableSectors || []).map(sector => (
                                        <button
                                            key={sector}
                                            className={`stage-btn ${selectedSector === sector ? 'active' : ''}`}
                                            onClick={() => setSelectedSector(sector)}
                                        >
                                            {sector}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
