import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Flame, Clock, Trophy, Dumbbell } from 'lucide-react-native';
import { PerformanceMetric } from '@/types/progress';

interface PerformanceMetricsProps {
  metrics: PerformanceMetric[];
}

const { width } = Dimensions.get('window');

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'flame':
      return Flame;
    case 'clock':
      return Clock;
    case 'trophy':
      return Trophy;
    case 'dumbbell':
      return Dumbbell;
    default:
      return Flame;
  }
};

const getIconColor = (color: string) => {
  // Always return the same blue color for consistency
  return '#0070FF';
};

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  metrics,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Performance Metrics</Text>
      <View style={styles.metricsGrid}>
        {metrics.map((metric) => {
          const IconComponent = getIcon(metric.icon);
          const iconColor = getIconColor(metric.color);

          return (
            <View key={metric.id} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <IconComponent size={20} color={iconColor} />
                <Text style={styles.metricBadge}>{metric.badge}</Text>
              </View>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricSubtitle}>{metric.subtitle}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    width: (width - 64) / 2,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricBadge: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: '#9CA3AF',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  metricSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
});
