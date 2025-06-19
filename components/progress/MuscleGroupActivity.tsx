import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MuscleGroupActivity as MuscleGroup } from '@/types/progress';

interface MuscleGroupActivityProps {
  muscleGroups: MuscleGroup[];
}

export const MuscleGroupActivity: React.FC<MuscleGroupActivityProps> = ({ muscleGroups }) => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const getIntensityColor = (intensity: 'low' | 'medium' | 'high') => {
    switch (intensity) {
      case 'low':
        return '#F97316';
      case 'medium':
        return '#6366F1';
      case 'high':
        return '#22C55E';
      default:
        return '#6B7280';
    }
  };

  const getIntensityOpacity = (intensity: 'low' | 'medium' | 'high') => {
    switch (intensity) {
      case 'low':
        return 0.4;
      case 'medium':
        return 0.7;
      case 'high':
        return 1.0;
      default:
        return 0.3;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Muscle Group Activity</Text>
        <Text style={styles.subtitle}>This Month</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.muscleScroll}>
        <View style={styles.muscleContainer}>
          {muscleGroups.map((group) => (
            <TouchableOpacity
              key={group.id}
              style={[
                styles.muscleGroup,
                { 
                  backgroundColor: getIntensityColor(group.intensity),
                  opacity: selectedGroup === group.id ? 1.0 : getIntensityOpacity(group.intensity)
                }
              ]}
              onPress={() => setSelectedGroup(selectedGroup === group.id ? null : group.id)}
              accessibilityRole="button"
              accessibilityLabel={`${group.name} muscle group`}
            >
              <Text style={styles.muscleName}>{group.name}</Text>
              <Text style={styles.muscleCount}>{group.sessionsThisMonth}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedGroup && (
        <View style={styles.selectedGroupInfo}>
          {(() => {
            const group = muscleGroups.find(g => g.id === selectedGroup);
            return group ? (
              <View style={styles.groupDetails}>
                <Text style={styles.groupDetailTitle}>{group.name}</Text>
                <View style={styles.groupStats}>
                  <View style={styles.groupStat}>
                    <Text style={styles.groupStatValue}>{group.sessionsThisMonth}</Text>
                    <Text style={styles.groupStatLabel}>Sessions</Text>
                  </View>
                  <View style={styles.groupStat}>
                    <Text style={styles.groupStatValue}>{group.lastWorked}</Text>
                    <Text style={styles.groupStatLabel}>Last worked</Text>
                  </View>
                  <View style={styles.groupStat}>
                    <Text style={[
                      styles.groupStatValue, 
                      { color: getIntensityColor(group.intensity) }
                    ]}>
                      {group.intensity.toUpperCase()}
                    </Text>
                    <Text style={styles.groupStatLabel}>Intensity</Text>
                  </View>
                </View>
              </View>
            ) : null;
          })()}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6366F1',
  },
  muscleScroll: {
    marginBottom: 16,
  },
  muscleContainer: {
    flexDirection: 'row',
    paddingRight: 24,
  },
  muscleGroup: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  muscleName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  muscleCount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  selectedGroupInfo: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  groupDetails: {
    alignItems: 'center',
  },
  groupDetailTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  groupStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  groupStat: {
    alignItems: 'center',
  },
  groupStatValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  groupStatLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
});