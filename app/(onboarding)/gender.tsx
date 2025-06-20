import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TOTAL_ONBOARDING_SCREENS = 8;
const CURRENT_SCREEN = 7;

type Gender = 'male' | 'female' | null;

export default function GenderScreen() {
  const [selectedGender, setSelectedGender] = useState<Gender>(null);

  const handleNext = () => {
    if (!selectedGender) {
      Alert.alert('Please select your gender to continue');
      return;
    }
    // Navigate to goals screen
    router.push('/(onboarding)/goals');
  };

  const handleBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push('/(auth)/sign-in');
  };

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
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

  const renderGenderOption = (
    gender: Gender,
    imageUri: string,
    label: string
  ) => {
    const isSelected = selectedGender === gender;

    return (
      <TouchableOpacity
        style={[styles.genderOption, isSelected && styles.selectedOption]}
        onPress={() => handleGenderSelect(gender)}
        activeOpacity={0.8}
      >
        <Image source={{ uri: imageUri }} style={styles.genderImage} />

        {/* Gradient Overlay */}
        <View style={styles.imageGradient} />

        {/* Selection Indicator */}
        {isSelected && (
          <View style={styles.selectionIndicator}>
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
          </View>
        )}

        {/* Label */}
        <View style={styles.genderLabel}>
          <Text style={styles.genderLabelText}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
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
          {/* Heading */}
          <View style={styles.headingContainer}>
            <Text style={styles.headline}>What&apos;s your gender?</Text>
            <Text style={styles.subheadline}>
              This helps us personalise your plan to your physique.
            </Text>
          </View>

          {/* Gender Selection Options */}
          <View style={styles.genderOptionsContainer}>
            {renderGenderOption(
              'male',
              'https://storage.googleapis.com/uxpilot-auth.appspot.com/a1b3628f0c-cef51120d1d13505e36f.png',
              'Male'
            )}
            {renderGenderOption(
              'female',
              'https://storage.googleapis.com/uxpilot-auth.appspot.com/b16e7e0d39-48ccefb199c2a3131254.png',
              'Female'
            )}
          </View>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.nextButton,
              !selectedGender && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>

          {/* Skip Option */}
          <TouchableOpacity onPress={handleSkip} style={styles.skipContainer}>
            <Text style={styles.skipText}>I&apos;d rather not say</Text>
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

  contentContainer: {
    flex: 1,
    paddingTop: 32,
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
  genderOptionsContainer: {
    flexDirection: 'row',
    gap: 16,
    height: 460,
    marginBottom: 40,
  },
  genderOption: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#0070FF',
  },
  genderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(18, 18, 18, 0.6)',
  },
  selectionIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#0070FF',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderLabel: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  genderLabelText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  bottomSection: {
    paddingBottom: 32,
  },
  nextButton: {
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
  nextButtonDisabled: {
    backgroundColor: '#333333',
    shadowOpacity: 0,
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
    marginBottom: 24,
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
