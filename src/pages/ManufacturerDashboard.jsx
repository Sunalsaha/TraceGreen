import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import {
  Plus, Package, TrendingUp, Award, Bell, QrCode,
  Shield, Leaf, X, Eye, Download, ExternalLink
} from 'lucide-react';
import Header from '../components/Header';
import './ManufacturerDashboard.scss';

const ManufacturerDashboard = () => {
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const qrRef = useRef(null);

  const [products] = useState([
    {
      id: 1,
      name: 'Eco Cotton T-Shirt',
      sku: 'ECO-TSH-001',
      status: 'Verified',
      sustainabilityScore: 85,
      carbonFootprint: '2.3 kg CO2',
      recycledContent: '65%',
      hash: '0x9b72edbd2b829',
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
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified': return 'badge verified';
      case 'Pending': return 'badge pending';
      case 'Rejected': return 'badge rejected';
      default: return 'badge';
    }
  };

  const handleCertificateClick = () => setShowCertificateModal(true);
  const handleProductClick = (product) => setShowProductDetails(product);
  const handleQRClick = (product) => {
    setSelectedProduct(product);
    setShowQRModal(true);
  };

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `tracegreen-qr-${selectedProduct.hash}.png`;
    link.href = url;
    link.click();
  };

  return (
    <div className="manufacturer-dashboard">
      <Header isManufacturer={true} />

      <div className="container">
        <div className="header">
          <h1 className="page-title">Manufacturer Dashboard</h1>
          <p className="subtitle">Manage your products and sustainability certifications</p>

          <div className="action-bar">
            <div className="notification">
              <Bell className="bell-icon" />
              <div className="badge">2</div>
            </div>
            <Link to="/manufacturer/submit-product" className="add-product">
              <Plus className="icon" />
              Add Product
            </Link>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="card-content">
              <div>
                <p className="stat-label">Total Products</p>
                <p className="stat-value">{products.length}</p>
              </div>
              <Package />
            </div>
          </div>
          <div className="stat-card">
            <div className="card-content">
              <div>
                <p className="stat-label">Verified Products</p>
                <p className="stat-value">{products.filter(p => p.status === 'Verified').length}</p>
              </div>
              <Shield />
            </div>
          </div>
          <div className="stat-card">
            <div className="card-content">
              <div>
                <p className="stat-label">Avg Sustainability</p>
                <p className="stat-value">
                  {Math.round(products.reduce((acc, p) => acc + p.sustainabilityScore, 0) / products.length)}
                </p>
              </div>
              <Leaf />
            </div>
          </div>
          <div className="stat-card certifications" onClick={handleCertificateClick}>
            <div className="card-content">
              <div>
                <p className="stat-label">Certifications</p>
                <p className="stat-value">{products.reduce((acc, p) => acc + p.certificates.length, 0)}</p>
              </div>
              <div className="icon-wrapper">
                <Award className="pulse" />
                <div className="pulse-dot" />
              </div>
            </div>
            <div className="hover-text">Click to view certificates</div>
          </div>
        </div>

        <div className="products-table">
          <div className="table-header"><h2>Your Products</h2></div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Status</th>
                  <th>Sustainability Score</th>
                  <th>Carbon Footprint</th>
                  <th>Recycled Content</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} onClick={() => handleProductClick(product)}>
                    <td><div className="product-name">{product.name}</div><div className="product-sku">{product.sku}</div></td>
                    <td><span className={getStatusColor(product.status)}>{product.status}</span></td>
                    <td><div className="sustainability-score"><span>{product.sustainabilityScore}</span><div className="progress-bar"><div className="fill" style={{ width: `${product.sustainabilityScore}%` }}></div></div></div></td>
                    <td>{product.carbonFootprint}</td>
                    <td>{product.recycledContent}</td>
                    <td>
                      <div className="actions">
                        {product.status === 'Verified' && (
                          <button className="qr" onClick={(e) => { e.stopPropagation(); handleQRClick(product); }}>
                            <QrCode />
                          </button>
                        )}
                        <button className="default"><TrendingUp /></button>
                        <button className="view"><Eye /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* QR Code Modal */}
        {showQRModal && selectedProduct && (
          <div className="modal-overlay">
            <div className="modal qr-code-modal">
              <div className="modal-header">
                <h2><QrCode /> Your TraceGreen QR Code</h2>
                <button onClick={() => setShowQRModal(false)}><X /></button>
              </div>

              <div className="modal-body">
                <div className="qr-flexbox">
                  <div className="qr-container" ref={qrRef}>
                    <div className="qr-wrapper">
                      <QRCodeCanvas
                        value={`https://tracegreen.io/product/${selectedProduct.hash}`}
                        bgColor="#0f172a"
                        fgColor="#ffffff"
                        size={180}
                      />
                      <div className="badge-icon">
                        <Shield />
                      </div>
                    </div>
                  </div>

                  <div className="qr-details">
                    <h3>QR Code Details</h3>
                    <p className="label">Product URL:</p>
                    <div className="url-copy">
                      <a
                        href={`https://tracegreen.io/product/${selectedProduct.hash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        https://tracegreen.io/product/{selectedProduct.hash}
                      </a>
                      <button
                        className="copy-btn"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            `https://tracegreen.io/product/${selectedProduct.hash}`
                          )
                        }
                      >
                        📋
                      </button>
                    </div>

                    <div className="qr-actions">
                      <button className="download-btn" onClick={downloadQR}>
                        <Download /> Download QR Code
                      </button>
                      <Link to="/manufacturer/dashboard" className="return-btn">
                        Return to Dashboard
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="success-box">
                  🎉 <strong>Congratulations!</strong><br />
                  Your product is now TraceGreen certified! Place this QR code on your product packaging to allow consumers to verify its sustainability credentials.
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
