import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, Flame, Target, ChevronRight, Play } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const workoutPlan = [
  {
    id: 1,
    day: 'Monday',
    date: 'Jan 15',
    title: 'Upper Body Strength',
    duration: '45 min',
    calories: '320 cal',
    difficulty: 'Intermediate',
    muscles: ['Chest', 'Arms', 'Shoulders'],
    exercises: 8,
    completed: true,
    color: '#EF4444',
  },
  {
    id: 2,
    day: 'Tuesday',
    date: 'Jan 16',
    title: 'Lower Body Power',
    duration: '50 min',
    calories: '380 cal',
    difficulty: 'Advanced',
    muscles: ['Legs', 'Glutes', 'Core'],
    exercises: 10,
    completed: true,
    color: '#8B5CF6',
  },
  {
    id: 3,
    day: 'Wednesday',
    date: 'Jan 17',
    title: 'Core & Cardio',
    duration: '30 min',
    calories: '240 cal',
    difficulty: 'Beginner',
    muscles: ['Core', 'Full Body'],
    exercises: 6,
    completed: false,
    color: '#22C55E',
    isToday: true,
  },
  {
    id: 4,
    day: 'Thursday',
    date: 'Jan 18',
    title: 'Back & Biceps',
    duration: '40 min',
    calories: '290 cal',
    difficulty: 'Intermediate',
    muscles: ['Back', 'Arms'],
    exercises: 7,
    completed: false,
    color: '#3B82F6',
  },
  {
    id: 5,
    day: 'Friday',
    date: 'Jan 19',
    title: 'HIIT Training',
    duration: '25 min',
    calories: '350 cal',
    difficulty: 'Advanced',
    muscles: ['Full Body'],
    exercises: 5,
    completed: false,
    color: '#F97316',
  },
  {
    id: 6,
    day: 'Saturday',
    date: 'Jan 20',
    title: 'Functional Movement',
    duration: '35 min',
    calories: '260 cal',
    difficulty: 'Intermediate',
    muscles: ['Core', 'Stability'],
    exercises: 8,
    completed: false,
    color: '#EC4899',
  },
  {
    id: 7,
    day: 'Sunday',
    date: 'Jan 21',
    title: 'Active Recovery',
    duration: '20 min',
    calories: '120 cal',
    difficulty: 'Beginner',
    muscles: ['Flexibility'],
    exercises: 4,
    completed: false,
    color: '#6366F1',
  },
];

export default function WorkoutsScreen() {
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#22C55E';
      case 'Intermediate': return '#F97316';
      case 'Advanced': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>7-Day Workout Plan</Text>
          <Text style={styles.subtitle}>AI-generated based on your equipment and goals</Text>
        </View>

        {/* Progress Summary */}
        <View style={styles.progressContainer}>
          <View style={styles.progressCard}>
            <Text style={styles.progressNumber}>2/7</Text>
            <Text style={styles.progressLabel}>Days Completed</Text>
          </View>
          <View style={styles.progressCard}>
            <Text style={styles.progressNumber}>700</Text>
            <Text style={styles.progressLabel}>Calories Burned</Text>
          </View>
          <View style={styles.progressCard}>
            <Text style={styles.progressNumber}>95</Text>
            <Text style={styles.progressLabel}>Minutes Active</Text>
          </View>
        </View>

        {/* Workout Cards */}
        <View style={styles.workoutContainer}>
          {workoutPlan.map((workout) => (
            <TouchableOpacity
              key={workout.id}
              style={[
                styles.workoutCard,
                workout.completed && styles.workoutCardCompleted,
                workout.isToday && styles.workoutCardToday,
                selectedWorkout === workout.id && styles.workoutCardSelected,
              ]}
              onPress={() => setSelectedWorkout(
                selectedWorkout === workout.id ? null : workout.id
              )}
            >
              {/* Card Header */}
              <View style={styles.workoutCardHeader}>
                <View style={styles.workoutDay}>
                  <Text style={styles.dayText}>{workout.day}</Text>
                  <Text style={styles.dateText}>{workout.date}</Text>
                </View>
                
                <View style={styles.workoutStatus}>
                  {workout.isToday && (
                    <View style={styles.todayBadge}>
                      <Text style={styles.todayText}>TODAY</Text>
                    </View>
                  )}
                  {workout.completed && (
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedText}>✓</Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Workout Info */}
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                
                <View style={styles.workoutMeta}>
                  <View style={styles.metaItem}>
                    <Clock size={16} color="#9CA3AF" />
                    <Text style={styles.metaText}>{workout.duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Flame size={16} color="#F97316" />
                    <Text style={styles.metaText}>{workout.calories}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Target size={16} color="#6366F1" />
                    <Text style={styles.metaText}>{workout.exercises} exercises</Text>
                  </View>
                </View>

                <View style={styles.difficultyContainer}>
                  <View style={[
                    styles.difficultyBadge,
                    { backgroundColor: `${getDifficultyColor(workout.difficulty)}20` }
                  ]}>
                    <Text style={[
                      styles.difficultyText,
                      { color: getDifficultyColor(workout.difficulty) }
                    ]}>
                      {workout.difficulty}
                    </Text>
                  </View>
                </View>

                <View style={styles.muscleTagsContainer}>
                  {workout.muscles.map((muscle, index) => (
                    <View key={index} style={styles.muscleTag}>
                      <Text style={styles.muscleTagText}>{muscle}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Expanded Content */}
              {selectedWorkout === workout.id && (
                <View style={styles.expandedContent}>
                  <View style={styles.separator} />
                  
                  <Text style={styles.expandedTitle}>Workout Details</Text>
                  <Text style={styles.expandedDescription}>
                    This workout focuses on {workout.muscles.join(', ').toLowerCase()} with 
                    {workout.exercises} carefully selected exercises designed to maximize your 
                    training efficiency and results.
                  </Text>
                  
                  <TouchableOpacity style={styles.startButton}>
                    <Play size={20} color="#FFFFFF" />
                    <Text style={styles.startButtonText}>
                      {workout.completed ? 'View Workout' : 'Start Workout'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Expand Indicator */}
              <View style={styles.expandIndicator}>
                <ChevronRight 
                  size={20} 
                  color="#6B7280" 
                  style={[
                    styles.chevron,
                    selectedWorkout === workout.id && styles.chevronExpanded
                  ]} 
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Generate New Plan */}
        <TouchableOpacity style={styles.generateNewButton}>
          <Calendar size={24} color="#6366F1" />
          <Text style={styles.generateNewText}>Generate New Plan</Text>
        </TouchableOpacity>
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
  header: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 32,
    justifyContent: 'space-between',
  },
  progressCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#374151',
  },
  progressNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#6366F1',
    marginBottom: 4,
  },
  progressLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  workoutContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  workoutCard: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
    position: 'relative',
  },
  workoutCardCompleted: {
    borderColor: '#22C55E',
    backgroundColor: '#0F1F13',
  },
  workoutCardToday: {
    borderColor: '#6366F1',
    backgroundColor: '#1E1B4B',
  },
  workoutCardSelected: {
    borderWidth: 2,
  },
  workoutCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  workoutDay: {
    flex: 1,
  },
  dayText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
  workoutStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todayBadge: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  todayText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  completedBadge: {
    backgroundColor: '#22C55E',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  workoutInfo: {
    marginBottom: 16,
  },
  workoutTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  workoutMeta: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 6,
  },
  difficultyContainer: {
    marginBottom: 12,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  muscleTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  muscleTag: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 4,
  },
  muscleTagText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#E5E7EB',
  },
  expandedContent: {
    marginTop: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#374151',
    marginBottom: 16,
  },
  expandedTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  expandedDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: '#6366F1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  startButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  expandIndicator: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
  },
  chevronExpanded: {
    transform: [{ rotate: '90deg' }],
  },
  generateNewButton: {
    backgroundColor: '#1F2937',
    marginHorizontal: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#6366F1',
    marginBottom: 32,
  },
  generateNewText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#6366F1',
    marginLeft: 12,
  },
});