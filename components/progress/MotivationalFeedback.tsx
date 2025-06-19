import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Star, Trophy, Target, Zap } from 'lucide-react-native';

interface MotivationalFeedbackProps {
  title: string;
  message: string;
  achievement?: string;
}

export const MotivationalFeedback: React.FC<MotivationalFeedbackProps> = ({
  title,
  message,
  achievement,
}) => {
  const getMotivationIcon = () => {
    if (achievement) {
      switch (achievement.toLowerCase()) {
        case 'streak':
          return Trophy;
        case 'consistency':
          return Target;
        case 'improvement':
          return Zap;
        default:
          return Star;
      }
    }
    return Star;
  };

  const IconComponent = getMotivationIcon();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <IconComponent size={24} color="#6366F1" />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        {achievement && (
          <View style={styles.achievementBadge}>
            <Text style={styles.achievementText}>{achievement} Achievement!</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 100, // Account for tab navigation
  },
  card: {
    backgroundColor: '#000000',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  achievementBadge: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  achievementText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
});