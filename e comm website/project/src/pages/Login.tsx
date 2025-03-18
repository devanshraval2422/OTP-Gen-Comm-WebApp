import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ShoppingBag } from 'lucide-react';

export default function Login() {
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const setAuthenticated = useStore((state) => state.setAuthenticated);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'credentials') {
      // Generate random 6-digit OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setUser({ id, password, otp: generatedOtp });
      alert(`Your OTP is: ${generatedOtp}`);
      setStep('otp');
    } else {
      const user = useStore.getState().user;
      if (user?.otp === otp) {
        setAuthenticated(true);
        navigate('/');
      } else {
        alert('Invalid OTP');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center mb-8">
          <ShoppingBag className="w-12 h-12 text-purple-600" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {step === 'credentials' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Login ID
                </label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                maxLength={6}
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
          >
            {step === 'credentials' ? 'Continue' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
}