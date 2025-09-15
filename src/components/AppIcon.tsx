import { Project } from '../data/projects';

interface AppIconProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: () => void;
}

const AppIcon = ({ project, index, isHovered, onHover, onClick }: AppIconProps) => {
  const IconComponent = project.icon;
  
  const getColorClasses = () => {
    switch (project.color) {
      case 'primary':
        return 'text-primary group-hover:text-primary-glow';
      case 'secondary':
        return 'text-secondary group-hover:text-secondary-glow';
      case 'accent':
        return 'text-accent group-hover:text-accent-glow';
      default:
        return 'text-primary group-hover:text-primary-glow';
    }
  };

  return (
    <div
      className="app-icon group relative"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        animation: 'slide-in-top 0.6s ease-out forwards'
      }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      {/* Mascot */}
      <div className="absolute -top-2 -right-2 text-2xl animate-float z-10">
        {project.mascot}
      </div>

      {/* Icon */}
      <div className="flex flex-col items-center space-y-4">
        <div className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-glass border border-glass-border transition-all duration-300 ${getColorClasses()}`}>
          <IconComponent className="w-8 h-8" />
        </div>
        
        {/* Title */}
        <div className="text-center">
          <h3 className="font-semibold text-foreground group-hover:text-gradient transition-all duration-300">
            {project.title}
          </h3>
          {project.category === 'real' && (
            <div className="flex flex-wrap gap-1 mt-2 justify-center">
              {project.techStack.slice(0, 2).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-full bg-muted/50 text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 2 && (
                <span className="text-xs px-2 py-1 rounded-full bg-muted/50 text-muted-foreground">
                  +{project.techStack.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hover Glow Effect */}
      {isHovered && (
        <div className="absolute inset-0 rounded-2xl opacity-50 animate-pulse-glow pointer-events-none" />
      )}
    </div>
  );
};

export default AppIcon;