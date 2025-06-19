import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Dumbbell, Chrome as Home, Settings } from 'lucide-react-native';

const equipmentOptions = [
  {
    id: 'dumbbells',
    name: 'Dumbbells',
    description: 'Adjustable or fixed weight dumbbells',
    category: 'weights',
    icon: Dumbbell,
  },
  {
    id: 'barbell',
    name: 'Barbell',
    description: 'Olympic barbell with plates',
    category: 'weights',
    icon: Settings,
  },
  {
    id: 'kettlebell',
    name: 'Kettlebell',
    description: 'Various weight kettlebells',
    category: 'weights',
    icon: Dumbbell,
  },
  {
    id: 'resistance_bands',
    name: 'Resistance Bands',
    description: 'Different resistance levels',
    category: 'accessories',
    icon: Settings,
  },
  {
    id: 'pull_up_bar',
    name: 'Pull-up Bar',
    description: 'Doorway or wall-mounted',
    category: 'bodyweight',
    icon: Home,
  },
  {
    id: 'yoga_mat',
    name: 'Yoga Mat',
    description: 'Exercise mat for floor workouts',
    category: 'accessories',
    icon: Home,
  },
  {
    id: 'bench',
    name: 'Weight Bench',
    description: 'Adjustable workout bench',
    category: 'equipment',
    icon: Home,
  },
  {
    id: 'cable_machine',
    name: 'Cable Machine',
    description: 'Home gym cable system',
    category: 'equipment',
    icon: Settings,
  },
];

const categories = [
  { id: 'all', name: 'All Equipment' },
  { id: 'weights', name: 'Weights' },
  { id: 'bodyweight', name: 'Bodyweight' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'equipment', name: 'Equipment' },
];

export default function EquipmentScreen() {
  const [selectedEquipment, setSelectedEquipment] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toggleEquipment = (equipmentId: string) => {
    const newSelected = new Set(selectedEquipment);
    if (newSelected.has(equipmentId)) {
      newSelected.delete(equipmentId);
    } else {
      newSelected.add(equipmentId);
    }
    setSelectedEquipment(newSelected);
  };

  const filteredEquipment = selectedCategory === 'all' 
    ? equipmentOptions 
    : equipmentOptions.filter(item => item.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Available Equipment</Text>
          <Text style={styles.subtitle}>
            Select the equipment you have access to for personalized workouts
          </Text>
        </View>

        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScrollContainer}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category.id && styles.categoryButtonTextActive
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Equipment Selection */}
        <View style={styles.equipmentContainer}>
          {filteredEquipment.map((equipment) => {
            const IconComponent = equipment.icon;
            const isSelected = selectedEquipment.has(equipment.id);
            
            return (
              <TouchableOpacity
                key={equipment.id}
                style={[
                  styles.equipmentCard,
                  isSelected && styles.equipmentCardSelected
                ]}
                onPress={() => toggleEquipment(equipment.id)}
              >
                <View style={styles.equipmentCardHeader}>
                  <View style={[
                    styles.equipmentIconContainer,
                    isSelected && styles.equipmentIconContainerSelected
                  ]}>
                    <IconComponent 
                      size={24} 
                      color={isSelected ? '#6366F1' : '#9CA3AF'} 
                    />
                  </View>
                  
                  {isSelected && (
                    <View style={styles.checkmarkContainer}>
                      <Check size={20} color="#FFFFFF" />
                    </View>
                  )}
                </View>
                
                <Text style={[
                  styles.equipmentName,
                  isSelected && styles.equipmentNameSelected
                ]}>
                  {equipment.name}
                </Text>
                
                <Text style={styles.equipmentDescription}>
                  {equipment.description}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>
            Selected Equipment ({selectedEquipment.size})
          </Text>
          
          {selectedEquipment.size > 0 ? (
            <View style={styles.selectedEquipmentList}>
              {Array.from(selectedEquipment).map((equipmentId) => {
                const equipment = equipmentOptions.find(e => e.id === equipmentId);
                return (
                  <Text key={equipmentId} style={styles.selectedEquipmentItem}>
                    • {equipment?.name}
                  </Text>
                );
              })}
            </View>
          ) : (
            <Text style={styles.noSelectionText}>
              No equipment selected. Select equipment to get personalized workout recommendations.
            </Text>
          )}
        </View>

        {/* Generate Workouts Button */}
        <TouchableOpacity 
          style={[
            styles.generateButton,
            selectedEquipment.size === 0 && styles.generateButtonDisabled
          ]}
          disabled={selectedEquipment.size === 0}
        >
          <Text style={[
            styles.generateButtonText,
            selectedEquipment.size === 0 && styles.generateButtonTextDisabled
          ]}>
            Generate Personalized Workouts
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 24,
  },
  categoryScrollContainer: {
    marginBottom: 24,
  },
  categoryContainer: {
    paddingHorizontal: 24,
    paddingRight: 48,
  },
  categoryButton: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  categoryButtonActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  categoryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#9CA3AF',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  equipmentContainer: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  equipmentCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    width: '47%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  equipmentCardSelected: {
    borderColor: '#6366F1',
    backgroundColor: '#1E1B4B',
  },
  equipmentCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  equipmentIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#374151',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  equipmentIconContainerSelected: {
    backgroundColor: '#4338CA',
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    backgroundColor: '#22C55E',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  equipmentName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  equipmentNameSelected: {
    color: '#A5B4FC',
  },
  equipmentDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 18,
  },
  summaryContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  summaryTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  selectedEquipmentList: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  selectedEquipmentItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#E5E7EB',
    marginBottom: 8,
    lineHeight: 20,
  },
  noSelectionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  generateButton: {
    backgroundColor: '#6366F1',
    marginHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  generateButtonDisabled: {
    backgroundColor: '#374151',
  },
  generateButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  generateButtonTextDisabled: {
    color: '#6B7280',
  },
});