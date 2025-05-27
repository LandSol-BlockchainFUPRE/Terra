import { FaCheckCircle, FaFile } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa6';
import Header from '../../components/Header';

export default function Home() {
  return (
    <div className="w-full h-screen hero-bg">
      <Header />
      <div className="w-[80%] mx-auto glass">
        <div className="mt-[20%] p-2">
          <h1 className="text-4xl font-bold pb-4">
            Land registry as a service
          </h1>
          <p className="text-xl">
            Securing property rights through blockchain technology —
            transparent, immutable, and accessible.
          </p>
        </div>
        <div className="w-[80%] flex gap-4 p-2">
          <button className="bg-blue-800 text-white flex justify-center items-center gap-4 px-10 py-2 rounded-md">
            <FaUpload size={18} color="white" />
            <span>Uplaod Documents</span>
          </button>
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
    </div>
  );
}
