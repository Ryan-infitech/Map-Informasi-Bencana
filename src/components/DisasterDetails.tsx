import { Dialog } from "@headlessui/react";
import { format } from "date-fns";
import { X } from "lucide-react";
import { Disaster } from "../types/disaster";

interface DisasterDetailsProps {
  disaster: Disaster | null;
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const DisasterDetails = ({
  disaster,
  isOpen,
  onClose,
  isDarkMode,
}: DisasterDetailsProps) => {
  if (!disaster) return null;

  // Data dampak bencana relevantFor
  const impactData = [
    {
      icon: "💔",
      label: "Korban Jiwa",
      value: disaster.affected.casualties,
      color: isDarkMode ? "bg-gray-700" : "bg-gray-100",
      relevantFor: ["all"] 
    },
    {
      icon: "🏃",
      label: "Pengungsi",
      value: disaster.affected.displaced,
      color: isDarkMode ? "bg-blue-900/50" : "bg-blue-100",
      relevantFor: ["all"] 
    },
    {
      icon: "🤕",
      label: "Luka-luka",
      value: disaster.affected.injured,
      color: isDarkMode ? "bg-yellow-900/50" : "bg-yellow-100",
      relevantFor: ["all"] 
    },
    {
      icon: "🏛️",
      label: "Fasum Rusak",
      value: disaster.affected.publicFacilitiesDamaged,
      color: isDarkMode ? "bg-purple-900/50" : "bg-purple-100",
      relevantFor: ["all"] 
    },
    {
      icon: "❓",
      label: "Hilang",
      value: disaster.affected.missing,
      color: isDarkMode ? "bg-gray-700" : "bg-gray-100",
      relevantFor: ["all"] 
    },
    {
      icon: "🏚️",
      label: "Rumah Rusak",
      value: disaster.affected.housesDamaged,
      color: isDarkMode ? "bg-orange-900/50" : "bg-orange-100",
      relevantFor: ["all"] 
    },
    {
      icon: "🌊",
      label: "Rumah Terendam",
      value: disaster.affected.housesFlooded,
      color: isDarkMode ? "bg-cyan-900/50" : "bg-cyan-100",
      relevantFor: ["banjir", "tsunami", "gelombang pasang", "abrasi"] 
    },
  ];

  // Filter impact berdasarkan jenis bencana
  const filteredImpactData = impactData.filter(impact => 
    impact.relevantFor.includes("all") || impact.relevantFor.includes(disaster.type)
  );

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-30">
      <div
        className={`fixed inset-0 ${
          isDarkMode ? "bg-black/50" : "bg-black/30"
        }`}
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          className={`mx-auto max-w-md rounded-lg shadow-xl ${
            isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
          } p-4`}
        >
          <div className="flex justify-between items-center mb-3">
            <Dialog.Title
              className={`text-lg font-bold ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              {disaster.type.charAt(0).toUpperCase() + disaster.type.slice(1)}{" "}
              di {disaster.location.name} ({disaster.province})
            </Dialog.Title>
            <button
              onClick={onClose}
              className={`p-1 rounded hover:${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <X
                className={`h-5 w-5 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Tanggal Kejadian:
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {format(new Date(disaster.date), "dd MMMM yyyy")}
              </p>
            </div>

            <div>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Deskripsi:
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {disaster.description}
              </p>
            </div>

            <div>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Tingkat Keparahan:
              </p>
              <span
                className={`inline-block px-2 py-0.5 text-sm rounded ${
                  disaster.severity === "high"
                    ? isDarkMode
                      ? "bg-red-900/50 text-red-100"
                      : "bg-red-100 text-red-800"
                    : disaster.severity === "medium"
                    ? isDarkMode
                      ? "bg-yellow-900/50 text-yellow-100"
                      : "bg-yellow-100 text-yellow-800"
                    : isDarkMode
                    ? "bg-green-900/50 text-green-100"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {disaster.severity === "high"
                  ? "Tinggi"
                  : disaster.severity === "medium"
                  ? "Sedang"
                  : "Rendah"}
              </span>
            </div>

            <div>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                } mb-2`}
              >
                Dampak:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {filteredImpactData.map((impact) => (
                  <div
                    key={impact.label}
                    className={`flex items-center gap-2 p-2 rounded-lg ${
                      isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 flex items-center justify-center rounded-full ${impact.color}`}
                    >
                      <span className="text-sm">{impact.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {impact.label}
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          isDarkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        {impact.value}
                      </p>
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