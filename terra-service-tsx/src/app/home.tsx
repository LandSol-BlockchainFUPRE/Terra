import { FaCheckCircle, FaFile, FaWallet } from 'react-icons/fa';
import { FaFileCircleCheck, FaShield, FaUpload } from 'react-icons/fa6';
import Header from '../../components/Header';
// import FAQ from '../../components/FAQ';
import { useState } from 'react';
import UploadModal from '../../components/UploadModal';
import { motion } from 'framer-motion';
import VideoBackground from '../../components/VideoBackground';
import FeatureSection from '../../components/FeatureSection';
import { Footer } from '../../components/Footer';
import CTASection from '../../components/CATSection';

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full h-full">
     <VideoBackground/> 
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
              Securing property rights through blockchain technology — transparent, immutable, and accessible.
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
            <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <button className="bg-white text-black flex justify-center items-center gap-4 px-10 py-2 rounded-md">
              <FaCheckCircle size={18} color="black" />
              <span>Transfer Ownership</span>
            </button>
            <button className="bg-blue-800 text-white flex justify-center items-center gap-4 px-10 py-2 rounded-md">
              <FaFile size={18} color="white" />
              <span>View Documents</span>
            </button>

            {/* <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              onClick={handleTransfer}
              disabled={isLoading}
              className="flex items-center justify-center w-full sm:w-auto px-4 sm:px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors"
            >
              {isLoading ? (
                <Loader2 size={18} className="mr-2 animate-spin" />
              ) : (
                <Send size={18} className="mr-2" />
              )}
              {isLoading ? "Processing..." : "Transfer Ownership"}
            </motion.button> */}

          {/* <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center justify-center w-full sm:w-auto px-4 sm:px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/80 transition-colors"
          >
            <FileText size={18} className="mr-2" />
            <span className="editable-text">View Documents</span>
          </motion.button> */}
      </div>
    </div>
  </div>
      </section>


      {/* feature section */}
      <section className="relative z-10 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold text-white text-center mb-16"
        >
          <span className="editable-text">
            Why Choose Terra Registry
          </span>
        </motion.h2>

        <FeatureSection
          title="Secure Document Verification"
          description="Our blockchain-based verification system ensures that your property documents are tamper-proof and securely stored. Each document is cryptographically sealed and can be verified at any time."
          icon={<FaShield className="h-6 w-6" color='white'/>}
          imageUrl="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
        />

        <FeatureSection
          title="Instant Ownership Transfer"
          description="Transfer property ownership in minutes, not months. Our smart contract system automates the verification process and creates an immutable record of ownership transfer on the blockchain."
          icon={<FaWallet className="h-6 w-6" color='white'/>}
          imageUrl="https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
          reversed={true}
          delay={0.2}
        />

        <FeatureSection
          title="Comprehensive Document Management"
          description="Store, organize, and access all your property documents in one secure location. Our platform supports multiple document formats and provides easy search and retrieval functionality."
          icon={<FaFileCircleCheck className="h-6 w-6" color='white' />}
          imageUrl="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          delay={0.4}
        />
      </div>
    </section>

    {/* Call to action section */}
    <CTASection/>

    {/* footer */}
    <Footer/>

    </div>
  );
}
