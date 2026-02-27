import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DiscoveryGrid from './components/DiscoveryGrid';
import OrganizationModal from './components/OrganizationModal';
import AboutPage from './pages/AboutPage';
import MethodologyPage from './pages/MethodologyPage';
import organizationsData from './data/organizations.json'
import InsightPage from './pages/Insights';


const Home = ({ searchQuery, setSearchQuery, selectedStage, setSelectedStage, selectedSector, setSelectedSector, selectedOrg, setSelectedOrg, filteredOrgs }) => (
  <>
    <HeroSection
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedStage={selectedStage}
      setSelectedStage={setSelectedStage}
      selectedSector={selectedSector}
      setSelectedSector={setSelectedSector}
    />

    <DiscoveryGrid
      organizations={filteredOrgs}
      onSelectOrg={setSelectedOrg}
    />

    {selectedOrg && (
      <OrganizationModal
        organization={selectedOrg}
        onClose={() => setSelectedOrg(null)}
      />
    )}
  </>
);

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('All');
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [selectedOrg, setSelectedOrg] = useState(null);

  // Filter logic
  const filteredOrgs = organizationsData.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.problem.toLowerCase().includes(searchQuery.toLowerCase());

    // Stage logic
    const matchesStage = selectedStage === 'All' ||
      (org.stage && org.stage.includes(selectedStage));

    // Sector logic
    const matchesSector = selectedSector === 'All Sectors' ||
      (org.sector && org.sector.includes(selectedSector));

    return matchesSearch && matchesStage && matchesSector;
  });

  return (
    <Router>
      <div className="app-layout">
        {/* Background glow effects */}
        <div className="bg-glow"></div>
        <div className="bg-glow-accent"></div>

        <Header />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedStage={selectedStage}
                  setSelectedStage={setSelectedStage}
                  selectedSector={selectedSector}
                  setSelectedSector={setSelectedSector}
                  selectedOrg={selectedOrg}
                  setSelectedOrg={setSelectedOrg}
                  filteredOrgs={filteredOrgs}
                />
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/methodology" element={<MethodologyPage />} />
            <Route path="/insights" element={<InsightPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
