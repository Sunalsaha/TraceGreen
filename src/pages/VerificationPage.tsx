import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, Clock, Download, QrCode, ExternalLink, Copy } from 'lucide-react';
import Header from '../components/Header';

const VerificationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('processing');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate blockchain verification process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setVerificationStatus('completed');
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const mockData = {
    productName: 'Eco Cotton T-Shirt',
    sku: 'ECO-TSH-001',
    submissionTime: new Date().toISOString(),
    blockchainHash: id || '0x7f9c8b2d4a1e6f3c9a5b8e2f1d4c7a9b6e3f2c5d8a1b4e7f2c5a8b1e4d7c9f6',
    blockNumber: '18,234,567',
    gasUsed: '0.0023 ETH',
    qrCodeUrl: `https://tracegreen.io/product/${id}`,
    certificationId: 'TG-' + Math.random().toString(36).substr(2, 9).toUpperCase()
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen">
      <Header isManufacturer={true} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Blockchain Verification</h1>
          <p className="text-gray-400">Your product is being verified and recorded on the blockchain</p>
        </div>

        {verificationStatus === 'processing' && (
          <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 rounded-2xl border border-yellow-400/20 p-8 mb-8">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto">
                  <div className="w-full h-full border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin"></div>
                  <Shield className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-yellow-400" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">Verifying Product Data</h2>
              <p className="text-gray-400 mb-6">Creating immutable record on blockchain...</p>
              
              <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              <p className="text-yellow-400 font-medium">{Math.round(progress)}% Complete</p>
            </div>
          </div>
        )}

        {verificationStatus === 'completed' && (
          <>
            <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 rounded-2xl border border-neon-green/20 p-8 mb-8">
              <div className="text-center mb-8">
                <CheckCircle className="h-16 w-16 text-neon-green mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Verification Complete!</h2>
                <p className="text-gray-400">Your product has been successfully verified and recorded on the blockchain</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Product Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Product Name:</span>
                      <span className="text-white font-medium">{mockData.productName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">SKU:</span>
                      <span className="text-white font-medium">{mockData.sku}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Certification ID:</span>
                      <span className="text-neon-green font-medium">{mockData.certificationId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Submission Time:</span>
                      <span className="text-white">{new Date(mockData.submissionTime).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Blockchain Details</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400 block">Transaction Hash:</span>
                      <div className="flex items-center mt-1">
                        <span className="text-neon-green font-mono text-sm break-all mr-2">
                          {mockData.blockchainHash}
                        </span>
                        <button 
                          onClick={() => copyToClipboard(mockData.blockchainHash)}
                          className="text-gray-400 hover:text-neon-green transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Block Number:</span>
                      <span className="text-white">{mockData.blockNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gas Used:</span>
                      <span className="text-white">{mockData.gasUsed}</span>
                    </div>
                    <button className="flex items-center text-neon-green hover:text-electric-lime transition-colors">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View on Explorer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Generation */}
            <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 rounded-2xl border border-electric-lime/20 p-8">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <QrCode className="h-5 w-5 mr-2 text-electric-lime" />
                Your TraceGreen QR Code
              </h2>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  {/* Mock QR Code - in real implementation, this would be generated */}
                  <div className="bg-white p-4 rounded-lg inline-block">
                    <div className="w-48 h-48 bg-gradient-to-br from-black via-gray-800 to-black relative overflow-hidden">
                      <div className="absolute inset-4 grid grid-cols-8 gap-1">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`}
                          />
                        ))}
                      </div>
                      <div className="absolute bottom-2 right-2 w-8 h-8 bg-neon-green rounded flex items-center justify-center">
                        <Shield className="h-4 w-4 text-black" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">QR Code Details</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-gray-400 block">Product URL:</span>
                      <div className="flex items-center mt-1">
                        <span className="text-electric-lime text-sm break-all mr-2">
                          {mockData.qrCodeUrl}
                        </span>
                        <button 
                          onClick={() => copyToClipboard(mockData.qrCodeUrl)}
                          className="text-gray-400 hover:text-electric-lime transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex items-center justify-center px-4 py-2 bg-electric-lime/20 border border-electric-lime text-electric-lime rounded-lg hover:bg-electric-lime/30 transition-colors">
                        <Download className="h-4 w-4 mr-2" />
                        Download QR Code
                      </button>
                      
                      <button 
                        onClick={() => navigate('/manufacturer/dashboard')}
                        className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-neon-green to-electric-lime text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-300"
                      >
                        Return to Dashboard
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-neon-green/10 border border-neon-green/30 rounded-lg">
                <h4 className="text-neon-green font-semibold mb-2">🎉 Congratulations!</h4>
                <p className="text-gray-300 text-sm">
                  Your product is now TraceGreen certified! Place this QR code on your product packaging 
                  to allow consumers to verify its sustainability credentials.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;