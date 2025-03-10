import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Save, X, Calendar, Tag, MessageSquare,
  AlertTriangle, Info, Check, Bell, ChevronDown, ChevronUp
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

// Mock initial announcements data
const initialAnnouncements = [
  {
    id: '1',
    title: 'GAT preparation workshops will be held this weekend',
    content: 'We are hosting a series of GAT preparation workshops this weekend. The sessions will cover key topics and strategies for success. Register now to secure your spot!',
    date: '2025-03-08',
    category: 'General',
    isPublished: true,
    isNew: true,
    author: 'Admin'
  },
  {
    id: '2',
    title: 'New practice exams have been added to the system',
    content: 'We have added several new practice exams to the system. These cover a wide range of topics and difficulty levels to help you prepare for your upcoming tests.',
    date: '2025-03-07',
    category: 'New Feature',
    isPublished: true,
    isNew: true,
    author: 'Admin'
  },
  {
    id: '3',
    title: 'System will be under maintenance on Friday night from 11 PM to 2 AM',
    content: 'Our system will be undergoing scheduled maintenance this Friday night from 11 PM to 2 AM. During this time, the platform may be temporarily unavailable. We apologize for any inconvenience this may cause.',
    date: '2025-03-05',
    category: 'System Maintenance',
    isPublished: true,
    isNew: false,
    author: 'System'
  },
  {
    id: '4',
    title: 'The new GAT Training module is now available',
    content: 'We are excited to announce that our new GAT Training module is now available! This comprehensive module includes practice questions, study guides, and performance tracking to help you excel in your exams.',
    date: '2025-03-01',
    category: 'New Feature',
    isPublished: true,
    isNew: false,
    author: 'Admin'
  },
  {
    id: '5',
    title: 'Draft announcement - not published',
    content: 'This is a draft announcement that has not been published yet. Only administrators can see this.',
    date: '2025-03-10',
    category: 'General',
    isPublished: false,
    isNew: false,
    author: 'Admin'
  }
];

const NewsManagementTab = () => {
  const { t } = useAppContext();
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [filter, setFilter] = useState('all'); // 'all', 'published', 'drafts'
  const [sort, setSort] = useState('newest'); // 'newest', 'oldest'
  const [editingId, setEditingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  
  // Form state for editing/creating announcements
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    isPublished: true,
    isNew: true
  });
  
  // Available announcement categories
  const categories = [
    'General',
    'Urgent',
    'System Maintenance',
    'New Feature',
    'Exam Updates'
  ];
  
  // Toggle announcement expansion
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  // Handle starting to create a new announcement
  const handleNewAnnouncement = () => {
    setEditingId('new');
    setFormData({
      title: '',
      content: '',
      category: 'General',
      isPublished: true,
      isNew: true
    });
  };
  
  // Handle starting to edit an announcement
  const handleEditAnnouncement = (announcement) => {
    setEditingId(announcement.id);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      category: announcement.category,
      isPublished: announcement.isPublished,
      isNew: announcement.isNew
    });
  };
  
  // Handle canceling edit/create
  const handleCancelEdit = () => {
    setEditingId(null);
  };
  
  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  // Handle form submission
  const handleSubmitAnnouncement = () => {
    // Validate form
    if (!formData.title.trim() || !formData.content.trim()) {
      alert(t('Please fill in all required fields.'));
      return;
    }
    
    if (editingId === 'new') {
      // Create new announcement
      const newAnnouncement = {
        ...formData,
        id: (Math.max(...announcements.map(a => parseInt(a.id))) + 1).toString(),
        date: new Date().toISOString().split('T')[0],
        author: 'Admin'
      };
      
      setAnnouncements([newAnnouncement, ...announcements]);
    } else {
      // Update existing announcement
      const updatedAnnouncements = announcements.map(announcement => {
        if (announcement.id === editingId) {
          return {
            ...announcement,
            ...formData
          };
        }
        return announcement;
      });
      
      setAnnouncements(updatedAnnouncements);
    }
    
    setEditingId(null);
  };
  
  // Handle deleting an announcement
  const handleDeleteAnnouncement = (id) => {
    if (window.confirm(t('Are you sure you want to delete this announcement?'))) {
      const updatedAnnouncements = announcements.filter(announcement => announcement.id !== id);
      setAnnouncements(updatedAnnouncements);
      
      if (editingId === id) {
        setEditingId(null);
      }
    }
  };
  
  // Handle toggling publish status
  const handleTogglePublish = (id) => {
    const updatedAnnouncements = announcements.map(announcement => {
      if (announcement.id === id) {
        return {
          ...announcement,
          isPublished: !announcement.isPublished
        };
      }
      return announcement;
    });
    
    setAnnouncements(updatedAnnouncements);
  };
  
  // Get category color based on category name
  const getCategoryColor = (category) => {
    switch(category) {
      case 'Urgent':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'New Feature':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'System Maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'Exam Updates':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    }
  };
  
  // Get category icon based on category name
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Urgent':
        return <AlertTriangle className="h-4 w-4" />;
      case 'New Feature':
        return <Info className="h-4 w-4" />;
      case 'System Maintenance':
        return <Tag className="h-4 w-4" />;
      case 'Exam Updates':
        return <Calendar className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };
  
  // Filter and sort announcements
  const filteredAnnouncements = announcements
    .filter(announcement => {
      if (filter === 'published') return announcement.isPublished;
      if (filter === 'drafts') return !announcement.isPublished;
      return true; // 'all'
    })
    .sort((a, b) => {
      if (sort === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });
  
  return (
    <div>
      {/* Header with filters and actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-3 md:space-y-0">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-1" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">{t('Announcements Management')}</h2>
        </div>
        
        <div className="flex flex-wrap items-center space-x-2">
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-sm ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {t('All')}
            </button>
            <button
              onClick={() => setFilter('published')}
              className={`px-3 py-1 text-sm ${
                filter === 'published'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {t('Published')}
            </button>
            <button
              onClick={() => setFilter('drafts')}
              className={`px-3 py-1 text-sm ${
                filter === 'drafts'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {t('Drafts')}
            </button>
          </div>
          
          <button
            onClick={() => setSort(sort === 'newest' ? 'oldest' : 'newest')}
            className="flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
          >
            {sort === 'newest' ? (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                {t('Newest')}
              </>
            ) : (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                {t('Oldest')}
              </>
            )}
          </button>
          
          <button
            onClick={handleNewAnnouncement}
            className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            {t('New Announcement')}
          </button>
        </div>
      </div>
      
      {/* Editing form */}
      {editingId && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {editingId === 'new' ? t('Create New Announcement') : t('Edit Announcement')}
            </h3>
            <button
              onClick={handleCancelEdit}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('Title')} *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                placeholder={t('Enter announcement title')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('Content')} *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows={4}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                placeholder={t('Enter announcement content')}
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('Category')}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{t(category)}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex space-x-4 items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    {t('Publish immediately')}
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isNew"
                    checked={formData.isNew}
                    onChange={(e) => handleInputChange('isNew', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isNew" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    {t('Mark as new')}
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {t('Cancel')}
              </button>
              <button
                onClick={handleSubmitAnnouncement}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingId === 'new' ? t('Create') : t('Update')}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Announcement list */}
      {filteredAnnouncements.length > 0 ? (
        <div className="space-y-4">
          {filteredAnnouncements.map(announcement => (
            <div 
              key={announcement.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border ${
                announcement.isPublished
                  ? 'border-gray-200 dark:border-gray-700'
                  : 'border-yellow-300 dark:border-yellow-700'
              }`}
            >
              <div className="p-4">
                <div className="flex flex-wrap justify-between items-start mb-2">
                  <div className="flex items-center">
                    <span className={`flex items-center px-2 py-1 text-xs font-medium rounded-md ${getCategoryColor(announcement.category)}`}>
                      {getCategoryIcon(announcement.category)}
                      <span className="ml-1">{t(announcement.category)}</span>
                    </span>
                    {announcement.isNew && (
                      <span className="ml-2 px-2 py-1 text-xs font-medium rounded-md bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                        {t('New')}
                      </span>
                    )}
                    {!announcement.isPublished && (
                      <span className="ml-2 px-2 py-1 text-xs font-medium rounded-md bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                        {t('Draft')}
                      </span>
                    )}
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {announcement.date}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => handleTogglePublish(announcement.id)}
                      className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        announcement.isPublished
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-yellow-600 dark:text-yellow-400'
                      }`}
                      title={announcement.isPublished ? t('Unpublish') : t('Publish')}
                    >
                      {announcement.isPublished ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Info className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEditAnnouncement(announcement)}
                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400"
                      title={t('Edit')}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
                      title={t('Delete')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => toggleExpand(announcement.id)}
                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                      title={expandedId === announcement.id ? t('Collapse') : t('Expand')}
                    >
                      {expandedId === announcement.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {announcement.title}
                </h3>
                
                {expandedId === announcement.id ? (
                  <div className="text-gray-600 dark:text-gray-300">
                    {announcement.content}
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {t('Posted by')}: {announcement.author}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                    {announcement.content}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <Bell className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {filter === 'drafts' 
              ? t('No draft announcements found.')
              : filter === 'published'
                ? t('No published announcements found.')
                : t('No announcements found.')}
          </p>
          <button
            onClick={handleNewAnnouncement}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" />
            {t('Create your first announcement')}
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsManagementTab;