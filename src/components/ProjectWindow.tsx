import { useState } from 'react';
import { X, Minimize2, ExternalLink, Github } from 'lucide-react';
import { Project } from '../data/projects';
import { Button } from './ui/button';

interface ProjectWindowProps {
  project: Project;
  onClose: () => void;
}

const ProjectWindow = ({ project, onClose }: ProjectWindowProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const IconComponent = project.icon;

  const getGradientClass = () => {
    switch (project.color) {
      case 'primary':
        return 'from-primary/20 to-primary/5';
      case 'secondary':
        return 'from-secondary/20 to-secondary/5';
      case 'accent':
        return 'from-accent/20 to-accent/5';
      default:
        return 'from-primary/20 to-primary/5';
    }
  };

  const getBorderClass = () => {
    switch (project.color) {
      case 'primary':
        return 'border-primary/30';
      case 'secondary':
        return 'border-secondary/30';
      case 'accent':
        return 'border-accent/30';
      default:
        return 'border-primary/30';
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-4 glass-card p-4 cursor-pointer animate-slide-in-top z-50" 
           onClick={() => setIsMinimized(false)}>
        <div className="flex items-center space-x-2">
          <IconComponent className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{project.title}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className={`glass-card max-w-2xl w-full max-h-[80vh] overflow-hidden bg-gradient-to-br ${getGradientClass()} border-2 ${getBorderClass()} animate-scale-in`}>
        {/* Window Header */}
        <div className="flex items-center justify-between p-4 border-b border-glass-border">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{project.mascot}</div>
            <div>
              <h2 className="font-orbitron font-bold text-lg text-gradient">
                {project.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {project.category === 'real' ? 'Production Project' : 'Interactive Demo'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
              className="w-8 h-8 p-0 hover:bg-muted/20"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="w-8 h-8 p-0 hover:bg-destructive/20 hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Window Content */}
        <div className="p-6 overflow-y-auto">
          {/* Project Icon */}
          <div className="flex justify-center mb-6">
            <div className={`w-20 h-20 flex items-center justify-center rounded-3xl bg-glass border border-glass-border`}>
              <IconComponent className={`w-10 h-10 text-${project.color}`} />
            </div>
          </div>

          {/* Description */}
          <p className="text-foreground text-center mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-3 text-center">Tech Stack</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-glass border border-glass-border text-sm font-medium text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          {project.category === 'real' && (
            <div className="flex gap-3 justify-center">
              {project.demoUrl && (
                <Button className="glass-button">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" className="bg-glass border border-glass-border hover:bg-muted/20">
                  <Github className="w-4 h-4 mr-2" />
                  Source Code
                </Button>
              )}
            </div>
          )}

          {project.category === 'fake' && (
            <div className="text-center">
              <Button 
                className="glass-button"
                onClick={() => {
                  // Placeholder for fake app interactions
                  alert(`Opening ${project.title}... This is a demo interaction!`);
                }}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                Launch App
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectWindow;