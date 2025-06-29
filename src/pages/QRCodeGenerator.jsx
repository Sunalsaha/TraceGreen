import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const qrRef = useRef();

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');

    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qr-code.png';
    downloadLink.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-gray-800 text-white px-4">
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>

        <input
          type="text"
          placeholder="Enter text or URL"
          className="w-full p-3 rounded-lg mb-4 bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-neon-green"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div ref={qrRef} className="bg-white p-4 rounded-lg inline-block">
          <QRCodeCanvas
            value={text || ' '}
            size={200}
            bgColor="#ffffff"
            fgColor="#000000"
            includeMargin={true}
            level="H"
          />
        </div>

        <button
          onClick={handleDownload}
          className="mt-4 px-4 py-2 bg-neon-green text-black rounded-lg font-semibold hover:bg-electric-lime transition"
        >
          Download QR Code
        </button>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
