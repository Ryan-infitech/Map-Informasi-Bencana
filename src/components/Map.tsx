import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Disaster } from '../types/disaster';
import { AlertTriangle, Droplets, Mountain, Waves, Flame, Wind, CloudRain, Brush, HelpCircle } from 'lucide-react';
import { renderToString } from 'react-dom/server';

// Fix Leaflet's default icon
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Set up default icon
L.Marker.prototype.options.icon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapProps {
  disasters: Disaster[];
  onMarkerClick: (disaster: Disaster) => void;
  isDarkMode: boolean;
}

const getSeverityStyles = (severity: 'low' | 'medium' | 'high', isDarkMode: boolean) => {
  const styles = {
    low: {
      background: isDarkMode ? 'bg-gray-800' : 'bg-white',
      border: isDarkMode ? 'border-yellow-500' : 'border-yellow-400',
      shadow: 'shadow-yellow-500/20'
    },
    medium: {
      background: isDarkMode ? 'bg-gray-800' : 'bg-white',
      border: isDarkMode ? 'border-orange-500' : 'border-orange-400',
      shadow: 'shadow-orange-500/20'
    },
    high: {
      background: isDarkMode ? 'bg-gray-800' : 'bg-white',
      border: isDarkMode ? 'border-red-500' : 'border-red-400',
      shadow: 'shadow-red-500/20'
    }
  };

  return styles[severity];
};

const createCustomIcon = (IconComponent: any, color: string, severity: 'low' | 'medium' | 'high', isDarkMode: boolean) => {
  const styles = getSeverityStyles(severity, isDarkMode);
  const borderWidth = severity === 'high' ? 'border-3' : severity === 'medium' ? 'border-2' : 'border';
  
  const html = renderToString(
    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${styles.background} ${borderWidth} ${styles.border} shadow-lg ${styles.shadow}`}>
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

const getDisasterIcon = (type: string, severity: 'low' | 'medium' | 'high', isDarkMode: boolean) => {
  const normalizedType = type.toLowerCase();
  
  const iconMapping: Record<string, { icon: any; color: string }> = {
    'gempa bumi': { icon: AlertTriangle, color: 'text-red-500' },
    'banjir': { icon: Droplets, color: 'text-blue-500' },
    'tsunami': { icon: Waves, color: 'text-blue-700' },
    'tanah longsor': { icon: Mountain, color: 'text-yellow-700' },
    'gunung meletus': { icon: Flame, color: 'text-red-600' },
    'kebakaran': { icon: Flame, color: 'text-orange-500' },
    'kekeringan': { icon: CloudRain, color: 'text-yellow-500' },
    'angin puting beliung': { icon: Wind, color: 'text-cyan-500' },
    'wabah penyakit': { icon: Brush, color: 'text-purple-500' },
    'other': { icon: HelpCircle, color: 'text-gray-500' }
  };

  const iconConfig = iconMapping[normalizedType] || iconMapping['other'];
  return createCustomIcon(iconConfig.icon, iconConfig.color, severity, isDarkMode);
};

const Map = ({ disasters, onMarkerClick, isDarkMode }: MapProps) => {
  return (
    <MapContainer
      center={[-2.5489, 118.0149]}
      zoom={5}
      className={`w-full h-full rounded-lg ${isDarkMode ? 'dark-map' : ''}`}
      zoomControl={false} // We'll add zoom controls in a better position
    >
      {/* Add zoom control in top-right corner */}
      <div className="absolute top-4 right-4 z-[1000]">
        <div className="leaflet-control leaflet-bar">
          {/* Custom zoom controls if needed */}
        </div>
      </div>

      // Update the TileLayer configuration in the Map component:
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={isDarkMode 
          ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
          : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        }
        className={isDarkMode ? 'brightness-100 contrast-100' : ''}
      />

      {disasters.map((disaster) => {
        if (!disaster.location.lat || !disaster.location.lng || 
            isNaN(disaster.location.lat) || isNaN(disaster.location.lng)) {
          return null;
        }

        return (
          <Marker
            key={disaster.id}
            position={[disaster.location.lat, disaster.location.lng]}
            icon={getDisasterIcon(disaster.type, disaster.severity, isDarkMode)}
            eventHandlers={{
              click: () => onMarkerClick(disaster),
            }}
          >
            <Popup className={isDarkMode ? 'dark-popup' : ''}>
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}>
                <h3 className="font-bold text-base mb-1">{disaster.location.name}</h3>
                <p className="capitalize text-sm mb-1">{disaster.type}</p>
                <div className={`text-xs px-2 py-1 rounded-full inline-block
                  ${disaster.severity === 'high' ? 'bg-red-500/10 text-red-400' :
                  disaster.severity === 'medium' ? 'bg-orange-500/10 text-orange-400' :
                  'bg-yellow-500/10 text-yellow-400'}`
                }>
                  {disaster.severity.charAt(0).toUpperCase() + disaster.severity.slice(1)} Severity
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

const mapStyles = `
  .dark-map {
    filter: brightness(0.9) contrast(1.1);
  }
  
  .dark-map .leaflet-popup-content-wrapper {
    background-color: #1f2937;
    color: #f3f4f6;
  }
  
  .dark-map .leaflet-popup-tip {
    background-color: #1f2937;
  }
  
  .disaster-marker > div {
    transition: transform 0.2s;
  }
  
  .disaster-marker > div:hover {
    transform: scale(1.1);
  }
`;

export default Map;