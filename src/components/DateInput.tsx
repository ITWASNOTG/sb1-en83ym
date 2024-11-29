import React, { useState, forwardRef } from 'react';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import DatePicker from 'react-datepicker';
import Typewriter from 'typewriter-effect';
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  onDateChange: (date: Date) => void;
}

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(
  ({ value, onClick }, ref) => (
    <div className="relative cursor-pointer" onClick={onClick} ref={ref}>
      <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5 transition-colors group-hover:text-blue-600 z-10" />
      <div className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all font-medium text-gray-700 bg-white shadow-sm hover:border-blue-500 min-h-[56px] flex items-center">
        {value ? (
          <span>{value}</span>
        ) : (
          <div className="text-gray-400">
            <Typewriter
              options={{
                strings: [
                  'Por ejemplo: 15 de enero de 1990',
                  'O tal vez: 3 de marzo de 1985',
                  'Quizás: 21 de junio de 1995'
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
);

CustomInput.displayName = 'CustomInput';

const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  changeYear,
  changeMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: any) => {
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  return (
    <div className="p-4 pb-2">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className="p-2 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
          >
            <ChevronDown className="w-5 h-5 transform rotate-90 text-blue-600" />
          </button>
          <div className="font-display font-semibold text-gray-900">
            {months[date.getMonth()]} {date.getFullYear()}
          </div>
          <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className="p-2 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
          >
            <ChevronDown className="w-5 h-5 transform -rotate-90 text-blue-600" />
          </button>
        </div>
        <div className="flex gap-2">
          <select
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
            className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-200 hover:border-blue-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer font-medium text-gray-700 appearance-none bg-right pr-8 text-sm"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234B5563'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em'
            }}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(value)}
            className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-200 hover:border-blue-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer font-medium text-gray-700 appearance-none bg-right pr-8 text-sm"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234B5563'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em'
            }}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export function DateInput({ onDateChange }: DateInputProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      onDateChange(date);
    }
  };

  return (
    <div className="relative group">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        maxDate={new Date()}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        dateFormat="dd 'de' MMMM 'de' yyyy"
        customInput={<CustomInput />}
        renderCustomHeader={CustomHeader}
        wrapperClassName="w-full"
        calendarClassName="bg-white shadow-xl border border-gray-100 rounded-xl animate-scale-in"
        dayClassName={date => 
          "hover:bg-blue-50 rounded-lg transition-colors mx-0.5 w-8 h-8 flex items-center justify-center"
        }
        showPopperArrow={false}
        locale="es"
      />
    </div>
  );
}