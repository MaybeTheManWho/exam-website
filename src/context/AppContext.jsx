import React, { createContext, useState, useContext, useEffect } from 'react';

// Arabic translations placeholder - would be more extensive in a real app
const arabicTranslations = {
  // Common
  "Welcome": "مرحباً",
  "Logout": "تسجيل الخروج",
  "Student Dashboard": "لوحة تحكم الطالب",
  "Admin Dashboard": "لوحة تحكم المسؤول",
  
  // Student Dashboard
  "Student Information": "معلومات الطالب",
  "Past Exams": "الاختبارات السابقة",
  "Available Exams": "الاختبارات المتاحة",
  "GAT Training": "تدريب القدرات",
  "Mathematics": "الرياضيات",
  "Arabic": "اللغة العربية",
  "Train": "تدريب",
  "Exam": "اختبار",
  "Exams Taken": "الاختبارات المكتملة",
  "Avg. Score": "متوسط الدرجات",
  "Last Login": "آخر تسجيل دخول",
  "Tips for Success": "نصائح للنجاح",
  "Name": "الاسم",
  "ID": "الرقم التعريفي",
  "Announcements": "الإعلانات",
  "Read all instructions carefully before starting an exam": "اقرأ جميع التعليمات بعناية قبل بدء الاختبار",
  "Make sure you have a stable internet connection": "تأكد من وجود اتصال إنترنت مستقر",
  "Use the GAT Training modules to prepare for your exams": "استخدم وحدات تدريب القدرات للاستعداد للاختبارات",
  "End Date": "تاريخ الانتهاء",
  "Duration": "المدة",
  "Organizer": "المنظم",
  "Start": "ابدأ",
  "No available exams at the moment": "لا توجد اختبارات متاحة حالياً",
  "Check back later for upcoming exams": "تحقق لاحقاً من الاختبارات القادمة",
  "Date": "التاريخ",
  "correct": "صحيح",
  
  // Admin Dashboard
  "Students": "الطلاب",
  "Exam Scores": "درجات الاختبارات",
  "Create Exam": "إنشاء اختبار",
  "Admin Management": "إدارة المسؤولين",
  "Homepage": "الصفحة الرئيسية",
  "Settings": "الإعدادات",
  "Help": "المساعدة",
  "Student Management": "إدارة الطلاب",
  "Exam Results Overview": "نظرة عامة على نتائج الاختبارات",
  "Create New Examination": "إنشاء اختبار جديد",
  "Administrator Management": "إدارة المسؤولين",
  "Total Students": "إجمالي الطلاب",
  "Active Exams": "الاختبارات النشطة",
  "Average Score": "متوسط الدرجات",
  "from last month": "من الشهر الماضي",
  "ending this week": "تنتهي هذا الأسبوع",
  "from previous term": "من الفصل السابق",
  "Root Admin": "المسؤول الرئيسي",
  "Admin Portal v1.0": "بوابة المسؤول الإصدار 1.0",
  "Last update": "آخر تحديث",
  "View and manage all registered students": "عرض وإدارة جميع الطلاب المسجلين",
  "Review examination results and statistics": "مراجعة نتائج الاختبارات والإحصائيات",
  "Create and publish new exams for students": "إنشاء ونشر اختبارات جديدة للطلاب",
  "Manage admin accounts and privileges": "إدارة حسابات المسؤولين والصلاحيات",
  
  // GAT specific
  "GAT Exam": "اختبار القدرات",
  "Select Difficulty": "اختر المستوى",
  "Easy": "سهل",
  "Medium": "متوسط",
  "Hard": "صعب",
  "Random": "عشوائي",
  "Start Exam": "بدء الاختبار",
  "Return to Dashboard": "العودة إلى لوحة التحكم",
  "Question Banks": "بنوك الأسئلة",
  "Bank": "بنك",
  "Solved": "محلول",
  "Unsolved": "غير محلول",
  
  // Announcements
  "Important Updates": "تحديثات مهمة",
  "General": "عام",
  "Urgent": "عاجل",
  "System Maintenance": "صيانة النظام",
  "New Feature": "ميزة جديدة",
  "GAT preparation workshops will be held this weekend": "ستقام ورش عمل تحضيرية لاختبار القدرات هذا الأسبوع",
  "New practice exams have been added to the system": "تمت إضافة اختبارات تدريبية جديدة إلى النظام",
  "System will be under maintenance on Friday night from 11 PM to 2 AM": "سيخضع النظام للصيانة ليلة الجمعة من 11 مساءً حتى 2 صباحًا",
  "The new GAT Training module is now available": "وحدة تدريب القدرات الجديدة متاحة الآن",
  
  // Other
  "Toggle Dark Mode": "تبديل الوضع الداكن",
  "Change Language": "تغيير اللغة",
  "Light": "فاتح",
  "Dark": "داكن"
};

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' or 'ar'
  
  // Function to translate text
  const translate = (text) => {
    if (language === 'en') return text;
    return arabicTranslations[text] || text;
  };
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  
  // Apply dark mode class to document when dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  // Additional effect to handle RTL for Arabic
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);
  
  return (
    <AppContext.Provider value={{ 
      darkMode, 
      toggleDarkMode, 
      language, 
      toggleLanguage,
      translate,
      t: translate, // shorter alias for translate
      isRTL: language === 'ar'
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;