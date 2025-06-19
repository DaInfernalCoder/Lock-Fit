import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TimePeriod } from '@/types/progress';

interface TimePeriodToggleProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
}

const periods: Array<{ key: TimePeriod; label: string }> = [
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'allTime', label: 'All Time' },
];

export const TimePeriodToggle: React.FC<TimePeriodToggleProps> = ({
  selectedPeriod,
  onPeriodChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period.key}
            style={[
              styles.toggleButton,
              selectedPeriod === period.key && styles.toggleButtonActive,
            ]}
            onPress={() => onPeriodChange(period.key)}
            accessibilityRole="button"
            accessibilityLabel={`Select ${period.label} view`}
            accessibilityState={{ selected: selectedPeriod === period.key }}
          >
            <Text
              style={[
                styles.toggleText,
                selectedPeriod === period.key && styles.toggleTextActive,
              ]}
            >
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  toggleContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 4,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#374151',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#6366F1',
  },
  toggleText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#9CA3AF',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
});