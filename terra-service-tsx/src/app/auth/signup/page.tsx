'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullname: '',
    date_of_birth: '',
    residential_address: '',
    id_number: '',
    // username: '',
    password: '',
    // confirmPassword: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    // const username: string = 'lucifer';
    // const passwordAuth: string = 'death2025'; 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    // Construct the payload with the exact field names from your working curl command
    const payload = {
      fullname: formData.fullname,
      date_of_birth: formData.date_of_birth,         // Matches curl and updated state
      residential_address: formData.residential_address, // Matches curl and updated state
      id_number: formData.id_number,                 // Matches curl and updated state
      password: formData.password,                   // This is the new user's password
    };

    try {
      const res = await fetch('https://e1e0-102-90-100-9.ngrok-free.app/user-profiles/', {
        method: 'POST',
        headers: {
            // Use the Content-Type from curl, including charset for completeness
            'Content-Type': 'application/json; charset=utf-8',
            // IMPORTANT: Use the Authorization token that worked in your curl command
            'Authorization': "Basic bHVjaWZlcjpkZWF0aDIwMjU=" // Corrected Token from your curl
        },
        body: JSON.stringify(payload), // Send the correctly structured payload
      });

      if (!res.ok) {
        let errorDetail = `Failed to create account (Status: ${res.status})`;
        try {
          const errorData = await res.json();
          // Use errorData.detail, or stringify the whole errorData, or fallback to statusText
          errorDetail = errorData.detail || JSON.stringify(errorData) || `Server error: ${res.statusText}`;
        } catch (jsonError) {
          // If the error response wasn't JSON
          errorDetail = `Server error: ${res.statusText} (Response not JSON)`;
        }
        throw new Error(errorDetail);
      }

      const responseData = await res.json(); // Assuming successful response also sends JSON
      setMessage('Account created successfully!'); // Consider using a message from responseData if available
      console.log('Account creation successful:', responseData);
          //redirect to home page 
        router.push('/login')

      // Reset form: ensure keys here match your state structure
      setFormData({
        fullname: '',
        date_of_birth: '',
        residential_address: '',
        id_number: '',
        password: '',
        // username: '', // if you had it in state
      });

    } catch (error: any) {
      setMessage(error.message || 'An unexpected error occurred.');
      console.error("Signup error details:", error); // Log the error object for more details
    } finally {
      setIsSubmitting(false);
    }
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
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-1">Address</label>
            <textarea
              name="residential_address"
              value={formData.residential_address}
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
              name="id_number"
              value={formData.id_number}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring focus:border-primary"
            />
          </div>

          {/* <div>
            <label className="block text-white/80 text-sm mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring focus:border-primary"
            />
          </div> */}

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
            {/* <div>
              <label className="block text-white/80 text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring focus:border-primary"
              />
            </div> */}
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
