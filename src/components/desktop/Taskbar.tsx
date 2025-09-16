import { useState } from 'react';
import { 
  Search, 
  Settings, 
  Power, 
  Wifi, 
  Volume2, 
  Battery,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { OpenWindow } from '../../types/desktop';
import StartMenu from './StartMenu';

interface TaskbarProps {
  openWindows: OpenWindow[];
  activeWindow: string | null;
  onFocusWindow: (windowId: string) => void;
  onMinimizeWindow: (windowId: string) => void;
}

const Taskbar = ({ openWindows, activeWindow, onFocusWindow, onMinimizeWindow }: TaskbarProps) => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useState(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleTaskbarAppClick = (windowId: string) => {
    const window = openWindows.find(w => w.id === windowId);
    if (!window) return;

    if (window.isMinimized || activeWindow !== windowId) {
      onFocusWindow(windowId);
    } else {
      onMinimizeWindow(windowId);
    }
  };

  return (
    <>
      {/* Start Menu */}
      {isStartMenuOpen && (
        <StartMenu onClose={() => setIsStartMenuOpen(false)} />
      )}
      
      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/80 backdrop-blur-lg border-t border-white/10 flex items-center px-2 z-50">
        {/* Start Button */}
        <button
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          className={`w-12 h-8 rounded flex items-center justify-center hover:bg-white/10 transition-colors ${
            isStartMenuOpen ? 'bg-white/20' : ''
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
            <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z"/>
          </svg>
        </button>

        {/* Search Box */}
        <div className="ml-2 flex items-center bg-white/10 rounded px-3 py-1 hover:bg-white/20 transition-colors cursor-text">
          <Search size={14} className="text-white/60 mr-2" />
          <span className="text-white/60 text-sm">Search</span>
        </div>

        {/* Open Windows */}
        <div className="flex ml-4 space-x-1">
          {openWindows.map((window) => {
            const IconComponent = window.icon;
            const isActive = activeWindow === window.id;
            
            return (
              <button
                key={window.id}
                onClick={() => handleTaskbarAppClick(window.id)}
                className={`w-10 h-8 rounded flex items-center justify-center transition-colors ${
                  isActive 
                    ? 'bg-white/30 border-b-2 border-blue-400' 
                    : 'hover:bg-white/10'
                } ${window.isMinimized ? 'opacity-60' : ''}`}
                title={window.title}
              >
                <IconComponent size={16} className="text-white" />
              </button>
            );
          })}
        </div>

        {/* Right Side - System Tray */}
        <div className="ml-auto flex items-center space-x-2">
          {/* System Icons */}
          <div className="flex items-center space-x-1 text-white">
            <Wifi size={14} className="opacity-80" />
            <Volume2 size={14} className="opacity-80" />
            <Battery size={14} className="opacity-80" />
          </div>

          {/* Date and Time */}
          <div className="text-white text-xs text-right leading-tight cursor-pointer hover:bg-white/10 px-2 py-1 rounded">
            <div className="font-medium">{formatTime(currentTime)}</div>
            <div className="opacity-80">{formatDate(currentTime)}</div>
          </div>

          {/* Action Center */}
          <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-white/10 transition-colors">
            <MessageSquare size={14} className="text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Taskbar;