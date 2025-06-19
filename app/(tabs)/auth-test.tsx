import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { LogIn, UserPlus } from 'lucide-react-native';

export default function AuthTestScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Authentication Testing</Text>
        <Text style={styles.subtitle}>
          This tab is for development testing only and will be removed in production.
        </Text>

        <View style={styles.buttonContainer}>
          <Link href="/(auth)/signin" asChild>
            <TouchableOpacity style={styles.button}>
              <LogIn size={24} color="#FFFFFF" />
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/(auth)/signup" asChild>
            <TouchableOpacity style={[styles.button, styles.signupButton]}>
              <UserPlus size={24} color="#6366F1" />
              <Text style={[styles.buttonText, styles.signupButtonText]}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Development Notes:</Text>
          <Text style={styles.infoText}>
            • Authentication screens are fully functional{'\n'}
            • Form validation is implemented{'\n'}
            • Password visibility toggles work{'\n'}
            • Terms checkbox validation included{'\n'}
            • Responsive design for all screen sizes
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: 48,
  },
  button: {
    backgroundColor: '#6366F1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 16,
  },
  signupButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#6366F1',
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  signupButtonText: {
    color: '#6366F1',
  },
  infoCard: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  infoTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
});