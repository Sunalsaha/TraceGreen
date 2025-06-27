import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, TrendingUp, Award, Bell, QrCode, Shield, Leaf, X, Eye, Download, ExternalLink } from 'lucide-react';
import Header from '../components/Header';

const ManufacturerDashboard = () => {
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(null);
  const [products] = useState([
    {
      id: 1,
      name: 'Eco Cotton T-Shirt',
      sku: 'ECO-TSH-001',
      status: 'Verified',
      sustainabilityScore: 85,
      carbonFootprint: '2.3 kg CO2',
      recycledContent: '65%',
      hash: '0x7f9c...8a2d',
      certificates: [
        { name: 'GOTS Certification', issuer: 'Global Organic Textile Standard', date: '2024-01-15', url: '#' },
        { name: 'Fair Trade Certificate', issuer: 'Fair Trade USA', date: '2024-01-10', url: '#' }
      ]
    },
    {
      id: 2,
      name: 'Silicone Phone Case',
      sku: 'SIL-PHN-002',
      status: 'Pending',
      sustainabilityScore: 92,
      carbonFootprint: '0.8 kg CO2',
      recycledContent: '80%',
      hash: 'Pending...',
      certificates: [
        { name: 'ISO 14001', issuer: 'International Organization for Standardization', date: '2024-01-12', url: '#' }
      ]
    },
    {
      id: 3,
      name: 'Recycled Sneakers',
      sku: 'RCY-SNK-003',
      status: 'Verified',
      sustainabilityScore: 78,
      carbonFootprint: '4.1 kg CO2',
      recycledContent: '55%',
      hash: '0x3a1f...9c4e',
      certificates: [
        { name: 'Cradle to Cradle Bronze', issuer: 'Cradle to Cradle Products Innovation Institute', date: '2024-01-08', url: '#' },
        { name: 'Recycled Content Standard', issuer: 'Textile Exchange', date: '2024-01-05', url: '#' }
      ]
    }
  ]);

  const [companyStats] = useState({
    totalCertificates: products.reduce((acc, product) => acc + product.certificates.length, 0),
    activeCertifications: products.filter(p => p.status === 'Verified').reduce((acc, product) => acc + product.certificates.length, 0)
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'text-neon-green bg-neon-green/20';
      case 'Pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'Rejected': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const handleCertificateClick = () => {
    setShowCertificateModal(true);
  };

  const handleProductClick = (product) => {
    setShowProductDetails(product);
  };

  return (
    <div className="min-h-screen">
      <Header isManufacturer={true} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Manufacturer Dashboard</h1>
            <p className="text-gray-400">Manage your products and sustainability certifications</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-400 hover:text-neon-green cursor-pointer transition-colors" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-neon-green rounded-full flex items-center justify-center">
                <span className="text-xs text-black font-bold">2</span>
              </div>
            </div>
            
            <Link
              to="/manufacturer/submit-product"
              className="flex items-center px-4 py-2 bg-gradient-to-r from-neon-green to-electric-lime text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 p-6 rounded-xl border border-neon-green/20 hover:border-neon-green/40 transition-all cursor-pointer transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Products</p>
                <p className="text-2xl font-bold text-white">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-neon-green" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 p-6 rounded-xl border border-electric-lime/20 hover:border-electric-lime/40 transition-all cursor-pointer transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Verified Products</p>
                <p className="text-2xl font-bold text-white">
                  {products.filter(p => p.status === 'Verified').length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-electric-lime" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 p-6 rounded-xl border border-neon-green/20 hover:border-neon-green/40 transition-all cursor-pointer transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Sustainability</p>
                <p className="text-2xl font-bold text-white">
                  {Math.round(products.reduce((acc, p) => acc + p.sustainabilityScore, 0) / products.length)}
                </p>
              </div>
              <Leaf className="h-8 w-8 text-neon-green" />
            </div>
          </div>

          <div 
            onClick={handleCertificateClick}
            className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 p-6 rounded-xl border border-electric-lime/20 hover:border-electric-lime/40 transition-all cursor-pointer transform hover:scale-105 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Certifications</p>
                <p className="text-2xl font-bold text-white">
                  {companyStats.activeCertifications}
                </p>
              </div>
              <div className="relative">
                <Award className="h-8 w-8 text-electric-lime group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="mt-2 text-xs text-electric-lime opacity-0 group-hover:opacity-100 transition-opacity">
              Click to view certificates
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 rounded-xl border border-neon-green/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Your Products</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/40">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Sustainability Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Carbon Footprint
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Recycled Content
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {products.map((product) => (
                  <tr 
                    key={product.id} 
                    className="hover:bg-gray-800/40 transition-colors cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white hover:text-neon-green transition-colors">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-400">{product.sku}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-white mr-2">{product.sustainabilityScore}</div>
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-neon-green to-electric-lime h-2 rounded-full transition-all duration-500"
                            style={{ width: `${product.sustainabilityScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {product.carbonFootprint}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {product.recycledContent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {product.status === 'Verified' && (
                          <button className="text-neon-green hover:text-electric-lime transition-colors p-1 hover:bg-neon-green/10 rounded">
                            <QrCode className="h-4 w-4" />
                          </button>
                        )}
                        <button className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700/50 rounded">
                          <TrendingUp className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-electric-lime transition-colors p-1 hover:bg-electric-lime/10 rounded">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Certificate Modal */}
        {showCertificateModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900/95 to-dark-green/30 rounded-2xl border border-electric-lime/30 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Award className="h-6 w-6 mr-2 text-electric-lime" />
                  Company Certifications
                </h2>
                <button 
                  onClick={() => setShowCertificateModal(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid gap-6">
                  {products.map(product => (
                    <div key={product.id} className="bg-black/40 rounded-xl p-6 border border-gray-700">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Package className="h-5 w-5 mr-2 text-neon-green" />
                        {product.name}
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {product.certificates.map((cert, index) => (
                          <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-electric-lime/20 hover:border-electric-lime/40 transition-all">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-white">{cert.name}</h4>
                              <span className={`px-2 py-1 rounded text-xs ${getStatusColor(product.status)}`}>
                                {product.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 mb-2">{cert.issuer}</p>
                            <p className="text-xs text-gray-500 mb-3">Issued: {cert.date}</p>
                            
                            <div className="flex items-center space-x-2">
                              <button className="flex items-center text-xs text-electric-lime hover:text-neon-green transition-colors">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </button>
                              <button className="flex items-center text-xs text-electric-lime hover:text-neon-green transition-colors">
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </button>
                              <button className="flex items-center text-xs text-electric-lime hover:text-neon-green transition-colors">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Verify
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Details Modal */}
        {showProductDetails && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900/95 to-dark-green/30 rounded-2xl border border-neon-green/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold text-white">
                  {showProductDetails.name}
                </h2>
                <button 
                  onClick={() => setShowProductDetails(null)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">SKU</p>
                    <p className="text-white font-medium">{showProductDetails.sku}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(showProductDetails.status)}`}>
                      {showProductDetails.status}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">Sustainability Score</p>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-white mr-4">{showProductDetails.sustainabilityScore}/100</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-neon-green to-electric-lime h-3 rounded-full transition-all duration-500"
                        style={{ width: `${showProductDetails.sustainabilityScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Carbon Footprint</p>
                    <p className="text-lg font-semibold text-white">{showProductDetails.carbonFootprint}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Recycled Content</p>
                    <p className="text-lg font-semibold text-white">{showProductDetails.recycledContent}</p>
                  </div>
                </div>

                {showProductDetails.status === 'Verified' && (
                  <div className="bg-neon-green/10 border border-neon-green/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Blockchain Hash</p>
                    <p className="text-neon-green font-mono text-sm">{showProductDetails.hash}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Certificates</h3>
                  <div className="space-y-2">
                    {showProductDetails.certificates.map((cert, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                        <div>
                          <p className="text-white font-medium">{cert.name}</p>
                          <p className="text-sm text-gray-400">{cert.issuer}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-electric-lime hover:text-neon-green transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-electric-lime hover:text-neon-green transition-colors">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManufacturerDashboard;