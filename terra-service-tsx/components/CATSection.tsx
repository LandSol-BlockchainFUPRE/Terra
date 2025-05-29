'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import FAQ from './FAQ';
// import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-24 px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-primary/10 z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white mb-6"
        >
          <span className="editable-text">
            Ready to Secure Your Property Rights?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-white/80 mb-10"
        >
          <span className="editable-text">
            Join thousands of property owners who trust Terra Registry for secure, transparent, and efficient land registry services.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center">
            <span className="editable-text">Get Started</span>
            <FaArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button className="px-8 py-4 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
            <span className="editable-text">Schedule a Demo</span>
          </button>
        </motion.div>

        {/* the FAQ */}
        <div className='mt-10'>
            <FAQ/>
        </div>
      </div>
    </motion.div>
  );
}
