import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useStore } from '../store/useStore';

export default function Products() {
  const { category } = useParams();
  const addToCart = useStore((state) => state.addToCart);
  const [selectedCategory, setSelectedCategory] = useState(category || 'All');

  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="md:w-64">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
              <h2 className="text-lg font-semibold mb-4 text-white">Categories</h2>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-2 rounded-lg ${
                      selectedCategory === cat
                        ? 'bg-primary text-black font-semibold'
                        : 'text-white hover:bg-gray-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-primary transition duration-200"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-white">{product.name}</h3>
                    <p className="text-gray-400 mb-2">{product.category}</p>
                    <p className="text-white font-semibold mb-4">
                      ₹{product.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-primary hover:bg-primary-dark text-black font-semibold py-2 rounded-lg transition duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}