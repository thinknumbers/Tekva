
import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ThemeOption } from '../../types';
import { IconChevronDown } from '../../constants';

const ThemeSwitcherDropdown: React.FC = () => {
  const { themeOptions, primaryColor, setSelectedThemeOption } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentThemeOption = themeOptions.find(opt => opt.primaryColor === primaryColor) || themeOptions[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectTheme = (option: ThemeOption) => {
    setSelectedThemeOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-3 py-1.5 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-primary"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="mr-2 w-4 h-4 rounded-full" style={{ backgroundColor: currentThemeOption.primaryColor }}></span>
          {currentThemeOption.label}
          <IconChevronDown className="-mr-1 ml-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {themeOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => handleSelectTheme(option)}
                className={`${
                  option.primaryColor === primaryColor ? 'font-semibold text-primary dark:text-primary-light' : 'text-gray-700 dark:text-gray-200'
                } group flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white`}
                role="menuitem"
              >
                <span className="mr-3 w-4 h-4 rounded-full" style={{ backgroundColor: option.primaryColor }}></span>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcherDropdown;
    