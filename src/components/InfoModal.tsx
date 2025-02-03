import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

const InfoModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setIsModalOpen(true)}
        aria-label="Information"
      >
        <Info className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            
            {/* Content */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Tentang Pantau Bencana Indonesia
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Aplikasi pemetaan bencana real-time yang menampilkan informasi terkini tentang kejadian bencana alam di seluruh Indonesia. Data bersumber dari BNPB dan lembaga terkait.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoModal;