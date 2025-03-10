import React, { useState, useEffect } from 'react';
import { 
  Plus, BookOpen, FileText, Image, Library, Tag, AlignLeft, 
  BarChart2, CheckCircle, XCircle, Edit, Trash2, ArrowLeft, Save,
  Calculator, Languages, BookMarked, Hash
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

// Mock topics for GAT questions
const initialTopics = [
  { id: 'topic1', name: 'Algebra', count: 42 },
  { id: 'topic2', name: 'Geometry', count: 35 },
  { id: 'topic3', name: 'Calculus', count: 28 },
  { id: 'topic4', name: 'Statistics', count: 21 },
  { id: 'topic5', name: 'Trigonometry', count: 19 },
  { id: 'topic6', name: 'Grammar', count: 32 },
  { id: 'topic7', name: 'Vocabulary', count: 27 },
  { id: 'topic8', name: 'Reading Comprehension', count: 24 },
  { id: 'topic9', name: 'Syntax', count: 18 },
  { id: 'topic10', name: 'Literary Analysis', count: 15 }
];

// Mock questions for demonstration
const initialQuestions = [
  {
    id: 'q1',
    topic: 'topic1',
    difficulty: 'easy',
    subject: 'math',
    bankNumber: 1,
    text: 'If x + 3 = 7, what is the value of x?',
    options: [
      { id: 'a', text: '2' },
      { id: 'b', text: '3' },
      { id: 'c', text: '4', isCorrect: true },
      { id: 'd', text: '5' }
    ],
    imageUrl: null
  },
  {
    id: 'q2',
    topic: 'topic2',
    difficulty: 'medium',
    subject: 'math',
    bankNumber: 2,
    text: 'What is the area of a circle with radius 5?',
    options: [
      { id: 'a', text: '25π', isCorrect: true },
      { id: 'b', text: '10π' },
      { id: 'c', text: '5π' },
      { id: 'd', text: '15π' }
    ],
    imageUrl: null
  },
  {
    id: 'q3',
    topic: 'topic3',
    difficulty: 'hard',
    subject: 'math',
    bankNumber: 3,
    text: 'Find the derivative of f(x) = x³ + 2x² - 5x + 3',
    options: [
      { id: 'a', text: '3x² + 4x - 5', isCorrect: true },
      { id: 'b', text: '3x² + 2x - 5' },
      { id: 'c', text: '3x² + 4x - 1' },
      { id: 'd', text: '2x² + 4x - 5' }
    ],
    imageUrl: null
  },
  {
    id: 'q4',
    topic: 'topic6',
    difficulty: 'medium',
    subject: 'arabic',
    bankNumber: 1,
    text: 'أي مما يلي هو استخدام صحيح للضمير؟',
    options: [
      { id: 'a', text: 'أنا ذهبت إلى المدرسة' },
      { id: 'b', text: 'أنا ذهبتُ إلى المدرسة', isCorrect: true },
      { id: 'c', text: 'أنا ذهبتِ إلى المدرسة' },
      { id: 'd', text: 'أنا ذهبوا إلى المدرسة' }
    ],
    imageUrl: null
  }
];

// Generate bank options (1-4, 5-8, etc. up to 100)
const generateBankOptions = () => {
  const options = [];
  for (let i = 1; i <= 100; i += 4) {
    options.push({
      value: i,
      label: `Bank ${i}-${i+3}`
    });
  }
  return options;
};

const bankOptions = generateBankOptions();

const GatManagementTab = () => {
  const { t } = useAppContext();
  const [view, setView] = useState('topics'); // 'topics', 'questions', 'newQuestion', 'editQuestion'
  const [topics, setTopics] = useState(initialTopics);
  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [filter, setFilter] = useState({ 
    difficulty: 'all', 
    subject: 'all', 
    bank: 'all', 
    search: '' 
  });
  
  // Form state for new/edit question
  const [questionForm, setQuestionForm] = useState({
    topic: '',
    difficulty: 'medium',
    subject: 'math',
    bankNumber: 1,
    text: '',
    options: [
      { id: 'a', text: '', isCorrect: false },
      { id: 'b', text: '', isCorrect: false },
      { id: 'c', text: '', isCorrect: false },
      { id: 'd', text: '', isCorrect: false }
    ],
    imageUrl: null
  });
  
  // Handle topic selection
  const handleSelectTopic = (topicId) => {
    setSelectedTopic(topicId);
    setView('questions');
  };
  
  // Handle creating a new topic
  const handleCreateTopic = () => {
    const topicName = prompt(t('Enter new topic name:'));
    if (topicName && topicName.trim() !== '') {
      const newTopic = {
        id: `topic${topics.length + 1}`,
        name: topicName.trim(),
        count: 0
      };
      setTopics([...topics, newTopic]);
    }
  };
  
  // Handle starting to create a new question
  const handleNewQuestion = () => {
    setQuestionForm({
      topic: selectedTopic || '',
      difficulty: 'medium',
      subject: 'math',
      bankNumber: 1,
      text: '',
      options: [
        { id: 'a', text: '', isCorrect: false },
        { id: 'b', text: '', isCorrect: false },
        { id: 'c', text: '', isCorrect: false },
        { id: 'd', text: '', isCorrect: false }
      ],
      imageUrl: null
    });
    setView('newQuestion');
  };
  
  // Handle editing a question
  const handleEditQuestion = (questionId) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      setCurrentQuestion(question);
      setQuestionForm({
        ...question
      });
      setView('editQuestion');
    }
  };
  
  // Handle deleting a question
  const handleDeleteQuestion = (questionId) => {
    if (window.confirm(t('Are you sure you want to delete this question?'))) {
      const newQuestions = questions.filter(q => q.id !== questionId);
      setQuestions(newQuestions);
      
      // Update topic count
      const question = questions.find(q => q.id === questionId);
      if (question) {
        const newTopics = topics.map(topic => {
          if (topic.id === question.topic) {
            return { ...topic, count: Math.max(0, topic.count - 1) };
          }
          return topic;
        });
        setTopics(newTopics);
      }
    }
  };
  
  // Handle form input changes
  const handleFormChange = (field, value) => {
    setQuestionForm({
      ...questionForm,
      [field]: value
    });
  };
  
  // Handle option changes
  const handleOptionChange = (optionId, field, value) => {
    const newOptions = questionForm.options.map(option => {
      if (option.id === optionId) {
        if (field === 'isCorrect') {
          // Only one option can be correct
          return { ...option, isCorrect: true };
        }
        return { ...option, [field]: value };
      } else if (field === 'isCorrect') {
        // Uncheck other options
        return { ...option, isCorrect: false };
      }
      return option;
    });
    
    setQuestionForm({
      ...questionForm,
      options: newOptions
    });
  };
  
  // Handle form submission
  const handleSubmitQuestion = () => {
    // Validate form
    if (!questionForm.topic || !questionForm.text.trim() || 
        !questionForm.options.some(o => o.isCorrect) ||
        questionForm.options.some(o => !o.text.trim())) {
      alert(t('Please fill in all fields and select a correct answer.'));
      return;
    }
    
    if (view === 'newQuestion') {
      // Create new question
      const newQuestion = {
        ...questionForm,
        id: `q${questions.length + 1}`
      };
      
      setQuestions([...questions, newQuestion]);
      
      // Update topic count
      const newTopics = topics.map(topic => {
        if (topic.id === newQuestion.topic) {
          return { ...topic, count: topic.count + 1 };
        }
        return topic;
      });
      setTopics(newTopics);
    } else {
      // Update existing question
      const newQuestions = questions.map(q => {
        if (q.id === currentQuestion.id) {
          return { ...questionForm, id: q.id };
        }
        return q;
      });
      setQuestions(newQuestions);
      
      // Update topic count if topic changed
      if (currentQuestion.topic !== questionForm.topic) {
        const newTopics = topics.map(topic => {
          if (topic.id === currentQuestion.topic) {
            return { ...topic, count: Math.max(0, topic.count - 1) };
          }
          if (topic.id === questionForm.topic) {
            return { ...topic, count: topic.count + 1 };
          }
          return topic;
        });
        setTopics(newTopics);
      }
    }
    
    // Save to localStorage (in a real application this would be an API call)
    localStorage.setItem('gatQuestions', JSON.stringify([...questions, questionForm]));
    
    // Return to questions view
    setView('questions');
  };
  
  // Load questions from localStorage on initial render
  useEffect(() => {
    const storedQuestions = localStorage.getItem('gatQuestions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);
  
  // Filter questions based on current filters
  const filteredQuestions = questions.filter(question => {
    // Filter by topic
    if (selectedTopic && question.topic !== selectedTopic) {
      return false;
    }
    
    // Filter by difficulty
    if (filter.difficulty !== 'all' && question.difficulty !== filter.difficulty) {
      return false;
    }
    
    // Filter by subject
    if (filter.subject !== 'all' && question.subject !== filter.subject) {
      return false;
    }
    
    // Filter by bank
    if (filter.bank !== 'all' && question.bankNumber !== parseInt(filter.bank)) {
      return false;
    }
    
    // Filter by search term
    if (filter.search && !question.text.toLowerCase().includes(filter.search.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Get topic name by ID
  const getTopicName = (topicId) => {
    const topic = topics.find(t => t.id === topicId);
    return topic ? topic.name : '';
  };
  
  // Get topic icon based on topic name
  const getTopicIcon = (topicName) => {
    const mathTopics = ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry'];
    
    if (mathTopics.includes(topicName)) {
      return <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    } else {
      return <Languages className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
    }
  };
  
  // Get subject label
  const getSubjectLabel = (subject) => {
    return subject === 'math' ? t('Mathematics') : t('Arabic');
  };
  
  // Mock function to handle image upload
  const handleImageUpload = () => {
    alert(t('Image upload functionality would be implemented here.'));
    // In a real application, this would handle file selection and upload
  };
  
  // Render view based on current state
  const renderView = () => {
    switch (view) {
      case 'topics':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('Question Topics')}</h3>
              <button
                onClick={handleCreateTopic}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-1" />
                {t('Add Topic')}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topics.map(topic => (
                <div 
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic.id)}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                        {getTopicIcon(topic.name)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{topic.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {topic.count} {t('questions')}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-8 w-8 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{topic.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'questions':
        return (
          <div>
            <div className="flex items-center mb-6">
              <button
                onClick={() => setView('topics')}
                className="mr-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {getTopicName(selectedTopic)} {t('Questions')}
              </h3>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-2 md:space-y-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">{t('Filter by')}:</span>
                <select
                  value={filter.difficulty}
                  onChange={(e) => setFilter({...filter, difficulty: e.target.value})}
                  className="border border-gray-300 dark:border-gray-600 rounded-md text-sm py-1 px-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  <option value="all">{t('All Difficulties')}</option>
                  <option value="easy">{t('Easy')}</option>
                  <option value="medium">{t('Medium')}</option>
                  <option value="hard">{t('Hard')}</option>
                </select>
                
                <select
                  value={filter.subject}
                  onChange={(e) => setFilter({...filter, subject: e.target.value})}
                  className="border border-gray-300 dark:border-gray-600 rounded-md text-sm py-1 px-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  <option value="all">{t('All Subjects')}</option>
                  <option value="math">{t('Mathematics')}</option>
                  <option value="arabic">{t('Arabic')}</option>
                </select>
                
                <select
                  value={filter.bank}
                  onChange={(e) => setFilter({...filter, bank: e.target.value})}
                  className="border border-gray-300 dark:border-gray-600 rounded-md text-sm py-1 px-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  <option value="all">{t('All Banks')}</option>
                  {bankOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={t('Search questions...')}
                  value={filter.search}
                  onChange={(e) => setFilter({...filter, search: e.target.value})}
                  className="border border-gray-300 dark:border-gray-600 rounded-md py-1 px-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                />
                <button
                  onClick={handleNewQuestion}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {t('Add Question')}
                </button>
              </div>
            </div>
            
            {filteredQuestions.length > 0 ? (
              <div className="space-y-4">
                {filteredQuestions.map(question => (
                  <div key={question.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center flex-wrap gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          question.difficulty === 'easy' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : question.difficulty === 'medium'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {t(question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1))}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          question.subject === 'math'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        }`}>
                          {getSubjectLabel(question.subject)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                          Bank {question.bankNumber} ({Math.floor((question.bankNumber - 1) / 4) * 4 + 1}-{Math.floor((question.bankNumber - 1) / 4) * 4 + 4})
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {getTopicName(question.topic)}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditQuestion(question.id)}
                          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-900 dark:text-white mb-3">{question.text}</p>
                    
                    {question.imageUrl && (
                      <div className="mb-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex justify-center">
                        <img 
                          src={question.imageUrl} 
                          alt={t("Question image")} 
                          className="max-h-48 rounded" 
                        />
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {question.options.map(option => (
                        <div 
                          key={option.id}
                          className={`p-2 rounded-md flex items-center ${
                            option.isCorrect
                              ? 'bg-green-50 border border-green-200 dark:bg-green-900/30 dark:border-green-800'
                              : 'bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                          }`}
                        >
                          <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-2 ${
                            option.isCorrect
                              ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200'
                              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            <span className="text-xs font-medium">{option.id.toUpperCase()}</span>
                          </div>
                          <span className="text-sm text-gray-800 dark:text-gray-200">
                            {option.text}
                          </span>
                          {option.isCorrect && (
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  {t('No questions found matching your criteria.')}
                </p>
                <button
                  onClick={handleNewQuestion}
                  className="inline-flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {t('Add your first question')}
                </button>
              </div>
            )}
          </div>
        );
        
      case 'newQuestion':
      case 'editQuestion':
        return (
          <div>
            <div className="flex items-center mb-6">
              <button
                onClick={() => setView('questions')}
                className="mr-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {view === 'newQuestion' ? t('Create New Question') : t('Edit Question')}
              </h3>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="space-y-6">
                {/* Subject selector */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('Subject')}
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="subject"
                        value="math"
                        checked={questionForm.subject === 'math'}
                        onChange={() => handleFormChange('subject', 'math')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 flex items-center">
                        <Calculator className="h-4 w-4 text-blue-600 mr-1" />
                        {t('Mathematics')}
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="subject"
                        value="arabic"
                        checked={questionForm.subject === 'arabic'}
                        onChange={() => handleFormChange('subject', 'arabic')}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 flex items-center">
                        <Languages className="h-4 w-4 text-purple-600 mr-1" />
                        {t('Arabic')}
                      </span>
                    </label>
                  </div>
                </div>
                
                {/* Topic and difficulty selectors */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('Topic')}
                    </label>
                    <select
                      value={questionForm.topic}
                      onChange={(e) => handleFormChange('topic', e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      <option value="">{t('Select a topic')}</option>
                      {topics
                        .filter(topic => {
                          const mathTopics = ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry'];
                          const isMatchSubject = questionForm.subject === 'math' 
                            ? mathTopics.includes(topic.name)
                            : !mathTopics.includes(topic.name);
                          return isMatchSubject;
                        })
                        .map(topic => (
                          <option key={topic.id} value={topic.id}>{topic.name}</option>
                        ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('Difficulty')}
                    </label>
                    <select
                      value={questionForm.difficulty}
                      onChange={(e) => handleFormChange('difficulty', e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      <option value="easy">{t('Easy')}</option>
                      <option value="medium">{t('Medium')}</option>
                      <option value="hard">{t('Hard')}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('Bank Number')}
                    </label>
                    <div className="flex items-center">
                      <select
                        value={questionForm.bankNumber}
                        onChange={(e) => handleFormChange('bankNumber', parseInt(e.target.value))}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      >
                        {bankOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      <div className="ml-2 flex items-center bg-gray-100 dark:bg-gray-700 rounded-md px-2 py-2">
                        <Hash className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 ml-1">{questionForm.bankNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Question text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('Question Text')}
                  </label>
                  <textarea
                    value={questionForm.text}
                    onChange={(e) => handleFormChange('text', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    placeholder={t('Enter your question here...')}
                    dir={questionForm.subject === 'arabic' ? 'rtl' : 'ltr'}
                  ></textarea>
                </div>
                
                {/* Image upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('Question Image')} ({t('optional')})
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={handleImageUpload}
                      className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <Image className="h-4 w-4 mr-2" />
                      {questionForm.imageUrl ? t('Change Image') : t('Upload Image')}
                    </button>
                    {questionForm.imageUrl && (
                      <button
                        onClick={() => handleFormChange('imageUrl', null)}
                        className="ml-2 text-red-600 dark:text-red-400 text-sm hover:underline"
                      >
                        {t('Remove')}
                      </button>
                    )}
                  </div>
                  {questionForm.imageUrl && (
                    <div className="mt-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex justify-center">
                      <img 
                        src={questionForm.imageUrl} 
                        alt={t("Question image")} 
                        className="max-h-48 rounded" 
                      />
                    </div>
                  )}
                </div>
                
                {/* Answer options */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('Answer Options')}
                    </label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {t('Select one correct answer')}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {questionForm.options.map(option => (
                      <div key={option.id} className="flex items-center">
                        <div className="flex-shrink-0 mr-2">
                          <button
                            onClick={() => handleOptionChange(option.id, 'isCorrect', true)}
                            className={`h-6 w-6 rounded-full flex items-center justify-center ${
                              option.isCorrect
                                ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200'
                                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <span className="text-xs font-medium">{option.id.toUpperCase()}</span>
                          </button>
                        </div>
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) => handleOptionChange(option.id, 'text', e.target.value)}
                          className={`flex-1 border rounded-md py-2 px-3 ${
                            option.isCorrect
                              ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/30'
                              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                          } text-gray-700 dark:text-gray-300`}
                          placeholder={`${t('Option')} ${option.id.toUpperCase()}`}
                          dir={questionForm.subject === 'arabic' ? 'rtl' : 'ltr'}
                        />
                        {option.isCorrect && (
                          <span className="ml-2 text-green-600 dark:text-green-400 flex items-center">
                            <CheckCircle className="h-5 w-5" />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex justify-end space-x-3 mt-8">
                  <button
                    onClick={() => setView('questions')}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {t('Cancel')}
                  </button>
                  <button
                    onClick={handleSubmitQuestion}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {view === 'newQuestion' ? t('Create Question') : t('Update Question')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div>
      {renderView()}
    </div>
  );
};

export default GatManagementTab;