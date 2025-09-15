import { useState, useEffect } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const bootSteps = [
    { message: 'Initializing Digital Playground...', duration: 800 },
    { message: 'Loading neural networks...', duration: 600 },
    { message: 'Connecting to the matrix...', duration: 700 },
    { message: 'Awakening mascots...', duration: 500 },
    { message: 'Calibrating user interface...', duration: 400 },
    { message: 'System ready!', duration: 300 }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    const runBootSequence = () => {
      if (currentStep < bootSteps.length) {
        const step = bootSteps[currentStep];
        
        // Progress animation
        let currentProgress = 0;
        const progressIncrement = 100 / (step.duration / 10);
        
        progressTimer = setInterval(() => {
          currentProgress += progressIncrement;
          setProgress(Math.min(currentProgress, 100));
        }, 10);

        timer = setTimeout(() => {
          clearInterval(progressTimer);
          setProgress(100);
          
          setTimeout(() => {
            if (currentStep === bootSteps.length - 1) {
              onComplete();
            } else {
              setCurrentStep(currentStep + 1);
              setProgress(0);
            }
          }, 200);
        }, step.duration);
      }
    };

    runBootSequence();

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [currentStep, onComplete]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Boot Console */}
      <div className="relative glass-card p-8 max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="font-orbitron font-bold text-2xl text-gradient mb-2">
            DIGITAL.OS
          </h1>
          <p className="text-muted-foreground text-sm">
            Booting sequence initiated...
          </p>
        </div>

        {/* Boot Steps */}
        <div className="space-y-3 mb-6">
          {bootSteps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 transition-all duration-300 ${
                index === currentStep
                  ? 'text-primary-glow'
                  : index < currentStep
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {index < currentStep ? (
                <CheckCircle className="w-4 h-4 text-primary" />
              ) : index === currentStep ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-muted-foreground/30" />
              )}
              <span className="text-sm font-medium">{step.message}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-cosmic transition-all duration-100 ease-out"
            style={{ width: `${(currentStep / bootSteps.length) * 100 + (progress / bootSteps.length)}%` }}
          />
        </div>

        {/* Loading Mascots */}
        <div className="flex justify-center space-x-4 mt-6">
          {['🚀', '⚡', '🌟', '🔮'].map((emoji, index) => (
            <div
              key={index}
              className="text-2xl animate-float"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BootSequence;