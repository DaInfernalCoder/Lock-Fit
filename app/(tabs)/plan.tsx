import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  RefreshCw, 
  MoreVertical, 
  Clock, 
  Dumbbell, 
  Flame, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Target, 
  Calendar,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: string;
  image: string;
  muscleGroup: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface DayPlan {
  id: number;
  day: string;
  date: number;
  isCompleted: boolean;
  isToday: boolean;
  workoutTitle: string;
  duration: number;
  exercises: Exercise[];
  calories: number;
}

const WorkoutPlanScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(3); // Wednesday is selected by default
  const [isExerciseListVisible, setIsExerciseListVisible] = useState(true);
  const [weekProgress] = useState(3); // 3 out of 7 days completed

  const exercises: Exercise[] = [
    {
      id: 1,
      name: "Push-ups",
      sets: 3,
      reps: "12-15",
      image: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      muscleGroup: "Chest",
      difficulty: "Beginner"
    },
    {
      id: 2,
      name: "Squats",
      sets: 4,
      reps: "15-20",
      image: "https://images.pexels.com/photos/703012/pexels-photo-703012.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      muscleGroup: "Legs",
      difficulty: "Beginner"
    },
    {
      id: 3,
      name: "Plank",
      sets: 3,
      reps: "30-45s",
      image: "https://images.pexels.com/photos/863926/pexels-photo-863926.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      muscleGroup: "Core",
      difficulty: "Intermediate"
    },
    {
      id: 4,
      name: "Burpees",
      sets: 3,
      reps: "8-12",
      image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      muscleGroup: "Full Body",
      difficulty: "Advanced"
    },
    {
      id: 5,
      name: "Mountain Climbers",
      sets: 3,
      reps: "20-30",
      image: "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      muscleGroup: "Core",
      difficulty: "Intermediate"
    }
  ];

  const weekDays: DayPlan[] = [
    {
      id: 0,
      day: 'SUN',
      date: 15,
      isCompleted: true,
      isToday: false,
      workoutTitle: 'Rest Day',
      duration: 0,
      exercises: [],
      calories: 0
    },
    {
      id: 1,
      day: 'MON',
      date: 16,
      isCompleted: true,
      isToday: false,
      workoutTitle: 'Upper Body',
      duration: 45,
      exercises: exercises.slice(0, 3),
      calories: 320
    },
    {
      id: 2,
      day: 'TUE',
      date: 17,
      isCompleted: true,
      isToday: false,
      workoutTitle: 'Lower Body',
      duration: 40,
      exercises: exercises.slice(1, 4),
      calories: 280
    },
    {
      id: 3,
      day: 'WED',
      date: 18,
      isCompleted: false,
      isToday: true,
      workoutTitle: 'Full Body HIIT',
      duration: 35,
      exercises: exercises,
      calories: 420
    },
    {
      id: 4,
      day: 'THU',
      date: 19,
      isCompleted: false,
      isToday: false,
      workoutTitle: 'Core Focus',
      duration: 30,
      exercises: exercises.slice(2, 5),
      calories: 240
    },
    {
      id: 5,
      day: 'FRI',
      date: 20,
      isCompleted: false,
      isToday: false,
      workoutTitle: 'Strength',
      duration: 50,
      exercises: exercises.slice(0, 4),
      calories: 380
    },
    {
      id: 6,
      day: 'SAT',
      date: 21,
      isCompleted: false,
      isToday: false,
      workoutTitle: 'Active Recovery',
      duration: 25,
      exercises: exercises.slice(2, 4),
      calories: 180
    }
  ];

  const currentDayPlan = weekDays[selectedDay];
  const completedDays = weekDays.filter(day => day.isCompleted).length;
  const progressPercentage = (completedDays / 7) * 100;

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
          <TouchableOpacity style={styles.headerButton}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Workout Plan</Text>
            <Text style={styles.headerSubtitle}>Week of June 15-21</Text>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <RefreshCw size={20} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <MoreVertical size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Weekly Progress Banner */}
        <View style={styles.progressBanner}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Weekly Progress</Text>
            <View style={styles.progressStats}>
              <Text style={styles.progressText}>{completedDays}/7 Days</Text>
              <Text style={styles.progressPercentage}>{Math.round(progressPercentage)}%</Text>
            </View>
          </View>
          
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill,
                  { width: `${progressPercentage}%` }
                ]} 
              />
            </View>
          </View>
          
          <View style={styles.progressDetails}>
            <View style={styles.progressDetail}>
              <Flame size={16} color="#F97316" />
              <Text style={styles.progressDetailText}>1,820 cal burned</Text>
            </View>
            <View style={styles.progressDetail}>
              <Clock size={16} color="#6366F1" />
              <Text style={styles.progressDetailText}>165 min active</Text>
            </View>
          </View>
        </View>

        {/* Calendar Strip */}
        <View style={styles.calendarSection}>
          <Text style={styles.sectionTitle}>This Week</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.calendarScrollContent}
          >
            {weekDays.map((dayPlan, index) => (
              <TouchableOpacity 
                key={dayPlan.id}
                style={[
                  styles.calendarDay,
                  selectedDay === index && styles.calendarDaySelected,
                  dayPlan.isToday && styles.calendarDayToday,
                  dayPlan.isCompleted && styles.calendarDayCompleted
                ]}
                onPress={() => setSelectedDay(index)}
              >
                <Text style={[
                  styles.calendarDayText,
                  selectedDay === index && styles.calendarDayTextSelected,
                  dayPlan.isToday && styles.calendarDayTextToday
                ]}>
                  {dayPlan.day}
                </Text>
                <Text style={[
                  styles.calendarDateText,
                  selectedDay === index && styles.calendarDateTextSelected,
                  dayPlan.isToday && styles.calendarDateTextToday
                ]}>
                  {dayPlan.date}
                </Text>
                
                {dayPlan.isCompleted && (
                  <View style={styles.completedIndicator}>
                    <View style={styles.completedDot} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Daily Workout Plan Card */}
        <View style={styles.workoutPlanSection}>
          <View style={styles.workoutPlanCard}>
            <View style={styles.workoutPlanHeader}>
              <View style={styles.workoutPlanInfo}>
                <Text style={styles.workoutPlanTitle}>{currentDayPlan.workoutTitle}</Text>
                <Text style={styles.workoutPlanDate}>
                  {currentDayPlan.day}, June {currentDayPlan.date}
                </Text>
              </View>
              
              {currentDayPlan.isCompleted && (
                <View style={styles.completedBadge}>
                  <Text style={styles.completedBadgeText}>✓ Completed</Text>
                </View>
              )}
            </View>

            {currentDayPlan.workoutTitle !== 'Rest Day' && (
              <>
                <View style={styles.workoutPlanStats}>
                  <View style={styles.workoutPlanStat}>
                    <Clock size={16} color="#6366F1" />
                    <Text style={styles.workoutPlanStatText}>{currentDayPlan.duration} min</Text>
                  </View>
                  <View style={styles.workoutPlanStat}>
                    <Dumbbell size={16} color="#22C55E" />
                    <Text style={styles.workoutPlanStatText}>{currentDayPlan.exercises.length} exercises</Text>
                  </View>
                  <View style={styles.workoutPlanStat}>
                    <Flame size={16} color="#F97316" />
                    <Text style={styles.workoutPlanStatText}>{currentDayPlan.calories} cal</Text>
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.exerciseToggle}
                  onPress={() => setIsExerciseListVisible(!isExerciseListVisible)}
                >
                  <Text style={styles.exerciseToggleText}>
                    {isExerciseListVisible ? 'Hide' : 'Show'} Exercises ({currentDayPlan.exercises.length})
                  </Text>
                  {isExerciseListVisible ? (
                    <ChevronUp size={20} color="#6366F1" />
                  ) : (
                    <ChevronDown size={20} color="#6366F1" />
                  )}
                </TouchableOpacity>

                {isExerciseListVisible && (
                  <View style={styles.exercisesList}>
                    {currentDayPlan.exercises.map((exercise, index) => (
                      <View key={exercise.id} style={styles.exerciseItem}>
                        <Image 
                          source={{ uri: exercise.image }}
                          style={styles.exerciseImage}
                        />
                        <View style={styles.exerciseInfo}>
                          <Text style={styles.exerciseName}>{exercise.name}</Text>
                          <Text style={styles.exerciseDetails}>
                            {exercise.sets} sets × {exercise.reps} reps
                          </Text>
                          <View style={styles.exerciseMeta}>
                            <Text style={styles.exerciseMuscle}>{exercise.muscleGroup}</Text>
                            <View style={[
                              styles.exerciseDifficulty,
                              { backgroundColor: getDifficultyColor(exercise.difficulty) + '20' }
                            ]}>
                              <Text style={[
                                styles.exerciseDifficultyText,
                                { color: getDifficultyColor(exercise.difficulty) }
                              ]}>
                                {exercise.difficulty}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                )}

                <TouchableOpacity style={styles.startWorkoutButton}>
                  <Play size={20} color="#FFFFFF" />
                  <Text style={styles.startWorkoutButtonText}>
                    {currentDayPlan.isCompleted ? 'View Workout' : 'Start Workout'}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {currentDayPlan.workoutTitle === 'Rest Day' && (
              <View style={styles.restDayContent}>
                <View style={styles.restDayIcon}>
                  <Zzz size={32} color="#6366F1" />
                </View>
                <Text style={styles.restDayText}>
                  Take a well-deserved break! Recovery is just as important as training.
                </Text>
                <Text style={styles.restDaySubtext}>
                  Light stretching or a gentle walk is recommended.
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStatsSection}>
          <Text style={styles.sectionTitle}>Week Overview</Text>
          
          <View style={styles.quickStatsGrid}>
            <View style={styles.quickStatCard}>
              <View style={styles.quickStatIcon}>
                <Target size={20} color="#6366F1" />
              </View>
              <Text style={styles.quickStatValue}>85%</Text>
              <Text style={styles.quickStatLabel}>Goal Progress</Text>
            </View>
            
            <View style={styles.quickStatCard}>
              <View style={styles.quickStatIcon}>
                <TrendingUp size={20} color="#22C55E" />
              </View>
              <Text style={styles.quickStatValue}>+12%</Text>
              <Text style={styles.quickStatLabel}>vs Last Week</Text>
            </View>
            
            <View style={styles.quickStatCard}>
              <View style={styles.quickStatIcon}>
                <Award size={20} color="#F97316" />
              </View>
              <Text style={styles.quickStatValue}>Level 8</Text>
              <Text style={styles.quickStatLabel}>Fitness Level</Text>
            </View>
          </View>
        </View>

        {/* Regenerate Plan */}
        <View style={styles.regenerateSection}>
          <TouchableOpacity style={styles.regenerateButton}>
            <Zap size={20} color="#6366F1" />
            <Text style={styles.regenerateButtonText}>Generate New Plan</Text>
          </TouchableOpacity>
          
          <Text style={styles.regenerateSubtext}>
            Create a fresh 7-day workout plan based on your current goals and equipment
          </Text>
        </View>

        {/* Bottom spacing for tab navigation */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Define Zzz component for rest day
const Zzz: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: size * 0.8, color, fontWeight: 'bold' }}>💤</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
  },
  progressBanner: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  progressStats: {
    alignItems: 'flex-end',
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
  progressPercentage: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#6366F1',
  },
  progressBarContainer: {
    marginBottom: 16,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  progressDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDetailText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#E5E7EB',
    marginLeft: 6,
  },
  calendarSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  calendarScrollContent: {
    paddingHorizontal: 24,
    paddingRight: 48,
  },
  calendarDay: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    minWidth: 60,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
    position: 'relative',
  },
  calendarDaySelected: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  calendarDayToday: {
    borderColor: '#F97316',
    borderWidth: 2,
  },
  calendarDayCompleted: {
    backgroundColor: '#0F1F13',
    borderColor: '#22C55E',
  },
  calendarDayText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  calendarDayTextSelected: {
    color: '#FFFFFF',
  },
  calendarDayTextToday: {
    color: '#F97316',
  },
  calendarDateText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  calendarDateTextSelected: {
    color: '#FFFFFF',
  },
  calendarDateTextToday: {
    color: '#F97316',
  },
  completedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  completedDot: {
    width: 8,
    height: 8,
    backgroundColor: '#22C55E',
    borderRadius: 4,
  },
  workoutPlanSection: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  workoutPlanCard: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  workoutPlanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  workoutPlanInfo: {
    flex: 1,
  },
  workoutPlanTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  workoutPlanDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
  completedBadge: {
    backgroundColor: '#22C55E20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  completedBadgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#22C55E',
  },
  workoutPlanStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: '#374151',
    borderRadius: 16,
    paddingVertical: 16,
  },
  workoutPlanStat: {
    alignItems: 'center',
  },
  workoutPlanStatText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#E5E7EB',
    marginTop: 4,
  },
  exerciseToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    marginBottom: 16,
  },
  exerciseToggleText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6366F1',
  },
  exercisesList: {
    marginBottom: 20,
  },
  exerciseItem: {
    flexDirection: 'row',
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  exerciseImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  exerciseInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  exerciseName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  exerciseDetails: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseMuscle: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#E5E7EB',
    marginRight: 12,
  },
  exerciseDifficulty: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  exerciseDifficultyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 9,
  },
  startWorkoutButton: {
    backgroundColor: '#6366F1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  startWorkoutButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  restDayContent: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  restDayIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#6366F120',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  restDayText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  restDaySubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  quickStatsSection: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  quickStatsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickStatCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    width: (width - 72) / 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  quickStatIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#374151',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickStatValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  quickStatLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  regenerateSection: {
    marginHorizontal: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  regenerateButton: {
    backgroundColor: '#1F2937',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#6366F1',
    marginBottom: 12,
  },
  regenerateButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#6366F1',
    marginLeft: 8,
  },
  regenerateSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 18,
  },
  bottomSpacing: {
    height: 100,
  },
});

export default WorkoutPlanScreen;