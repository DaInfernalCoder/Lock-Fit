import { useState, useEffect } from 'react';
import { ProgressData, TimePeriod } from '@/types/progress';

// Mock data - in a real app, this would come from an API
const mockProgressData: ProgressData = {
  streak: {
    currentStreak: 6,
    lastMissed: '3 days ago',
    totalWorkouts: 24,
    streakDays: [
      { date: 12, completed: true, isToday: false },
      { date: 13, completed: true, isToday: false },
      { date: 14, completed: true, isToday: false },
      { date: 15, completed: true, isToday: false },
      { date: 16, completed: true, isToday: false },
      { date: 17, completed: true, isToday: false },
      { date: 18, completed: false, isToday: true },
    ],
  },
  performanceMetrics: [
    {
      id: '1',
      title: 'Sessions',
      value: 4.2,
      subtitle: 'Sessions',
      icon: 'flame',
      color: 'red',
      badge: 'AVG/WEEK',
    },
    {
      id: '2',
      title: 'Time',
      value: '18h',
      subtitle: 'This month',
      icon: 'clock',
      color: 'blue',
      badge: 'TOTAL',
    },
    {
      id: '3',
      title: 'Best Streak',
      value: 12,
      subtitle: 'Day streak',
      icon: 'trophy',
      color: 'green',
      badge: 'BEST',
    },
    {
      id: '4',
      title: 'Focus',
      value: 'Upper',
      subtitle: 'Body',
      icon: 'dumbbell',
      color: 'blue',
      badge: 'FOCUS',
    },
  ],
  muscleGroups: [
    {
      id: 'chest',
      name: 'Chest',
      sessionsThisMonth: 8,
      lastWorked: '2 days ago',
      intensity: 'high',
    },
    {
      id: 'arms',
      name: 'Arms',
      sessionsThisMonth: 6,
      lastWorked: '1 day ago',
      intensity: 'medium',
    },
    {
      id: 'back',
      name: 'Back',
      sessionsThisMonth: 5,
      lastWorked: '3 days ago',
      intensity: 'medium',
    },
    {
      id: 'legs',
      name: 'Legs',
      sessionsThisMonth: 4,
      lastWorked: '4 days ago',
      intensity: 'low',
    },
    {
      id: 'core',
      name: 'Core',
      sessionsThisMonth: 7,
      lastWorked: '1 day ago',
      intensity: 'high',
    },
    {
      id: 'shoulders',
      name: 'Shoulders',
      sessionsThisMonth: 3,
      lastWorked: '5 days ago',
      intensity: 'low',
    },
  ],
  motivationalMessage: {
    title: 'Outstanding Progress!',
    message: "You've worked your chest 8 times this month. Your consistency is building real strength!",
    achievement: 'Consistency',
  },
};

export const useProgressData = (timePeriod: TimePeriod) => {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real app, you would adjust the data based on timePeriod
        let adjustedData = { ...mockProgressData };
        
        if (timePeriod === 'week') {
          adjustedData.performanceMetrics[0].value = 3.5;
          adjustedData.motivationalMessage.message = "Great week! You've maintained a solid workout routine.";
        } else if (timePeriod === 'allTime') {
          adjustedData.performanceMetrics[0].value = 4.8;
          adjustedData.performanceMetrics[1].value = '120h';
          adjustedData.motivationalMessage.message = "Your dedication over time is truly impressive!";
        }
        
        setProgressData(adjustedData);
        setError(null);
      } catch (err) {
        setError('Failed to load progress data');
        console.error('Error fetching progress data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, [timePeriod]);

  return { progressData, loading, error };
};