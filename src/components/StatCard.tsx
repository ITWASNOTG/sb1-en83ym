import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  color: string;
}

export function StatCard({ icon: Icon, title, value, color }: StatCardProps) {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg shadow-gray-100/50 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-scale-in group overflow-hidden">
      {/* Background decoration */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${color} opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150`} />
      
      {/* Content container */}
      <div className="relative z-10">
        {/* Icon container */}
        <div className="flex flex-col items-center">
          <div className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110`}>
            <Icon className="text-white" size={32} />
          </div>
        </div>

        {/* Text content */}
        <div className="text-center">
          <h3 className="text-lg font-display font-semibold text-gray-700 mb-3 transition-colors duration-300 group-hover:text-gray-900">
            {title}
          </h3>
          <p className="text-3xl font-display font-bold bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}