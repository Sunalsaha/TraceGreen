import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Package, TrendingUp, Award, Bell, QrCode, Shield,
  Leaf, X, Eye, Download, ExternalLink, Copy
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import Header from '../components/Header';
import './ManufacturerDashboard.scss';

const ManufacturerDashboard = () => {
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(null);
  const [qrModalProduct, setQrModalProduct] = useState(null);
  const qrRef = useRef();

  const [products] = useState([
    {
      id: 1,
      name: 'Eco Cotton T-Shirt',
      sku: 'ECO-TSH-001',
      status: 'Verified',
      sustainabilityScore: 85,
      carbonFootprint: '2.3 kg CO2',
      recycledContent: '65%',
      hash: '0x0977442bea0fb',
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
      hash: '0x3a1f9c4e123ab',
      certificates: [
        { name: 'Cradle to Cradle Bronze', issuer: 'Cradle to Cradle Products Innovation Institute', date: '2024-01-08', url: '#' },
        { name: 'Recycled Content Standard', issuer: 'Textile Exchange', date: '2024-01-05', url: '#' }
      ]
    }
  ]);

  const companyStats = {
    totalCertificates: products.reduce((acc, p) => acc + p.certificates.length, 0),
    activeCertifications: products.filter(p => p.status === 'Verified').reduce((acc, p) => acc + p.certificates.length, 0)
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified': return 'badge text-neon-green bg-neon-green/20';
      case 'Pending': return 'badge text-yellow-400 bg-yellow-400/20';
      case 'Rejected': return 'badge text-red-400 bg-red-400/20';
      default: return 'badge text-gray-400 bg-gray-400/20';
    }
  };

  const handleDownloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');

    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${qrModalProduct?.name}-qr-code.png`;
    downloadLink.click();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://tracegreen.io/product/${qrModalProduct.hash}`);
  };

  return (
    <div className="dashboard-container">
      <Header isManufacturer />

      <div className="dashboard-header">
        <div>
          <h1>Manufacturer Dashboard</h1>
          <p>Manage your products and sustainability certifications</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="notification-icon">
            <Bell />
            <div className="badge">2</div>
          </div>
          <Link to="/manufacturer/submit-product" className="add-product-btn">
            <Plus /> Add Product
          </Link>
        </div>
      </div>

      <div className="stats-cards">
        <div className="card"><div className="info"><p>Total Products</p><h3>{products.length}</h3></div><Package /></div>
        <div className="card"><div className="info"><p>Verified Products</p><h3>{products.filter(p => p.status === 'Verified').length}</h3></div><Shield /></div>
        <div className="card"><div className="info"><p>Avg Sustainability</p><h3>{Math.round(products.reduce((a, p) => a + p.sustainabilityScore, 0) / products.length)}</h3></div><Leaf /></div>
        <div className="card certifications" onClick={() => setShowCertificateModal(true)}>
          <div className="info"><p>Certifications</p><h3>{companyStats.activeCertifications}</h3></div>
          <div className="relative"><Award /><div className="pulse"></div></div>
          <div className="hover-info">Click to view certificates</div>
        </div>
      </div>

      <div className="products-table">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Your Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Status</th>
                <th>Sustainability</th>
                <th>Carbon</th>
                <th>Recycled</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} onClick={() => setShowProductDetails(product)}>
                  <td>
                    <div>
                      <div className="text-white hover:text-neon-green">{product.name}</div>
                      <div className="text-gray-400 text-sm">{product.sku}</div>
                    </div>
                  </td>
                  <td><span className={getStatusColor(product.status)}>{product.status}</span></td>
                  <td>
                    <div className="flex items-center">
                      <span className="text-white">{product.sustainabilityScore}</span>
                      <div className="progress-bar w-16 ml-2"><div className="fill" style={{ width: `${product.sustainabilityScore}%` }}></div></div>
                    </div>
                  </td>
                  <td>{product.carbonFootprint}</td>
                  <td>{product.recycledContent}</td>
                  <td>
                    <div className="actions">
                      {product.status === 'Verified' && product.hash.startsWith('0x') && (
                        <button onClick={(e) => {
                          e.stopPropagation();
                          setQrModalProduct(product);
                        }}><QrCode /></button>
                      )}
                      <button><TrendingUp /></button>
                      <button><Eye /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {qrModalProduct && qrModalProduct.hash.startsWith('0x') && (
        <div className="modal-overlay">
          <div className="modal-content max-w-lg p-6 text-white bg-gradient-to-br from-slate-900 to-gray-800 rounded-lg">
            <div className="modal-header justify-between">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><QrCode /> Your TraceGreen QR Code</h2>
              <button onClick={() => setQrModalProduct(null)}><X /></button>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-6">
              <div ref={qrRef} className="bg-white p-4 rounded-lg">
                <QRCodeCanvas
                  value={`https://tracegreen.io/product/${qrModalProduct.hash}`}
                  size={180}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  includeMargin
                  level="H"
                />
              </div>

              <div className="text-left space-y-2">
                <h3 className="text-lg font-bold">QR Code Details</h3>
                <p className="text-sm text-gray-300">Product URL:</p>
                <div className="flex items-center gap-2 text-neon-green text-sm break-all">
                  https://tracegreen.io/product/{qrModalProduct.hash}
                  <button onClick={handleCopyLink} title="Copy"><Copy size={16} /></button>
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleDownloadQR}
                    className="px-4 py-2 bg-green-700 text-white rounded-lg flex items-center gap-2 hover:bg-green-600"
                  >
                    <Download size={16} /> Download QR Code
                  </button>
                  <button
                    onClick={() => setQrModalProduct(null)}
                    className="px-4 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-green-700/10 border border-green-600 text-green-300 p-4 rounded-lg text-sm">
              🎉 <strong>Congratulations!</strong> Your product is now TraceGreen certified. Use this QR code on packaging to verify sustainability credentials.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManufacturerDashboard;
