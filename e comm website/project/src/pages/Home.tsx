import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useStore } from '../store/useStore';

export default function Home() {
  const addToCart = useStore((state) => state.addToCart);
  const featuredProducts = products.slice(0, 8);
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 mb-12">
          <h1 className="text-4xl font-bold mb-4 text-black">Welcome to ShopSmart</h1>
          <p className="text-lg mb-6 text-black">Discover amazing products at great prices</p>
          <Link
            to="/products"
            className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-900 transition duration-200"
          >
            Shop Now
          </Link>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products/${category}`}
                className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-primary transition duration-200 text-center"
              >
                <h3 className="text-lg font-semibold text-white">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-white">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
                  <p className="text-gray-400 mb-4">
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
  );
}