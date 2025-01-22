import { useState } from 'react';
import { DisasterType } from '../types/disaster';
import { 
  AlertTriangle, 
  Droplets, 
  Mountain, 
  Waves, 
  Flame, 
  Sun, 
  Wind, 
  HelpCircle,
  Calendar 
} from 'lucide-react';

interface FilterBarProps {
  onFilterChange: (filters: {
    type: DisasterType | 'all';
    searchQuery: string;
    startDate?: string;
    endDate?: string;
    severity?: string;
  }) => void;
  isDarkMode: boolean;
}

const FilterBar = ({ onFilterChange, isDarkMode }: FilterBarProps) => {
  const [activeType, setActiveType] = useState<DisasterType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [severity, setSeverity] = useState<string>('');
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);

  const handleFilterChange = (updates: Partial<{
    type: DisasterType | 'all';
    searchQuery: string;
    startDate: string;
    endDate: string;
    severity: string;
  }>) => {
    const newFilters = {
      type: updates.type ?? activeType,
      searchQuery: updates.searchQuery ?? searchQuery,
      startDate: updates.startDate ?? startDate,
      endDate: updates.endDate ?? endDate,
      severity: updates.severity ?? severity,
    };
    onFilterChange(newFilters);
  };

  const disasterTypes = [
    { type: 'all' as const, label: 'Semua', icon: null },
    { type: 'earthquake' as const, label: 'Gempa Bumi', icon: AlertTriangle },
    { type: 'flood' as const, label: 'Banjir', icon: Droplets },
    { type: 'tsunami' as const, label: 'Tsunami', icon: Waves },
    { type: 'landslide' as const, label: 'Tanah Longsor', icon: Mountain },
    { type: 'volcano' as const, label: 'Gunung Meletus', icon: Mountain },
    { type: 'fire' as const, label: 'Kebakaran', icon: Flame },
    { type: 'drought' as const, label: 'Kekeringan', icon: Sun },
    { type: 'cyclone' as const, label: 'Siklon', icon: Wind },
    { type: 'other' as const, label: 'Lainnya', icon: HelpCircle },
  ];

  const getButtonClass = (type: DisasterType | 'all') => {
    const isActive = activeType === type;
    return `px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
      isActive 
        ? isDarkMode
          ? 'bg-blue-900 text-blue-100'
          : 'bg-blue-100 text-blue-800'
        : isDarkMode
          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          : 'bg-gray-100 hover:bg-gray-200'
    }`;
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg space-y-4`}>
      <div className="p-4 flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex gap-2 flex-wrap justify-center">
          {disasterTypes.map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              onClick={() => {
                setActiveType(type);
                handleFilterChange({ type });
              }}
              className={getButtonClass(type)}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {label}
            </button>
          ))}
        </div>
        
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Cari lokasi..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleFilterChange({ searchQuery: e.target.value });
            }}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
          />
        </div>
      </div>

      <div className="px-4 pb-4">
        <button
          onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
          className={`flex items-center gap-2 ${
            isDarkMode
              ? 'text-blue-400 hover:text-blue-300'
              : 'text-blue-600 hover:text-blue-800'
          }`}
        >
          <Calendar className="h-4 w-4" />
          {isAdvancedFiltersOpen ? 'Sembunyikan Filter' : 'Filter Lanjutan'}
        </button>

        {isAdvancedFiltersOpen && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1
                  ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    handleFilterChange({ startDate: e.target.value });
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    ${isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1
                  ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Tanggal Akhir
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    handleFilterChange({ endDate: e.target.value });
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    ${isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1
                ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Tingkat Keparahan
              </label>
              <select
                value={severity}
                onChange={(e) => {
                  setSeverity(e.target.value);
                  handleFilterChange({ severity: e.target.value });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  ${isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                  }`}
              >
                <option value="">Semua</option>
                <option value="low">Rendah</option>
                <option value="medium">Sedang</option>
                <option value="high">Tinggi</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;