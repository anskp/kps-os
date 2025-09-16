import { useState } from 'react';
import { 
  Search, 
  Settings, 
  Power, 
  User,
  Calculator,
  Terminal,
  Shield,
  Wallet,
  HardDrive,
  Folder
} from 'lucide-react';

interface StartMenuProps {
  onClose: () => void;
}

const StartMenu = ({ onClose }: StartMenuProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const pinnedApps = [
    { icon: Calculator, name: 'Calculator', id: 'calculator' },
    { icon: Terminal, name: 'Terminal', id: 'terminal' },
    { icon: Shield, name: 'Security Scanner', id: 'security-scanner' },
    { icon: Wallet, name: 'Blockchain Wallet', id: 'blockchain-wallet' },
    { icon: HardDrive, name: 'This PC', id: 'this-pc' },
    { icon: Folder, name: 'File Explorer', id: 'file-explorer' },
  ];

  const recentFiles = [
    'Document1.txt',
    'Project_Files.zip',
    'meeting_notes.docx',
    'screenshot.png',
    'budget.xlsx'
  ];

  return (
    <div 
      className="fixed inset-0 z-50"
      onClick={onClose}
    >
      <div 
        className="absolute bottom-12 left-2 w-80 h-96 bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
            <input
              type="text"
              placeholder="Type here to search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded px-10 py-2 text-white placeholder-white/60 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          {/* Pinned Apps */}
          <div className="mb-4">
            <h3 className="text-white/80 text-xs font-medium mb-2 uppercase tracking-wide">Pinned</h3>
            <div className="grid grid-cols-3 gap-2">
              {pinnedApps.slice(0, 6).map((app) => {
                const IconComponent = app.icon;
                return (
                  <button
                    key={app.id}
                    className="flex flex-col items-center p-2 rounded hover:bg-white/10 transition-colors"
                    onClick={() => {
                      // Handle app launch
                      onClose();
                    }}
                  >
                    <IconComponent size={20} className="text-white mb-1" />
                    <span className="text-white text-xs text-center leading-tight">{app.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Files */}
          <div>
            <h3 className="text-white/80 text-xs font-medium mb-2 uppercase tracking-wide">Recent</h3>
            <div className="space-y-1">
              {recentFiles.slice(0, 4).map((file, index) => (
                <button
                  key={index}
                  className="w-full flex items-center p-2 rounded hover:bg-white/10 transition-colors text-left"
                >
                  <Folder size={16} className="text-white/60 mr-3" />
                  <span className="text-white text-sm truncate">{file}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex justify-between items-center">
          <button className="flex items-center space-x-2 text-white hover:bg-white/10 px-3 py-2 rounded transition-colors">
            <User size={16} />
            <span className="text-sm">User</span>
          </button>
          
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-white/10 rounded transition-colors" title="Settings">
              <Settings size={16} className="text-white" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded transition-colors" title="Power">
              <Power size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;