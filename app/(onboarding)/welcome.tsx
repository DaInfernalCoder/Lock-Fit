import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';

const TOTAL_ONBOARDING_SCREENS = 8; // Total number of onboarding screens
const CURRENT_SCREEN = 1; // This is the first screen

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    // Navigate to next onboarding screen
    router.push('/(onboarding)/insight');
  };

  const handleSignIn = () => {
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

      {/* Background Image */}
      <Image
        style={styles.backgroundImage}
        source={{
          uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/c84124c52f-59883f1a8e6dd08523e2.png',
        }}
        alt="Fitness torso with muscular definition"
      />

      {/* Gradient Overlay */}
      <View style={styles.gradientOverlay} />

      {/* Content Overlay */}
      <SafeAreaView style={styles.contentContainer}>
        {/* Headline */}
        <View style={styles.headlineContainer}>
          <Text style={styles.headline}>
            Build muscles in <Text style={styles.highlightText}>4 weeks</Text>
          </Text>
        </View>

        {/* CTA Button */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
          >
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By continuing you accept{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text> and{' '}
            <Text style={styles.termsLink}>Terms of Use</Text>
          </Text>
        </View>

        {/* Sign In */}
        <View style={styles.signInContainer}>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={styles.signInText}>
              Already have an account?{' '}
              <Text style={styles.signInLink}>Sign In</Text>
            </Text>
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
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(18, 18, 18, 0.4)',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  headlineContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  headline: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 44,
    fontFamily: 'Poppins-Bold',
  },
  highlightText: {
    color: '#0070FF',
  },
  ctaContainer: {
    marginBottom: 24,
  },
  getStartedButton: {
    width: '100%',
    backgroundColor: '#0070FF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#0070FF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  getStartedButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter-SemiBold',
  },
  termsContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    color: '#AAAAAA',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  termsLink: {
    color: '#0070FF',
    textDecorationLine: 'underline',
  },
  signInContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  signInText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
  },
  signInLink: {
    color: '#0070FF',
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
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
