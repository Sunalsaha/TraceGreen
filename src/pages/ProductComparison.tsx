import React, { useState } from 'react';
import { Search, Plus, X, Trophy, Leaf, Droplets, Recycle, Shield } from 'lucide-react';
import Header from '../components/Header';

const ProductComparison = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [comparedProducts, setComparedProducts] = useState([
    {
      id: 1,
      name: 'Eco Cotton T-Shirt',
      brand: 'GreenWear Co.',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300',
      sustainabilityScore: 85,
      carbonFootprint: 2.3,
      waterUsage: 1200,
      recycledContent: 65,
      certifications: ['GOTS', 'Fair Trade']
    },
    {
      id: 2,
      name: 'Bamboo Phone Case',
      brand: 'EcoTech',
      image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=300',
      sustainabilityScore: 92,
      carbonFootprint: 0.8,
      waterUsage: 45,
      recycledContent: 80,
      certifications: ['FSC', 'Carbon Neutral']
    }
  ]);

  const mockSearchResults = [
    {
      id: 3,
      name: 'Recycled Sneakers',
      brand: 'SportEco',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300',
      sustainabilityScore: 78,
      carbonFootprint: 4.1,
      waterUsage: 890,
      recycledContent: 55,
      certifications: ['Recycled Content', 'Vegan']
    },
    {
      id: 4,
      name: 'Organic Hemp Backpack',
      brand: 'NaturePack',
      image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=300',
      sustainabilityScore: 88,
      carbonFootprint: 1.5,
      waterUsage: 340,
      recycledContent: 45,
      certifications: ['Organic', 'GOTS']
    }
  ];

  const addToComparison = (product: any) => {
    if (comparedProducts.length < 3 && !comparedProducts.find(p => p.id === product.id)) {
      setComparedProducts([...comparedProducts, product]);
    }
  };

  const removeFromComparison = (id: number) => {
    setComparedProducts(comparedProducts.filter(p => p.id !== id));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-neon-green';
    if (score >= 60) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getBestValue = (products: any[], key: string, lowerIsBetter = false) => {
    if (!products.length) return null;
    const values = products.map(p => p[key]);
    const best = lowerIsBetter ? Math.min(...values) : Math.max(...values);
    return products.find(p => p[key] === best)?.id;
  };

  const bestSustainability = getBestValue(comparedProducts, 'sustainabilityScore');
  const bestCarbon = getBestValue(comparedProducts, 'carbonFootprint', true);
  const bestWater = getBestValue(comparedProducts, 'waterUsage', true);
  const bestRecycled = getBestValue(comparedProducts, 'recycledContent');

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Compare Products</h1>
          <p className="text-gray-400">Compare sustainability metrics across different products</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for products to compare..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
            />
          </div>
        </div>

        {/* Search Results */}
        {searchTerm && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Search Results</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockSearchResults
                .filter(product => 
                  product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  product.brand.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(product => (
                  <div 
                    key={product.id}
                    className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 rounded-xl border border-gray-700 p-4 hover:border-neon-green/40 transition-all"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="text-white font-medium mb-1">{product.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{product.brand}</p>
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${getScoreColor(product.sustainabilityScore)}`}>
                        {product.sustainabilityScore}/100
                      </span>
                      <button
                        onClick={() => addToComparison(product)}
                        disabled={comparedProducts.length >= 3 || comparedProducts.find(p => p.id === product.id)}
                        className="flex items-center px-3 py-1 bg-neon-green/20 border border-neon-green text-neon-green rounded text-sm hover:bg-neon-green/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {comparedProducts.length > 0 && (
          <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 rounded-2xl border border-neon-green/20 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Product Comparison</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/40">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-400 font-medium">Product</th>
                    {comparedProducts.map(product => (
                      <th key={product.id} className="px-6 py-4 text-center">
                        <div className="relative">
                          <button
                            onClick={() => removeFromComparison(product.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg mx-auto mb-2"
                          />
                          <div className="text-white font-medium text-sm">{product.name}</div>
                          <div className="text-gray-400 text-xs">{product.brand}</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 text-gray-300 font-medium">
                      <div className="flex items-center">
                        <Trophy className="h-4 w-4 mr-2 text-neon-green" />
                        Sustainability Score
                      </div>
                    </td>
                    {comparedProducts.map(product => (
                      <td key={product.id} className="px-6 py-4 text-center">
                        <div className={`text-2xl font-bold ${getScoreColor(product.sustainabilityScore)} ${
                          product.id === bestSustainability ? 'relative' : ''
                        }`}>
                          {product.sustainabilityScore}/100
                          {product.id === bestSustainability && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-green rounded-full flex items-center justify-center">
                              <Trophy className="h-2 w-2 text-black" />
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                  
                  <tr>
                    <td className="px-6 py-4 text-gray-300 font-medium">
                      <div className="flex items-center">
                        <Leaf className="h-4 w-4 mr-2 text-neon-green" />
                        Carbon Footprint (kg CO2)
                      </div>
                    </td>
                    {comparedProducts.map(product => (
                      <td key={product.id} className="px-6 py-4 text-center">
                        <div className={`text-lg font-semibold text-white ${
                          product.id === bestCarbon ? 'relative' : ''
                        }`}>
                          {product.carbonFootprint}
                          {product.id === bestCarbon && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-green rounded-full flex items-center justify-center">
                              <Trophy className="h-2 w-2 text-black" />
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="px-6 py-4 text-gray-300 font-medium">
                      <div className="flex items-center">
                        <Droplets className="h-4 w-4 mr-2 text-electric-lime" />
                        Water Usage (liters)
                      </div>
                    </td>
                    {comparedProducts.map(product => (
                      <td key={product.id} className="px-6 py-4 text-center">
                        <div className={`text-lg font-semibold text-white ${
                          product.id === bestWater ? 'relative' : ''
                        }`}>
                          {product.waterUsage.toLocaleString()}
                          {product.id === bestWater && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-electric-lime rounded-full flex items-center justify-center">
                              <Trophy className="h-2 w-2 text-black" />
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="px-6 py-4 text-gray-300 font-medium">
                      <div className="flex items-center">
                        <Recycle className="h-4 w-4 mr-2 text-neon-green" />
                        Recycled Content (%)
                      </div>
                    </td>
                    {comparedProducts.map(product => (
                      <td key={product.id} className="px-6 py-4 text-center">
                        <div className={`text-lg font-semibold text-white ${
                          product.id === bestRecycled ? 'relative' : ''
                        }`}>
                          {product.recycledContent}%
                          {product.id === bestRecycled && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-green rounded-full flex items-center justify-center">
                              <Trophy className="h-2 w-2 text-black" />
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="px-6 py-4 text-gray-300 font-medium">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-electric-lime" />
                        Certifications
                      </div>
                    </td>
                    {comparedProducts.map(product => (
                      <td key={product.id} className="px-6 py-4">
                        <div className="space-y-1">
                          {product.certifications.map((cert, index) => (
                            <div key={index} className="bg-electric-lime/20 text-electric-lime px-2 py-1 rounded text-xs text-center">
                              {cert}
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {comparedProducts.length < 3 && (
              <div className="p-6 border-t border-gray-700 text-center">
                <p className="text-gray-400">
                  Add more products to compare (up to 3 total)
                </p>
              </div>
            )}
          </div>
        )}

        {comparedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No products selected for comparison</div>
            <p className="text-gray-500">Search for products above and add them to start comparing</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductComparison;