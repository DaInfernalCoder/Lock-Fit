import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Play, Clock, Target, Flame, Filter } from 'lucide-react-native';

const exercises = [
  {
    id: 1,
    name: 'Push-ups',
    category: 'Chest',
    difficulty: 'Beginner',
    duration: '3 sets × 12 reps',
    calories: '8-12 cal/min',
    equipment: 'Bodyweight',
    description: 'Classic bodyweight exercise targeting chest, shoulders, and triceps',
    videoUrl: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg',
    instructions: [
      'Start in plank position with hands slightly wider than shoulders',
      'Lower your body until chest nearly touches the floor',
      'Push back up to starting position',
      'Keep your body in a straight line throughout'
    ],
    tips: [
      'Engage your core throughout the movement',
      'Don\'t let your hips sag or pike up',
      'Control the descent - don\'t drop down quickly'
    ]
  },
  {
    id: 2,
    name: 'Squats',
    category: 'Legs',
    difficulty: 'Beginner',
    duration: '3 sets × 15 reps',
    calories: '10-15 cal/min',
    equipment: 'Bodyweight',
    description: 'Fundamental lower body exercise targeting quads, glutes, and hamstrings',
    videoUrl: 'https://images.pexels.com/photos/703012/pexels-photo-703012.jpeg',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body as if sitting back into a chair',
      'Keep your chest up and knees behind toes',
      'Push through heels to return to standing'
    ],
    tips: [
      'Keep your weight on your heels',
      'Don\'t let knees cave inward',
      'Go as low as your flexibility allows'
    ]
  },
  {
    id: 3,
    name: 'Dumbbell Bench Press',
    category: 'Chest',
    difficulty: 'Intermediate',
    duration: '4 sets × 10 reps',
    calories: '12-18 cal/min',
    equipment: 'Dumbbells, Bench',
    description: 'Compound movement for building chest, shoulder, and tricep strength',
    videoUrl: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg',
    instructions: [
      'Lie flat on bench with dumbbells at chest level',
      'Press weights up until arms are fully extended',
      'Lower with control back to starting position',
      'Keep shoulder blades retracted throughout'
    ],
    tips: [
      'Don\'t arch your back excessively',
      'Control the weight on the way down',
      'Keep wrists straight and strong'
    ]
  },
  {
    id: 4,
    name: 'Deadlifts',
    category: 'Back',
    difficulty: 'Advanced',
    duration: '4 sets × 8 reps',
    calories: '15-20 cal/min',
    equipment: 'Barbell',
    description: 'King of all exercises - targets entire posterior chain',
    videoUrl: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg',
    instructions: [
      'Stand with feet hip-width apart, bar over mid-foot',
      'Hinge at hips and grab bar with hands outside legs',
      'Drive through heels and extend hips to lift bar',
      'Keep bar close to body throughout movement'
    ],
    tips: [
      'Keep your back neutral, not rounded',
      'Lead with your hips, not your shoulders',
      'Squeeze glutes at the top of the movement'
    ]
  },
  {
    id: 5,
    name: 'Plank',
    category: 'Core',
    difficulty: 'Beginner',
    duration: '3 sets × 45 sec',
    calories: '5-8 cal/min',
    equipment: 'Bodyweight',
    description: 'Isometric core exercise building stability and endurance',
    videoUrl: 'https://images.pexels.com/photos/863926/pexels-photo-863926.jpeg',
    instructions: [
      'Start in push-up position on forearms',
      'Keep body in straight line from head to heels',
      'Engage core and breathe normally',
      'Hold for specified time'
    ],
    tips: [
      'Don\'t let hips sag or pike up',
      'Keep shoulders directly over elbows',
      'Breathe steadily - don\'t hold your breath'
    ]
  },
  {
    id: 6,
    name: 'Pull-ups',
    category: 'Back',
    difficulty: 'Advanced',
    duration: '4 sets × 6 reps',
    calories: '12-16 cal/min',
    equipment: 'Pull-up Bar',
    description: 'Ultimate upper body pulling exercise for back and biceps',
    videoUrl: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
    instructions: [
      'Hang from bar with palms facing away',
      'Pull body up until chin clears the bar',
      'Lower with control to full arm extension',
      'Keep core engaged throughout'
    ],
    tips: [
      'Don\'t swing or use momentum',
      'Focus on pulling with your back, not just arms',
      'Full range of motion is key'
    ]
  }
];

const categories = ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Core', 'Shoulders'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function ExercisesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || exercise.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

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
          <Text style={styles.title}>Exercise Library</Text>
          <Text style={styles.subtitle}>
            Master your form with detailed instructions and video demonstrations
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search exercises..."
              placeholderTextColor="#6B7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          <Text style={styles.filterLabel}>Category</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterScrollContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterButton,
                  selectedCategory === category && styles.filterButtonActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedCategory === category && styles.filterButtonTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.filterLabel}>Difficulty</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterScrollContainer}
          >
            {difficulties.map((difficulty) => (
              <TouchableOpacity
                key={difficulty}
                style={[
                  styles.filterButton,
                  selectedDifficulty === difficulty && styles.filterButtonActive
                ]}
                onPress={() => setSelectedDifficulty(difficulty)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedDifficulty === difficulty && styles.filterButtonTextActive
                ]}>
                  {difficulty}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Exercise List */}
        <View style={styles.exerciseContainer}>
          {filteredExercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={[
                styles.exerciseCard,
                selectedExercise === exercise.id && styles.exerciseCardSelected
              ]}
              onPress={() => setSelectedExercise(
                selectedExercise === exercise.id ? null : exercise.id
              )}
            >
              <Image 
                source={{ uri: exercise.videoUrl }}
                style={styles.exerciseImage}
                resizeMode="cover"
              />
              
              <View style={styles.exerciseContent}>
                <View style={styles.exerciseHeader}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <View style={styles.exerciseMeta}>
                    <View style={[
                      styles.difficultyBadge,
                      { backgroundColor: `${getDifficultyColor(exercise.difficulty)}20` }
                    ]}>
                      <Text style={[
                        styles.difficultyText,
                        { color: getDifficultyColor(exercise.difficulty) }
                      ]}>
                        {exercise.difficulty}
                      </Text>
                    </View>
                    <Text style={styles.categoryText}>{exercise.category}</Text>
                  </View>
                </View>

                <Text style={styles.exerciseDescription}>{exercise.description}</Text>

                <View style={styles.exerciseStats}>
                  <View style={styles.statItem}>
                    <Clock size={16} color="#9CA3AF" />
                    <Text style={styles.statText}>{exercise.duration}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Flame size={16} color="#F97316" />
                    <Text style={styles.statText}>{exercise.calories}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Target size={16} color="#6366F1" />
                    <Text style={styles.statText}>{exercise.equipment}</Text>
                  </View>
                </View>

                {/* Expanded Content */}
                {selectedExercise === exercise.id && (
                  <View style={styles.expandedContent}>
                    <View style={styles.separator} />
                    
                    <Text style={styles.sectionTitle}>Instructions</Text>
                    {exercise.instructions.map((instruction, index) => (
                      <Text key={index} style={styles.instructionText}>
                        {index + 1}. {instruction}
                      </Text>
                    ))}

                    <Text style={styles.sectionTitle}>Form Tips</Text>
                    {exercise.tips.map((tip, index) => (
                      <Text key={index} style={styles.tipText}>
                        • {tip}
                      </Text>
                    ))}

                    <TouchableOpacity style={styles.playButton}>
                      <Play size={20} color="#FFFFFF" />
                      <Text style={styles.playButtonText}>Watch Demonstration</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredExercises.length === 0 && (
          <View style={styles.emptyState}>
            <Filter size={48} color="#6B7280" />
            <Text style={styles.emptyStateTitle}>No exercises found</Text>
            <Text style={styles.emptyStateText}>
              Try adjusting your search or filters to find more exercises
            </Text>
          </View>
        )}
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
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  searchInputContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  filtersContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  filterLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  filterScrollContainer: {
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  filterButtonActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  filterButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#9CA3AF',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  exerciseContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  exerciseCard: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#374151',
  },
  exerciseCardSelected: {
    borderColor: '#6366F1',
    borderWidth: 2,
  },
  exerciseImage: {
    width: '100%',
    height: 200,
  },
  exerciseContent: {
    padding: 20,
  },
  exerciseHeader: {
    marginBottom: 12,
  },
  exerciseName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  difficultyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6366F1',
  },
  exerciseDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 16,
  },
  exerciseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#E5E7EB',
    marginLeft: 6,
  },
  expandedContent: {
    marginTop: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#374151',
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  instructionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#E5E7EB',
    lineHeight: 20,
    marginBottom: 8,
  },
  tipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 6,
  },
  playButton: {
    backgroundColor: '#6366F1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 16,
  },
  playButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyStateTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
});