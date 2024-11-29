import React, { useState } from 'react';
import { DateInput } from './DateInput';
import { Clock, Sparkles } from 'lucide-react';

interface HeroProps {
  onDateChange: (date: Date) => void;
}

export function Hero({ onDateChange }: HeroProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  const formatBirthMessage = (date: Date) => {
    const weekdays = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    const weekday = weekdays[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return (
      <div className="mb-8 md:mb-16 animate-fade-in">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
          <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900">Tu historia comenzó...</h2>
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
        </div>
        <p className="text-2xl md:text-4xl font-display font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent px-4">
          Un {weekday}, {day} de {month} de {year}
        </p>
      </div>
    );
  };

  return (
    <div className="text-center mb-8 md:mb-16">
      <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-full mb-6">
        <Clock className="w-7 h-7 md:w-8 md:h-8 text-white" />
      </div>
      <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-4 md:mb-6 tracking-tight px-4">
        Cuenta tu historia
      </h1>
      <p className="text-lg md:text-2xl text-gray-600 mb-8 md:mb-12 font-display max-w-2xl mx-auto leading-relaxed px-4">
        Descubre los números que han dado forma a tu viaje por la vida
      </p>
      
      <div className="max-w-md mx-auto px-4">
        <DateInput onDateChange={handleDateChange} />
        <p className="text-sm text-gray-500 mt-3 font-medium">
          Tus datos están seguros — no almacenamos ninguna información
        </p>
      </div>

      {selectedDate && formatBirthMessage(selectedDate)}
    </div>
  );
}