'use client';
import { useEffect, useState, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

type FeatureSectionProps = {
  title: string;
  description: string;
  icon: ReactNode;
  imageUrl?: string;
  reversed?: boolean;
  delay?: number;
};

export default function FeatureSection({
  title,
  description,
  icon,
  imageUrl,
  reversed = false,
  delay = 0
}: FeatureSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: delay
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  // For SSR and first render, use a non-animated version
  if (!mounted) {
    return (
      <div
        className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 py-16`}
        ref={ref}
      >
        <div className="flex-1">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full mr-4">
              {icon}
            </div>
            <h3 className="text-3xl font-bold text-white">{title}</h3>
          </div>
          <p className="text-xl text-white/80 mt-4">{description}</p>
        </div>

        <div className="flex-1">
          {imageUrl ? (
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
              <img src={imageUrl} alt={title} className="w-full h-auto object-cover"/>
            </div>
          ) : (
            <div className="bg-black/30 rounded-xl p-8 h-64 flex items-center justify-center">
              <div className="text-4xl text-white/50">
                <span className="editable-text">Feature Visual</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 py-16`}
    >
      <motion.div variants={itemVariants} className="flex-1">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full mr-4">
            {icon}
          </div>
          <h3 className="text-3xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-xl text-white/80 mt-4">{description}</p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex-1">
        {imageUrl ? (
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
            <img src={imageUrl} alt={title} className="w-full h-auto object-cover" />
          </div>
        ) : (
          <div className="bg-black/30 rounded-xl p-8 h-64 flex items-center justify-center">
            <div className="text-4xl text-white/50">
              <span className="editable-text">Feature Visual</span>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
