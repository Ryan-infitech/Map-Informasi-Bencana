//Disasterfilter.tsx
import React, { useState } from "react";
import {
  AlertTriangle,
  AudioWaveform,
  Pickaxe,
  ThermometerSun,
  Droplets,
  Mountain,
  MountainSnow,
  Waves,
  Flame,
  Wind,
  CloudLightning,
  Brush,
  HelpCircle,
  FlameKindling,
} from "lucide-react";

const FilterButton = ({ icon, label, active, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative mb-2 last:mb-0">
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative flex items-center justify-center
          w-12 h-12 rounded-full
          transition-all duration-300 transform
          ${
            active
              ? "bg-indigo-600 text-white scale-110"
              : "bg-white text-gray-700 hover:bg-indigo-50"
          }
          shadow-lg hover:shadow-xl
        `}
        aria-label={label}
      >
        {icon}
      </button>

      {/* Hover tooltip - positioned to the left */}
      <div
        className={`
          absolute top-1/2 -translate-y-1/2 right-full mr-3
          whitespace-nowrap px-3 py-1.5
          rounded-lg text-sm font-medium
          transition-all duration-300
          ${
            isHovered
              ? "opacity-100 visible"
              : "opacity-0 invisible translate-x-2"
          }
          bg-white text-gray-800 shadow-lg
        `}
      >
        {label}
        {/* Triangle pointer - positioned on the right */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-white rotate-45" />
      </div>
    </div>
  );
};

const DisasterFilters = () => {
  const [activeFilters, setActiveFilters] = useState([]);

  const toggleFilter = (filterId) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const filters = [
    { id: "gempa-bumi", label: "Gempa Bumi", icon: <AlertTriangle /> },
    { id: "banjir", label: "Banjir", icon: <Waves /> },
    {
      id: "tanah longsor",
      label: "Tanah Longsor",
      icon: <Mountain className="rotate-180" />,
    },
    { id: "cuaca-ekstrem", label: "Cuaca Ekstrem", icon: <CloudLightning /> },
    { id: "kebakaran hutan dan lahan", label: "kebakaran hutan dan lahan", icon: <FlameKindling /> },
    { id: "tsunami", label: "Tsunami", icon: <AudioWaveform /> },
    { id: "gunung-meletus", label: "Gunung Meletus", icon: <MountainSnow /> },
    { id: "kekeringan", label: "Kekeringan", icon: <ThermometerSun /> },
    { id: "gelombang-pasang-dan-abrasi", label: "GELOMBANG PASANG DAN ABRASI", icon: <Wind /> },
  ];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-20">
      <div className="flex flex-col p-3 rounded-3xl bg-white/90 backdrop-blur-sm shadow-xl">
        {filters.map((filter) => (
          <FilterButton
            key={filter.id}
            icon={filter.icon}
            label={filter.label}
            active={activeFilters.includes(filter.id)}
            onClick={() => toggleFilter(filter.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DisasterFilters;
