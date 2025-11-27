'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FlightStatus, getFlightData } from '@/lib/api';
import SearchBar from '@/components/SearchBar';
import FlightCard from '@/components/FlightCard';
import { Plane } from 'lucide-react';

import InteractiveBackground from '@/components/InteractiveBackground';

// Dynamically import the map component to avoid SSR issues with Leaflet/Globe
const FlightMap = dynamic(() => import('@/components/FlightMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] rounded-2xl bg-slate-800/50 animate-pulse flex items-center justify-center text-slate-600">
      Loading Flight Map...
    </div>
  ),
});

export default function Home() {
  const [flightData, setFlightData] = useState<FlightStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);


  const handleSearch = async (flightNumber: string) => {
    console.log('🚀 handleSearch called with:', flightNumber);
    setLoading(true);
    setError('');
    setFlightData(null);

    try {
      console.log('⏳ Calling getFlightData...');
      const data = await getFlightData(flightNumber);
      console.log('📦 Received data:', data);

      if (data) {
        console.log('✅ Setting flight data');
        setFlightData(data);
        setLastUpdate(new Date());
      } else {
        console.log('❌ No data received');
        setError('Flight not found. Try "AA123", "BA249", or "LH400".');
      }
    } catch (err) {
      console.error('💥 Error in handleSearch:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching flight data.';
      setError(errorMessage);
    } finally {
      console.log('🏁 Search complete, setting loading to false');
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!flightData) return;

    console.log('🔄 Refreshing flight data...');
    try {
      const data = await getFlightData(flightData.flightNumber);
      if (data) {
        setFlightData(data);
        setLastUpdate(new Date());
        console.log('✅ Flight data refreshed');
      }
    } catch (err) {
      console.error('❌ Error refreshing:', err);
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!flightData) return;

    const interval = setInterval(() => {
      console.log('⏰ Auto-refreshing flight data...');
      handleRefresh();
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [flightData]);

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-100 p-4 md:p-8 relative overflow-hidden">
      <InteractiveBackground />
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
      <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col items-center justify-center mb-12 pt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
              <Plane className="text-white" size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Live Flight Tracker
            </h1>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl text-center">
            Real-time global flight tracking with live maps and accurate status updates.
          </p>
          <p className="text-slate-600 text-xs max-w-2xl text-center mt-2">
            Powered by OpenSky Network & Amadeus APIs for the most accurate real-time data.
          </p>
        </header>

        <div className="mb-12 flex flex-col items-center gap-6">
          <div className="w-full max-w-2xl">
            <SearchBar onSearch={handleSearch} isLoading={loading} />
          </div>


          {error && (
            <div className="text-center text-red-400 bg-red-900/20 py-2 px-4 rounded-lg border border-red-900/50 inline-block mx-auto w-full max-w-md animate-fade-in">
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {flightData && (
          <div className="space-y-8 animate-fade-in">
            <FlightCard flight={flightData} />
            <FlightMap flight={flightData} onRefresh={handleRefresh} />
          </div>
        )}

        {/* Empty State / Features */}
        {!flightData && !loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 opacity-50">
            <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
              <h3 className="font-bold text-xl mb-2 text-slate-200">Live Tracking</h3>
              <p className="text-slate-400">Real-time position updates on a global interactive map.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
              <h3 className="font-bold text-xl mb-2 text-slate-200">Accurate Data</h3>
              <p className="text-slate-400">Precise arrival times, gate info, and delay notifications.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
              <h3 className="font-bold text-xl mb-2 text-slate-200">Global Coverage</h3>
              <p className="text-slate-400">Track flights from any airline across the world.</p>
            </div>
          </div>
        )}

        {/* Branding Footer */}
        <footer className="mt-16 pb-8 text-center relative z-10">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 text-slate-400 hover:text-slate-300 transition-colors group cursor-pointer">
              <img
                src="/devx-logo.png"
                alt="Devx Group LLC Logo"
                className="h-8 w-auto object-contain brightness-90 group-hover:brightness-110 transition-all"
              />
              <div className="text-left">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Powered by</p>
                <p className="font-bold text-slate-300">Devx Group LLC</p>
                <p className="text-xs text-slate-500">Software Solutions</p>
              </div>
            </div>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
            <p className="text-xs text-slate-600">© {new Date().getFullYear()} Devx Group LLC. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
