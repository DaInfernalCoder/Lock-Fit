import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Bell, 
  Lock, 
  Unlock,
  Dumbbell, 
  Clock, 
  Flame, 
  Target, 
  TrendingUp,
  Quote,
  Play,
  ChevronRight,
  Calendar,
  Award,
  Activity
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const progressStats = [
  { id: 1, label: 'Workouts', value: '12', target: '15', icon: Dumbbell, color: '#6366F1' },
  { id: 2, label: 'Calories', value: '2,340', target: '3,000', icon: Flame, color: '#F97316' },
  { id: 3, label: 'Minutes', value: '240', target: '300', icon: Clock, color: '#22C55E' },
];

const todayWorkout = {
  title: 'Upper Body Blast',
  duration: '45 min',
  exercises: 8,
  calories: '320 cal',
  difficulty: 'Intermediate',
  progress: 0, // 0 = not started, 0.5 = in progress, 1 = completed
};

const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "The groundwork for all happiness is good health.",
];

export default function HomeScreen() {
  const [isLocked, setIsLocked] = useState(true);
  const [notifications] = useState(2);
  const [currentQuote] = useState(motivationalQuotes[0]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleStartWorkout = () => {
    setIsLocked(false);
    // Navigate to workout screen or start workout flow
  };

  const getProgressPercentage = (current: string, target: string) => {
    const curr = parseInt(current.replace(/,/g, ''));
    const targ = parseInt(target.replace(/,/g, ''));
    return (curr / targ) * 100;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.date}>{getCurrentDate()}</Text>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color="#E5E7EB" />
              {notifications > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationText}>{notifications}</Text>
                </View>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.profileButton}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Lock Status Module */}
        <View style={styles.lockStatusContainer}>
          <View style={styles.lockHeader}>
            <Text style={styles.lockTitle}>Phone Status</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: isLocked ? '#EF444420' : '#22C55E20' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: isLocked ? '#EF4444' : '#22C55E' }
              ]}>
                {isLocked ? 'Locked' : 'Unlocked'}
              </Text>
            </View>
          </View>
          
          <Text style={styles.lockDescription}>
            {isLocked 
              ? 'Distracting apps are blocked until your workout is complete.'
              : 'Great job! Your apps are now unlocked for today.'
            }
          </Text>
          
          <View style={styles.lockActions}>
            <View style={styles.lockInfo}>
              {isLocked ? (
                <Lock size={20} color="#6366F1" />
              ) : (
                <Unlock size={20} color="#22C55E" />
              )}
              <Text style={styles.lockTime}>
                {isLocked ? `Until ${getCurrentTime()}` : 'Apps Available'}
              </Text>
            </View>
            
            {isLocked && (
              <TouchableOpacity style={styles.startWorkoutButton} onPress={handleStartWorkout}>
                <Play size={16} color="#FFFFFF" />
                <Text style={styles.startWorkoutText}>Start Workout</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Progress Tracker */}
        <View style={styles.progressSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Progress</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.progressCards}>
            {progressStats.map((stat) => {
              const IconComponent = stat.icon;
              const percentage = getProgressPercentage(stat.value, stat.target);
              
              return (
                <View key={stat.id} style={styles.progressCard}>
                  <View style={[styles.progressIcon, { backgroundColor: `${stat.color}20` }]}>
                    <IconComponent size={20} color={stat.color} />
                  </View>
                  
                  <Text style={styles.progressValue}>{stat.value}</Text>
                  <Text style={styles.progressTarget}>of {stat.target}</Text>
                  <Text style={styles.progressLabel}>{stat.label}</Text>
                  
                  <View style={styles.progressBarContainer}>
                    <View style={styles.progressBarBackground}>
                      <View 
                        style={[
                          styles.progressBarFill,
                          { 
                            width: `${Math.min(percentage, 100)}%`,
                            backgroundColor: stat.color
                          }
                        ]} 
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Today's Workout */}
        <View style={styles.workoutSection}>
          <Text style={styles.sectionTitle}>Today's Workout</Text>
          
          <TouchableOpacity style={styles.workoutCard}>
            <View style={styles.workoutHeader}>
              <Text style={styles.workoutTitle}>{todayWorkout.title}</Text>
              <View style={styles.difficultyBadge}>
                <Text style={styles.difficultyText}>{todayWorkout.difficulty}</Text>
              </View>
            </View>
            
            <View style={styles.workoutStats}>
              <View style={styles.workoutStat}>
                <Clock size={16} color="#9CA3AF" />
                <Text style={styles.workoutStatText}>{todayWorkout.duration}</Text>
              </View>
              <View style={styles.workoutStat}>
                <Target size={16} color="#9CA3AF" />
                <Text style={styles.workoutStatText}>{todayWorkout.exercises} exercises</Text>
              </View>
              <View style={styles.workoutStat}>
                <Flame size={16} color="#F97316" />
                <Text style={styles.workoutStatText}>{todayWorkout.calories}</Text>
              </View>
            </View>
            
            <View style={styles.workoutAction}>
              <TouchableOpacity style={styles.previewButton}>
                <Text style={styles.previewButtonText}>Preview Workout</Text>
                <ChevronRight size={16} color="#6366F1" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={styles.quickActionIcon}>
                <Calendar size={24} color="#6366F1" />
              </View>
              <Text style={styles.quickActionText}>View Schedule</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={styles.quickActionIcon}>
                <Award size={24} color="#F97316" />
              </View>
              <Text style={styles.quickActionText}>Achievements</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={styles.quickActionIcon}>
                <Activity size={24} color="#22C55E" />
              </View>
              <Text style={styles.quickActionText}>Health Stats</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Motivational Quote */}
        <View style={styles.quoteSection}>
          <View style={styles.quoteContainer}>
            <Quote size={24} color="#6366F1" style={styles.quoteIcon} />
            <Text style={styles.quoteText}>"{currentQuote}"</Text>
            <Text style={styles.quoteSubtext}>
              {isLocked 
                ? 'Complete today\'s workout to unlock your apps'
                : 'Keep up the great work!'
              }
            </Text>
          </View>
        </View>

        {/* Bottom spacing for tab navigation */}
        <View style={styles.bottomSpacing} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
    marginRight: 16,
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#6366F1',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  profileButton: {
    padding: 2,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#6366F1',
  },
  lockStatusContainer: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  lockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  lockTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  lockDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 16,
  },
  lockActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockTime: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#E5E7EB',
    marginLeft: 8,
  },
  startWorkoutButton: {
    backgroundColor: '#6366F1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  startWorkoutText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 6,
  },
  progressSection: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  viewAllText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6366F1',
  },
  progressCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    width: (width - 72) / 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  progressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  progressValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  progressTarget: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  progressLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#E5E7EB',
    marginBottom: 12,
  },
  progressBarContainer: {
    width: '100%',
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  workoutSection: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  workoutCard: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  workoutTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    flex: 1,
  },
  difficultyBadge: {
    backgroundColor: '#F9731620',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#F97316',
  },
  workoutStats: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  workoutStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  workoutStatText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 6,
  },
  workoutAction: {
    alignItems: 'flex-end',
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  previewButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6366F1',
    marginRight: 4,
  },
  quickActionsSection: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    width: (width - 72) / 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#374151',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#E5E7EB',
    textAlign: 'center',
  },
  quoteSection: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  quoteContainer: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  quoteIcon: {
    marginBottom: 16,
  },
  quoteText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 12,
  },
  quoteSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 100,
  },
});