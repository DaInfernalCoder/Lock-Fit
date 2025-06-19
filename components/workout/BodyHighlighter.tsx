import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  ScrollView,
  Animated,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  RotateCcw,
  X,
  Info,
  Play,
  Pause,
  Square,
  Clock,
  Flame,
  Target,
  Zap,
  Activity,
} from 'lucide-react-native';
import Body, { ExtendedBodyPart } from 'react-native-body-highlighter';
import { useWorkoutSession } from '@/hooks/useWorkoutSession';
import { BodyPart, MuscleDetail } from '@/types/progress';

const { width, height } = Dimensions.get('window');

interface BodyHighlighterProps {
  onWorkoutStart?: () => void;
  onWorkoutEnd?: () => void;
  onMuscleSelect?: (muscle: MuscleDetail) => void;
}

export const BodyHighlighter: React.FC<BodyHighlighterProps> = ({
  onWorkoutStart,
  onWorkoutEnd,
  onMuscleSelect,
}) => {
  const {
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
    startDemoWorkout,
    muscleDatabase,
  } = useWorkoutSession();

  const [side, setSide] = useState<'front' | 'back'>('front');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [scale, setScale] = useState(1.2);
  const [isLoading, setIsLoading] = useState(false);
  const [showMuscleDetail, setShowMuscleDetail] = useState(false);
  const [rotationAnimation] = useState(new Animated.Value(0));

  // Handle body part press with error handling
  const onBodyPartPress = useCallback(
    (bodyPart: ExtendedBodyPart, pressedSide?: 'left' | 'right') => {
      try {
        // Ensure slug exists before proceeding
        if (!bodyPart.slug) {
          console.warn('Body part pressed without slug');
          return;
        }

        // Convert ExtendedBodyPart to our BodyPart type
        const localBodyPart: BodyPart = {
          slug: bodyPart.slug,
          intensity: bodyPart.intensity || 1,
          side: bodyPart.side,
          color: bodyPart.color,
          path: bodyPart.path,
        };

        handleMusclePress(localBodyPart, pressedSide);
        setShowMuscleDetail(true);
        onMuscleSelect?.(muscleDatabase[bodyPart.slug]);
      } catch (error) {
        console.error('Error handling muscle press:', error);
        Alert.alert('Error', 'Failed to load muscle information');
      }
    },
    [handleMusclePress, onMuscleSelect, muscleDatabase]
  );

  // Smooth rotation animation between front and back
  const toggleSide = useCallback(() => {
    setIsLoading(true);

    Animated.timing(rotationAnimation, {
      toValue: side === 'front' ? 1 : 0,
      duration: 800,
      useNativeDriver: false,
    }).start(() => {
      setSide((prevSide) => (prevSide === 'front' ? 'back' : 'front'));
      setIsLoading(false);
    });
  }, [side, rotationAnimation]);

  // Handle workout controls
  const handleStartWorkout = useCallback(() => {
    try {
      startDemoWorkout();
      onWorkoutStart?.();
    } catch (error) {
      console.error('Error starting workout:', error);
      Alert.alert('Error', 'Failed to start workout session');
    }
  }, [startDemoWorkout, onWorkoutStart]);

  const handleEndWorkout = useCallback(() => {
    try {
      endWorkout();
      onWorkoutEnd?.();
    } catch (error) {
      console.error('Error ending workout:', error);
      Alert.alert('Error', 'Failed to end workout session');
    }
  }, [endWorkout, onWorkoutEnd]);

  // Demo exercise functions
  const demoExercises = [
    { name: 'Push-ups', muscles: ['chest', 'triceps', 'deltoids'] },
    { name: 'Squats', muscles: ['quadriceps', 'gluteal', 'calves'] },
    { name: 'Plank', muscles: ['abs', 'obliques'] },
    { name: 'Pull-ups', muscles: ['upper-back', 'biceps'] },
    { name: 'Lunges', muscles: ['quadriceps', 'gluteal', 'hamstring'] },
  ];

  const handleDemoExercise = useCallback(
    (exerciseName: string, muscles: string[]) => {
      if (!isWorkoutActive) {
        Alert.alert(
          'No Active Workout',
          'Please start a workout session first'
        );
        return;
      }

      try {
        startExercise(exerciseName, muscles);
      } catch (error) {
        console.error('Error starting exercise:', error);
        Alert.alert('Error', 'Failed to start exercise');
      }
    },
    [isWorkoutActive, startExercise]
  );

  // Convert BodyPart[] to ExtendedBodyPart[] for library compatibility
  const convertToExtendedBodyParts = useCallback(
    (bodyParts: BodyPart[]): ExtendedBodyPart[] => {
      return bodyParts.map((part) => ({
        slug: part.slug,
        intensity: part.intensity,
        side: part.side,
        color: part.color,
        path: part.path,
      }));
    },
    []
  );

  // Get intensity colors - using blue theme
  const getIntensityColors = () => {
    return ['#0070FF', '#0070FF80', '#0070FF60', '#0070FF40', '#0070FF20'];
  };

  // Format workout time
  const formatWorkoutTime = (startTime: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000 / 60);
    return `${diff} min`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Body Tracker</Text>
          <Text style={styles.headerSubtitle}>
            {isWorkoutActive ? 'Workout Active' : 'Tap muscles to explore'}
          </Text>
        </View>

        <View style={styles.headerControls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={toggleSide}
            disabled={isLoading}
          >
            <RotateCcw size={20} color="#0070FF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Workout Status */}
      {isWorkoutActive && workoutSession && (
        <View style={styles.workoutStatus}>
          <View style={styles.statusInfo}>
            <Activity size={16} color="#0070FF" />
            <Text style={styles.statusText}>
              Active • {formatWorkoutTime(workoutSession.startTime)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.endWorkoutButton}
            onPress={handleEndWorkout}
          >
            <Square size={14} color="#FFFFFF" />
            <Text style={styles.endWorkoutText}>End</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Body Model Container */}
      <View style={styles.bodyContainer}>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#0070FF" />
            <Text style={styles.loadingText}>Rotating model...</Text>
          </View>
        )}

        <Animated.View
          style={[
            styles.bodyWrapper,
            {
              transform: [
                {
                  rotateY: rotationAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <Body
            data={convertToExtendedBodyParts(activeMuscles)}
            onBodyPartPress={onBodyPartPress}
            colors={getIntensityColors()}
            side={side}
            gender={gender}
            scale={scale}
            border="#2A2A2A"
          />
        </Animated.View>

        {/* Scale Controls */}
        <View style={styles.scaleControls}>
          <TouchableOpacity
            style={styles.scaleButton}
            onPress={() => setScale((prev) => Math.max(0.8, prev - 0.1))}
          >
            <Text style={styles.scaleButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.scaleText}>{Math.round(scale * 100)}%</Text>
          <TouchableOpacity
            style={styles.scaleButton}
            onPress={() => setScale((prev) => Math.min(2.0, prev + 0.1))}
          >
            <Text style={styles.scaleButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Model Controls */}
      <View style={styles.modelControls}>
        <TouchableOpacity
          style={[
            styles.modelButton,
            side === 'front' && styles.modelButtonActive,
          ]}
          onPress={() => side !== 'front' && toggleSide()}
        >
          <Text
            style={[
              styles.modelButtonText,
              side === 'front' && styles.modelButtonTextActive,
            ]}
          >
            Front
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.modelButton,
            side === 'back' && styles.modelButtonActive,
          ]}
          onPress={() => side !== 'back' && toggleSide()}
        >
          <Text
            style={[
              styles.modelButtonText,
              side === 'back' && styles.modelButtonTextActive,
            ]}
          >
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.modelButton,
            gender === 'male' && styles.modelButtonActive,
          ]}
          onPress={() => setGender(gender === 'male' ? 'female' : 'male')}
        >
          <Text
            style={[
              styles.modelButtonText,
              gender === 'male' && styles.modelButtonTextActive,
            ]}
          >
            {gender === 'male' ? 'Male' : 'Female'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Workout Controls */}
      <View style={styles.workoutControls}>
        {!isWorkoutActive ? (
          <TouchableOpacity
            style={styles.startWorkoutButton}
            onPress={handleStartWorkout}
          >
            <Play size={20} color="#FFFFFF" />
            <Text style={styles.startWorkoutText}>Start Demo Workout</Text>
          </TouchableOpacity>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.exerciseControls}
          >
            {demoExercises.map((exercise, index) => (
              <TouchableOpacity
                key={index}
                style={styles.exerciseButton}
                onPress={() =>
                  handleDemoExercise(exercise.name, exercise.muscles)
                }
              >
                <Text style={styles.exerciseButtonText}>{exercise.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Muscle Detail Modal */}
      <Modal
        visible={showMuscleDetail && !!selectedMuscle}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setShowMuscleDetail(false);
          clearSelectedMuscle();
        }}
      >
        <SafeAreaView style={styles.modalContainer}>
          {selectedMuscle && (
            <>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {selectedMuscle.displayName}
                </Text>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => {
                    setShowMuscleDetail(false);
                    clearSelectedMuscle();
                  }}
                >
                  <X size={24} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalContent}>
                <View style={styles.muscleInfo}>
                  <View style={styles.muscleStats}>
                    <View style={styles.muscleStat}>
                      <Target size={16} color="#0070FF" />
                      <Text style={styles.muscleStatValue}>
                        {selectedMuscle.group}
                      </Text>
                      <Text style={styles.muscleStatLabel}>Group</Text>
                    </View>
                    <View style={styles.muscleStat}>
                      <Activity size={16} color="#0070FF" />
                      <Text style={styles.muscleStatValue}>
                        {selectedMuscle.sessionsThisMonth}
                      </Text>
                      <Text style={styles.muscleStatLabel}>Sessions</Text>
                    </View>
                    <View style={styles.muscleStat}>
                      <Clock size={16} color="#0070FF" />
                      <Text style={styles.muscleStatValue}>
                        {selectedMuscle.lastWorked}
                      </Text>
                      <Text style={styles.muscleStatLabel}>Last worked</Text>
                    </View>
                  </View>

                  <View style={styles.exerciseSection}>
                    <Text style={styles.sectionTitle}>Common Exercises</Text>
                    {selectedMuscle.exercises.map((exercise, index) => (
                      <View key={index} style={styles.exerciseItem}>
                        <Zap size={16} color="#0070FF" />
                        <Text style={styles.exerciseText}>{exercise}</Text>
                      </View>
                    ))}
                  </View>

                  {selectedMuscle.synergistMuscles.length > 0 && (
                    <View style={styles.synergistSection}>
                      <Text style={styles.sectionTitle}>Works With</Text>
                      <View style={styles.synergistMuscles}>
                        {selectedMuscle.synergistMuscles.map(
                          (muscle, index) => (
                            <View key={index} style={styles.synergistMuscle}>
                              <Text style={styles.synergistText}>
                                {muscleDatabase[muscle]?.displayName || muscle}
                              </Text>
                            </View>
                          )
                        )}
                      </View>
                    </View>
                  )}
                </View>
              </ScrollView>
            </>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  workoutStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#0070FF',
    marginLeft: 8,
  },
  endWorkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4D4D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  endWorkoutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(18, 18, 18, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 12,
  },
  bodyWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scaleControls: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  scaleButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scaleButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  scaleText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#E5E7EB',
    marginHorizontal: 12,
    minWidth: 40,
    textAlign: 'center',
  },
  modelControls: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  modelButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    alignItems: 'center',
  },
  modelButtonActive: {
    backgroundColor: '#0070FF',
    borderColor: '#0070FF',
  },
  modelButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#9CA3AF',
  },
  modelButtonTextActive: {
    color: '#FFFFFF',
  },
  workoutControls: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  startWorkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0070FF',
    paddingVertical: 16,
    borderRadius: 12,
  },
  startWorkoutText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  exerciseControls: {
    marginTop: 8,
  },
  exerciseButton: {
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  exerciseButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#E5E7EB',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  modalTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  modalCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  modalContent: {
    flex: 1,
  },
  muscleInfo: {
    padding: 24,
  },
  muscleStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    paddingVertical: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  muscleStat: {
    alignItems: 'center',
  },
  muscleStatValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  muscleStatLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  exerciseSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  exerciseText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#E5E7EB',
    marginLeft: 12,
  },
  synergistSection: {
    marginBottom: 24,
  },
  synergistMuscles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  synergistMuscle: {
    backgroundColor: '#0070FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  synergistText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
});
