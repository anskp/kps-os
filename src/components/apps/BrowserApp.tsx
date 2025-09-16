import { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Home, Search, Star, Settings, MoreVertical } from 'lucide-react';

const BrowserApp = () => {
  const [url, setUrl] = useState('https://www.google.com');
  const [history, setHistory] = useState(['https://www.google.com']);
  const [currentIndex, setCurrentIndex] = useState(0);

  const bookmarks = [
    { name: 'Google', url: 'https://www.google.com' },
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com' },
    { name: 'YouTube', url: 'https://www.youtube.com' },
  ];

  const handleNavigate = (newUrl: string) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newUrl);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setUrl(newUrl);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUrl(history[currentIndex - 1]);
    }
  };

  const handleForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUrl(history[currentIndex + 1]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get('search') as string;
    
    if (searchQuery) {
      const newUrl = searchQuery.startsWith('http') 
        ? searchQuery 
        : `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      handleNavigate(newUrl);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Navigation Bar */}
      <div className="bg-gray-100 border-b p-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={handleForward}
            disabled={currentIndex === history.length - 1}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowRight size={18} />
          </button>
          <button className="p-2 rounded hover:bg-gray-200 transition-colors">
            <RotateCcw size={18} />
          </button>
          <button className="p-2 rounded hover:bg-gray-200 transition-colors">
            <Home size={18} />
          </button>
        </div>
      </div>

      {/* Address Bar */}
      <div className="bg-white border-b p-2">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              name="search"
              type="text"
              placeholder="Search Google or type a URL"
              defaultValue={url}
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 rounded hover:bg-gray-100 transition-colors">
            <Star size={18} />
          </button>
          <button className="p-2 rounded hover:bg-gray-100 transition-colors">
            <MoreVertical size={18} />
          </button>
        </form>
      </div>

      {/* Bookmarks Bar */}
      <div className="bg-gray-50 border-b p-2">
        <div className="flex items-center space-x-1">
          {bookmarks.map((bookmark, index) => (
            <button
              key={index}
              onClick={() => handleNavigate(bookmark.url)}
              className="px-3 py-1 text-sm rounded hover:bg-gray-200 transition-colors"
            >
              {bookmark.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white overflow-auto">
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Search size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-light text-gray-800">Google</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="search"
                type="text"
                placeholder="Search Google or type a URL"
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
              <div className="flex justify-center space-x-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors"
                >
                  Google Search
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors"
                >
                  I'm Feeling Lucky
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-100 border-t px-3 py-1 text-xs text-gray-600">
        <span>{url}</span>
      </div>
    </div>
  );
};

export default BrowserApp;