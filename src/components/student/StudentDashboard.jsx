import React, { useState, useEffect } from 'react';

const StudentDashboard = ({ user, onStartExam, onLogout }) => {
  // Mock data for student information and exams
  const [studentInfo, setStudentInfo] = useState(null);
  const [availableExams, setAvailableExams] = useState([]);
  const [pastExams, setPastExams] = useState([]);
  
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
    }, 1000);
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <div className="flex items-center">
            <span className="mr-4 text-gray-600">
              Welcome, {user.name}
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
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left sidebar - Student info and past exams */}
          <div className="md:col-span-1">
            {/* Student info card */}
            <div className="bg-white shadow rounded-lg mb-6 p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Student Information</h2>
              {studentInfo ? (
                <div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-500">ID</p>
                    <p className="font-medium">{studentInfo.id}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{studentInfo.name}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-500">Exams Taken</p>
                    <p className="font-medium">{studentInfo.totalExamsTaken}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-500">Average Score</p>
                    <p className="font-medium">{studentInfo.averageScore}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Login</p>
                    <p className="font-medium">{studentInfo.lastLogin}</p>
                  </div>
                </div>
              ) : (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              )}
            </div>
            
            {/* Past exams */}
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Past Exams</h2>
              {pastExams.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {pastExams.map(exam => (
                    <li key={exam.id} className="py-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{exam.name}</p>
                          <p className="text-sm text-gray-500">Date: {exam.date}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${exam.score >= 80 ? 'text-green-600' : exam.score >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {exam.score}%
                          </p>
                          <p className="text-xs text-gray-500">
                            {exam.correctAnswers}/{exam.totalQuestions} correct
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">No past exams found</p>
              )}
            </div>
          </div>
          
          {/* Main content area - Available exams */}
          <div className="md:col-span-2">
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Available Exams</h2>
              
              {availableExams.length > 0 ? (
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Exam Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Organizer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          End Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Added Date
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {availableExams.map(exam => (
                        <tr key={exam.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{exam.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{exam.organizer}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{exam.endDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{exam.addedDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => onStartExam(exam)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                            >
                              Start
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-10 text-center">
                  <p className="text-gray-500">No available exams at the moment</p>
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