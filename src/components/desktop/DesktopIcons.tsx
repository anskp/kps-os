import { useState } from 'react';
import { 
  Trash2, 
  HardDrive, 
  Folder, 
  Terminal, 
  FileText, 
  Image, 
  Music, 
  Video,
  Chrome,
  Calculator,
  Shield,
  Wallet,
  Activity,
  Play,
  Settings
} from 'lucide-react';
import { DesktopIcon } from '../../types/desktop';
import RecycleBin from '../apps/RecycleBin';
import FileExplorer from '../apps/FileExplorer';
import TerminalApp from '../apps/TerminalApp';
import BlockchainWallet from '../apps/BlockchainWallet';
import SecurityScanner from '../apps/SecurityScanner';
import CalculatorApp from '../apps/CalculatorApp';
import TextEditor from '../apps/TextEditor';
import ImageViewer from '../apps/ImageViewer';
import MediaPlayer from '../apps/MediaPlayer';
import TaskManager from '../apps/TaskManager';
import BrowserApp from '../apps/BrowserApp';

interface DesktopIconsProps {
  onOpenApp: (icon: DesktopIcon) => void;
}

const DesktopIcons = ({ onOpenApp }: DesktopIconsProps) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const desktopIcons: DesktopIcon[] = [
    {
      id: 'recycle-bin',
      title: 'Recycle Bin',
      icon: Trash2,
      component: <RecycleBin />,
      position: { x: 50, y: 50 },
      type: 'system'
    },
    {
      id: 'this-pc',
      title: 'This PC',
      icon: HardDrive,
      component: <FileExplorer />,
      position: { x: 50, y: 150 },
      type: 'system'
    },
    {
      id: 'documents',
      title: 'Documents',
      icon: Folder,
      component: <FileExplorer initialPath="/Documents" />,
      position: { x: 50, y: 250 },
      type: 'folder'
    },
    {
      id: 'terminal',
      title: 'Terminal',
      icon: Terminal,
      component: <TerminalApp />,
      position: { x: 50, y: 350 },
      type: 'app'
    },
    {
      id: 'blockchain-wallet',
      title: 'Blockchain Wallet',
      icon: Wallet,
      component: <BlockchainWallet />,
      position: { x: 50, y: 450 },
      type: 'app'
    },
    {
      id: 'security-scanner',
      title: 'Security Scanner',
      icon: Shield,
      component: <SecurityScanner />,
      position: { x: 170, y: 50 },
      type: 'app'
    },
    {
      id: 'calculator',
      title: 'Calculator',
      icon: Calculator,
      component: <CalculatorApp />,
      position: { x: 170, y: 150 },
      type: 'app'
    },
    {
      id: 'pictures',
      title: 'Pictures',
      icon: Image,
      component: <FileExplorer initialPath="/Pictures" />,
      position: { x: 170, y: 250 },
      type: 'folder'
    },
    {
      id: 'music',
      title: 'Music',
      icon: Music,
      component: <FileExplorer initialPath="/Music" />,
      position: { x: 170, y: 350 },
      type: 'folder'
    },
    {
      id: 'videos',
      title: 'Videos',
      icon: Video,
      component: <FileExplorer initialPath="/Videos" />,
      position: { x: 170, y: 450 },
      type: 'folder'
    },
    {
      id: 'notepad',
      title: 'Notepad',
      icon: FileText,
      component: <TextEditor />,
      position: { x: 290, y: 50 },
      type: 'app'
    },
    {
      id: 'image-viewer',
      title: 'Photos',
      icon: Image,
      component: <ImageViewer />,
      position: { x: 290, y: 150 },
      type: 'app'
    },
    {
      id: 'media-player',
      title: 'Media Player',
      icon: Play,
      component: <MediaPlayer />,
      position: { x: 290, y: 250 },
      type: 'app'
    },
    {
      id: 'task-manager',
      title: 'Task Manager',
      icon: Activity,
      component: <TaskManager />,
      position: { x: 290, y: 350 },
      type: 'app'
    },
    {
      id: 'browser',
      title: 'Browser',
      icon: Chrome,
      component: <BrowserApp />,
      position: { x: 290, y: 450 },
      type: 'app'
    }
  ];

  const handleIconClick = (icon: DesktopIcon) => {
    setSelectedIcon(icon.id);
    onOpenApp(icon);
  };

  const handleIconDoubleClick = (icon: DesktopIcon) => {
    onOpenApp(icon);
  };

  const handleDesktopClick = () => {
    setSelectedIcon(null);
  };

  return (
    <div 
      className="absolute inset-0 z-10"
      onClick={handleDesktopClick}
    >
      {desktopIcons.map((icon) => {
        const IconComponent = icon.icon;
        const isSelected = selectedIcon === icon.id;
        
        return (
          <div
            key={icon.id}
            className={`absolute cursor-pointer select-none group ${
              isSelected ? 'bg-blue-500/30 border border-blue-400/50' : ''
            } rounded p-2 hover:bg-white/10 transition-colors duration-200`}
            style={{ 
              left: icon.position.x, 
              top: icon.position.y,
              width: '80px',
              height: '80px'
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleIconClick(icon);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              handleIconDoubleClick(icon);
            }}
          >
            <div className="flex flex-col items-center justify-center h-full text-white">
              <IconComponent 
                size={32} 
                className="mb-1 drop-shadow-lg group-hover:scale-110 transition-transform duration-200" 
              />
              <span className="text-xs text-center font-medium drop-shadow-md leading-tight">
                {icon.title}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DesktopIcons;