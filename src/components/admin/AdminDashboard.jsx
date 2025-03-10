import React, { useState, useEffect } from 'react';
import { Users, FileText, PlusCircle, UserCog, Home, Settings, HelpCircle, LogOut, ChevronRight, BookOpen, Bell } from 'lucide-react';
import StudentsTab from './StudentsTab';
import ExamScoresTab from './ExamScoresTab';
import CreateExamTab from './CreateExamTab';
import AdminManagementTab from './AdminManagementTab';
import GatManagementTab from './GatManagementTab';
import NewsManagementTab from './NewsManagementTab';
import ThemeToggle from '../common/ThemeToggle';
import { useAppContext } from '../../context/AppContext';

const AdminDashboard = ({ user, onLogout }) => {
  const { t, darkMode, isRTL } = useAppContext();
  const [activeTab, setActiveTab] = useState('students');
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Check if user is root admin
  const isRootAdmin = user.isRoot === true;
  
  // Main content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return <StudentsTab />;
      case 'examScores':
        return <ExamScoresTab />;
      case 'createExam':
        return <CreateExamTab />;
      case 'adminManagement':
        return <AdminManagementTab user={user} />;
      case 'gatManagement':
        return <GatManagementTab />;
      case 'newsManagement':
        return <NewsManagementTab />;
      default:
        return <StudentsTab />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header with animated gradient border bottom */}
      <header className="bg-white dark:bg-gray-800 shadow-md relative">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600"></div>
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-indigo-600 dark:bg-indigo-700 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-lg mr-3">
              A
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("Admin Dashboard")}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="mr-4 text-gray-700 dark:text-gray-200 flex items-center">
              <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mr-2">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span>
                {t("Welcome")}, <span className="font-medium">{user.name}</span>
                {isRootAdmin && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100">
                    {t("Root Admin")}
                  </span>
                )}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition-colors duration-200 text-white px-4 py-2 rounded-md text-sm shadow-sm hover:shadow-md flex items-center"
            >
              <LogOut className="h-4 w-4 mr-1" />
              {t("Logout")}
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar navigation with animation and hover effects */}
          <div className={`transition-all duration-300 ease-in-out ${
            isRTL 
              ? `md:ml-auto ${isCollapsed ? 'w-full md:w-16' : 'w-full md:w-64'}`
              : `${isCollapsed ? 'w-full md:w-16' : 'w-full md:w-64'}`
          } bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4`}>
            <div className={`flex justify-${isCollapsed ? 'center' : isRTL ? 'start' : 'end'} mb-4`}>
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)} 
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <ChevronRight className={`h-5 w-5 transform transition-transform duration-200 ${
                  isCollapsed 
                    ? isRTL ? 'rotate-180' : ''
                    : isRTL ? '' : 'rotate-180'
                }`} />
              </button>
            </div>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('students')}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'students' 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm dark:bg-indigo-900 dark:text-indigo-200' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                }`}
              >
                <Users className={`${isCollapsed ? '' : isRTL ? 'ml-3' : 'mr-3'} h-5 w-5`} />
                {!isCollapsed && <span className="font-medium">{t("Students")}</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('examScores')}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'examScores' 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm dark:bg-indigo-900 dark:text-indigo-200' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                }`}
              >
                <FileText className={`${isCollapsed ? '' : isRTL ? 'ml-3' : 'mr-3'} h-5 w-5`} />
                {!isCollapsed && <span className="font-medium">{t("Exam Scores")}</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('createExam')}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'createExam' 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm dark:bg-indigo-900 dark:text-indigo-200' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                }`}
              >
                <PlusCircle className={`${isCollapsed ? '' : isRTL ? 'ml-3' : 'mr-3'} h-5 w-5`} />
                {!isCollapsed && <span className="font-medium">{t("Create Exam")}</span>}
              </button>
              
              {/* GAT Management Button */}
              <button
                onClick={() => setActiveTab('gatManagement')}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'gatManagement' 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm dark:bg-indigo-900 dark:text-indigo-200' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                }`}
              >
                <BookOpen className={`${isCollapsed ? '' : isRTL ? 'ml-3' : 'mr-3'} h-5 w-5`} />
                {!isCollapsed && <span className="font-medium">{t("GAT Management")}</span>}
              </button>
              
              {/* News Management Button */}
              <button
                onClick={() => setActiveTab('newsManagement')}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'newsManagement' 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm dark:bg-indigo-900 dark:text-indigo-200' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                }`}
              >
                <Bell className={`${isCollapsed ? '' : isRTL ? 'ml-3' : 'mr-3'} h-5 w-5`} />
                {!isCollapsed && <span className="font-medium">{t("Announcements")}</span>}
              </button>
              
              {/* Only show admin management for root user */}
              {isRootAdmin && (
                <button
                  onClick={() => setActiveTab('adminManagement')}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === 'adminManagement' 
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm dark:bg-indigo-900 dark:text-indigo-200' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                  }`}
                >
                  <UserCog className={`${isCollapsed ? '' : isRTL ? 'ml-3' : 'mr-3'} h-5 w-5`} />
                  {!isCollapsed && <span className="font-medium">{t("Admin Management")}</span>}
                </button>
              )}
              
              <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>
              
              <button
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-3 rounded-lg transition-all duration-200 text-gray-600 dark:text-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100`}
              >
                <Home className={`${isCollapsed ? '' : isRTL ? 'ml-3' : 'mr-3'} h-5 w-5`} />
                {!isCollapsed && <span className="font-medium">{t("Homepage")}</span>}
              </button>
              
              <button
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-3 rounded-lg transition-all duration-200 text-gray-600 dark:text-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100`}
              >
                <Settings className={`${isCollapsed ? '' : isRTL ? 'ml-3' : 'mr-3'} h-5 w-5`} />
                {!isCollapsed && <span className="font-medium">{t("Settings")}</span>}
              </button>
              
              <button
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-3 rounded-lg transition-all duration-200 text-gray-600 dark:text-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100`}
              >
                <HelpCircle className={`${isCollapsed ? '' : isRTL ? 'ml-3' : 'mr-3'} h-5 w-5`} />
                {!isCollapsed && <span className="font-medium">{t("Help")}</span>}
              </button>
            </nav>
            
            {!isCollapsed && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="bg-indigo-50 dark:bg-indigo-900 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-indigo-700 dark:text-indigo-200 mb-2">{t("Admin Portal v1.0")}</h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-300">
                    {t("Last update")}: March 10, 2025
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Main content area with enhanced styling */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {activeTab === 'students' && t("Student Management")}
                  {activeTab === 'examScores' && t("Exam Results Overview")}
                  {activeTab === 'createExam' && t("Create New Examination")}
                  {activeTab === 'adminManagement' && t("Administrator Management")}
                  {activeTab === 'gatManagement' && t("GAT Management")}
                  {activeTab === 'newsManagement' && t("Announcements Management")}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {activeTab === 'students' && t("View and manage all registered students")}
                  {activeTab === 'examScores' && t("Review examination results and statistics")}
                  {activeTab === 'createExam' && t("Create and publish new exams for students")}
                  {activeTab === 'adminManagement' && t("Manage admin accounts and privileges")}
                  {activeTab === 'gatManagement' && t("Manage GAT questions, exams, and training materials")}
                  {activeTab === 'newsManagement' && t("Manage announcements and notifications for students")}
                </p>
              </div>
              
              {/* Dynamic content based on selected tab */}
              <div className="relative">
                {renderContent()}
              </div>
            </div>
            
            {/* Quick stats section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-800 rounded-xl p-6 text-white shadow-lg transform transition-transform duration-300 hover:scale-105">
                <h3 className="font-medium mb-1 text-blue-100">{t("Total Students")}</h3>
                <p className="text-2xl font-bold">152</p>
                <div className="text-sm text-blue-100 mt-2">
                  <span className="font-medium text-blue-50">+12%</span> {t("from last month")}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-800 rounded-xl p-6 text-white shadow-lg transform transition-transform duration-300 hover:scale-105">
                <h3 className="font-medium mb-1 text-purple-100">{t("Active Exams")}</h3>
                <p className="text-2xl font-bold">7</p>
                <div className="text-sm text-purple-100 mt-2">
                  <span className="font-medium text-purple-50">5</span> {t("ending this week")}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-800 rounded-xl p-6 text-white shadow-lg transform transition-transform duration-300 hover:scale-105">
                <h3 className="font-medium mb-1 text-green-100">{t("Average Score")}</h3>
                <p className="text-2xl font-bold">76.8%</p>
                <div className="text-sm text-green-100 mt-2">
                  <span className="font-medium text-green-50">+3.2%</span> {t("from previous term")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;