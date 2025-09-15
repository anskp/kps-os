interface FloatingMascotProps {
  emoji: string;
  className?: string;
  delay?: number;
}

const FloatingMascot = ({ emoji, className = '', delay = 0 }: FloatingMascotProps) => {
  return (
    <div 
      className={`mascot text-4xl select-none ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        transform: `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`
      }}
    >
      {emoji}
    </div>
  );
};

export default FloatingMascot;