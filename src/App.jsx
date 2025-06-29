import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import LandingPage from './pages/LandingPage';
import ManufacturerAuth from './pages/ManufacturerAuth';
import ManufacturerDashboard from './pages/ManufacturerDashboard';
import CompanyRegistration from './pages/CompanyRegistration';
import ProductSubmission from './pages/ProductSubmission';
import ProductView from './pages/ProductView';
import ProductComparison from './pages/ProductComparison';
import VerificationPage from './pages/VerificationPage';
import QRCodeGenerator from './pages/QRCodeGenerator'; // ✅ New page

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-matrix-black via-gray-900 to-dark-green overflow-x-hidden">
        {/* AnimatePresence enables animation between routes */}
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/manufacturer/auth" element={<ManufacturerAuth />} />
            <Route path="/manufacturer/register" element={<CompanyRegistration />} />
            <Route path="/manufacturer/dashboard" element={<ManufacturerDashboard />} />
            <Route path="/manufacturer/submit-product" element={<ProductSubmission />} />
            <Route path="/manufacturer/verification/:id" element={<VerificationPage />} />
            <Route path="/product/:hash" element={<ProductView />} />
            <Route path="/compare" element={<ProductComparison />} />
            <Route path="/generate-qr" element={<QRCodeGenerator />} /> {/* ✅ New route */}

            {/* 404 fallback */}
            <Route
              path="*"
              element={
                <div className="text-white text-center py-20 text-2xl">
                  404 – Page Not Found
                </div>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;
