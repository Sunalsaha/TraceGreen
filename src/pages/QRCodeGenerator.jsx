import React, { useEffect, useState } from 'react';
import axios from 'axios'; // ✅ Importing Axios
import { Download, ExternalLink, Shield } from 'lucide-react';


const QRCodeGenerator = ({ hash = '0x123abc456def789', onBack }) => {
  const [qrImage, setQrImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const productURL = `https://tracegreen.io/product/${hash}`;

  useEffect(() => {
    const generateQR = async () => {
      try {
        const response = await axios.post(
          'https://yourdomain.com/generate-qr.php', // 🔁 Replace with your backend QR endpoint
          new URLSearchParams({ text: productURL }),
          { responseType: 'blob' }
        );
        const imageUrl = URL.createObjectURL(response.data);
        setQrImage(imageUrl);
      } catch (err) {
        console.error('Failed to generate QR:', err);
      } finally {
        setLoading(false);
      }
    };

    generateQR();
  }, [productURL]);

  const handleDownload = () => {
    if (!qrImage) return;
    const link = document.createElement('a');
    link.href = qrImage;
    link.download = 'tracegreen-qr-code.png';
    link.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(productURL);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-green-950 text-white px-4">
      <div className="bg-gradient-to-br from-slate-800 to-green-900 border border-green-400/40 p-8 rounded-2xl shadow-xl w-full max-w-4xl">
        {/* Title */}
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <Shield className="text-neon-green" />
          Your TraceGreen QR Code
        </h2>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* QR Code Section */}
          {loading ? (
            <div className="text-gray-300">Generating QR code...</div>
          ) : (
            <div className="bg-white p-4 rounded-xl relative">
              <img src={qrImage} alt="QR Code" className="w-48 h-48 object-contain" />
              <div className="absolute bottom-2 right-2 bg-neon-green p-1 rounded">
                <Shield className="w-4 h-4 text-black" />
              </div>
            </div>
          )}

          {/* Right Info */}
          <div className="flex-1">
            <h3 className="text-white text-lg font-semibold mb-2">QR Code Details</h3>
            <p className="text-sm text-gray-400 mb-1">Product URL:</p>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <a
                href={productURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-green break-all hover:underline"
              >
                {productURL}
              </a>
              <button onClick={handleCopy} title="Copy URL">
                <ExternalLink className="w-4 h-4 text-neon-green" />
              </button>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleDownload}
                className="px-6 py-2 rounded-lg bg-gray-800 text-neon-green border border-neon-green hover:bg-neon-green hover:text-black transition"
              >
                <Download className="inline-block mr-2 w-4 h-4" />
                Download QR Code
              </button>

              {onBack && (
                <button
                  onClick={onBack}
                  className="px-6 py-2 rounded-lg bg-neon-green text-black font-semibold hover:bg-lime-400 transition"
                >
                  Return to Dashboard
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Congratulations */}
        <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-green-800/50 to-green-600/40 border border-neon-green text-sm text-green-300">
          🎉 <strong>Congratulations!</strong><br />
          Your product is now TraceGreen certified! Place this QR code on your product packaging to allow consumers to verify its sustainability credentials.
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
