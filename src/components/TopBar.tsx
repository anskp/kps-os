import { useState, useEffect } from 'react';
import { Cpu, Wifi, Battery, Circle } from 'lucide-react';

interface TopBarProps {
  systemReady: boolean;
}

const TopBar = ({ systemReady }: TopBarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (systemReady) {
      // Show welcome notifications
      const welcomeMessages = [
        "Welcome back, Developer!",
        "All systems operational",
        "Digital Playground loaded"
      ];

      welcomeMessages.forEach((message, index) => {
        setTimeout(() => {
          setNotifications(prev => [...prev, message]);
          setTimeout(() => {
            setNotifications(prev => prev.filter(m => m !== message));
          }, 3000);
        }, index * 1000);
      });
    }
  }, [systemReady]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <header className="glass-card m-4 mb-0 p-4 animate-slide-in-top">
      <div className="flex items-center justify-between">
        {/* Left: Logo & Status */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Circle className="w-3 h-3 text-primary fill-primary animate-pulse-glow" />
            <span className="font-orbitron font-bold text-lg text-gradient">
              DIGITAL.OS
            </span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Cpu className="w-4 h-4" />
            <span>System Ready</span>
          </div>
        </div>

        {/* Center: Notifications */}
        <div className="flex-1 flex justify-center">
          <div className="h-6 overflow-hidden">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="text-sm text-primary-glow animate-slide-in-top"
              >
                {notification}
              </div>
            ))}
          </div>
        </div>

        {/* Right: System Info */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Wifi className="w-4 h-4 text-primary" />
            <Battery className="w-4 h-4 text-secondary" />
          </div>
          <div className="text-right">
            <div className="font-orbitron font-bold text-foreground">
              {formatTime(currentTime)}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;