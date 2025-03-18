import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const cart = useStore((state) => state.cart);
  const setAuthenticated = useStore((state) => state.setAuthenticated);
  const setUser = useStore((state) => state.setUser);

  const handleLogout = () => {
    setAuthenticated(false);
    setUser(null);
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-white">
                ShopSmart
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-300 hover:text-primary"
            >
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-black font-semibold rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-300 hover:text-primary"
            >
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}