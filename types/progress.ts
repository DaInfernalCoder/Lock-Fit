// Import the Slug type from react-native-body-highlighter
import { Slug } from 'react-native-body-highlighter';

export interface StreakData {
  currentStreak: number;
  lastMissed: string;
  totalWorkouts: number;
  streakDays: StreakDay[];
}

export interface StreakDay {
  date: number;
  completed: boolean;
  isToday: boolean;
}

export interface PerformanceMetric {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  color: string;
  badge?: string;
}

export interface MuscleGroupActivity {
  id: string;
  name: string;
  sessionsThisMonth: number;
  lastWorked: string;
  intensity: 'low' | 'medium' | 'high';
}

export interface ProgressData {
  streak: StreakData;
  performanceMetrics: PerformanceMetric[];
  muscleGroups: MuscleGroupActivity[];
  motivationalMessage: {
    title: string;
    message: string;
    achievement?: string;
  };
}

export type TimePeriod = 'week' | 'month' | 'allTime';

export interface ProgressStats {
  sessionsPerWeek: number;
  totalHoursThisMonth: number;
  bestStreak: number;
  focusArea: string;
}

// New types for body highlighting and workout tracking
export interface BodyPart {
  slug: Slug;
  intensity: number;
  side?: 'left' | 'right';
  color?: string;
  path?: {
    common?: string[];
    left?: string[];
    right?: string[];
  };
}

export interface MuscleDetail {
  id: string;
  name: string;
  displayName: string;
  group: string;
  exercises: string[];
  lastWorked?: string;
  sessionsThisMonth: number;
  targetMuscles: string[];
  synergistMuscles: string[];
}

export interface WorkoutSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  isActive: boolean;
  exercises: ActiveExercise[];
  activeMuscles: string[];
  totalDuration: number;
  caloriesBurned: number;
}

export interface ActiveExercise {
  id: string;
  name: string;
  muscleGroups: string[];
  sets: ExerciseSet[];
  isActive: boolean;
  startTime: Date;
  endTime?: Date;
}

export interface ExerciseSet {
  id: string;
  reps: number;
  weight?: number;
  duration?: number;
  completed: boolean;
  timestamp: Date;
}

export interface BodyHighlighterData {
  activeMuscles: BodyPart[];
  selectedMuscle?: MuscleDetail;
  workoutSession?: WorkoutSession;
  isWorkoutActive: boolean;
}