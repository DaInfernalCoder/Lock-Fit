import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TOTAL_ONBOARDING_SCREENS = 8;
const CURRENT_SCREEN = 6; // This comes after frequency

export default function DurationScreen() {
  const [duration, setDuration] = useState(45);
  const MIN_DURATION = 15;
  const MAX_DURATION = 90;
  const STEP = 15;

  const handleNext = () => {
    // Navigate to gender selection screen
    router.push('/(onboarding)/gender');
  };

  const handleBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push('/(auth)/sign-in');
  };

  const handleDecrease = () => {
    if (duration > MIN_DURATION) {
      setDuration(duration - STEP);
    }
  };

  const handleIncrease = () => {
    if (duration < MAX_DURATION) {
      setDuration(duration + STEP);
    }
  };

  const getDurationRecommendation = () => {
    if (duration <= 30) {
      return 'Perfect for busy schedules and quick sessions';
    } else if (duration <= 45) {
      return 'Ideal balance for effective workouts';
    } else if (duration <= 60) {
      return 'Great for comprehensive training';
    } else {
      return 'Intensive sessions for serious athletes';
    }
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <SafeAreaView style={styles.safeArea}>
        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Heading */}
          <View style={styles.headingContainer}>
            <Text style={styles.headline}>
              How long do you want your workouts to be?
            </Text>
            <Text style={styles.subheadline}>
              This helps us create a schedule that fits your lifestyle.
            </Text>
          </View>

          {/* Duration Selector */}
          <View style={styles.durationContainer}>
            <TouchableOpacity
              style={[
                styles.controlButton,
                duration <= MIN_DURATION && styles.controlButtonDisabled,
              ]}
              onPress={handleDecrease}
              disabled={duration <= MIN_DURATION}
            >
              <Ionicons
                name="remove"
                size={24}
                color={duration <= MIN_DURATION ? '#666666' : '#0070FF'}
              />
            </TouchableOpacity>

            <View style={styles.durationDisplay}>
              <Text style={styles.durationNumber}>{duration}</Text>
              <Text style={styles.durationLabel}>minutes</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.controlButton,
                duration >= MAX_DURATION && styles.controlButtonDisabled,
              ]}
              onPress={handleIncrease}
              disabled={duration >= MAX_DURATION}
            >
              <Ionicons
                name="add"
                size={24}
                color={duration >= MAX_DURATION ? '#666666' : '#0070FF'}
              />
            </TouchableOpacity>
          </View>

          {/* Recommendation */}
          <View style={styles.recommendationContainer}>
            <Text style={styles.recommendationText}>
              {getDurationRecommendation()}
            </Text>
          </View>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Navigation Buttons */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>

          {/* Skip Option */}
          <TouchableOpacity onPress={handleSkip} style={styles.skipContainer}>
            <Text style={styles.skipText}>Skip intro</Text>
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
  contentContainer: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 16,
    fontFamily: 'Inter-Bold',
  },
  subheadline: {
    fontSize: 16,
    color: '#AAAAAA',
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
    maxWidth: 280,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
  },
  controlButtonDisabled: {
    opacity: 0.5,
  },
  durationDisplay: {
    alignItems: 'center',
  },
  durationNumber: {
    fontSize: 72,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    lineHeight: 80,
  },
  durationLabel: {
    fontSize: 16,
    color: '#AAAAAA',
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  recommendationContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  recommendationText: {
    fontSize: 14,
    color: '#FFD700',
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    lineHeight: 20,
  },
  bottomSection: {
    paddingVertical: 20,
    paddingBottom: 32,
  },
  navigationContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  backButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#AAAAAA',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#0070FF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#0070FF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  skipContainer: {
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 16,
  },
  skipText: {
    color: '#0070FF',
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
