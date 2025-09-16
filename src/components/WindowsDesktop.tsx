import { useState } from 'react';
import Taskbar from './desktop/Taskbar';
import DesktopIcons from './desktop/DesktopIcons';
import WindowManager from './desktop/WindowManager';
import { WindowsWallpaper } from './desktop/WindowsWallpaper';
import { DesktopIcon, OpenWindow } from '../types/desktop';

const WindowsDesktop = () => {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const handleOpenApp = (icon: DesktopIcon) => {
    const existingWindow = openWindows.find(w => w.id === icon.id);
    
    if (existingWindow) {
      // Focus existing window
      setActiveWindow(icon.id);
      setOpenWindows(prev => 
        prev.map(w => 
          w.id === icon.id 
            ? { ...w, isMinimized: false }
            : w
        )
      );
    } else {
      // Open new window
      const newWindow: OpenWindow = {
        id: icon.id,
        title: icon.title,
        component: icon.component,
        icon: icon.icon,
        isMaximized: false,
        isMinimized: false,
        position: { x: 100 + openWindows.length * 30, y: 100 + openWindows.length * 30 },
        size: { width: 800, height: 600 }
      };
      
      setOpenWindows(prev => [...prev, newWindow]);
      setActiveWindow(icon.id);
    }
  };

  const handleCloseWindow = (windowId: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== windowId));
    if (activeWindow === windowId) {
      const remainingWindows = openWindows.filter(w => w.id !== windowId);
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null);
    }
  };

  const handleMinimizeWindow = (windowId: string) => {
    setOpenWindows(prev => 
      prev.map(w => 
        w.id === windowId 
          ? { ...w, isMinimized: true }
          : w
      )
    );
  };

  const handleMaximizeWindow = (windowId: string) => {
    setOpenWindows(prev => 
      prev.map(w => 
        w.id === windowId 
          ? { ...w, isMaximized: !w.isMaximized }
          : w
      )
    );
  };

  const handleFocusWindow = (windowId: string) => {
    setActiveWindow(windowId);
    setOpenWindows(prev => 
      prev.map(w => 
        w.id === windowId 
          ? { ...w, isMinimized: false }
          : w
      )
    );
  };

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      {/* Windows 11 Wallpaper */}
      <WindowsWallpaper />
      
      {/* Desktop Icons */}
      <DesktopIcons onOpenApp={handleOpenApp} />
      
      {/* Window Manager */}
      <WindowManager
        windows={openWindows}
        activeWindow={activeWindow}
        onCloseWindow={handleCloseWindow}
        onMinimizeWindow={handleMinimizeWindow}
        onMaximizeWindow={handleMaximizeWindow}
        onFocusWindow={handleFocusWindow}
        setWindows={setOpenWindows}
      />
      
      {/* Taskbar */}
      <Taskbar 
        openWindows={openWindows}
        activeWindow={activeWindow}
        onFocusWindow={handleFocusWindow}
        onMinimizeWindow={handleMinimizeWindow}
      />
    </div>
  );
};

export default WindowsDesktop;