import { LucideIcon } from 'lucide-react';
import { 
  Coins, 
  Dumbbell, 
  Shield, 
  Building2, 
  FlaskConical,
  Calculator,
  Bot,
  Music
} from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  icon: LucideIcon;
  category: 'real' | 'fake';
  mascot: string;
  color: 'primary' | 'secondary' | 'accent';
  demoUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'blockchain-bank',
    title: 'Blockchain Bank',
    description: 'Smart-contract-powered decentralized banking demo with tokenized accounts and DeFi protocols.',
    techStack: ['Solidity', 'Hardhat', 'Polygon', 'Thirdweb', 'Fireblocks'],
    icon: Coins,
    category: 'real',
    mascot: '🤖',
    color: 'primary',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'ai-fitness-coach',
    title: 'AI Fitness Coach',
    description: 'AI-powered personal trainer analyzing workouts & diet plans with computer vision.',
    techStack: ['React Native', 'TensorFlow.js', 'OpenAI API'],
    icon: Dumbbell,
    category: 'real',
    mascot: '💪',
    color: 'secondary',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'cybersecurity-scanner',
    title: 'Cybersecurity Scanner',
    description: 'Interactive 3D security scanner visualizing vulnerabilities in real-time with threat analysis.',
    techStack: ['React Three Fiber', 'Node.js', 'Express', 'OWASP ZAP API'],
    icon: Shield,
    category: 'real',
    mascot: '🛡️',
    color: 'accent',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'rwa-tokenization',
    title: 'RWA Tokenization Machine',
    description: 'Tokenizes real-world assets like gold & real estate into blockchain tokens with compliance.',
    techStack: ['Next.js', 'Truvera API', 'Crossmint', 'DIDKit', 'IPFS'],
    icon: Building2,
    category: 'real',
    mascot: '🏗️',
    color: 'primary',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'data-science-lab',
    title: 'Data Science Lab',
    description: 'Visual lab for ML experiments with interactive charts & predictions using advanced algorithms.',
    techStack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Flask', 'D3.js'],
    icon: FlaskConical,
    category: 'real',
    mascot: '🧪',
    color: 'secondary',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'calculator-app',
    title: 'Calculator App',
    description: 'A fully functional calculator with advanced mathematical operations and memory functions.',
    techStack: ['Vanilla JS', 'CSS3', 'HTML5'],
    icon: Calculator,
    category: 'fake',
    mascot: '🔢',
    color: 'accent',
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    description: 'Smart chatbot assistant with natural language processing and contextual responses.',
    techStack: ['React', 'OpenAI API', 'WebSocket'],
    icon: Bot,
    category: 'fake',
    mascot: '🤖',
    color: 'primary',
  },
  {
    id: 'music-player',
    title: 'Music Player',
    description: 'Feature-rich music player with playlist management and audio visualization.',
    techStack: ['React', 'Web Audio API', 'Canvas'],
    icon: Music,
    category: 'fake',
    mascot: '🎵',
    color: 'secondary',
  }
];