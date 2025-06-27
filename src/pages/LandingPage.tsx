import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Shield, Leaf, TrendingUp, Award, Users } from 'lucide-react';
import Header from '../components/Header';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-green/10 to-electric-lime/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Verify
              <span className="block bg-gradient-to-r from-neon-green to-electric-lime bg-clip-text text-transparent">
                Sustainability
              </span>
              on the Blockchain
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              TraceGreen empowers consumers to make informed decisions while enabling businesses 
              to certify and showcase their eco-friendly practices through blockchain verification.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/manufacturer/auth"
                className="group relative px-8 py-4 bg-gradient-to-r from-neon-green to-electric-lime text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-300"
              >
                <span className="relative z-10">Register Your Business</span>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-electric-lime opacity-0 group-hover:opacity-20 rounded-xl transition-opacity" />
              </Link>
              
              <div className="flex items-center text-gray-300">
                <QrCode className="h-5 w-5 mr-2" />
                <span>Scan a product QR code to start</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Two Powerful Interfaces
            </h2>
            <p className="text-gray-300 text-lg">
              Designed for both businesses and consumers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Manufacturer Interface */}
            <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 p-8 rounded-2xl border border-neon-green/20 hover:border-neon-green/40 transition-all duration-300">
              <div className="flex items-center mb-6">
                <Shield className="h-12 w-12 text-neon-green mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-white">For Manufacturers</h3>
                  <p className="text-gray-400">Certify your sustainable practices</p>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <Award className="h-5 w-5 text-electric-lime mr-3" />
                  Register company and products
                </li>
                <li className="flex items-center text-gray-300">
                  <TrendingUp className="h-5 w-5 text-electric-lime mr-3" />
                  Submit sustainability data
                </li>
                <li className="flex items-center text-gray-300">
                  <QrCode className="h-5 w-5 text-electric-lime mr-3" />
                  Generate verified QR codes
                </li>
                <li className="flex items-center text-gray-300">
                  <Shield className="h-5 w-5 text-electric-lime mr-3" />
                  Blockchain certification
                </li>
              </ul>
              
              <Link 
                to="/manufacturer/auth"
                className="inline-flex items-center px-6 py-3 bg-neon-green/20 border border-neon-green text-neon-green rounded-lg hover:bg-neon-green/30 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Consumer Interface */}
            <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 p-8 rounded-2xl border border-electric-lime/20 hover:border-electric-lime/40 transition-all duration-300">
              <div className="flex items-center mb-6">
                <Users className="h-12 w-12 text-electric-lime mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-white">For Consumers</h3>
                  <p className="text-gray-400">Make informed sustainable choices</p>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <QrCode className="h-5 w-5 text-neon-green mr-3" />
                  Scan product QR codes
                </li>
                <li className="flex items-center text-gray-300">
                  <TrendingUp className="h-5 w-5 text-neon-green mr-3" />
                  View sustainability scores
                </li>
                <li className="flex items-center text-gray-300">
                  <Leaf className="h-5 w-5 text-neon-green mr-3" />
                  Compare eco-friendly options
                </li>
                <li className="flex items-center text-gray-300">
                  <Shield className="h-5 w-5 text-neon-green mr-3" />
                  Verify blockchain data
                </li>
              </ul>
              
              <div className="text-electric-lime font-medium">
                📱 Use your camera to scan QR codes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How TraceGreen Works
            </h2>
            <p className="text-gray-300 text-lg">
              Simple, secure, and transparent
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-neon-green/20 rounded-full mb-6 group-hover:bg-neon-green/30 transition-colors">
                <Shield className="h-8 w-8 text-neon-green" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">1. Register & Submit</h3>
              <p className="text-gray-400">
                Manufacturers register their company and submit detailed sustainability data for their products.
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-electric-lime/20 rounded-full mb-6 group-hover:bg-electric-lime/30 transition-colors">
                <Award className="h-8 w-8 text-electric-lime" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">2. Blockchain Verification</h3>
              <p className="text-gray-400">
                Data is verified and stored on the blockchain, creating an immutable record with QR code generation.
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-neon-green/20 rounded-full mb-6 group-hover:bg-neon-green/30 transition-colors">
                <QrCode className="h-8 w-8 text-neon-green" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">3. Consumer Access</h3>
              <p className="text-gray-400">
                Consumers scan QR codes to access verified sustainability information and make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 border-t border-neon-green/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-6 w-6 text-neon-green" />
            <span className="text-xl font-bold bg-gradient-to-r from-neon-green to-electric-lime bg-clip-text text-transparent">
              TraceGreen
            </span>
          </div>
          <p className="text-gray-400">
            Empowering sustainable choices through blockchain transparency
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;