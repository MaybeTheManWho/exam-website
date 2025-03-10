import React from 'react';
import { Moon, Sun, Globe, Languages } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode, language, toggleLanguage, t } = useAppContext();

  return (
    <div className="flex items-center space-x-2">
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        aria-label={t("Change Language")}
        className={`relative p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          language === 'ar' 
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' 
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
        }`}
      >
        <span className="sr-only">{t("Change Language")}</span>
        {language === 'en' ? (
          <Globe className="h-5 w-5" />
        ) : (
          <Languages className="h-5 w-5" />
        )}
        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-medium rounded-full bg-blue-500 text-white">
          {language.toUpperCase()}
        </span>
      </button>
      
      {/* Dark Mode Toggle */}
      <button 
        onClick={toggleDarkMode}
        aria-label={t("Toggle Dark Mode")}
        className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          darkMode 
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' 
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
        }`}
      >
        <span className="sr-only">{t("Toggle Dark Mode")}</span>
        {darkMode ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;