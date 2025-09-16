import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface DesktopIcon {
  id: string;
  title: string;
  icon: LucideIcon;
  component: ReactNode;
  position: { x: number; y: number };
  type: 'app' | 'folder' | 'system';
}

export interface OpenWindow {
  id: string;
  title: string;
  component: ReactNode;
  icon: LucideIcon;
  isMaximized: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface TaskbarApp {
  id: string;
  title: string;
  icon: LucideIcon;
  isOpen: boolean;
  isActive: boolean;
}