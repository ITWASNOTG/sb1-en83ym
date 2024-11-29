import React from 'react';
import {
  Clock,
  Timer,
  Hourglass,
  Sun,
  Moon,
  Calendar,
  Heart,
  Cake,
  Baby
} from 'lucide-react';
import { StatCard } from './StatCard';
import { formatNumber } from '../utils/dateCalculations';

interface StatsGridProps {
  stats: {
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    months: number;
    years: number;
    daysUntilBirthday: number;
    conceptionDate: Date;
  };
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto p-4">
      <StatCard
        icon={Clock}
        title="Milisegundos"
        value={formatNumber(stats.milliseconds)}
        color="bg-blue-500"
      />
      <StatCard
        icon={Timer}
        title="Segundos"
        value={formatNumber(stats.seconds)}
        color="bg-emerald-500"
      />
      <StatCard
        icon={Hourglass}
        title="Minutos"
        value={formatNumber(stats.minutes)}
        color="bg-amber-500"
      />
      <StatCard
        icon={Sun}
        title="Horas"
        value={formatNumber(stats.hours)}
        color="bg-orange-500"
      />
      <StatCard
        icon={Moon}
        title="Días"
        value={formatNumber(stats.days)}
        color="bg-violet-500"
      />
      <StatCard
        icon={Calendar}
        title="Meses"
        value={formatNumber(stats.months)}
        color="bg-pink-500"
      />
      <StatCard
        icon={Heart}
        title="Años"
        value={stats.years}
        color="bg-rose-500"
      />
      <StatCard
        icon={Cake}
        title="Días para tu cumpleaños"
        value={stats.daysUntilBirthday}
        color="bg-indigo-500"
      />
      <StatCard
        icon={Baby}
        title="Fecha estimada de concepción"
        value={stats.conceptionDate.toLocaleDateString()}
        color="bg-cyan-500"
      />
    </div>
  );
}