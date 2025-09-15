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
        return 'text-primary hover:text-primary-hover';
      case 'secondary':
        return 'text-secondary hover:text-secondary-hover';
      case 'accent':
        return 'text-accent hover:text-accent-hover';
      default:
        return 'text-primary hover:text-primary-hover';
    }
  };

  return (
    <div
      className="app-tile group relative"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        animation: 'slide-in-top 0.6s ease-out forwards'
      }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      {/* Icon */}
      <div className="flex flex-col items-center space-y-3">
        <div className={`w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 ${getColorClasses()}`}>
          <IconComponent className="w-8 h-8" />
        </div>
        
        {/* Title */}
        <div className="text-center">
          <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Category Badge */}
      <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
        project.category === 'real' 
          ? 'bg-primary/60' 
          : 'bg-accent/60'
      }`} />
    </div>
  );
};

export default AppIcon;