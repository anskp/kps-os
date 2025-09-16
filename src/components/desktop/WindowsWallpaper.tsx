export const WindowsWallpaper = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Windows 11 Blue Flow Wallpaper */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* Flowing shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]">
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full opacity-80"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Main flowing shape */}
              <path
                d="M200 300 Q400 100 600 300 Q400 500 200 300"
                fill="url(#gradient1)"
                className="animate-pulse"
              />
              <path
                d="M150 250 Q350 50 550 250 Q350 450 150 250"
                fill="url(#gradient2)"
                className="animate-pulse"
                style={{ animationDelay: '1s' }}
              />
              <path
                d="M100 200 Q300 0 500 200 Q300 400 100 200"
                fill="url(#gradient3)"
                className="animate-pulse"
                style={{ animationDelay: '2s' }}
              />
              
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.7" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#A855F7" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
    </div>
  );
};