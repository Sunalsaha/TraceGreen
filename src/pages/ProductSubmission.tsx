import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Upload, Recycle, Droplets, Leaf, Building2, FileText, ChevronRight } from 'lucide-react';
import Header from '../components/Header';

const ProductSubmission = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    productName: '',
    sku: '',
    category: '',
    description: '',
    materials: [],
    recycledContent: 0,
    organicContent: 0,
    carbonEmissions: '',
    waterUsage: '',
    energyUsage: '',
    supplierName: '',
    supplierLocation: '',
    supplierCertifications: '',
    certificationFiles: []
  });

  const categories = [
    'Apparel & Clothing',
    'Electronics',
    'Food & Beverage',
    'Home & Garden',
    'Personal Care',
    'Sports & Recreation',
    'Automotive',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Generate a mock hash for demonstration
      const mockHash = '0x' + Math.random().toString(16).substr(2, 40);
      navigate(`/manufacturer/verification/${mockHash}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const stepTitles = [
    'Product Information',
    'Material Breakdown',
    'Environmental Impact',
    'Supplier & Certifications'
  ];

  return (
    <div className="min-h-screen">
      <Header isManufacturer={true} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Submit Product for Certification</h1>
          <p className="text-gray-400">Provide detailed information to get your product verified on the blockchain</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {stepTitles.map((title, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index + 1 <= currentStep 
                    ? 'bg-neon-green text-black' 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {index + 1}
                </div>
                <span className={`ml-2 text-sm ${
                  index + 1 <= currentStep ? 'text-neon-green' : 'text-gray-400'
                }`}>
                  {title}
                </span>
                {index < stepTitles.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    index + 1 < currentStep ? 'bg-neon-green' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 rounded-2xl border border-neon-green/20 p-8">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-neon-green" />
                  Product Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="productName"
                      required
                      value={formData.productName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                      placeholder="Eco Cotton T-Shirt"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      SKU/Batch Number *
                    </label>
                    <input
                      type="text"
                      name="sku"
                      required
                      value={formData.sku}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                      placeholder="ECO-TSH-001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Product Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                    placeholder="Describe your product and its sustainable features..."
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Recycle className="h-5 w-5 mr-2 text-electric-lime" />
                  Material Breakdown
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Recycled Content (%)
                    </label>
                    <input
                      type="number"
                      name="recycledContent"
                      min="0"
                      max="100"
                      value={formData.recycledContent}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                      placeholder="65"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Organic Content (%)
                    </label>
                    <input
                      type="number"
                      name="organicContent"
                      min="0"
                      max="100"
                      value={formData.organicContent}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                      placeholder="45"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Material Composition
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                    placeholder="Example:&#10;• Organic Cotton: 45%&#10;• Recycled Polyester: 20%&#10;• Hemp: 35%"
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Leaf className="h-5 w-5 mr-2 text-neon-green" />
                  Environmental Impact
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Leaf className="h-4 w-4 inline mr-1" />
                      Carbon Emissions (kg CO2)
                    </label>
                    <input
                      type="number"
                      name="carbonEmissions"
                      step="0.1"
                      value={formData.carbonEmissions}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                      placeholder="2.3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Droplets className="h-4 w-4 inline mr-1" />
                      Water Usage (liters)
                    </label>
                    <input
                      type="number"
                      name="waterUsage"
                      value={formData.waterUsage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                      placeholder="1200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Energy Usage (kWh)
                    </label>
                    <input
                      type="number"
                      name="energyUsage"
                      step="0.1"
                      value={formData.energyUsage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                      placeholder="5.4"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-electric-lime" />
                  Supplier & Certifications
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Supplier Name
                    </label>
                    <input
                      type="text"
                      name="supplierName"
                      value={formData.supplierName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                      placeholder="EcoTextiles Ltd."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Supplier Location
                    </label>
                    <input
                      type="text"
                      name="supplierLocation"
                      value={formData.supplierLocation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                      placeholder="Portugal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Existing Certifications
                  </label>
                  <textarea
                    name="supplierCertifications"
                    rows={3}
                    value={formData.supplierCertifications}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                    placeholder="List any existing certifications (GOTS, Fair Trade, etc.)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FileText className="h-4 w-4 inline mr-1" />
                    Upload Certification Documents
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">Drag and drop files here, or click to select</p>
                    <p className="text-sm text-gray-500">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                    <button
                      type="button"
                      className="mt-4 px-4 py-2 bg-neon-green/20 border border-neon-green text-neon-green rounded-lg hover:bg-neon-green/30 transition-colors"
                    >
                      Choose Files
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-700">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors"
                >
                  Previous
                </button>
              )}
              
              <button
                type="submit"
                className="ml-auto flex items-center px-8 py-3 bg-gradient-to-r from-neon-green to-electric-lime text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-300"
              >
                {currentStep === 4 ? 'Submit for Verification' : 'Next Step'}
                <ChevronRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductSubmission;