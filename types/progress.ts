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