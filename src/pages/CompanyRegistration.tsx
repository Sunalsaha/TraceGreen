import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, MapPin, Mail, Phone, Globe, Users, ChevronRight } from 'lucide-react';
import Header from '../components/Header';

const CompanyRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    address: '',
    city: '',
    country: '',
    phone: '',
    website: '',
    employeeCount: '',
    description: ''
  });

  const industries = [
    'Apparel & Fashion',
    'Electronics & Technology',
    'Food & Beverage',
    'Automotive',
    'Cosmetics & Personal Care',
    'Home & Garden',
    'Sports & Recreation',
    'Healthcare & Pharmaceuticals',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/manufacturer/dashboard');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      <Header isManufacturer={true} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Company Registration</h1>
          <p className="text-gray-400">Complete your company profile to start certifying products</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900/80 to-dark-green/20 rounded-2xl border border-neon-green/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Building className="h-5 w-5 mr-2 text-neon-green" />
                Basic Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                    placeholder="Your Company Ltd."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Industry *
                  </label>
                  <select
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                  >
                    <option value="">Select Industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-electric-lime" />
                Contact Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                    placeholder="123 Business Street"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                    placeholder="New York"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                    placeholder="United States"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Globe className="h-4 w-4 inline mr-1" />
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                    placeholder="https://yourcompany.com"
                  />
                </div>
              </div>
            </div>

            {/* Company Details */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Users className="h-5 w-5 mr-2 text-neon-green" />
                Company Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Employees
                  </label>
                  <select
                    name="employeeCount"
                    value={formData.employeeCount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                  >
                    <option value="">Select range</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"
                    placeholder="Tell us about your company's mission and sustainability goals..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-700">
              <button
                type="submit"
                className="flex items-center px-8 py-3 bg-gradient-to-r from-neon-green to-electric-lime text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-300"
              >
                Complete Registration
                <ChevronRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistration;