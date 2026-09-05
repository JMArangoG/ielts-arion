import React from 'react';

interface ProgressBarProps {
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

const sizes = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3'
};

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  size = 'md', 
  label, 
  className = '' 
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  const ariaLabel = label ? `${label}: ${clampedProgress}% completado` : `${clampedProgress}% completado`;

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
          <span>{label}</span>
          <span>{clampedProgress}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${className}`}
      >
        <div
          className={`${sizes[size]} bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;