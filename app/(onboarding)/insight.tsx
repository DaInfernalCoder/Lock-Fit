import React from 'react';
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
const CURRENT_SCREEN = 2;

export default function InsightScreen() {
  const handleNext = () => {
    // Navigate to next onboarding screen
    router.push('/(onboarding)/solution');
  };

  const handleBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push('/(auth)/sign-in');
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
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Problem Content */}
          <View style={styles.problemContent}>
            <Text style={styles.headline}>
              <Text style={styles.highlightYellow}>59% of gym-goers</Text>{' '}
              struggle to stick to their plan.
            </Text>

            <Text style={styles.subheadline}>
              Why? They lack motivation, don&apos;t know what exercises to do or
              how to do them.
            </Text>

            {/* Problem Description Card */}
            <View style={styles.problemCard}>
              <View style={styles.problemItem}>
                <Ionicons
                  name="warning"
                  size={20}
                  color="#FF4D8F"
                  style={styles.problemIcon}
                />
                <View style={styles.problemText}>
                  <Text style={styles.problemTitle}>
                    Distractions kill consistency
                  </Text>
                  <Text style={styles.problemDescription}>
                    Social media apps steal 2.5 hours daily from your workout
                    time
                  </Text>
                </View>
              </View>

              <View style={styles.problemItem}>
                <Ionicons
                  name="flash"
                  size={20}
                  color="#FFD700"
                  style={styles.problemIcon}
                />
                <View style={styles.problemText}>
                  <Text style={styles.problemTitle}>
                    Motivation fades quickly
                  </Text>
                  <Text style={styles.problemDescription}>
                    87% of new gym-goers quit within 2 months
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.goodNews}>
              <Text style={styles.goodNewsHighlight}>The good news?</Text>{' '}
              LockFit solves this with a simple approach that{' '}
              <Text style={styles.highlightYellow}>works</Text>.
            </Text>
          </View>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* CTA Button */}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>

          {/* Skip Option */}
          <TouchableOpacity onPress={handleSkip} style={styles.skipContainer}>
            <Text style={styles.skipText}>Skip intro</Text>
          </TouchableOpacity>
        </View>

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>{renderPaginationDots()}</View>
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
  backButton: {
    position: 'absolute',
    top: 32,
    left: 24,
    zIndex: 1,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 22,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 32,
  },
  problemContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  highlightYellow: {
    color: '#FFD700',
  },
  subheadline: {
    fontSize: 18,
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  problemCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    width: '100%',
    marginBottom: 24,
  },
  problemItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  problemIcon: {
    marginTop: 2,
    marginRight: 12,
  },
  problemText: {
    flex: 1,
  },
  problemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  problemDescription: {
    fontSize: 14,
    color: '#AAAAAA',
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  goodNews: {
    fontSize: 16,
    color: '#AAAAAA',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  goodNewsHighlight: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  bottomSection: {
    paddingBottom: 80, // Space for pagination dots
  },
  nextButton: {
    width: '100%',
    backgroundColor: '#0070FF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter-Bold',
  },
  skipContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  skipText: {
    color: '#0070FF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
