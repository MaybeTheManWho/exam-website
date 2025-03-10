import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Award, ChevronRight, BarChart2, CheckCircle, Bell, Calendar, Info } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';
import { useAppContext } from '../../context/AppContext';

const StudentDashboard = ({ user, onStartExam, onLogout, onGatNavigation }) => {
  const { t, darkMode, isRTL } = useAppContext();
  
  // Mock data for student information and exams
  const [studentInfo, setStudentInfo] = useState(null);
  const [availableExams, setAvailableExams] = useState([]);
  const [pastExams, setPastExams] = useState([]);
  const [showGatOptions, setShowGatOptions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  
  useEffect(() => {
    // In a real application, this would fetch from an API
    // Simulating data fetch
    setTimeout(() => {
      setStudentInfo({
        id: user.id,
        name: user.name,
        totalExamsTaken: 3,
        averageScore: 78.5,
        lastLogin: new Date(user.loginTime).toLocaleDateString()
      });
      
      setAvailableExams([
        {
          id: 'exam001',
          name: 'Introduction to Computer Science',
          organizer: 'Prof. Smith',
          endDate: '2025-03-15',
          addedDate: '2025-02-10',
          duration: 60, // minutes
          questionCount: 20
        },
        {
          id: 'exam002',
          name: 'Data Structures and Algorithms',
          organizer: 'Prof. Johnson',
          endDate: '2025-03-20',
          addedDate: '2025-02-15',
          duration: 90, // minutes
          questionCount: 30
        }
      ]);
      
      setPastExams([
        {
          id: 'past001',
          name: 'Basic Mathematics',
          date: '2025-01-15',
          score: 82,
          totalQuestions: 25,
          correctAnswers: 20
        },
        {
          id: 'past002',
          name: 'Programming Fundamentals',
          date: '2025-02-01',
          score: 75,
          totalQuestions: 20,
          correctAnswers: 15
        },
        {
          id: 'past003',
          name: 'Web Development Basics',
          date: '2025-02-20',
          score: 88,
          totalQuestions: 30,
          correctAnswers: 26
        }
      ]);
      
      // Mock announcements
      setAnnouncements([
        {
          id: 'ann001',
          title: 'GAT preparation workshops will be held this weekend',
          date: '2025-03-08',
          category: 'General',
          isNew: true
        },
        {
          id: 'ann002',
          title: 'New practice exams have been added to the system',
          date: '2025-03-07',
          category: 'New Feature',
          isNew: true
        },
        {
          id: 'ann003',
          title: 'System will be under maintenance on Friday night from 11 PM to 2 AM',
          date: '2025-03-05',
          category: 'System Maintenance',
          isNew: false
        },
        {
          id: 'ann004',
          title: 'The new GAT Training module is now available',
          date: '2025-03-01',
          category: 'New Feature',
          isNew: false
        }
      ]);
      
      setIsLoading(false);
    }, 1000);
  }, [user]);

  const handleGatOptionClick = (option) => {
    if (showGatOptions === option) {
      setShowGatOptions(null);
    } else {
      setShowGatOptions(option);
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Urgent':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'New Feature':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'System Maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header with animated gradient border bottom */}
      <header className="bg-white dark:bg-gray-800 shadow-md relative">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600"></div>
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-lg mr-3">
              E
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("Student Dashboard")}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="mr-4 text-gray-700 dark:text-gray-200 flex items-center">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-700 rounded-full flex items-center justify-center mr-2">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span>
                {t("Welcome")}, <span className="font-medium">{user.name}</span>
              </span>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white px-4 py-2 rounded-md text-sm shadow-sm hover:shadow-md"
            >
              {t("Logout")}
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content with improved spacing and animations */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left sidebar - Student info and past exams */}
          <div className="md:col-span-1 space-y-8">
            {/* Student info card with improved styling */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">{t("Student Information")}</h2>
              </div>
              {isLoading ? (
                <div className="animate-pulse p-6">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/5"></div>
                </div>
              ) : (
                <div className="p-6 divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="pb-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t("ID")}</p>
                      <p className="font-medium dark:text-white">{studentInfo.id}</p>
                    </div>
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {studentInfo.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="py-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("Name")}</p>
                    <p className="font-medium dark:text-white">{studentInfo.name}</p>
                  </div>
                  <div className="py-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full mr-3">
                        <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t("Exams Taken")}</p>
                        <p className="font-semibold dark:text-white">{studentInfo.totalExamsTaken}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full mr-3">
                        <Award className="h-4 w-4 text-green-600 dark:text-green-300" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t("Avg. Score")}</p>
                        <p className="font-semibold dark:text-white">{studentInfo.averageScore}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 flex items-center">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full mr-3">
                      <Clock className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t("Last Login")}</p>
                      <p className="font-semibold dark:text-white">{studentInfo.lastLogin}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Past exams with enhanced styling */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-800 dark:to-purple-900 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">{t("Past Exams")}</h2>
              </div>
              {isLoading ? (
                <div className="animate-pulse p-6 space-y-4">
                  <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ) : pastExams.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {pastExams.map(exam => (
                    <li key={exam.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                      <div className="p-4 flex justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{exam.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{t("Date")}: {exam.date}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${
                            exam.score >= 80 ? 'text-green-600 dark:text-green-400' : 
                            exam.score >= 70 ? 'text-yellow-600 dark:text-yellow-400' : 
                            'text-red-600 dark:text-red-400'
                          }`}>
                            {exam.score}%
                          </p>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 justify-end">
                            <CheckCircle className="h-3 w-3 mr-1 text-green-500 dark:text-green-400" />
                            <span>
                              {exam.correctAnswers}/{exam.totalQuestions} {t("correct")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400">{t("No past exams found")}</p>
                </div>
              )}
            </div>
            
            {/* GAT Training with animated dropdown */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">{t("GAT Training")}</h2>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t("Prepare for your General Aptitude Test with our specialized training modules.")}
                </p>
                <div className="space-y-3">
                  {/* Math Button + Dropdown Options */}
                  <div>
                    <button 
                      onClick={() => handleGatOptionClick('math')}
                      className={`w-full py-3 px-4 rounded-lg flex justify-between items-center transition-colors duration-200 ${
                        showGatOptions === 'math' 
                          ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100'
                      }`}
                    >
                      <span className="font-medium">{t("Mathematics")}</span>
                      <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${showGatOptions === 'math' ? 'transform rotate-90' : ''}`} />
                    </button>
                    
                    {/* Math Training Options Dropdown */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      showGatOptions === 'math' ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="grid grid-cols-2 gap-2 px-2">
                        <button 
                          onClick={() => onGatNavigation('math', 'train')}
                          className="py-2 px-4 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-md transition-colors duration-200 flex items-center justify-center"
                        >
                          <BarChart2 className="w-4 h-4 mr-2" />
                          {t("Train")}
                        </button>
                        <button 
                          onClick={() => onGatNavigation('math', 'exam')}
                          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md transition-colors duration-200 flex items-center justify-center"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          {t("Exam")}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Arabic Button + Dropdown Options */}
                  <div>
                    <button 
                      onClick={() => handleGatOptionClick('arabic')}
                      className={`w-full py-3 px-4 rounded-lg flex justify-between items-center transition-colors duration-200 ${
                        showGatOptions === 'arabic' 
                          ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100'
                      }`}
                    >
                      <span className="font-medium">{t("Arabic")}</span>
                      <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${showGatOptions === 'arabic' ? 'transform rotate-90' : ''}`} />
                    </button>
                    
                    {/* Arabic Training Options Dropdown */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      showGatOptions === 'arabic' ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="grid grid-cols-2 gap-2 px-2">
                        <button 
                          onClick={() => onGatNavigation('arabic', 'train')}
                          className="py-2 px-4 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-md transition-colors duration-200 flex items-center justify-center"
                        >
                          <BarChart2 className="w-4 h-4 mr-2" />
                          {t("Train")}
                        </button>
                        <button 
                          onClick={() => onGatNavigation('arabic', 'exam')}
                          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md transition-colors duration-200 flex items-center justify-center"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          {t("Exam")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content area - Available exams and announcements */}
          <div className="md:col-span-2 space-y-8">
            {/* Available Exams */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">{t("Available Exams")}</h2>
              </div>
              
              {isLoading ? (
                <div className="p-6 animate-pulse space-y-4">
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                </div>
              ) : availableExams.length > 0 ? (
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {t("Exam Name")}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {t("Organizer")}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {t("End Date")}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {t("Duration")}
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">{t("Actions")}</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {availableExams.map(exam => (
                        <tr key={exam.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{exam.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {exam.questionCount} {t("questions")}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-gray-400">{exam.organizer}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-gray-400">{exam.endDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Clock className="h-4 w-4 mr-1 text-gray-400 dark:text-gray-500" />
                              <span>{exam.duration} min</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => onStartExam(exam)}
                              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-md transition-colors duration-200 shadow-sm hover:shadow"
                            >
                              <span>{t("Start")}</span>
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                    <BookOpen className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">{t("No available exams at the moment")}</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">{t("Check back later for upcoming exams")}</p>
                </div>
              )}
              
              {/* Tips and guidance section */}
              <div className="bg-blue-50 dark:bg-blue-900 p-6 mt-4 border-t border-blue-100 dark:border-blue-800">
                <h3 className="text-md font-medium text-blue-800 dark:text-blue-100 mb-3">{t("Tips for Success")}</h3>
                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-200">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                      <div className="absolute inset-0 bg-blue-200 dark:bg-blue-700 rounded-full opacity-50"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-2 w-2 bg-blue-600 dark:bg-blue-300 rounded-full"></div>
                      </div>
                    </div>
                    <p className="ml-2">{t("Read all instructions carefully before starting an exam")}</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                      <div className="absolute inset-0 bg-blue-200 dark:bg-blue-700 rounded-full opacity-50"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-2 w-2 bg-blue-600 dark:bg-blue-300 rounded-full"></div>
                      </div>
                    </div>
                    <p className="ml-2">{t("Make sure you have a stable internet connection")}</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                      <div className="absolute inset-0 bg-blue-200 dark:bg-blue-700 rounded-full opacity-50"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-2 w-2 bg-blue-600 dark:bg-blue-300 rounded-full"></div>
                      </div>
                    </div>
                    <p className="ml-2">{t("Use the GAT Training modules to prepare for your exams")}</p>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Announcements Section */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-yellow-700 dark:to-orange-700 px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">{t("Announcements")}</h2>
                <Bell className="h-5 w-5 text-white" />
              </div>
              
              {isLoading ? (
                <div className="p-6 animate-pulse space-y-4">
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {announcements.map(announcement => (
                    <div key={announcement.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <span className={`px-2 py-1 text-xs font-medium rounded-md mr-2 ${getCategoryColor(announcement.category)}`}>
                            {t(announcement.category)}
                          </span>
                          {announcement.isNew && (
                            <span className="px-2 py-1 text-xs font-medium rounded-md bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 animate-pulse-slow">
                              {t("New")}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3 w-3 mr-1" />
                          {announcement.date}
                        </div>
                      </div>
                      <p className="text-gray-800 dark:text-gray-200 mb-2">{t(announcement.title)}</p>
                      <div className="flex justify-end">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm flex items-center">
                          <Info className="h-3 w-3 mr-1" />
                          {t("Read more")}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;