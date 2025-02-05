import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { renderToString } from 'react-dom/server';
import { AlertTriangle, AudioWaveform,Pickaxe,ThermometerSun, Droplets,Mountain, MountainSnow, Waves, Flame, Wind, CloudLightning, Brush, HelpCircle, FlameKindling } from 'lucide-react';
import type { Disaster } from '../types/disaster';

// Fix Leaflet's default icon imports
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

L.Marker.prototype.options.icon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Helper functions remain the same
const getDisasterIcon = (type: string) => {
  const iconMap: { [key: string]: any } = {
    'gempa bumi': AlertTriangle,
    'banjir': Waves,
    'tanah longsor': Mountain,
    'cuaca ekstrem': CloudLightning,
    'kebakaran': FlameKindling,
    'tsunami': AudioWaveform,
    'gunung meletus': MountainSnow,
    'kekeringan': ThermometerSun,
    'angin topan': Wind,
  };
  return iconMap[type] || HelpCircle;
};

const getDisasterColor = (type: string) => {
  const colorMap: { [key: string]: string } = {
  'gempa bumi': 'text-red-500',
  'banjir': 'text-blue-500',
  'tanah longsor': 'text-gray-500',
  'cuaca ekstrem': 'text-yellow-500',
  'kebakaran': 'text-red-600',
  'tsunami': 'text-blue-700',
  'gunung meletus': 'text-orange-600',
  'kekeringan': 'text-yellow-600',
  'angin topan': 'text-cyan-600',
  };
  return colorMap[type] || 'text-gray-500';
};

interface FilterButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ icon, label, active, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="relative mb-1.5">
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative flex items-center justify-center
          w-8 h-8 md:w-10 md:h-10 rounded-full
          transition-all duration-300 transform
          ${active 
            ? 'bg-indigo-600 dark:bg-indigo-500 text-white scale-105 shadow-lg' 
            : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          }
          backdrop-blur-sm
        `}
        aria-label={label}
      >
        {React.cloneElement(icon as React.ReactElement, { 
          size: typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 18 
        })}
      </button>
      
      {isHovered && (
        <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2
                      whitespace-nowrap px-2 py-1
                      bg-white dark:bg-gray-800
                      text-xs md:text-sm font-medium 
                      text-gray-800 dark:text-gray-200
                      rounded-md shadow-lg
                      z-[10]">
          {label}
          <div className="absolute top-1/2 -translate-y-1/2 right-[-8px]
                        w-2 h-2 
                        bg-white dark:bg-gray-800 
                        rotate-45" />
        </div>
      )}
    </div>
  );
};

const getSeverityStyles = (severity: 'low' | 'medium' | 'high', isDarkMode: boolean) => {
  const styles = {
    low: {
      background: isDarkMode ? 'bg-gray-800' : 'bg-white',
      border: isDarkMode ? 'border-yellow-300' : 'border-yellow-300',
      shadow: 'shadow-yellow-300/60'
    },
    medium: {
      background: isDarkMode ? 'bg-gray-800' : 'bg-white',
      border: isDarkMode ? 'border-orange-300' : 'border-orange-300',
      shadow: 'shadow-orange-400'
    },
    high: {
      background: isDarkMode ? 'bg-orange-400' : 'bg-orange-200',
      border: isDarkMode ? 'border-red-400' : 'border-red-400',
      shadow: 'shadow-red-600'
    }
  };
  return styles[severity];
};

const createCustomIcon = (IconComponent: any, color: string, severity: 'low' | 'medium' | 'high', isDarkMode: boolean) => {
  const styles = getSeverityStyles(severity, isDarkMode);
  const borderWidth = severity === 'high' ? 'border-3' : severity === 'medium' ? 'border-2' : 'border';
  
  const html = renderToString(
    <div className={`
      flex items-center justify-center w-8 h-8 rounded-full 
      ${styles.background} ${borderWidth} ${styles.border} 
      shadow-lg ${styles.shadow} transition-transform duration-200 hover:scale-110
    `}>
      <IconComponent className={`w-5 h-5 ${color}`} />
    </div>
  );

  return divIcon({
    html,
    className: `disaster-marker-${severity}`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

const DisasterMap: React.FC<{
  disasters: Disaster[];
  onMarkerClick: (disaster: Disaster) => void;
  isDarkMode: boolean;
}> = ({ disasters, onMarkerClick, isDarkMode }) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filters = [
    { id: 'gempa bumi', label: 'Gempa Bumi', icon: <AlertTriangle /> },
    { id: 'banjir', label: 'Banjir', icon: <Waves /> },
    { id: 'tanah longsor', label: 'Tanah Longsor', icon: <Mountain className="rotate-180"/> },
    { id: 'cuaca ekstrem', label: 'Cuaca Ekstrem', icon: <CloudLightning /> },
    { id: 'kebakaran', label: 'Kebakaran', icon: <FlameKindling /> },
    { id: 'tsunami', label: 'Tsunami', icon: <AudioWaveform /> },
    { id: 'gunung meletus', label: 'Gunung Meletus', icon: <MountainSnow /> },
    { id: 'kekeringan', label: 'Kekeringan', icon: <ThermometerSun /> },
    { id: 'angin topan', label: 'Angin Topan', icon: <Wind /> },
  ];

  const filteredDisasters = disasters.filter(disaster => 
    activeFilters.length === 0 || activeFilters.includes(disaster.type)
  );

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[-2.5489, 118.0149]}
        zoom={5}
        className={`w-full h-full rounded-lg ${isDarkMode ? 'dark-map' : ''}`}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={isDarkMode 
            ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          }
          className={isDarkMode ? 'brightness-100 contrast-100' : ''}
        />
        
        {filteredDisasters.map((disaster) => (
          <Marker
            key={disaster.id}
            position={[disaster.location.lat, disaster.location.lng]}
            icon={createCustomIcon(
              getDisasterIcon(disaster.type),
              getDisasterColor(disaster.type),
              disaster.severity,
              isDarkMode
            )}
            eventHandlers={{ click: () => onMarkerClick(disaster) }}
          >
            <Popup className={`${isDarkMode ? 'dark-popup' : ''} !w-auto min-w-[200px] max-w-[300px]`}>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-1 dark:text-white">{disaster.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{disaster.description}</p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Lokasi: {disaster.location.name}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Vertical filter controls */}
      <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-[10]">
        <div className="flex flex-col gap-1.5 p-2 md:p-3 
                      rounded-full 
                      bg-white/90 dark:bg-gray-800/90 
                      backdrop-blur-sm 
                      shadow-lg dark:shadow-gray-900/50">
          {filters.map(filter => (
            <FilterButton
              key={filter.id}
              icon={filter.icon}
              label={filter.label}
              active={activeFilters.includes(filter.id)}
              onClick={() => {
                setActiveFilters(prev => 
                  prev.includes(filter.id)
                    ? prev.filter(id => id !== filter.id)
                    : [...prev, filter.id]
                );
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisasterMap;