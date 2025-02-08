// infomodal.tsx
import React, { useState, useRef, useEffect } from "react";
import { Info, X, Github, Mail, Globe, User } from "lucide-react";

const InfoModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      setOrigin({
        x: (x / viewportWidth) * 100,
        y: (y / viewportHeight) * 100,
      });
    }
  };

  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Ryan-infitech",
      label: "GitHub",
    },
    {
      icon: Mail,
      href: "mailto:rianseptiawan@infitech.or.id",
      label: "Email",
    },
    {
      icon: Globe,
      href: "https://riyanseptiawan.github.io/",
      label: "Website",
    },
  ];

  return (
    <>
      <button
        ref={buttonRef}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        onClick={() => {
          updatePosition();
          setIsModalOpen(true);
        }}
        aria-label="Information"
      >
        <Info className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>

      <div className={`fixed inset-0 z-40 flex items-center justify-center p-4 
        ${isModalOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-200
          ${isModalOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsModalOpen(false)}
        />

        <div
          style={{
            transformOrigin: `${origin.x}% ${origin.y}%`,
          }}
          className={`relative w-full max-w-md bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-xl 
            backdrop-blur-md transform transition-all duration-200
            hover:bg-white/95 dark:hover:bg-gray-800/95
            ${isModalOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>

          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <img src="https://raw.githubusercontent.com/Ryan-infitech/Map-Informasi-Bencana/refs/heads/main/src/components/head%20title%20icon.ico" alt="info icon" className="h-6 w-6"/>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
               Map Bencana indonesia
              </h2>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Web-app pemetaan bencana real-time yang menampilkan informasi
              terkini tentang kejadian bencana alam di seluruh Indonesia. Data
              bersumber dari BNPB dan lembaga terkait.
            </p>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                  <img
                    src="https://github.com/Ryan-infitech/Map-Informasi-Bencana/blob/main/readmemedia/rian%20septiawan.jpg?raw=true"
                    alt="Rian Septiawan"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Rian Septiawan
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Connect
                  </p>
                </div>
              </div>
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

            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>© {new Date().getFullYear()} Map Bencana indonesia.</p>
              <p>All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoModal;