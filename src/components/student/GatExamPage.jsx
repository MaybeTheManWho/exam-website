import React, { useState } from 'react';
import { ArrowLeft, BookOpen, BookMarked, Clock, Award, BarChart2 } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';
import { useAppContext } from '../../context/AppContext';

const GatExamPage = ({ mode, onReturn }) => {
  const { t, darkMode } = useAppContext();
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  
  // Format the mode name for display
  const formatModeName = () => {
    return mode === 'math' ? t('Mathematics') : t('Arabic');
  };
  
  // Handle difficulty selection
  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };
  
  // Handle start exam
  const handleStartExam = () => {
    // In a real app, this would navigate to the exam
    alert(`Starting ${mode} GAT exam with ${selectedDifficulty} difficulty`);
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
            <div className="bg-blue-600 dark:bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-lg mr-3">
              G
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("GAT Exam")} - {formatModeName()}
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content area with exam info */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">{t("GAT Exam Information")}</h2>
              </div>
              
              <div className="p-6">
                <div className="prose max-w-none dark:prose-invert">
                  <p className="mb-4">
                    {t("The General Aptitude Test (GAT) is designed to measure your analytical and deductive abilities. The test consists of multiple-choice questions focusing on verbal and quantitative sections.")}
                  </p>
                  
                  <div className="mb-6 bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                    <h3 className="text-blue-800 dark:text-blue-200 font-medium text-lg mb-2">{t("Exam Details")}</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Clock className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2 mt-0.5" />
                        <span>{t("Duration")}: 60 {t("minutes")}</span>
                      </li>
                      <li className="flex items-start">
                        <BookMarked className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2 mt-0.5" />
                        <span>{t("Questions")}: 55 {t("multiple-choice questions")}</span>
                      </li>
                      <li className="flex items-start">
                        <Award className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2 mt-0.5" />
                        <span>{t("Passing Score")}: 70%</span>
                      </li>
                      <li className="flex items-start">
                        <BarChart2 className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2 mt-0.5" />
                        <span>{t("Results")}: {t("Available immediately after completion")}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-3">{t("Select Difficulty")}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <button 
                      onClick={() => handleDifficultySelect('easy')}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedDifficulty === 'easy' 
                          ? 'border-green-500 bg-green-50 dark:bg-green-900 dark:border-green-600' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700'
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mb-2">
                          <span className="text-green-600 dark:text-green-300 text-xl font-bold">1</span>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{t("Easy")}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t("Basic concepts")}</p>
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => handleDifficultySelect('medium')}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedDifficulty === 'medium' 
                          ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900 dark:border-yellow-600' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-700'
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center mb-2">
                          <span className="text-yellow-600 dark:text-yellow-300 text-xl font-bold">2</span>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{t("Medium")}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t("Intermediate")}</p>
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => handleDifficultySelect('hard')}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedDifficulty === 'hard' 
                          ? 'border-red-500 bg-red-50 dark:bg-red-900 dark:border-red-600' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700'
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mb-2">
                          <span className="text-red-600 dark:text-red-300 text-xl font-bold">3</span>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{t("Hard")}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t("Advanced")}</p>
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => handleDifficultySelect('random')}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedDifficulty === 'random' 
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900 dark:border-purple-600' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mb-2">
                          <span className="text-purple-600 dark:text-purple-300 text-xl font-bold">?</span>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{t("Random")}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t("Mixed levels")}</p>
                      </div>
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-8">
                    <button
                      onClick={onReturn}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {t("Return to Dashboard")}
                    </button>
                    
                    <button
                      onClick={handleStartExam}
                      disabled={!selectedDifficulty}
                      className={`px-6 py-2 rounded-md transition-colors duration-200 flex items-center ${
                        selectedDifficulty 
                          ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white' 
                          : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      {t("Start Exam")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right sidebar - Exam history */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">{t("Your Exam History")}</h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {formatModeName()} - {t("Medium")}
                      </h3>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs font-medium rounded">
                        82%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">2025-03-01</p>
                    <div className="mt-2 flex justify-between text-xs">
                      <span>{t("Correct")}: 45/55</span>
                      <span>{t("Time")}: 48 {t("min")}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {formatModeName()} - {t("Hard")}
                      </h3>
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 text-xs font-medium rounded">
                        73%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">2025-02-15</p>
                    <div className="mt-2 flex justify-between text-xs">
                      <span>{t("Correct")}: 40/55</span>
                      <span>{t("Time")}: 55 {t("min")}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {formatModeName()} - {t("Easy")}
                      </h3>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs font-medium rounded">
                        91%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">2025-02-01</p>
                    <div className="mt-2 flex justify-between text-xs">
                      <span>{t("Correct")}: 50/55</span>
                      <span>{t("Time")}: 42 {t("min")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GatExamPage;