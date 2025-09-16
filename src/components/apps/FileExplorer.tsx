import { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUp, 
  Home, 
  Folder, 
  FileText, 
  Image, 
  Music, 
  Video,
  Archive,
  Code,
  Search,
  MoreVertical
} from 'lucide-react';

interface FileExplorerProps {
  initialPath?: string;
}

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  size?: string;
  modified: string;
  icon: React.ComponentType<any>;
}

const FileExplorer = ({ initialPath = 'This PC' }: FileExplorerProps) => {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const getFileIcon = (fileName: string, type: string) => {
    if (type === 'folder') return Folder;
    
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return Image;
      case 'mp3':
      case 'wav':
      case 'flac':
        return Music;
      case 'mp4':
      case 'avi':
      case 'mkv':
        return Video;
      case 'zip':
      case 'rar':
      case '7z':
        return Archive;
      case 'js':
      case 'ts':
      case 'html':
      case 'css':
        return Code;
      default:
        return FileText;
    }
  };

  const mockFiles: FileItem[] = [
    { name: 'Documents', type: 'folder', modified: '1/15/2024 2:30 PM', icon: Folder },
    { name: 'Downloads', type: 'folder', modified: '1/15/2024 1:45 PM', icon: Folder },
    { name: 'Pictures', type: 'folder', modified: '1/14/2024 5:20 PM', icon: Folder },
    { name: 'Music', type: 'folder', modified: '1/14/2024 3:15 PM', icon: Folder },
    { name: 'Videos', type: 'folder', modified: '1/13/2024 8:30 AM', icon: Folder },
    { name: 'project.zip', type: 'file', size: '2.5 MB', modified: '1/15/2024 11:20 AM', icon: Archive },
    { name: 'document.pdf', type: 'file', size: '1.2 MB', modified: '1/15/2024 9:45 AM', icon: FileText },
    { name: 'photo.jpg', type: 'file', size: '3.8 MB', modified: '1/14/2024 4:30 PM', icon: Image },
    { name: 'song.mp3', type: 'file', size: '4.2 MB', modified: '1/14/2024 2:15 PM', icon: Music },
    { name: 'video.mp4', type: 'file', size: '25.1 MB', modified: '1/13/2024 7:20 PM', icon: Video },
  ];

  const handleItemClick = (itemName: string) => {
    if (selectedItems.includes(itemName)) {
      setSelectedItems(selectedItems.filter(item => item !== itemName));
    } else {
      setSelectedItems([itemName]);
    }
  };

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      setCurrentPath(currentPath === 'This PC' ? item.name : `${currentPath}\\${item.name}`);
      setSelectedItems([]);
    }
  };

  const navigateUp = () => {
    if (currentPath === 'This PC') return;
    
    const parts = currentPath.split('\\');
    if (parts.length === 1) {
      setCurrentPath('This PC');
    } else {
      parts.pop();
      setCurrentPath(parts.join('\\'));
    }
    setSelectedItems([]);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="flex items-center p-2 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-1">
          <button className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50">
            <ArrowLeft size={16} />
          </button>
          <button className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50">
            <ArrowRight size={16} />
          </button>
          <button 
            onClick={navigateUp}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50"
            disabled={currentPath === 'This PC'}
          >
            <ArrowUp size={16} />
          </button>
        </div>
        
        <div className="mx-4 flex-1 flex items-center bg-white border border-gray-300 rounded px-3 py-1">
          <Home size={14} className="text-gray-500 mr-2" />
          <span className="text-sm">{currentPath}</span>
        </div>
        
        <div className="flex items-center bg-white border border-gray-300 rounded px-3 py-1">
          <Search size={14} className="text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search" 
            className="text-sm outline-none w-32"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {/* List View */}
        <div className="p-2">
          <div className="grid gap-1">
            {mockFiles.map((item) => {
              const IconComponent = item.icon;
              const isSelected = selectedItems.includes(item.name);
              
              return (
                <div
                  key={item.name}
                  className={`flex items-center p-2 rounded cursor-pointer hover:bg-blue-50 ${
                    isSelected ? 'bg-blue-100 border border-blue-300' : ''
                  }`}
                  onClick={() => handleItemClick(item.name)}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                >
                  <IconComponent 
                    size={16} 
                    className={`mr-3 ${item.type === 'folder' ? 'text-yellow-600' : 'text-gray-600'}`} 
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{item.name}</div>
                  </div>
                  <div className="text-xs text-gray-500 w-20 text-right">
                    {item.size || '-'}
                  </div>
                  <div className="text-xs text-gray-500 w-32 text-right ml-4">
                    {item.modified}
                  </div>
                  <button className="ml-2 p-1 rounded hover:bg-gray-200">
                    <MoreVertical size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="p-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
        {mockFiles.length} items | {selectedItems.length} selected
      </div>
    </div>
  );
};

export default FileExplorer;