//App.tsx
import React, { useState, useEffect } from "react";
import Map from "./components/Map";
import DisasterDetails from "./components/DisasterDetails";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import { Disaster, DisasterType } from "./types/disaster";
import { AlertOctagon, Moon, Sun } from "lucide-react";
import { fetchDisasters } from "./services/api";

function App() {
  const [selectedDisaster, setSelectedDisaster] = useState<Disaster | null>(
    null
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [disasters, setDisasters] = useState<Disaster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const loadDisasters = async (filters?: {
    type?: DisasterType | "all";
    searchQuery?: string;
    startDate?: string;
    endDate?: string;
    severity?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchDisasters(filters);
      setDisasters(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch disasters"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDisasters();
  }, []);

  const handleMarkerClick = (disaster: Disaster) => {
    setSelectedDisaster(disaster);
    setIsDetailsOpen(true);
  };

  const handleFilterChange = ({
    type,
    searchQuery,
    startDate,
    endDate,
    severity,
  }: {
    type: DisasterType | "all";
    searchQuery: string;
    startDate?: string;
    endDate?: string;
    severity?: string;
  }) => {
    loadDisasters({
      type: type === "all" ? undefined : type,
      searchQuery,
      startDate,
      endDate,
      severity,
    });
  };

  return (
    <ErrorBoundary>
      {/* Add bg-white dark:bg-gray-900 to the root div for full dark mode coverage */}
      <div
        className={`flex flex-col h-screen bg-white dark:bg-gray-900 ${
          isDarkMode ? "dark" : ""
        }`}
      >
        <header className="bg-white dark:bg-gray-800 shadow-md p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertOctagon className="h-8 w-8 text-red-600 dark:text-red-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Pantau Bencana Indonesia
              </h1>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </header>

        {/* Add dark:bg-gray-900 to the container div */}
        <div className="container mx-auto p-4 flex-1 flex flex-col gap-4 bg-white dark:bg-gray-900">
          {/* Update the map container's background */}
          <div className="flex-1 relative bg-white dark:bg-gray-900">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="h-full flex items-center justify-center bg-white dark:bg-gray-900">
                <div className="bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100 p-4 rounded-lg max-w-md text-center">
                  <AlertOctagon className="h-8 w-8 mx-auto mb-2" />
                  <p>{error}</p>
                  <button
                    onClick={() => loadDisasters()}
                    className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 rounded-lg transition-colors"
                  >
                    Coba Lagi
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full rounded-lg overflow-hidden bg-white dark:bg-gray-900">
                <Map
                  disasters={disasters}
                  onMarkerClick={handleMarkerClick}
                  isDarkMode={isDarkMode}
                />
              </div>
            )}
          </div>

          <DisasterDetails
            disaster={selectedDisaster}
            isOpen={isDetailsOpen}
            onClose={() => setIsDetailsOpen(false)}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
