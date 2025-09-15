import { useState } from 'react';
import { Project } from '../data/projects';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { X, Minus, ExternalLink, Github } from 'lucide-react';

// Import app components
import BlockchainWallet from './apps/BlockchainWallet';
import FitnessTracker from './apps/FitnessTracker';
import SecurityScanner from './apps/SecurityScanner';
import CalculatorApp from './apps/CalculatorApp';

interface ProjectWindowProps {
  project: Project;
  onClose: () => void;
}

const ProjectWindow = ({ project, onClose }: ProjectWindowProps) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const getColorClass = (color: string) => {
    switch (color) {
      case 'primary': return 'text-primary';
      case 'secondary': return 'text-secondary';
      case 'accent': return 'text-accent';
      default: return 'text-primary';
    }
  };

  const getBorderClass = (color: string) => {
    switch (color) {
      case 'primary': return 'border-primary/30';
      case 'secondary': return 'border-secondary/30';
      case 'accent': return 'border-accent/30';
      default: return 'border-primary/30';
    }
  };

  const renderAppContent = () => {
    switch (project.id) {
      case 'blockchain-bank':
        return <BlockchainWallet />;
      case 'ai-fitness-coach':
        return <FitnessTracker />;
      case 'cybersecurity-scanner':
        return <SecurityScanner />;
      case 'calculator-app':
        return <CalculatorApp />;
      default:
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 ${getColorClass(project.color)}`}>
                <project.icon size={64} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{project.title}</h2>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="bg-muted/50">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {project.category === 'real' && (
              <div className="flex space-x-3">
                <Button className="acrylic-button flex items-center space-x-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Github className="w-4 h-4" />
                  <span>Source Code</span>
                </Button>
              </div>
            )}

            {project.category === 'fake' && (
              <Button className="acrylic-button w-full">
                Launch App
              </Button>
            )}
          </div>
        );
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          className="mica-card p-3 flex items-center space-x-2"
          onClick={() => setIsMinimized(false)}
        >
          <project.icon size={20} />
          <span className="text-sm">{project.title}</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <Card className={`relative w-full max-w-4xl max-h-[90vh] mica-card border ${getBorderClass(project.color)} overflow-hidden`}>
        {/* Window Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card/50">
          <div className="flex items-center space-x-3">
            <div className={getColorClass(project.color)}>
              <project.icon size={24} />
            </div>
            <h1 className="text-lg font-semibold text-foreground">{project.title}</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMinimized(true)}
              className="h-8 w-8 p-0 hover:bg-muted/50"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Window Content */}
        <div className="overflow-auto max-h-[calc(90vh-4rem)]">
          {renderAppContent()}
        </div>
      </Card>
    </div>
  );
};

export default ProjectWindow;