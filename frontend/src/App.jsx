import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import SmartMap from './pages/SmartMap';
import Dashboard from './pages/Dashboard';
import Prediction from './pages/Prediction';
import Analytics from './pages/Analytics';
import TimeAnalysis from './pages/TimeAnalysis';
import CauseAnalysis from './pages/CauseAnalysis';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/map" element={<SmartMap />} />
          <Route path="/predict" element={<Prediction />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/time" element={<TimeAnalysis />} />
          <Route path="/cause" element={<CauseAnalysis />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
