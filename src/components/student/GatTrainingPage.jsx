import React, { useState } from 'react';
import { ArrowLeft, Check, BookOpen, FileText, ToggleLeft, ToggleRight } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';
import { useAppContext } from '../../context/AppContext';

const GatTrainingPage = ({ mode, onReturn }) => {
  const { t, darkMode } = useAppContext();
  const [viewMode, setViewMode] = useState('unsolved'); // 'solved' or 'unsolved'
  
  // Format the mode name for display
  const formatModeName = () => {
    return mode === 'math' ? t('Mathematics') : t('Arabic');
  };
  
  // Generate question banks (1-4, 5-8, etc.)
  const generateQuestionBanks = () => {
    const banks = [];
    for (let i = 1; i <= 100; i += 4) {
      banks.push({
        id: `bank-${i}`,
        range: `${i}-${i + 3}`,
        completed: Math.random() > 0.6, // Randomly mark some as completed
        progress: Math.floor(Math.random() * 100)
      });
    }
    return banks;
  };
  
  const questionBanks = generateQuestionBanks();
  
  // Handle bank selection
  const handleBankSelect = (bankId) => {
    // In a real app, this would navigate to the bank's questions
    alert(`Opening question bank ${bankId} in ${viewMode} mode`);
  };
  
  // Toggle view mode between solved and unsolved
  const toggleViewMode = () => {
    setViewMode(viewMode === 'solved' ? 'unsolved' : 'solved');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md relative">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600"></div>
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={onReturn}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 mr-2 text-gray-600 dark:text-gray-300"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="bg-green-600 dark:bg-green-700 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-lg mr-3">
              T
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("GAT Training")} - {formatModeName()}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* View mode toggle */}
            <button 
              onClick={toggleViewMode}
              className="flex items-center space-x-2 py-1 px-3 bg-blue-50 dark:bg-blue-900 rounded-md"
            >
              {viewMode === 'unsolved' ? (
                <>
                  <ToggleLeft className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{t("Unsolved")}</span>
                </>
              ) : (
                <>
                  <ToggleRight className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">{t("Solved")}</span>
                </>
              )}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">{t("Question Banks")}</h2>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300">
                {viewMode === 'unsolved' 
                  ? t("Select a question bank to practice. You can answer questions as you go and track your progress.")
                  : t("View solved question banks with answers highlighted. Great for reviewing concepts you've learned.")}
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {questionBanks.map((bank) => (
                <button 
                  key={bank.id}
                  onClick={() => handleBankSelect(bank.id)}
                  className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                    bank.completed 
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/30 dark:border-green-600' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  {bank.completed && (
                    <div className="absolute top-2 right-2">
                      <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                  )}
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mb-2">
                      <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {t("Bank")} {bank.range}
                    </h4>
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className="bg-blue-600 dark:bg-blue-500 h-1.5 rounded-full" 
                        style={{ width: `${bank.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{bank.progress}% {t("complete")}</p>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={onReturn}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("Return to Dashboard")}
              </button>
              
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>{questionBanks.filter(b => b.completed).length}/{questionBanks.length} {t("banks completed")}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Performance Summary */}
        <div className="mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">{t("Your Performance")}</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="text-blue-800 dark:text-blue-200 font-medium mb-2">{t("Overall Accuracy")}</h3>
                <div className="flex items-end">
                  <span className="text-3xl font-bold text-blue-600 dark:text-blue-300">78%</span>
                  <span className="ml-2 text-sm text-blue-500 dark:text-blue-400">{t("correct answers")}</span>
                </div>
                <div className="mt-4 w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                  <div className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <h3 className="text-green-800 dark:text-green-200 font-medium mb-2">{t("Strong Topics")}</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">{t("Algebra")}</span>
                    <span className="font-medium text-green-600 dark:text-green-400">92%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">{t("Geometry")}</span>
                    <span className="font-medium text-green-600 dark:text-green-400">85%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">{t("Statistics")}</span>
                    <span className="font-medium text-green-600 dark:text-green-400">83%</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                <h3 className="text-yellow-800 dark:text-yellow-200 font-medium mb-2">{t("Areas to Improve")}</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">{t("Trigonometry")}</span>
                    <span className="font-medium text-yellow-600 dark:text-yellow-400">65%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">{t("Calculus")}</span>
                    <span className="font-medium text-yellow-600 dark:text-yellow-400">61%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">{t("Word Problems")}</span>
                    <span className="font-medium text-yellow-600 dark:text-yellow-400">58%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GatTrainingPage;