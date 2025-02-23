// DisasterDetails.tsx
import { Dialog } from '@headlessui/react';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { Disaster } from '../types/disaster';

interface DisasterDetailsProps {
  disaster: Disaster | null;
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const DisasterDetails = ({ disaster, isOpen, onClose, isDarkMode }: DisasterDetailsProps) => {
  if (!disaster) return null;

  const impactData = [
    { icon: '💔', label: 'Korban Jiwa', value: disaster.affected.casualties, color: 'bg-red-500' },
    { icon: '🏃', label: 'Pengungsi', value: disaster.affected.displaced, color: 'bg-blue-500' },
    { icon: '🤕', label: 'Luka-luka', value: disaster.affected.injured, color: 'bg-yellow-500' },
    { icon: '🏛️', label: 'Fasum Rusak', value: disaster.affected.publicFacilitiesDamaged, color: 'bg-purple-500' },
    { icon: '❓', label: 'Hilang', value: disaster.affected.missing, color: 'bg-gray-500' },
    { icon: '🏚️', label: 'Rumah Rusak', value: disaster.affected.housesDamaged, color: 'bg-orange-500' },
    { icon: '🌊', label: 'Rumah Terendam', value: disaster.affected.housesFlooded, color: 'bg-cyan-500' }
  ];

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-30">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`mx-auto max-w-md rounded-lg ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } p-4`}>
          <div className="flex justify-between items-center mb-3">
            <Dialog.Title className="text-lg font-bold">
              {disaster.type.charAt(0).toUpperCase() + disaster.type.slice(1)} di {disaster.location.name}
            </Dialog.Title>
            <button onClick={onClose} className="p-1">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-400">Tanggal Kejadian:</p>
              <p className="text-sm">{format(new Date(disaster.date), 'dd MMMM yyyy')}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-400">Deskripsi:</p>
              <p className="text-sm">{disaster.description}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-400">Tingkat Keparahan:</p>
              <span className={`inline-block px-2 py-0.5 text-sm rounded ${
                disaster.severity === 'high' ? 'bg-red-300 text-red-800' :
                disaster.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                'bg-green-100 text-green-800'
              } ${isDarkMode ? 'bg-opacity-90' : ''}`}>
                {disaster.severity === 'high' ? 'Tinggi' :
                 disaster.severity === 'medium' ? 'Sedang' : 'Rendah'}
              </span>
            </div>
            
            <div>
              <p className="text-sm text-gray-400 mb-2">Dampak:</p>
              <div className="grid grid-cols-2 gap-2">
                {impactData.map((impact) => (
                  <div key={impact.label} className={`flex items-center gap-2 p-2 rounded-lg bg-gray-700/50`}>
                    <div className={`w-6 h-6 flex items-center justify-center rounded-full ${impact.color}`}>
                      <span className="text-sm">{impact.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-300">{impact.label}</p>
                      <p className="text-sm font-semibold">{impact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DisasterDetails;