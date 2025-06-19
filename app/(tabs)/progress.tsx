import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react-native';
import { TimePeriodToggle } from '@/components/progress/TimePeriodToggle';
import { StreakTracker } from '@/components/progress/StreakTracker';
import { PerformanceMetrics } from '@/components/progress/PerformanceMetrics';
import { MuscleGroupActivity } from '@/components/progress/MuscleGroupActivity';
import { MotivationalFeedback } from '@/components/progress/MotivationalFeedback';
import { useProgressData } from '@/hooks/useProgressData';
import { TimePeriod } from '@/types/progress';

export default function ProgressScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('month');
  const { progressData, loading, error } = useProgressData(selectedPeriod);

  const handleShare = () => {
    // Implement share functionality
    console.log('Share progress');
  };

  const handleCalendar = () => {
    // Navigate to calendar view
    console.log('Open calendar');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={styles.loadingText}>Loading your progress...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !progressData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || 'Failed to load progress data'}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => window.location.reload()}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <ArrowLeft size={24} color="#6366F1" />
            </TouchableOpacity>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>Progress</Text>
              <Text style={styles.headerSubtitle}>Your fitness journey</Text>
            </View>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={handleCalendar}
              accessibilityRole="button"
              accessibilityLabel="Open calendar"
            >
              <Calendar size={20} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={handleShare}
              accessibilityRole="button"
              accessibilityLabel="Share progress"
            >
              <Share2 size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Time Period Toggle */}
        <TimePeriodToggle
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />

        {/* Streak Tracker */}
        <StreakTracker streakData={progressData.streak} />

        {/* Muscle Group Activity */}
        <MuscleGroupActivity muscleGroups={progressData.muscleGroups} />

        {/* Performance Metrics */}
        <PerformanceMetrics metrics={progressData.performanceMetrics} />

        {/* Motivational Feedback */}
        <MotivationalFeedback
          title={progressData.motivationalMessage.title}
          message={progressData.motivationalMessage.message}
          achievement={progressData.motivationalMessage.achievement}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 12,
    padding: 8,
  },
});