import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  const hour12 = time.getHours() % 12 || 12;

  // Clock hands
  const secondDeg = time.getSeconds() * 6;
  const minuteDeg = time.getMinutes() * 6 + time.getSeconds() * 0.1;
  const hourDeg = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
          <span className="text-sm">🕐</span>
        </div>
        <h3 className="section-title">Live Clock</h3>
      </div>

      <div className="flex flex-col items-center gap-4">
        {/* Analog clock */}
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Outer circle */}
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" className="text-dark-200 dark:text-dark-700" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-dark-100 dark:text-dark-800" />

            {/* Hour markers */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const x1 = 50 + 38 * Math.cos(angle);
              const y1 = 50 + 38 * Math.sin(angle);
              const x2 = 50 + 44 * Math.cos(angle);
              const y2 = 50 + 44 * Math.sin(angle);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={i % 3 === 0 ? 2 : 1} className="text-dark-300 dark:text-dark-600" />;
            })}

            {/* Hour hand */}
            <line
              x1="50" y1="50"
              x2={50 + 24 * Math.cos((hourDeg - 90) * Math.PI / 180)}
              y2={50 + 24 * Math.sin((hourDeg - 90) * Math.PI / 180)}
              stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"
            />
            {/* Minute hand */}
            <line
              x1="50" y1="50"
              x2={50 + 32 * Math.cos((minuteDeg - 90) * Math.PI / 180)}
              y2={50 + 32 * Math.sin((minuteDeg - 90) * Math.PI / 180)}
              stroke="#6366f1" strokeWidth="2" strokeLinecap="round"
            />
            {/* Second hand */}
            <line
              x1="50" y1="50"
              x2={50 + 36 * Math.cos((secondDeg - 90) * Math.PI / 180)}
              y2={50 + 36 * Math.sin((secondDeg - 90) * Math.PI / 180)}
              stroke="#ef4444" strokeWidth="1" strokeLinecap="round"
            />
            {/* Center dot */}
            <circle cx="50" cy="50" r="3" fill="#3b82f6" />
          </svg>
        </div>

        {/* Digital time */}
        <div className="text-center">
          <div className="font-bold text-dark-900 dark:text-white font-display text-2xl tabular-nums">
            {hour12.toString().padStart(2, '0')}:{minutes}
            <span className="text-dark-400 dark:text-dark-500 text-lg">:{seconds}</span>
            <span className="text-primary-500 text-sm ml-1">{ampm}</span>
          </div>
          <p className="text-xs text-dark-400 dark:text-dark-500 mt-1">{dateStr}</p>
        </div>
      </div>
    </div>
  );
};

export default ClockWidget;
