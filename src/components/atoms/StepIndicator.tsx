import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  totalSteps, 
  className = '' 
}) => {
  const clampedStep = Math.max(1, Math.min(totalSteps, currentStep));

  return (
    <div 
      className={`flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 ${className}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="font-medium">Paso {clampedStep} de {totalSteps}</span>
      <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ml-2">
        <div 
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${((clampedStep - 1) / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default StepIndicator;