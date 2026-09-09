import React from 'react';

interface FeedbackProps {
  message: string;
  type: 'success' | 'error' | 'info';
  className?: string;
}

const styles = {
  success: 'text-green-800 bg-green-100 border-green-300 dark:bg-green-900 dark:text-green-100 dark:border-green-700',
  error: 'text-red-800 bg-red-100 border-red-300 dark:bg-red-900 dark:text-red-100 dark:border-red-700',
  info: 'text-blue-800 bg-blue-100 border-blue-300 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700'
};

const Feedback: React.FC<FeedbackProps> = ({ message, type, className = '' }) => {
  if (!message) return null;

  const role = type === 'error' ? 'alert' : 'status';
  const liveRegion = type === 'error' ? 'assertive' : 'polite';

  return (
    <div
      role={role}
      aria-live={liveRegion}
      aria-atomic="true"
      className={`border-l-4 p-4 rounded-r-lg shadow-sm ${styles[type]} ${className}`}
    >
      {message}
    </div>
  );
};

export default Feedback;