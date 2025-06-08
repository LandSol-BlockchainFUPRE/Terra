/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaFileCircleCheck, FaShield } from 'react-icons/fa6';
import { FaMapPin } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const featureVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const landing = () => {
    const router = useRouter();

  return (
    <section className="relative min-h-screen hero-bg flex flex-col">
        {/* Hero */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center w-full max-w-7xl mx-auto px-6 py-12 lg:py-32 gap-8 lg:gap-12">
            {/* Left (Text) */}
            <motion.div
            className="flex-1"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            >

            <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-slate-800"
            >
                Secure Land Registry <br className="hidden md:block"/>
                <span className="text-emerald-700 dark:text-emerald-400">
                on the Blockchain
                </span>
            </motion.h1>

            <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-black mb-8 max-w-lg"
            >
                Revolutionizing property ownership with transparent, secure, and
                immutable records. Join the future of land management.
            </motion.p>

            <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
            >
                <motion.button
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    onClick={() => router.push('/auth/login/')}
                    className="px-[70px] py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-700 transition-colors"
                >
                    <span className="editable-text">Login</span>
                </motion.button>

                <motion.button
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    onClick={() => router.push('/auth/signup/')}
                    className="px-[70px] py-2 rounded-lg bg-white text-black font-medium hover:bg-blue-700 transition-colors"
                    >
                    <span className="editable-text">Sign Up</span>
                </motion.button>
            </motion.div>
            </motion.div>

            {/* Right (Image) */}
            <motion.div
            className="flex-1 w-full max-w-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            >
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Modern property with secure blockchain registry"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 to-transparent" />
            </div>
            </motion.div>
        </div>

        {/* Features */}
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.9 },
            },
            }}
            className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm py-12 w-full mt-auto"
        >
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                {
                icon: <FaShield size={24} color='white' />,
                title: "Secure Ownership",
                text: "Immutable blockchain records ensure your property rights are protected.",
                },
                {
                icon: <FaMapPin size={24} color='white'/>,
                title: "Digital Mapping",
                text: "Precise geo-coordinates and boundaries recorded permanently.",
                },
                {
                icon: <FaFileCircleCheck size={24} color='white'/>,
                title: "Simple Verification",
                text: "Instant property history and ownership verification.",
                },
            ].map((feature, index) => (
                <motion.div
                key={index}
                variants={featureVariants}
                className="flex flex-col items-center text-center p-4"
                >
                <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                    {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">
                    {feature.title}
                </h3>
                <p className="text-white">
                    {feature.text}
                </p>
                </motion.div>
            ))}
            </div>
        </motion.div>
    </section>
  )
}

export default landing