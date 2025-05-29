import { FaCheckCircle, FaFile, FaWallet } from 'react-icons/fa';
import { FaFileCircleCheck, FaShield, FaUpload } from 'react-icons/fa6';
import Header from '../../components/Header';
import FAQ from '../../components/FAQ';
import { useState } from 'react';
import UploadModal from '../../components/UploadModal';
import { motion } from 'framer-motion';
import VideoBackground from '../../components/VideoBackground';
import FeatureSection from '../../components/FeatureSection';
import { Footer } from '../../components/Footer';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full h-full">
      <VideoBackground />
      <Header />

      {/* hero section */}
      <section className="relative z-10 min-h-screen flex items-center pt-20 pb-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4"
            >
              <span className="editable-text">Terra Registry</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl font-medium text-white mb-4 md:mb-6"
            >
              <span className="editable-text">Land registry as a service</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-white/80 mb-6 md:mb-8"
            >
              <span className="editable-text">
                Securing property rights through blockchain technology —
                transparent, immutable, and accessible.
              </span>
            </motion.p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mt-6 md:mt-8">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center w-full gap-3 sm:w-auto px-4 sm:px-6 py-3 bg-blue-500 text-white text-md font-medium rounded-lg hover:bg-blue-300 transition-colors"
              >
                <FaUpload size={18} color="white" />
                <span>Uplaod Documents</span>
              </motion.button>
              <UploadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />

              <button className="bg-white text-black flex justify-center items-center gap-4 px-10 py-2 rounded-md">
                <FaCheckCircle size={18} color="black" />
                <span>Transfer Ownership</span>
              </button>
              <button className="bg-blue-800 text-white flex justify-center items-center gap-4 px-10 py-2 rounded-md">
                <FaFile size={18} color="white" />
                <span>View Documents</span>
              </button>
            </div>
          </div>
          {/* FAQ div */}
          {/* <div className="w-[60%] mx-auto mt-4 pb-4">
            <FAQ />
          </div> */}
        </div>
      </section>

      {/* footer */}
      <Footer />
    </div>
  );
}
