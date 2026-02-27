import React from 'react';

const InsightPage = () => {
    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '800px' }}>

            <h1 style={{ fontSize: '2.5rem', marginTop: '1rem', marginBottom: '1.5rem' }}>Strategic Insights</h1>
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
                    The compendium shows a market that is simultaneously experimenting and consolidating. Along
                    expected lines, we observed significant activity in established sectors such as HealthTech and
                    AgriTech. In addition, a new wave of bold founders is building complex, full‑stack solutions for
                    problems unique to the subcontinent and relevant to the Global South. From “Edge AI” solutions
                    that also work without the internet to voice bots that speak local dialects, Indian founders are
                    constructing moats that go beyond code. Here are eight of the most exciting insights of what the
                    data tells us about the future of the Indian AI startup ecosystem.
                </p>

                <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem' }}>Startups are serving innovative use cases in emerging sectors</h3>
                <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
                    At first glance, India’s AI map looks predictable. Forty‑nine percent of the startups sampled cluster
                    into three sectors with outsized public value: HealthTech, EdTech, and AgriTech. This concentration
                    signals founders building in high‑impact markets with large total addressable markets and
                    established business models. But look closer, and the long tail tells a more interesting story. We are
                    seeing the rise of innovation with niche utilities, from Adalat AI, acting as a real‑time stenographer
                    for Indian courtrooms, to Ishitva, using robotics to sort waste. In addition, the ecosystem is
                    bifurcating: we see both a digitisation of basic services, and a cohort solving structural inefficiencies
                    in India’s infrastructure.
                </p>

                <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem' }}>Visual analytics and vernacular voice are shaping AI diffusion</h3>
                <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
                    Computer vision has demonstrated product‑market fit in India, driving adoption for growth‑stage
                    companies like Netradyne (fleet safety) and Cropin (farm analytics). On the other hand, voice AI is
                    emerging as the primary tool for user acquisition. Twenty‑eight percent of the early‑stage cohort is
                    focused on vernacular interaction, addressing the digital literacy barrier rather than the efficiency
                    problems solved by vision. Companies like Jivi AI and KissanAI effectively bypass the keyboard,
                    suggesting that for the mass market, the primary interface will be spoken, not written.
                </p>

                <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem' }}>Building for Bharat provides opportunity to scale</h3>
                <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
                    Building for rural India (Bharat) is complex. Customer acquisition costs are high, and average
                    revenue per user is low. Consequently, only seven percent of early‑stage startups sampled explicitly
                    target underserved populations in rural India. However, the trends reveal that it takes time but offers
                    the opportunity to scale. By the growth stage, the share of startups in our sample serving rural
                    markets jumps to 18 percent. Companies like DeHaat (serving 2.5 million farmers) and
                    ConveGenius prove that if you can survive the early burn, rural distribution becomes an
                    unbreachable moat. In building AI for India, rural isn’t a niche; it’s a filter for resilience.
                </p>

                <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem' }}>Successful global forays</h3>
                <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
                    Indian startups are building for Bharat and the world. Forty‑seven percent of early‑stage ventures
                    already have global ambitions. By the growth stage, 68 percent operate internationally. Startups
                    like Lightmetrics are deployed in over 130 000 vehicles globally, and Yogifi serves customers in
                    17 countries. India is rapidly transitioning from a back‑office IT hub to an AI export hub for
                    emerging markets worldwide. The problems that startups have solved in India—such as resource
                    constraints, low bandwidth, cost sensitivity—are relevant and replicable globally.
                </p>

                <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem' }}>WhatsApp as an AI adoption channel shows early promise</h3>
                <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
                    India has over 500 million WhatsApp users, making it the ubiquitous operating system of the
                    country. Eight percent of the 100 AI startups in our sample deliver services via the platform. Those
                    who do, like Wysa (therapy), Fasal (farm advisory), and Khushi Baby (health worker guidance),
                    are seeing massive engagement. For AI targeting the “next billion”, WhatsApp is an underutilised
                    distribution medium in the country. The friction of downloading a new app is high while the
                    friction of chatting with a bot on WhatsApp is near zero.
                </p>
            </div>
        </div>
    );
};

export default InsightPage;
