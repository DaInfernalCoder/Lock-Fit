import React from 'react';
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
const CURRENT_SCREEN = 3;

export default function SolutionScreen() {
  const handleNext = () => {
    // Navigate to location selection screen
    router.push('/(onboarding)/location');
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

  const renderAppIcon = (
    iconName: string,
    bgColor: string,
    appName: string
  ) => (
    <View style={styles.appContainer}>
      <View style={[styles.appIcon, { backgroundColor: bgColor }]}>
        <Ionicons name={iconName as any} size={24} color="#FFFFFF" />
        <View style={styles.lockOverlay}>
          <Ionicons name="lock-closed" size={16} color="#FF4D8F" />
        </View>
      </View>
      <Text style={styles.appName}>{appName}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <SafeAreaView style={styles.safeArea}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Content */}
          <View style={styles.contentContainer}>
            {/* Solution Content */}
            <View style={styles.solutionContent}>
              <Text style={styles.headline}>
                <Text style={styles.highlightBlue}>
                  Here&apos;s the best part!
                </Text>
              </Text>

              <Text style={styles.subheadline}>
                Blocks distracting apps until you complete your daily workout.
              </Text>

              {/* Phone Mockup */}
              <View style={styles.phoneMockup}>
                {/* Phone Status Bar */}
                <View style={styles.phoneStatusBar}>
                  <Text style={styles.phoneTime}>11:32</Text>
                  <View style={styles.phoneIcons}>
                    <Ionicons
                      name="wifi"
                      size={12}
                      color="#FFFFFF"
                      style={styles.phoneIcon}
                    />
                    <Ionicons name="battery-half" size={12} color="#FFFFFF" />
                  </View>
                </View>

                {/* Locked Apps Grid */}
                <View style={styles.appsGrid}>
                  {renderAppIcon('logo-tiktok', '#000000', 'TikTok')}
                  {renderAppIcon('logo-instagram', '#E4405F', 'Instagram')}
                  {renderAppIcon('logo-youtube', '#FF0000', 'YouTube')}
                </View>

                {/* Notification Message */}
                <View style={styles.notificationCard}>
                  <View style={styles.notificationHeader}>
                    <Ionicons
                      name="warning"
                      size={16}
                      color="#FFD700"
                      style={styles.warningIcon}
                    />
                    <Text style={styles.notificationTitle}>Apps Locked</Text>
                  </View>
                  <Text style={styles.notificationText}>
                    Complete today&apos;s 30-min workout to unlock social media
                    apps.
                  </Text>
                </View>

                {/* Unlock Button */}
                <View style={styles.unlockButtonContainer}>
                  <TouchableOpacity style={styles.unlockButton}>
                    <Ionicons
                      name="barbell"
                      size={16}
                      color="#FFFFFF"
                      style={styles.barbellIcon}
                    />
                    <Text style={styles.unlockButtonText}>Start Workout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 32,
  },
  contentContainer: {
    flex: 1,
    minHeight: 600, // Ensure minimum height for content
  },
  solutionContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
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
  highlightBlue: {
    color: '#0070FF',
  },
  subheadline: {
    fontSize: 18,
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  phoneMockup: {
    width: 280,
    height: 380, // Reduced height to prevent overflow
    backgroundColor: '#1E1E1E',
    borderRadius: 24,
    borderWidth: 4,
    borderColor: '#2A2A2A',
    padding: 16,
    marginBottom: 24,
    position: 'relative',
  },
  phoneStatusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  phoneTime: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
  },
  phoneIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneIcon: {
    marginRight: 4,
  },
  appsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20, // Reduced margin
  },
  appContainer: {
    alignItems: 'center',
  },
  appIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(18, 18, 18, 0.7)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  notificationCard: {
    backgroundColor: '#121212',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 16, // Reduced margin
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  warningIcon: {
    marginRight: 8,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  notificationText: {
    fontSize: 12,
    color: '#AAAAAA',
    lineHeight: 16,
    fontFamily: 'Inter-Regular',
  },
  unlockButtonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  unlockButton: {
    backgroundColor: '#0070FF',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barbellIcon: {
    marginRight: 8,
  },
  unlockButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  bottomSection: {
    paddingVertical: 20,
    paddingBottom: 32, // Reduced padding
  },
  nextButton: {
    width: '100%',
    backgroundColor: '#0070FF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16, // Reduced margin
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
    marginBottom: 16, // Space for pagination dots
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
