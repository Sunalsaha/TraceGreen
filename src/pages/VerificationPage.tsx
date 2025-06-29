import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, Download, QrCode, ExternalLink, Copy } from 'lucide-react';
import Header from '../components/Header';
import { QRCodeCanvas } from 'qrcode.react';
import logo from '../components/pic/greenlogo.png'; // ✅ Local logo import

const VerificationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('processing');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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

  const downloadQRCode = () => {
    const canvas = document.getElementById('qrCode') as HTMLCanvasElement;
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${mockData.productName}_QRCode.png`;
    downloadLink.click();
  };

  return (
    <div className="min-h-screen">
      <Header isManufacturer={true} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Blockchain Verification</h1>
          <p className="text-gray-400">Your product is being verified and recorded on the blockchain</p>
        </div>

        {verificationStatus === 'processing' && (
          <div className="bg-gray-900/80 border border-yellow-400/20 rounded-2xl p-8 mb-8">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin relative">
                  <Shield className="absolute inset-0 m-auto h-8 w-8 text-yellow-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Verifying Product Data</h2>
              <p className="text-gray-400 mb-6">Creating immutable record on blockchain...</p>
              <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                <div className="bg-yellow-400 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-yellow-400 font-medium">{Math.round(progress)}% Complete</p>
            </div>
          </div>
        )}

        {verificationStatus === 'completed' && (
          <>
            <div className="bg-gray-900/80 border border-neon-green/20 rounded-2xl p-8 mb-8">
              <div className="text-center mb-8">
                <CheckCircle className="h-16 w-16 text-neon-green mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Verification Complete!</h2>
                <p className="text-gray-400">Your product has been successfully recorded on blockchain.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Product Information</h3>
                  <div className="space-y-3 text-white">
                    <div className="flex justify-between"><span className="text-gray-400">Product Name:</span>{mockData.productName}</div>
                    <div className="flex justify-between"><span className="text-gray-400">SKU:</span>{mockData.sku}</div>
                    <div className="flex justify-between"><span className="text-gray-400">Certification ID:</span><span className="text-neon-green">{mockData.certificationId}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Submission Time:</span>{new Date(mockData.submissionTime).toLocaleString()}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Blockchain Details</h3>
                  <div className="space-y-3 text-white">
                    <div>
                      <span className="text-gray-400 block">Transaction Hash:</span>
                      <div className="flex items-center mt-1">
                        <span className="text-neon-green font-mono text-sm break-all mr-2">{mockData.blockchainHash}</span>
                        <button onClick={() => copyToClipboard(mockData.blockchainHash)} className="text-gray-400 hover:text-neon-green transition">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between"><span className="text-gray-400">Block Number:</span>{mockData.blockNumber}</div>
                    <div className="flex justify-between"><span className="text-gray-400">Gas Used:</span>{mockData.gasUsed}</div>
                    <button className="flex items-center text-neon-green hover:text-electric-lime transition">
                      <ExternalLink className="h-4 w-4 mr-1" /> View on Explorer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="bg-gray-900/80 border border-electric-lime/20 rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <QrCode className="h-5 w-5 mr-2 text-electric-lime" />
                Your TraceGreen QR Code
              </h2>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative w-fit p-4 bg-white rounded-lg">
                  <QRCodeCanvas
                    id="qrCode"
                    value={mockData.qrCodeUrl}
                    size={192}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="H"
                    includeMargin={true}
                  />
                  {/* ✅ Logo in center using React import */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img
                      src={logo}
                      alt="TraceGreen Logo"
                      className="w-10 h-10 rounded-full border-4 border-white bg-white shadow-md"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">QR Code Details</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-gray-400 block">Product URL:</span>
                      <div className="flex items-center mt-1">
                        <span className="text-electric-lime text-sm break-all mr-2">{mockData.qrCodeUrl}</span>
                        <button onClick={() => copyToClipboard(mockData.qrCodeUrl)} className="text-gray-400 hover:text-electric-lime">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button onClick={downloadQRCode} className="flex items-center px-4 py-2 border border-electric-lime bg-electric-lime/20 text-electric-lime rounded-lg hover:bg-electric-lime/30">
                        <Download className="h-4 w-4 mr-2" />
                        Download QR Code
                      </button>
                      <button onClick={() => navigate('/manufacturer/dashboard')} className="flex items-center px-4 py-2 bg-gradient-to-r from-neon-green to-electric-lime text-black font-semibold rounded-lg hover:shadow-lg">
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

