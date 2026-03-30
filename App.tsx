import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import AIChatAdvisor from './pages/AIChatAdvisor';
import LegalDocGenerator from './pages/LegalDocGenerator';
import DocumentDecoder from './pages/DocumentDecoder';
import ResponseSimulator from './pages/ResponseSimulator';
import FinancialRoadmap from './pages/FinancialRoadmap';
import InsolvencyGuide from './pages/InsolvencyGuide';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<AIChatAdvisor />} />
          <Route path="/tools/insolvency" element={<InsolvencyGuide />} />
          <Route path="/tools/legal-docs" element={<LegalDocGenerator />} />
          <Route path="/tools/decoder" element={<DocumentDecoder />} />
          <Route path="/tools/response" element={<ResponseSimulator />} />
          <Route path="/tools/roadmap" element={<FinancialRoadmap />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;