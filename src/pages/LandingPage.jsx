import React from 'react';
import { Link } from 'react-router-dom';
import {
  QrCode,
  Shield,
  Leaf,
  TrendingUp,
  Award,
  Users,
  Camera,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import StarBorder from './StarBorder';
import './LandingPage.scss';

// Animated QR Instruction Box
const QRInstruction = () => {
  return (
    <motion.div
      className="flex items-center justify-center gap-3 px-4 py-2 rounded-xl text-white shadow-md backdrop-blur-md border border-white/10 text-sm md:text-base"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 12 }}
    >
      <Camera size={18} />
      <span>Use your camera to scan QR codes</span>
    </motion.div>
  );
};

// Reusable Styled CTA Button
const GetStartedCTA = () => {
  return (
    <motion.div
      className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white shadow-md backdrop-blur-md border border-white/10 text-sm md:text-base cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 12 }}
    >
      <Link to="/manufacturer/auth" className="flex items-center gap-2 text-white no-underline">
        🚀 <span>Get Started</span>
      </Link>
    </motion.div>
  );
};

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />

      {/* Hero Section */}
      <section className="section-hero">
        <div className="hero-content">
          <h1>
            Verify <span>Sustainability</span> on the Blockchain
          </h1>
          <p>
            TraceGreen empowers consumers to make informed decisions while enabling businesses
            to certify and showcase their eco-friendly practices through blockchain verification.
          </p>

          <div className="hero-buttons">
            <StarBorder>
              <Link to="/manufacturer/auth">
                <span>Register Your Business</span>
              </Link>
            </StarBorder>

            <div className="qr-hint">
              <QrCode />
              <span>Scan a product QR code to start</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Two Powerful Interfaces</h2>
          <p>Designed for both businesses and consumers</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Manufacturer Interface */}
          <motion.div
            className="feature-box"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{
              scale: 1.03,
              rotateX: 1.5,
              rotateY: -1.5,
              boxShadow: '0 10px 25px rgba(51, 255, 102, 0.3)',
            }}
            viewport={{ once: true }}
          >
            <div className="feature-header">
              <Shield className="text-neon-green" />
              <div>
                <h3>For Manufacturers</h3>
                <p>Certify your sustainable practices</p>
              </div>
            </div>

            <ul>
              <li><Award /> Register company and products</li>
              <li><TrendingUp /> Submit sustainability data</li>
              <li><QrCode /> Generate verified QR codes</li>
              <li><Shield /> Blockchain certification</li>
            </ul>

            <GetStartedCTA />
          </motion.div>

          {/* Consumer Interface */}
          <motion.div
            className="feature-box consumer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{
              scale: 1.03,
              rotateX: -1.5,
              rotateY: 1.5,
              boxShadow: '0 10px 25px rgba(204, 255, 0, 0.3)',
            }}
            viewport={{ once: true }}
          >
            <div className="feature-header">
              <Users className="text-electric-lime" />
              <div>
                <h3>For Consumers</h3>
                <p>Make informed sustainable choices</p>
              </div>
            </div>

            <ul>
              <li><QrCode /> Scan product QR codes</li>
              <li><TrendingUp /> View sustainability scores</li>
              <li><Leaf /> Compare eco-friendly options</li>
              <li><Shield /> Verify blockchain data</li>
            </ul>

            <QRInstruction />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-header">
          <h2>How TraceGreen Works</h2>
          <p>Simple, secure, and transparent</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="step">
            <div className="icon green"><Shield /></div>
            <h3>1. Register & Submit</h3>
            <p>Manufacturers register their company and submit detailed sustainability data for their products.</p>
          </div>

          <div className="step">
            <div className="icon lime"><Award /></div>
            <h3>2. Blockchain Verification</h3>
            <p>Data is verified and stored on the blockchain, creating an immutable record with QR code generation.</p>
          </div>

          <div className="step">
            <div className="icon green"><QrCode /></div>
            <h3>3. Consumer Access</h3>
            <p>Consumers scan QR codes to access verified sustainability information and make informed decisions.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="logo">
          <Leaf />
          <span>TraceGreen</span>
        </div>
        <p>Empowering sustainable choices through blockchain transparency</p>
      </footer>
    </div>
  );
};

export default LandingPage;
