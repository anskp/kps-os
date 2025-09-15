import { useState, useEffect } from 'react';
import TopBar from './TopBar';
import AppGrid from './AppGrid';
import ProjectWindow from './ProjectWindow';
import AnimatedBackground from './AnimatedBackground';
import BootSequence from './BootSequence';
import { Project } from '../data/projects';

const OSLayout = () => {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [isBooting, setIsBooting] = useState(true);
  const [systemReady, setSystemReady] = useState(false);

  useEffect(() => {
    // Boot sequence
    const bootTimer = setTimeout(() => {
      setIsBooting(false);
      setSystemReady(true);
    }, 3000);

    return () => clearTimeout(bootTimer);
  }, []);

  const handleOpenProject = (project: Project) => {
    setOpenProject(project);
  };

  const handleCloseProject = () => {
    setOpenProject(null);
  };

  if (isBooting) {
    return <BootSequence onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <AnimatedBackground />
      
      {/* OS Interface */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Top Bar */}
        <TopBar systemReady={systemReady} />
        
        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8">
          <AppGrid onOpenProject={handleOpenProject} />
        </main>
      </div>

      {/* Project Window Overlay */}
      {openProject && (
        <ProjectWindow 
          project={openProject} 
          onClose={handleCloseProject}
        />
      )}
    </div>
  );
};

export default OSLayout;