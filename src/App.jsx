import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
>>>>>>> a5c17cbae7e1f1f8d2678526138c2953a23e21e4
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
import QRCodeGenerator from './pages/QRCodeGenerator';
<<<<<<< HEAD
import ProductDetails from './pages/ProductDetails';
=======
import ProductDetails from './pages/ProductDetails'; // ✅ New Page for QR Scan View
>>>>>>> a5c17cbae7e1f1f8d2678526138c2953a23e21e4
import LogoAnimation from './pages/logoanimation';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
<<<<<<< HEAD
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
=======
    <Router>
>>>>>>> a5c17cbae7e1f1f8d2678526138c2953a23e21e4
      <div className="min-h-screen bg-gradient-to-br from-matrix-black via-gray-900 to-dark-green overflow-x-hidden">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LogoAnimation />
          ) : (
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/manufacturer/auth" element={<ManufacturerAuth />} />
              <Route path="/manufacturer/register" element={<CompanyRegistration />} />
              <Route path="/manufacturer/dashboard" element={<ManufacturerDashboard />} />
              <Route path="/manufacturer/submit-product" element={<ProductSubmission />} />
              <Route path="/manufacturer/verification/:id" element={<VerificationPage />} />
              <Route path="/product/:hash" element={<ProductView />} />
<<<<<<< HEAD
              <Route path="/product-details/:productId" element={<ProductDetails />} />
              <Route path="/compare" element={<ProductComparison />} />
              <Route path="/generate-qr" element={<QRCodeGenerator />} />
              
=======
              <Route path="/product-details/:productId" element={<ProductDetails />} /> {/* ✅ Added Route */}
              <Route path="/compare" element={<ProductComparison />} />
              <Route path="/generate-qr" element={<QRCodeGenerator />} />

>>>>>>> a5c17cbae7e1f1f8d2678526138c2953a23e21e4
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
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;
