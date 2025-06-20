import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TOTAL_ONBOARDING_SCREENS = 8;
const CURRENT_SCREEN = 8;

type Goal = 'strength' | 'weight' | 'recovery';

interface GoalOption {
  id: Goal;
  title: string;
  description: string;
  icon: string;
}

const goalOptions: GoalOption[] = [
  {
    id: 'strength',
    title: 'Build Strength',
    description: 'Focus on muscle building and power',
    icon: 'barbell',
  },
  {
    id: 'weight',
    title: 'Lose Weight',
    description: 'Burn fat and improve metabolism',
    icon: 'flame',
  },
  {
    id: 'recovery',
    title: 'Recover from Injuries',
    description: 'Safe exercises for rehabilitation',
    icon: 'medical',
  },
];

export default function GoalsScreen() {
  const [selectedGoals, setSelectedGoals] = useState<Set<Goal>>(new Set());

  const handleNext = () => {
    // Navigate to main app after onboarding
    router.push('/(auth)/sign-in');
  };

  const handleBack = () => {
    router.back();
  };

  const handleGoalToggle = (goalId: Goal) => {
    setSelectedGoals((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(goalId)) {
        newSet.delete(goalId);
      } else {
        newSet.add(goalId);
      }
      return newSet;
    });
  };

  const renderPaginationDots = () => {
    return Array.from({ length: TOTAL_ONBOARDING_SCREENS }, (_, index) => {
      const isActive = index + 1 === CURRENT_SCREEN;
      return (
        <View
          key={index}
          style={[
            styles.paginationDot,
            isActive ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      );
    });
  };

  const renderGoalOption = (goal: GoalOption) => {
    const isSelected = selectedGoals.has(goal.id);

    return (
      <TouchableOpacity
        key={goal.id}
        style={[styles.goalCard, isSelected && styles.selectedGoalCard]}
        onPress={() => handleGoalToggle(goal.id)}
        activeOpacity={0.8}
      >
        <View style={styles.goalContent}>
          <View style={styles.goalIcon}>
            <Ionicons
              name={goal.icon as any}
              size={24}
              color={isSelected ? '#0070FF' : '#AAAAAA'}
            />
          </View>
          <View style={styles.goalText}>
            <Text style={styles.goalTitle}>{goal.title}</Text>
            <Text style={styles.goalDescription}>{goal.description}</Text>
          </View>
        </View>
        <View style={styles.selectionIndicator}>
          {isSelected ? (
            <View style={styles.selectedIndicator}>
              <Ionicons name="checkmark" size={12} color="#FFFFFF" />
            </View>
          ) : (
            <View style={styles.unselectedIndicator} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Content */}
          <View style={styles.contentContainer}>
            {/* Heading */}
            <View style={styles.headingContainer}>
              <Text style={styles.headline}>What are your goals?</Text>
              <Text style={styles.subheadline}>
                Select all that apply to personalize your experience
              </Text>
            </View>

            {/* Goals Selection */}
            <View style={styles.goalsContainer}>
              {goalOptions.map(renderGoalOption)}
            </View>
          </View>
        </ScrollView>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              selectedGoals.size === 0 && styles.continueButtonDisabled,
            ]}
            onPress={handleNext}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>

          {/* Back Button */}
          <TouchableOpacity onPress={handleBack} style={styles.backContainer}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            {renderPaginationDots()}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 32,
  },
  contentContainer: {
    flex: 1,
    minHeight: 600,
  },
  headingContainer: {
    marginBottom: 40,
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  subheadline: {
    fontSize: 16,
    color: '#AAAAAA',
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
  },
  goalsContainer: {
    gap: 16,
  },
  goalCard: {
    borderWidth: 2,
    borderColor: '#2A2A2A',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
  },
  selectedGoalCard: {
    borderColor: '#0070FF',
    backgroundColor: 'rgba(0, 112, 255, 0.05)',
  },
  goalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  goalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  goalText: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
  },
  goalDescription: {
    fontSize: 14,
    color: '#AAAAAA',
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
  },
  selectionIndicator: {
    marginLeft: 16,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0070FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unselectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#666666',
  },
  bottomSection: {
    paddingVertical: 20,
    paddingBottom: 32,
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#0070FF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#0070FF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  continueButtonDisabled: {
    backgroundColor: '#2A2A2A',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter-Bold',
  },
  backContainer: {
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  backText: {
    color: '#AAAAAA',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 32,
    backgroundColor: '#0070FF',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#666666',
  },
});
