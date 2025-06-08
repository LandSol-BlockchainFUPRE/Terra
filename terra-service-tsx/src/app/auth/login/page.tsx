'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true)

  const payload = {
    username: username,
    password: password,
  };

  alert("Login successful");
  router.push('/home');

  // try {
  //   const res = await fetch('https://e1e0-102-90-100-9.ngrok-free.app/login/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json; charset=utf-8',
  //       'Authorization': 'Basic bHVjaWZlcjpkZWF0aDIwMjU=' // Use your backend's Basic Auth for app-level security
  //     },
  //     body: JSON.stringify(payload),
  //   });

  //   if (!res.ok) {
  //     let errorDetail = `Login failed (Status: ${res.status})`;
  //     try {
  //       const errorData = await res.json();
  //       errorDetail = errorData.detail || JSON.stringify(errorData) || `Server error: ${res.statusText}`;
  //     } catch (jsonError) {
  //       errorDetail = `Server error: ${res.statusText} (Response not JSON)`;
  //     }
  //     throw new Error(errorDetail);
  //   }

  //   const data = await res.json();
  //   console.log("Login successful:", data);
  //   alert("Login successful");
  //   router.push('/home');

  // } catch (error: any) {
  //   console.error("Login error details:", error);
  // } finally {
  //   setIsLoading(false);
  // }
};
// const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Simulated login process
//     await new Promise((resolve) => setTimeout(resolve, 1500));
//     console.log('Logging in with:', { username, password });

//     setIsLoading(false);

//     //redirect to home page 
//     router.push('/home')
//   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome to <span className="text-primary">Terra</span> Registry
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-white/80 text-sm mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring focus:border-primary"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring focus:border-primary"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition duration-300"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-white/50 text-center text-sm mt-6">
          © {new Date().getFullYear()} Terra Registry. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
