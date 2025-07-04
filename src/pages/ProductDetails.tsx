import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Leaf, Droplets, Recycle, Shield } from 'lucide-react';
import Header from '../components/Header';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchProduct();
  }, [productId]);

  if (error) return <div className="text-red-400 text-center py-20">{error}</div>;
  if (!product) return <div className="text-white text-center py-20">Loading product details...</div>;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">{product.productName}</h1>
        <p className="text-gray-400 mb-6">SKU: {product.sku}</p>

        <div className="grid md:grid-cols-2 gap-8 text-white">
          <div>
            <h2 className="text-xl font-semibold mb-4">Environmental Data</h2>
            <p><Leaf className="inline w-4 h-4 mr-2 text-neon-green" /> Carbon: {product.carbonEmissions} kg CO₂</p>
            <p><Droplets className="inline w-4 h-4 mr-2 text-neon-green" /> Water: {product.waterUsage} liters</p>
            <p><Recycle className="inline w-4 h-4 mr-2 text-neon-green" /> Recycled: {product.recycledContent}%</p>
            <p className="mt-2">Organic: {product.organicContent}%</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Supplier & Certifications</h2>
            <p>Name: {product.supplierName}</p>
            <p>Location: {product.supplierLocation}</p>
            <p>Certifications: {product.supplierCertifications}</p>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          Certified by TraceGreen – Product ID: {productId}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
