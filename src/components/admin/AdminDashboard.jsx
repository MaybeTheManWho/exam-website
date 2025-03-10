import React, { useState } from 'react';
import { Users, FileText, PlusCircle, UserCog, Home } from 'lucide-react';
import StudentsTab from './StudentsTab';
import ExamScoresTab from './ExamScoresTab';
import CreateExamTab from './CreateExamTab';
import AdminManagementTab from './AdminManagementTab';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('students');
  
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
      default:
        return <StudentsTab />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center">
            <span className="mr-4 text-gray-600">
              Welcome, {user.name}
              {isRootAdmin && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                  Root Admin
                </span>
              )}
            </span>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar navigation */}
          <div className="w-full md:w-64 bg-white shadow rounded-lg p-4">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('students')}
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'students' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                <span>Students</span>
              </button>
              
              <button
                onClick={() => setActiveTab('examScores')}
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'examScores' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <FileText className="mr-3 h-5 w-5" />
                <span>Exam Scores</span>
              </button>
              
              <button
                onClick={() => setActiveTab('createExam')}
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'createExam' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <PlusCircle className="mr-3 h-5 w-5" />
                <span>Create Exam</span>
              </button>
              
              {/* Only show admin management for root user */}
              {isRootAdmin && (
                <button
                  onClick={() => setActiveTab('adminManagement')}
                  className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'adminManagement' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <UserCog className="mr-3 h-5 w-5" />
                  <span>Admin Management</span>
                </button>
              )}
              
              <hr className="my-2 border-gray-200" />
              
              <button
                className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Home className="mr-3 h-5 w-5" />
                <span>Go to Homepage</span>
              </button>
            </nav>
          </div>
          
          {/* Main content area */}
          <div className="flex-1 bg-white shadow rounded-lg p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;