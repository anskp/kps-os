import { useState, useRef, useEffect } from 'react';
import { Minus, Square, X, Maximize2 } from 'lucide-react';
import { OpenWindow } from '../../types/desktop';

interface WindowManagerProps {
  windows: OpenWindow[];
  activeWindow: string | null;
  onCloseWindow: (windowId: string) => void;
  onMinimizeWindow: (windowId: string) => void;
  onMaximizeWindow: (windowId: string) => void;
  onFocusWindow: (windowId: string) => void;
  setWindows: React.Dispatch<React.SetStateAction<OpenWindow[]>>;
}

const WindowManager = ({
  windows,
  activeWindow,
  onCloseWindow,
  onMinimizeWindow,
  onMaximizeWindow,
  onFocusWindow,
  setWindows
}: WindowManagerProps) => {
  const [dragData, setDragData] = useState<{
    windowId: string;
    isDragging: boolean;
    offset: { x: number; y: number };
  } | null>(null);

  const [resizeData, setResizeData] = useState<{
    windowId: string;
    isResizing: boolean;
    startPos: { x: number; y: number };
    startSize: { width: number; height: number };
  } | null>(null);

  const handleMouseDown = (e: React.MouseEvent, windowId: string, type: 'drag' | 'resize') => {
    e.preventDefault();
    onFocusWindow(windowId);

    const window = windows.find(w => w.id === windowId);
    if (!window) return;

    if (type === 'drag') {
      setDragData({
        windowId,
        isDragging: true,
        offset: {
          x: e.clientX - window.position.x,
          y: e.clientY - window.position.y
        }
      });
    } else if (type === 'resize') {
      setResizeData({
        windowId,
        isResizing: true,
        startPos: { x: e.clientX, y: e.clientY },
        startSize: { width: window.size.width, height: window.size.height }
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragData?.isDragging) {
        setWindows(prev => prev.map(w => 
          w.id === dragData.windowId 
            ? {
                ...w,
                position: {
                  x: Math.max(0, e.clientX - dragData.offset.x),
                  y: Math.max(0, e.clientY - dragData.offset.y)
                }
              }
            : w
        ));
      }

      if (resizeData?.isResizing) {
        const deltaX = e.clientX - resizeData.startPos.x;
        const deltaY = e.clientY - resizeData.startPos.y;
        
        setWindows(prev => prev.map(w => 
          w.id === resizeData.windowId 
            ? {
                ...w,
                size: {
                  width: Math.max(300, resizeData.startSize.width + deltaX),
                  height: Math.max(200, resizeData.startSize.height + deltaY)
                }
              }
            : w
        ));
      }
    };

    const handleMouseUp = () => {
      setDragData(null);
      setResizeData(null);
    };

    if (dragData?.isDragging || resizeData?.isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragData, resizeData, setWindows]);

  return (
    <div className="absolute inset-0 z-30 pointer-events-none">
      {windows
        .filter(w => !w.isMinimized)
        .map((window, index) => {
          const IconComponent = window.icon;
          const isActive = activeWindow === window.id;
          const zIndex = isActive ? 1000 : 900 - index;

          return (
            <div
              key={window.id}
              className="absolute pointer-events-auto"
              style={{
                left: window.isMaximized ? 0 : window.position.x,
                top: window.isMaximized ? 0 : window.position.y,
                width: window.isMaximized ? '100vw' : window.size.width,
                height: window.isMaximized ? 'calc(100vh - 48px)' : window.size.height,
                zIndex
              }}
            >
              {/* Window */}
              <div 
                className={`h-full bg-gray-900/95 backdrop-blur-lg border rounded-lg shadow-2xl overflow-hidden ${
                  isActive ? 'border-blue-500/50' : 'border-gray-700/50'
                }`}
                onClick={() => onFocusWindow(window.id)}
              >
                {/* Title Bar */}
                <div
                  className={`h-8 flex items-center justify-between px-4 cursor-move select-none ${
                    isActive ? 'bg-blue-600/20' : 'bg-gray-800/50'
                  }`}
                  onMouseDown={(e) => handleMouseDown(e, window.id, 'drag')}
                >
                  <div className="flex items-center space-x-2">
                    <IconComponent size={14} className="text-white" />
                    <span className="text-white text-sm font-medium truncate">
                      {window.title}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMinimizeWindow(window.id);
                      }}
                      className="w-6 h-6 rounded hover:bg-white/10 flex items-center justify-center transition-colors"
                    >
                      <Minus size={12} className="text-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMaximizeWindow(window.id);
                      }}
                      className="w-6 h-6 rounded hover:bg-white/10 flex items-center justify-center transition-colors"
                    >
                      {window.isMaximized ? (
                        <Square size={10} className="text-white" />
                      ) : (
                        <Maximize2 size={10} className="text-white" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCloseWindow(window.id);
                      }}
                      className="w-6 h-6 rounded hover:bg-red-500/20 flex items-center justify-center transition-colors"
                    >
                      <X size={12} className="text-white" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="h-full pb-8 overflow-auto bg-white text-black">
                  {window.component}
                </div>

                {/* Resize Handle */}
                {!window.isMaximized && (
                  <div
                    className="absolute bottom-0 right-0 w-4 h-4 cursor-nw-resize"
                    onMouseDown={(e) => handleMouseDown(e, window.id, 'resize')}
                  >
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-gray-400"></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default WindowManager;