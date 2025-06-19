import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Check } from 'lucide-react-native';
import { StreakData } from '@/types/progress';

interface StreakTrackerProps {
  streakData: StreakData;
}

const { width } = Dimensions.get('window');

export const StreakTracker: React.FC<StreakTrackerProps> = ({ streakData }) => {
  const [animatedStreak, setAnimatedStreak] = useState(0);

  useEffect(() => {
    // Animate streak counter
    let count = 0;
    const target = streakData.currentStreak;
    const increment = () => {
      if (count < target) {
        count++;
        setAnimatedStreak(count);
        setTimeout(increment, 100);
      }
    };
    setTimeout(increment, 500);
  }, [streakData.currentStreak]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.streakInfo}>
            <View style={styles.streakRow}>
              <Text style={styles.streakNumber}>{animatedStreak}</Text>
              <Text style={styles.streakLabel}>Day Streak</Text>
              <Text style={styles.fireEmoji}>🔥</Text>
            </View>
            <Text style={styles.lastMissed}>
              Last missed: {streakData.lastMissed}
            </Text>
          </View>
          <View style={styles.totalWorkouts}>
            <Text style={styles.totalNumber}>{streakData.totalWorkouts}</Text>
            <Text style={styles.totalLabel}>Total workouts</Text>
          </View>
        </View>

        <View style={styles.calendarGrid}>
          {streakData.streakDays.map((day, index) => (
            <View key={index} style={styles.dayColumn}>
              <Text
                style={[styles.dayDate, day.isToday && styles.dayDateToday]}
              >
                {day.date}
              </Text>
              <View
                style={[
                  styles.dayIndicator,
                  day.completed && styles.dayCompleted,
                  day.isToday && styles.dayToday,
                ]}
              >
                {day.completed ? (
                  <Check size={12} color="#FFFFFF" />
                ) : day.isToday ? (
                  <Text style={styles.todayText}>T</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  streakInfo: {
    flex: 1,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  streakNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#0070FF',
  },
  streakLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  fireEmoji: {
    fontSize: 24,
    marginLeft: 8,
  },
  lastMissed: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
  totalWorkouts: {
    alignItems: 'flex-end',
  },
  totalNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  totalLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
  calendarGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  dayColumn: {
    alignItems: 'center',
  },
  dayDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  dayDateToday: {
    color: '#0070FF',
    fontFamily: 'Inter-SemiBold',
  },
  dayIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCompleted: {
    backgroundColor: '#0070FF',
  },
  dayToday: {
    backgroundColor: '#0070FF',
  },
  todayText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
});
