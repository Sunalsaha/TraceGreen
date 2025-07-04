import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, Leaf, Droplets, Recycle, Award, ExternalLink, Share2, Heart, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';

const ProductView = () => {
  const { hash } = useParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [product, setProduct] = useState<any>(null);

  // Simulate blockchain verification
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVerifying(false);
      setProduct({
        name: 'Eco Cotton T-Shirt',
        brand: 'GreenWear Co.',
        image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
        sustainabilityScore: 85,
        hash: hash || '0x7f9c8b2d4a1e6f3c9a5b8e2f1d4c7a9b6e3f2c5d8a1b4e7f2c5a8b1e4d7c9f6',
        timestamp: '2024-01-15T10:30:00Z',
        carbonFootprint: {
          value: 2.3,
          unit: 'kg CO2',
          benchmark: 'Industry Average: 4.1 kg CO2'
        },
        waterUsage: {
          value: 1200,
          unit: 'liters',
          benchmark: 'Industry Average: 2700 liters'
        },
        recycledContent: {
          value: 65,
          unit: '%',
          materials: ['Organic Cotton: 45%', 'Recycled Polyester: 20%', 'Hemp: 35%']
        },
        certifications: [
          'GOTS Certified',
          'Fair Trade',
          'Carbon Neutral',
          'Cradle to Cradle Bronze'
        ],
        supplier: {
          name: 'EcoTextiles Ltd.',
          location: 'Portugal',
          sustainabilityRating: 'A+'
        }
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [hash]);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-neon-green/30 border-t-neon-green rounded-full animate-spin mb-6"></div>
            <Shield className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-neon-green" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Verifying Product Data</h2>
          <p className="text-gray-400">Checking blockchain records...</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-neon-green to-electric-lime';
    if (score >= 60) return 'from-yellow-400 to-orange-400';
    return 'from-orange-400 to-red-400';
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="flex items-center text-gray-400 hover:text-neon-green transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        {/* Product Header */}
        <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 rounded-2xl border border-neon-green/20 p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-white">{product.name}</h1>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-neon-green transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-neon-green transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <p className="text-xl text-gray-300 mb-6">by {product.brand}</p>
              
              {/* Sustainability Score */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-white">Sustainability Score</span>
                  <span className="text-3xl font-bold text-white">{product.sustainabilityScore}/100</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div 
                    className={`bg-gradient-to-r ${getScoreColor(product.sustainabilityScore)} h-4 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${product.sustainabilityScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Blockchain Verification */}
              <div className="bg-black/40 rounded-lg p-4 border border-neon-green/30">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 text-neon-green mr-2" />
                  <span className="text-sm font-medium text-neon-green">Blockchain Verified</span>
                </div>
                <p className="text-xs text-gray-400 font-mono break-all">
                  Hash: {product.hash}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Verified: {new Date(product.timestamp).toLocaleDateString()}
                </p>
                <button className="flex items-center text-xs text-neon-green hover:text-electric-lime mt-2 transition-colors">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View on Explorer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sustainability Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Carbon Footprint */}
          <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 rounded-xl border border-neon-green/20 p-6">
            <div className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-neon-green mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-white">Carbon Footprint</h3>
                <p className="text-2xl font-bold text-neon-green">{product.carbonFootprint.value} {product.carbonFootprint.unit}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">{product.carbonFootprint.benchmark}</p>
            <div className="mt-3 text-xs text-electric-lime">✓ 44% below average</div>
          </div>

          {/* Water Usage */}
          <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 rounded-xl border border-electric-lime/20 p-6">
            <div className="flex items-center mb-4">
              <Droplets className="h-8 w-8 text-electric-lime mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-white">Water Usage</h3>
                <p className="text-2xl font-bold text-electric-lime">{product.waterUsage.value} {product.waterUsage.unit}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">{product.waterUsage.benchmark}</p>
            <div className="mt-3 text-xs text-neon-green">✓ 56% below average</div>
          </div>

          {/* Recycled Content */}
          <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 rounded-xl border border-neon-green/20 p-6">
            <div className="flex items-center mb-4">
              <Recycle className="h-8 w-8 text-neon-green mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-white">Recycled Content</h3>
                <p className="text-2xl font-bold text-neon-green">{product.recycledContent.value}{product.recycledContent.unit}</p>
              </div>
            </div>
            <div className="space-y-1">
              {product.recycledContent.materials.map((material: string, index: number) => (
                <p key={index} className="text-sm text-gray-400">{material}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications & Supplier */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Certifications */}
          <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 rounded-xl border border-electric-lime/20 p-6">
            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 text-electric-lime mr-2" />
              <h3 className="text-lg font-semibold text-white">Certifications</h3>
            </div>
            <div className="space-y-2">
              {product.certifications.map((cert: string, index: number) => (
                <div key={index} className="flex items-center text-sm text-gray-300">
                  <div className="w-2 h-2 bg-electric-lime rounded-full mr-3"></div>
                  {cert}
                </div>
              ))}
            </div>
          </div>

          {/* Supplier Information */}
          <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 rounded-xl border border-neon-green/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Supplier Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Company</p>
                <p className="text-white font-medium">{product.supplier.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="text-white font-medium">{product.supplier.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Sustainability Rating</p>
                <p className="text-neon-green font-bold">{product.supplier.sustainabilityRating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;