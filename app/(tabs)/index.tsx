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
import { Zap, Target, TrendingUp } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const muscleGroups = [
  { id: 'chest', name: 'Chest', x: width * 0.5, y: 200, color: '#EF4444' },
  { id: 'arms', name: 'Arms', x: width * 0.3, y: 180, color: '#F97316' },
  { id: 'shoulders', name: 'Shoulders', x: width * 0.7, y: 180, color: '#EAB308' },
  { id: 'core', name: 'Core', x: width * 0.5, y: 280, color: '#22C55E' },
  { id: 'back', name: 'Back', x: width * 0.5, y: 160, color: '#3B82F6' },
  { id: 'legs', name: 'Legs', x: width * 0.5, y: 380, color: '#8B5CF6' },
  { id: 'glutes', name: 'Glutes', x: width * 0.5, y: 340, color: '#EC4899' },
];

export default function HomeScreen() {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  const handleMusclePress = (muscleId: string) => {
    setSelectedMuscle(muscleId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appName}>LockFit</Text>
          <Text style={styles.subtitle}>Your personal fitness companion</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Zap color="#6366F1" size={24} />
            <Text style={styles.statValue}>1,247</Text>
            <Text style={styles.statLabel}>Calories Burned</Text>
          </View>
          <View style={styles.statCard}>
            <Target color="#22C55E" size={24} />
            <Text style={styles.statValue}>12/15</Text>
            <Text style={styles.statLabel}>Workouts Done</Text>
          </View>
          <View style={styles.statCard}>
            <TrendingUp color="#F97316" size={24} />
            <Text style={styles.statValue}>Level 8</Text>
            <Text style={styles.statLabel}>Fitness Level</Text>
          </View>
        </View>

        {/* Body Model */}
        <View style={styles.bodyModelContainer}>
          <Text style={styles.sectionTitle}>Target Muscle Groups</Text>
          <Text style={styles.sectionSubtitle}>
            Tap on different muscle groups to explore targeted exercises
          </Text>
          
          <View style={styles.bodyModel}>
            {/* Human silhouette background */}
            <View style={styles.silhouette} />
            
            {/* Interactive muscle group buttons */}
            {muscleGroups.map((muscle) => (
              <TouchableOpacity
                key={muscle.id}
                style={[
                  styles.muscleButton,
                  {
                    left: muscle.x - 30,
                    top: muscle.y - 15,
                    backgroundColor: selectedMuscle === muscle.id ? muscle.color : `${muscle.color}80`,
                    borderColor: muscle.color,
                  }
                ]}
                onPress={() => handleMusclePress(muscle.id)}
              >
                <Text style={styles.muscleButtonText}>{muscle.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedMuscle && (
            <View style={styles.selectedMuscleInfo}>
              <Text style={styles.selectedMuscleTitle}>
                {muscleGroups.find(m => m.id === selectedMuscle)?.name} Selected
              </Text>
              <Text style={styles.selectedMuscleDescription}>
                Tap "Workouts" to see exercises targeting this muscle group
              </Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconContainer}>
              <Zap color="#6366F1" size={28} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Generate Workout Plan</Text>
              <Text style={styles.actionDescription}>
                Create a personalized 7-day workout plan
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconContainer}>
              <Target color="#22C55E" size={28} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Start Quick Workout</Text>
              <Text style={styles.actionDescription}>
                Jump into a 15-minute targeted session
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
  },
  welcomeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  appName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 32,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#374151',
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  bodyModelContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 24,
  },
  bodyModel: {
    height: 500,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  silhouette: {
    position: 'absolute',
    width: 120,
    height: 400,
    backgroundColor: '#374151',
    borderRadius: 60,
    top: 50,
  },
  muscleButton: {
    position: 'absolute',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 2,
    minWidth: 60,
    alignItems: 'center',
  },
  muscleButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    color: '#FFFFFF',
  },
  selectedMuscleInfo: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  selectedMuscleTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#6366F1',
    marginBottom: 8,
  },
  selectedMuscleDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
  quickActionsContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  actionCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#374151',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  actionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
});