import React, { useState } from 'react';
import { Info, X, Github, Twitter, Mail, Globe } from 'lucide-react';

const InfoModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/yourusername",
      label: "GitHub"
    },
    {
      icon: Twitter,
      href: "https://twitter.com/yourusername",
      label: "Twitter"
    },
    {
      icon: Mail,
      href: "mailto:your@email.com",
      label: "Email"
    },
    {
      icon: Globe,
      href: "https://yourwebsite.com",
      label: "Website"
    }
  ];

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            
            {/* Content */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Info className="h-6 w-6 text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Pantau Bencana Indonesia
                </h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Web-app pemetaan bencana real-time yang menampilkan informasi terkini tentang kejadian bencana alam di seluruh Indonesia. Data bersumber dari BNPB dan lembaga terkait.
              </p>

              {/* Social Links */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  Connect With Us
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label={link.label}
                    >
                      <link.icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Copyright */}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>© {new Date().getFullYear()} Pantau Bencana Indonesia.</p>
                <p>All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoModal;