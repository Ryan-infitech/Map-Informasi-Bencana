//Disasterdetail.tsx
import { Dialog } from '@headlessui/react';
import { format } from 'date-fns';
import { Disaster } from '../types/disaster';
import { X } from 'lucide-react';

interface DisasterDetailsProps {
  disaster: Disaster | null;
  isOpen: boolean;
  onClose: () => void;
}

const DisasterDetails = ({ disaster, isOpen, onClose }: DisasterDetailsProps) => {
  if (!disaster) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`mx-auto max-w-lg rounded p-6 ${
          document.documentElement.classList.contains('dark')
            ? 'bg-gray-800 text-white'
            : 'bg-white text-gray-900'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold">
              {disaster.type.charAt(0).toUpperCase() + disaster.type.slice(1)} di {disaster.location.name}
            </Dialog.Title>
            <button onClick={onClose} className="p-1">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className={`text-gray-${document.documentElement.classList.contains('dark') ? '400' : '600'}`}>Tanggal Kejadian:</p>
              <p className="font-medium">{format(new Date(disaster.date), 'dd MMMM yyyy')}</p>
            </div>
            
            <div>
              <p className={`text-gray-${document.documentElement.classList.contains('dark') ? '400' : '600'}`}>Deskripsi:</p>
              <p className={document.documentElement.classList.contains('dark') ? 'text-white' : 'text-gray-900'}>{disaster.description}</p>
            </div>
            
            <div>
              <p className={`text-gray-${document.documentElement.classList.contains('dark') ? '400' : '600'}`}>Tingkat Keparahan:</p>
              <span className={`inline-block px-2 py-1 rounded ${
                disaster.severity === 'high' ? 'bg-red-300 text-red-800' :
                disaster.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                'bg-green-100 text-green-800'
              } ${document.documentElement.classList.contains('dark') ? 'bg-opacity- text-opacity-100' : ''}`}>
                {disaster.severity === 'high' ? 'Tinggi' :
                 disaster.severity === 'medium' ? 'Sedang' : 'Rendah'}
              </span>
            </div>
            
            <div>
              <p className={`text-gray-${document.documentElement.classList.contains('dark') ? '400' : '600'}`}>Dampak:</p>
              <ul className="list-disc list-inside space-y-1">
                <li className={document.documentElement.classList.contains('dark') ? 'text-white' : 'text-gray-900'}>Korban jiwa: {disaster.affected.casualties}</li>
                <li className={document.documentElement.classList.contains('dark') ? 'text-white' : 'text-gray-900'}>Pengungsi: {disaster.affected.displaced}</li>
                <li className={document.documentElement.classList.contains('dark') ? 'text-white' : 'text-gray-900'}>Luka-luka: {disaster.affected.injured}</li>
              </ul>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DisasterDetails;