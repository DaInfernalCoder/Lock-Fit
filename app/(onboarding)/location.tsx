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

const TOTAL_ONBOARDING_SCREENS = 8; // Updated to include the duration screen
const CURRENT_SCREEN = 4; // This screen comes after solution, before gender

type WorkoutLocation = 'commercial' | 'home' | 'bodyweight' | null;

interface LocationOption {
  id: WorkoutLocation;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
}

const locationOptions: LocationOption[] = [
  {
    id: 'commercial',
    title: 'Commercial Gym',
    description: 'Access to full equipment',
    icon: 'barbell',
    iconColor: '#0070FF',
  },
  {
    id: 'home',
    title: 'Home Gym',
    description: 'Limited equipment setup',
    icon: 'home',
    iconColor: '#FFD700',
  },
  {
    id: 'bodyweight',
    title: 'Body-weight',
    description: 'No equipment needed',
    icon: 'person',
    iconColor: '#FF4D8F',
  },
];

export default function LocationScreen() {
  const [selectedLocation, setSelectedLocation] =
    useState<WorkoutLocation>(null);

  const handleNext = () => {
    // Navigate to frequency selection screen
    router.push('/(onboarding)/frequency');
  };

  const handleBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push('/(auth)/sign-in');
  };

  const handleLocationSelect = (locationId: WorkoutLocation) => {
    setSelectedLocation(locationId);
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

  const renderLocationOption = (option: LocationOption) => {
    const isSelected = selectedLocation === option.id;

    return (
      <TouchableOpacity
        key={option.id}
        style={[styles.locationCard, isSelected && styles.selectedLocationCard]}
        onPress={() => handleLocationSelect(option.id)}
        activeOpacity={0.8}
      >
        <View style={styles.locationContent}>
          <View
            style={[
              styles.locationIcon,
              {
                backgroundColor: isSelected
                  ? `${option.iconColor}33`
                  : '#2A2A2A',
              },
            ]}
          >
            <Ionicons
              name={option.icon as any}
              size={24}
              color={isSelected ? option.iconColor : '#AAAAAA'}
            />
          </View>
          <View style={styles.locationText}>
            <Text style={styles.locationTitle}>{option.title}</Text>
            <Text style={styles.locationDescription}>{option.description}</Text>
          </View>
        </View>
        <View style={styles.selectionIndicator}>
          {isSelected ? (
            <View style={styles.selectedIndicator}>
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
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
              <Text style={styles.headline}>Where do you work out?</Text>
              <Text style={styles.subheadline}>
                This defines the equipment you&apos;ll use for your personalized
                workout plan.
              </Text>
            </View>

            {/* Location Selection */}
            <View style={styles.locationsContainer}>
              {locationOptions.map(renderLocationOption)}
            </View>
          </View>
        </ScrollView>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Navigation Buttons */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.nextButton,
                !selectedLocation && styles.nextButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={!selectedLocation}
            >
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
    marginBottom: 12,
    fontFamily: 'Inter-Bold',
  },
  subheadline: {
    fontSize: 16,
    color: '#AAAAAA',
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
  },
  locationsContainer: {
    gap: 16,
  },
  locationCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedLocationCard: {
    borderColor: '#0070FF',
    backgroundColor: '#0070FF0A', // Very subtle blue background
  },
  locationContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  locationText: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  locationDescription: {
    fontSize: 14,
    color: '#AAAAAA',
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
  },
  selectionIndicator: {
    marginLeft: 12,
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
    borderColor: '#2A2A2A',
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
    borderWidth: 2,
    borderColor: '#2A2A2A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
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
  nextButtonDisabled: {
    backgroundColor: '#2A2A2A',
    shadowOpacity: 0,
    elevation: 0,
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
