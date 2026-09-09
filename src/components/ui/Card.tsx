import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, title, className = '' }) => {
  return (
    <article className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      {children}
    </article>
  );
};

export default Card;