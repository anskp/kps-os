import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Activity, Target, Clock } from 'lucide-react';

const FitnessTracker = () => {
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  
  const exercises = [
    { name: 'Push-ups', reps: 15, duration: '45s', completed: false },
    { name: 'Squats', reps: 20, duration: '60s', completed: false },
    { name: 'Plank', reps: 1, duration: '30s', completed: false },
    { name: 'Burpees', reps: 10, duration: '45s', completed: false },
  ];

  const stats = {
    caloriesBurned: 127,
    workoutTime: '12:34',
    heartRate: 142,
    progress: 65
  };

  return (
    <div className="p-6 space-y-6">
      {/* Current Workout Status */}
      <Card className="p-6 mica-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Activity className="w-6 h-6 mr-2 text-accent" />
            Today's Workout
          </h2>
          <div className={`px-3 py-1 rounded-full text-sm ${
            isWorkoutActive ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'
          }`}>
            {isWorkoutActive ? 'Active' : 'Ready'}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.caloriesBurned}</div>
            <div className="text-sm text-muted-foreground">Calories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">{stats.workoutTime}</div>
            <div className="text-sm text-muted-foreground">Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{stats.heartRate}</div>
            <div className="text-sm text-muted-foreground">BPM</div>
          </div>
        </div>
        
        <Progress value={stats.progress} className="mb-4" />
        <div className="text-sm text-muted-foreground mb-4">{stats.progress}% Complete</div>
        
        <div className="flex space-x-2">
          <Button 
            className="acrylic-button flex-1" 
            onClick={() => setIsWorkoutActive(!isWorkoutActive)}
          >
            {isWorkoutActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isWorkoutActive ? 'Pause' : 'Start'}
          </Button>
          <Button className="acrylic-button px-4">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Current Exercise */}
      <Card className="p-6 mica-card">
        <h3 className="font-semibold mb-4 flex items-center">
          <Target className="w-4 h-4 mr-2" />
          Current Exercise
        </h3>
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">{exercises[currentExercise]?.name}</div>
          <div className="text-lg text-muted-foreground mb-4">
            {exercises[currentExercise]?.reps} reps • {exercises[currentExercise]?.duration}
          </div>
          <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <Activity className="w-12 h-12 text-primary" />
          </div>
        </div>
      </Card>

      {/* Exercise List */}
      <Card className="p-4 mica-card">
        <h3 className="font-semibold mb-4 flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          Exercise Plan
        </h3>
        <div className="space-y-3">
          {exercises.map((exercise, index) => (
            <div 
              key={index} 
              className={`flex justify-between items-center p-3 rounded-lg cursor-pointer ${
                index === currentExercise 
                  ? 'bg-primary/20 border border-primary/30' 
                  : 'bg-muted/50 hover:bg-muted/70'
              }`}
              onClick={() => setCurrentExercise(index)}
            >
              <div>
                <div className="font-medium">{exercise.name}</div>
                <div className="text-sm text-muted-foreground">
                  {exercise.reps} reps • {exercise.duration}
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                exercise.completed ? 'bg-accent' : 'bg-muted'
              }`} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default FitnessTracker;