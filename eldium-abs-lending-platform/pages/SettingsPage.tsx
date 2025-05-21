
import React from 'react';
import Card from '../components/ui/Card';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeName, ThemeOption } from '../types';
import Button from '../components/ui/Button';
import { IconMoon, IconSun } from '../constants';
import ApiExplorer from '../components/ui/ApiExplorer'; // Import the new component

const SettingsPage: React.FC = () => {
  const { themeName, setThemeName, primaryColor, themeOptions, setSelectedThemeOption } = useTheme();

  const handleThemeModeChange = (mode: ThemeName) => {
    setThemeName(mode);
  };

  const handlePrimaryColorChange = (option: ThemeOption) => {
    setSelectedThemeOption(option);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>

      <Card title="Appearance Customization">
        <div className="space-y-6 p-4">
          {/* Theme Mode (Light/Dark) */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Theme Mode</h3>
            <div className="flex space-x-2">
              <Button
                variant={themeName === 'light' ? 'primary' : 'outline'}
                onClick={() => handleThemeModeChange('light')}
                leftIcon={<IconSun className="w-4 h-4" />}
              >
                Light
              </Button>
              <Button
                variant={themeName === 'dark' ? 'primary' : 'outline'}
                onClick={() => handleThemeModeChange('dark')}
                leftIcon={<IconMoon className="w-4 h-4" />}
              >
                Dark
              </Button>
            </div>
          </div>

          {/* Primary Color / White-labeling Simulation */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Tenant Theme (Primary Color)</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Simulates white-labeling by changing the primary accent color of the platform.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {themeOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => handlePrimaryColorChange(option)}
                  className={`p-4 rounded-lg border-2 transition-all duration-150 ease-in-out focus:outline-none
                              ${option.primaryColor === primaryColor ? 'ring-2 ring-offset-2 dark:ring-offset-gray-800' : 'hover:opacity-80'}`}
                  style={{ 
                    backgroundColor: option.primaryColor, 
                    borderColor: option.primaryColor === primaryColor ? option.primaryColor : 'transparent',
                    // @ts-ignore Tailwind custom property not recognized by TS
                    '--tw-ring-color': option.primaryColor 
                  }}
                  title={`Set theme to ${option.label}`}
                >
                  <span className="block text-center font-medium text-white mix-blend-overlay text-shadow-sm">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* API Explorer Section */}
      <ApiExplorer />

      <Card title="User Profile (Placeholder)">
        <div className="p-4">
            <p className="text-gray-600 dark:text-gray-300">User profile settings (e.g., name, password change, notification preferences) would be managed here.</p>
        </div>
      </Card>
      
      <Card title="Regulatory Compliance (Placeholder)">
        <div className="p-4">
            <p className="text-gray-600 dark:text-gray-300">
                This section would provide access to audit logs, data residency information, and configurations related to APRA standards (CPS 234, CPS 231) and the Australian Privacy Act, ensuring compliance.
            </p>
        </div>
      </Card>

    </div>
  );
};

export default SettingsPage;