import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  bodyClassName?: string;
  actions?: ReactNode; // Optional actions to display in the card header
  titleSize?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({ title, children, className, titleClassName, bodyClassName, actions, titleSize = 'md' }) => {
  const titleSizeClasses = {
    sm: 'text-sm font-medium',
    md: 'text-base font-semibold', // Default like screenshot
    lg: 'text-lg font-semibold',
  }

  return (
    <div className={`bg-gray-100 dark:bg-gray-900 shadow-sm rounded-lg overflow-hidden ${className || ''}`}>
      {title && (
        <div className={`px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center ${titleClassName || ''}`}>
          <h3 className={`${titleSizeClasses[titleSize]} text-gray-700 dark:text-gray-100`}>{title}</h3>
          {actions && <div className="flex items-center space-x-2">{actions}</div>}
        </div>
      )}
      <div className={`p-4 ${bodyClassName || ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;