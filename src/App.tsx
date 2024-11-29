import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { StatsGrid } from './components/StatsGrid';
import { Footer } from './components/Footer';
import { ShareButton } from './components/ShareButton';
import { calculateAge } from './utils/dateCalculations';

export default function App() {
  const [stats, setStats] = useState<ReturnType<typeof calculateAge> | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    if (!isNaN(date.getTime())) {
      setBirthDate(date);
      setStats(calculateAge(date));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 md:py-12 animate-fade-in">
        <Hero onDateChange={handleDateChange} />
        
        {stats && (
          <div className="animate-slide-up" id="stats-container">
            <StatsGrid stats={stats} />
            <div className="mt-8 md:mt-16 text-center max-w-2xl mx-auto space-y-6 md:space-y-8 px-4">
              <p className="text-xl md:text-2xl font-display text-gray-800 leading-relaxed">
                "Eres el resultado de <span className="font-bold text-blue-600">{stats.days.toLocaleString()}</span> días vividos. 
                <br className="hidden md:block" />¿Qué harás con los próximos?"
              </p>
              
              {birthDate && <ShareButton stats={stats} birthDate={birthDate} />}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}