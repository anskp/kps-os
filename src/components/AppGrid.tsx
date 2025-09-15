import { useState } from 'react';
import { projects, Project } from '../data/projects';
import AppIcon from './AppIcon';
import FloatingMascot from './FloatingMascot';

interface AppGridProps {
  onOpenProject: (project: Project) => void;
}

const AppGrid = ({ onOpenProject }: AppGridProps) => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* Floating Mascots */}
      <FloatingMascot 
        emoji="🚀" 
        className="top-10 left-10" 
        delay={0}
      />
      <FloatingMascot 
        emoji="⚡" 
        className="top-20 right-20" 
        delay={2}
      />
      <FloatingMascot 
        emoji="🌟" 
        className="bottom-20 left-1/4" 
        delay={4}
      />

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <AppIcon
            key={project.id}
            project={project}
            index={index}
            isHovered={hoveredProject === project.id}
            onHover={setHoveredProject}
            onClick={() => onOpenProject(project)}
          />
        ))}
      </div>

      {/* Additional floating mascots for larger screens */}
      <div className="hidden lg:block">
        <FloatingMascot 
          emoji="🔮" 
          className="top-1/3 right-10" 
          delay={1}
        />
        <FloatingMascot 
          emoji="💫" 
          className="bottom-1/3 right-1/3" 
          delay={3}
        />
      </div>
    </div>
  );
};

export default AppGrid;