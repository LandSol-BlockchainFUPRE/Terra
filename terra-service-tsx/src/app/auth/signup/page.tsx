'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullname: '',
    dob: '',
    address: '',
    nin: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    // const username: string = 'lucifer';
    // const passwordAuth: string = 'death2025'; 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    //  try {
    //   const res = await fetch('https://e1e0-102-90-100-9.ngrok-free.app/user-profiles/', {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': 'Basic ' + btoa(`${username}:${passwordAuth}`),
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (!res.ok) {
    //     const errorData = await res.json();
    //     throw new Error(errorData.detail || 'Failed to create account');
    //   }

    //   setMessage('Account created successfully!');
    //   setFormData({
    //     fullname: '',
    //     dob: '',
    //     address: '',
    //     nin: '',
    //     username: '',
    //     password: '',
    //   });
    // } catch (error: any) {
    //   setMessage(error.message);
    // } finally {
    //   setIsSubmitting(false);
    // }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Submitted:', formData);
    setIsSubmitting(false);
    // Redirect or show success here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create Your <span className="text-primary">Terra</span> Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-white/80 text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              required
              className="w-full px-4 py-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring focus:border-primary resize-none"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-1">NIN Number</label>
            <input
              type="text"
              name="nin"
              value={formData.nin}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring focus:border-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition duration-300"
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-white/50 text-center text-sm mt-6">
          Already have an account? <a href="/auth/login" className="text-primary hover:underline">Login</a>
        </p>
      </motion.div>
    </div>
  );
}
