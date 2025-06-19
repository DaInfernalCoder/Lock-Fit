import { useState, useEffect, useCallback } from 'react';
import { 
  WorkoutSession, 
  ActiveExercise, 
  BodyPart, 
  MuscleDetail, 
  BodyHighlighterData 
} from '@/types/progress';

// Muscle mapping for body highlighter
const MUSCLE_MAPPING: Record<string, MuscleDetail> = {
  chest: {
    id: 'chest',
    name: 'chest',
    displayName: 'Chest',
    group: 'Upper Body',
    exercises: ['Push-ups', 'Bench Press', 'Chest Fly'],
    sessionsThisMonth: 8,
    lastWorked: '2 days ago',
    targetMuscles: ['chest'],
    synergistMuscles: ['triceps', 'front-deltoids']
  },
  biceps: {
    id: 'biceps',
    name: 'biceps',
    displayName: 'Biceps',
    group: 'Arms',
    exercises: ['Bicep Curls', 'Hammer Curls', 'Chin-ups'],
    sessionsThisMonth: 6,
    lastWorked: '1 day ago',
    targetMuscles: ['biceps'],
    synergistMuscles: ['forearm']
  },
  triceps: {
    id: 'triceps',
    name: 'triceps',
    displayName: 'Triceps',
    group: 'Arms',
    exercises: ['Tricep Dips', 'Close-grip Push-ups', 'Overhead Extension'],
    sessionsThisMonth: 6,
    lastWorked: '1 day ago',
    targetMuscles: ['triceps'],
    synergistMuscles: ['chest', 'deltoids']
  },
  deltoids: {
    id: 'deltoids',
    name: 'deltoids',
    displayName: 'Shoulders',
    group: 'Upper Body',
    exercises: ['Shoulder Press', 'Lateral Raises', 'Front Raises'],
    sessionsThisMonth: 3,
    lastWorked: '5 days ago',
    targetMuscles: ['deltoids'],
    synergistMuscles: ['triceps', 'upper-back']
  },
  abs: {
    id: 'abs',
    name: 'abs',
    displayName: 'Abs',
    group: 'Core',
    exercises: ['Crunches', 'Plank', 'Russian Twists'],
    sessionsThisMonth: 7,
    lastWorked: '1 day ago',
    targetMuscles: ['abs'],
    synergistMuscles: ['obliques']
  },
  obliques: {
    id: 'obliques',
    name: 'obliques',
    displayName: 'Obliques',
    group: 'Core',
    exercises: ['Side Plank', 'Bicycle Crunches', 'Wood Choppers'],
    sessionsThisMonth: 5,
    lastWorked: '2 days ago',
    targetMuscles: ['obliques'],
    synergistMuscles: ['abs']
  },
  quadriceps: {
    id: 'quadriceps',
    name: 'quadriceps',
    displayName: 'Quadriceps',
    group: 'Legs',
    exercises: ['Squats', 'Lunges', 'Leg Press'],
    sessionsThisMonth: 4,
    lastWorked: '4 days ago',
    targetMuscles: ['quadriceps'],
    synergistMuscles: ['gluteal', 'calves']
  },
  hamstring: {
    id: 'hamstring',
    name: 'hamstring',
    displayName: 'Hamstrings',
    group: 'Legs',
    exercises: ['Deadlifts', 'Leg Curls', 'Glute Bridges'],
    sessionsThisMonth: 4,
    lastWorked: '4 days ago',
    targetMuscles: ['hamstring'],
    synergistMuscles: ['gluteal', 'calves']
  },
  gluteal: {
    id: 'gluteal',
    name: 'gluteal',
    displayName: 'Glutes',
    group: 'Legs',
    exercises: ['Squats', 'Hip Thrusts', 'Bulgarian Split Squats'],
    sessionsThisMonth: 4,
    lastWorked: '4 days ago',
    targetMuscles: ['gluteal'],
    synergistMuscles: ['hamstring', 'quadriceps']
  },
  calves: {
    id: 'calves',
    name: 'calves',
    displayName: 'Calves',
    group: 'Legs',
    exercises: ['Calf Raises', 'Jump Rope', 'Running'],
    sessionsThisMonth: 3,
    lastWorked: '3 days ago',
    targetMuscles: ['calves'],
    synergistMuscles: []
  },
  'upper-back': {
    id: 'upper-back',
    name: 'upper-back',
    displayName: 'Upper Back',
    group: 'Back',
    exercises: ['Pull-ups', 'Rows', 'Face Pulls'],
    sessionsThisMonth: 5,
    lastWorked: '3 days ago',
    targetMuscles: ['upper-back'],
    synergistMuscles: ['biceps', 'deltoids']
  },
  'lower-back': {
    id: 'lower-back',
    name: 'lower-back',
    displayName: 'Lower Back',
    group: 'Back',
    exercises: ['Deadlifts', 'Back Extensions', 'Superman'],
    sessionsThisMonth: 5,
    lastWorked: '3 days ago',
    targetMuscles: ['lower-back'],
    synergistMuscles: ['gluteal', 'hamstring']
  },
  trapezius: {
    id: 'trapezius',
    name: 'trapezius',
    displayName: 'Trapezius',
    group: 'Back',
    exercises: ['Shrugs', 'Upright Rows', 'Face Pulls'],
    sessionsThisMonth: 4,
    lastWorked: '2 days ago',
    targetMuscles: ['trapezius'],
    synergistMuscles: ['deltoids', 'upper-back']
  },
  forearm: {
    id: 'forearm',
    name: 'forearm',
    displayName: 'Forearms',
    group: 'Arms',
    exercises: ['Wrist Curls', 'Grip Squeezes', 'Farmer Walks'],
    sessionsThisMonth: 4,
    lastWorked: '1 day ago',
    targetMuscles: ['forearm'],
    synergistMuscles: ['biceps']
  }
};

export const useWorkoutSession = () => {
  const [workoutSession, setWorkoutSession] = useState<WorkoutSession | null>(null);
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleDetail | null>(null);
  const [activeMuscles, setActiveMuscles] = useState<BodyPart[]>([]);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);

  // Start a new workout session
  const startWorkout = useCallback((exercises: ActiveExercise[]) => {
    const session: WorkoutSession = {
      id: Date.now().toString(),
      startTime: new Date(),
      isActive: true,
      exercises,
      activeMuscles: [],
      totalDuration: 0,
      caloriesBurned: 0
    };
    
    setWorkoutSession(session);
    setIsWorkoutActive(true);
    
    // Extract muscles from exercises and highlight them
    const muscles: string[] = [];
    exercises.forEach(exercise => {
      muscles.push(...exercise.muscleGroups);
    });
    
    updateActiveMuscles(muscles);
  }, []);

  // End the current workout session
  const endWorkout = useCallback(() => {
    if (workoutSession) {
      const endTime = new Date();
      const duration = Math.floor((endTime.getTime() - workoutSession.startTime.getTime()) / 1000 / 60);
      
      setWorkoutSession(prev => prev ? {
        ...prev,
        endTime,
        isActive: false,
        totalDuration: duration,
        caloriesBurned: Math.floor(duration * 8) // Rough calculation
      } : null);
    }
    
    setIsWorkoutActive(false);
    setActiveMuscles([]);
  }, [workoutSession]);

  // Update active muscles based on current exercise
  const updateActiveMuscles = useCallback((muscleNames: string[]) => {
    const bodyParts: BodyPart[] = muscleNames.map(muscleName => {
      const intensity = getIntensityForMuscle(muscleName);
      return {
        slug: muscleName,
        intensity,
      };
    });
    
    setActiveMuscles(bodyParts);
  }, []);

  // Get intensity based on muscle activity
  const getIntensityForMuscle = (muscleName: string): number => {
    const muscle = MUSCLE_MAPPING[muscleName];
    if (!muscle) return 1;
    
    // Base intensity on sessions this month
    if (muscle.sessionsThisMonth >= 7) return 3;
    if (muscle.sessionsThisMonth >= 4) return 2;
    return 1;
  };

  // Handle muscle tap/press
  const handleMusclePress = useCallback((bodyPart: BodyPart, side?: 'left' | 'right') => {
    const muscle = MUSCLE_MAPPING[bodyPart.slug];
    if (muscle) {
      setSelectedMuscle(muscle);
    }
  }, []);

  // Clear selected muscle
  const clearSelectedMuscle = useCallback(() => {
    setSelectedMuscle(null);
  }, []);

  // Simulate exercise start (for demo purposes)
  const startExercise = useCallback((exerciseName: string, muscleGroups: string[]) => {
    if (!isWorkoutActive) return;
    
    updateActiveMuscles(muscleGroups);
    
    // Update session with new exercise
    if (workoutSession) {
      const newExercise: ActiveExercise = {
        id: Date.now().toString(),
        name: exerciseName,
        muscleGroups,
        sets: [],
        isActive: true,
        startTime: new Date()
      };
      
      setWorkoutSession(prev => prev ? {
        ...prev,
        exercises: [...prev.exercises, newExercise],
        activeMuscles: muscleGroups
      } : null);
    }
  }, [isWorkoutActive, workoutSession, updateActiveMuscles]);

  // Get body highlighter data
  const getBodyHighlighterData = useCallback((): BodyHighlighterData => {
    return {
      activeMuscles,
      selectedMuscle: selectedMuscle || undefined,
      workoutSession: workoutSession || undefined,
      isWorkoutActive
    };
  }, [activeMuscles, selectedMuscle, workoutSession, isWorkoutActive]);

  // Demo function to simulate workout with different exercises
  const startDemoWorkout = useCallback(() => {
    const demoExercises: ActiveExercise[] = [
      {
        id: '1',
        name: 'Push-ups',
        muscleGroups: ['chest', 'triceps', 'deltoids'],
        sets: [],
        isActive: false,
        startTime: new Date()
      },
      {
        id: '2',
        name: 'Squats',
        muscleGroups: ['quadriceps', 'gluteal', 'calves'],
        sets: [],
        isActive: false,
        startTime: new Date()
      },
      {
        id: '3',
        name: 'Plank',
        muscleGroups: ['abs', 'obliques'],
        sets: [],
        isActive: false,
        startTime: new Date()
      }
    ];
    
    startWorkout(demoExercises);
  }, [startWorkout]);

  return {
    workoutSession,
    selectedMuscle,
    activeMuscles,
    isWorkoutActive,
    startWorkout,
    endWorkout,
    updateActiveMuscles,
    handleMusclePress,
    clearSelectedMuscle,
    startExercise,
    getBodyHighlighterData,
    startDemoWorkout,
    muscleDatabase: MUSCLE_MAPPING
  };
}; 