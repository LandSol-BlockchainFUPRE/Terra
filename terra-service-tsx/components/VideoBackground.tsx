/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function VideoBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use a simple div for server rendering to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <div className="w-full h-full">
            <img src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
            alt="Background image showing modern architecture"
            className="object-cover w-full h-full" />
            {/* <Image width={100} height={100} src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
            alt="Background image showing modern architecture"
            className="object-cover w-full h-full"/> */}
          {/* <img
            
          /> */}
        </div>
      </div>
    );
  }

  // Use motion div for client-side rendering
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 z-0"
    >
      <div className="absolute inset-0 bg-black/70 z-10" />
      <div className="w-full h-full">
        <img src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
          alt="Background image showing modern architecture"
          className="object-cover w-full h-full" />
        {/* <Image
         src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
          alt="Background image showing modern architecture"
          className="object-cover w-full h-full"/> */}
        {/* <img
          src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
          alt="Background image showing modern architecture"
          className="object-cover w-full h-full"
        /> */}
      </div>
    </motion.div>
  );
}
