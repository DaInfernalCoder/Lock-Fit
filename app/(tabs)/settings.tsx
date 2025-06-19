import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, GraduationCap, Clock, Target, RefreshCw, Lock, Smartphone, Key, Heart, CircleCheck as CheckCircle, Bell, TriangleAlert as AlertTriangle, Crown, Headphones, Shield, FileText, Trash2, ChevronRight, ExternalLink, ShieldCheck } from 'lucide-react-native';

interface ToggleSettingProps {
  icon: React.ComponentType<any>;
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  iconColor?: string;
}

interface MenuItemProps {
  icon: React.ComponentType<any>;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
  showExternal?: boolean;
  textColor?: string;
  iconColor?: string;
  badge?: React.ReactNode;
}

const ToggleSetting: React.FC<ToggleSettingProps> = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  value, 
  onValueChange,
  iconColor = "#6366F1"
}) => (
  <View style={styles.settingRow}>
    <View style={styles.settingInfo}>
      <Icon size={20} color={iconColor} />
      <View style={styles.settingText}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#374151', true: '#6366F1' }}
      thumbColor="#FFFFFF"
      ios_backgroundColor="#374151"
    />
  </View>
);

const MenuItem: React.FC<MenuItemProps> = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  onPress,
  showChevron = true,
  showExternal = false,
  textColor = "#FFFFFF",
  iconColor = "#6366F1",
  badge
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <Icon size={20} color={iconColor} />
      <View style={styles.menuItemText}>
        <Text style={[styles.menuItemTitle, { color: textColor }]}>{title}</Text>
        {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    <View style={styles.menuItemRight}>
      {badge}
      {showExternal && <ExternalLink size={16} color="#9CA3AF" />}
      {showChevron && !showExternal && <ChevronRight size={16} color="#9CA3AF" />}
    </View>
  </TouchableOpacity>
);

export default function SettingsScreen() {
  // Toggle states
  const [appLockEnabled, setAppLockEnabled] = useState(true);
  const [healthSyncEnabled, setHealthSyncEnabled] = useState(true);
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [streakWarnings, setStreakWarnings] = useState(false);

  const handleGoBack = () => {
    // Navigate back or to home
  };

  const handleProfileEdit = () => {
    // Navigate to profile edit screen
  };

  const handleExperienceLevel = () => {
    // Navigate to experience level selection
  };

  const handleWorkoutLength = () => {
    // Navigate to workout length settings
  };

  const handleTargetGoals = () => {
    // Navigate to target goals selection
  };

  const handleRegeneratePlan = () => {
    // Trigger plan regeneration
  };

  const handleSelectApps = () => {
    // Navigate to app selection screen
  };

  const handleLockStartTime = () => {
    // Navigate to time picker
  };

  const handleManageSubscription = () => {
    // Navigate to subscription management
  };

  const handleContactSupport = () => {
    // Open support contact
  };

  const handlePrivacyPolicy = () => {
    // Open privacy policy
  };

  const handleTermsOfUse = () => {
    // Open terms of use
  };

  const handleDeleteAccount = () => {
    // Show delete account confirmation
  };

  const handleOpenSourceLicenses = () => {
    // Show open source licenses
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <ArrowLeft size={24} color="#6366F1" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Settings</Text>
            <Text style={styles.headerSubtitle}>Manage your preferences</Text>
          </View>
        </View>

        {/* Profile Summary */}
        <TouchableOpacity style={styles.profileSummary} onPress={handleProfileEdit}>
          <View style={styles.profileSummaryContent}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Alex Johnson</Text>
              <Text style={styles.profileEmail}>alex.johnson@email.com</Text>
              <View style={styles.membershipBadge}>
                <Text style={styles.membershipText}>Pro Member</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </View>
        </TouchableOpacity>

        {/* Workout & Plan Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout & Plan</Text>
          <View style={styles.sectionCard}>
            <MenuItem
              icon={GraduationCap}
              title="Experience Level"
              subtitle="Intermediate"
              onPress={handleExperienceLevel}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={Clock}
              title="Workout Length"
              subtitle="45 minutes"
              onPress={handleWorkoutLength}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={Target}
              title="Target Goals"
              subtitle="Muscle Gain, General Fitness"
              onPress={handleTargetGoals}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={RefreshCw}
              title="Regenerate Plan"
              onPress={handleRegeneratePlan}
              showChevron={true}
            />
          </View>
        </View>

        {/* Phone Lock Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phone Lock</Text>
          <View style={styles.sectionCard}>
            <ToggleSetting
              icon={Lock}
              title="Enable Morning App Lock"
              value={appLockEnabled}
              onValueChange={setAppLockEnabled}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={Smartphone}
              title="Select Apps to Block"
              subtitle="Instagram, TikTok, YouTube +3"
              onPress={handleSelectApps}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={Clock}
              title="Daily Lock Start Time"
              subtitle="6:00 AM"
              onPress={handleLockStartTime}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={Key}
              title="Unlock Condition"
              subtitle="Complete Daily Workout"
              badge={<ShieldCheck size={16} color="#22C55E" />}
              showChevron={false}
            />
          </View>
        </View>

        {/* Health Sync */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Sync</Text>
          <View style={styles.sectionCard}>
            <ToggleSetting
              icon={Heart}
              title="Sync with Apple Health"
              value={healthSyncEnabled}
              onValueChange={setHealthSyncEnabled}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={CheckCircle}
              title="Sync Status"
              subtitle="Last synced: today @ 9:12 AM"
              iconColor="#22C55E"
              showChevron={false}
            />
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.sectionCard}>
            <ToggleSetting
              icon={Bell}
              title="Daily Workout Reminder"
              subtitle="6:00 AM"
              value={workoutReminders}
              onValueChange={setWorkoutReminders}
            />
            <View style={styles.divider} />
            <ToggleSetting
              icon={AlertTriangle}
              title="Streak Warnings"
              value={streakWarnings}
              onValueChange={setStreakWarnings}
            />
          </View>
        </View>

        {/* Account & Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account & Support</Text>
          <View style={styles.sectionCard}>
            <MenuItem
              icon={Crown}
              title="Manage Subscription"
              onPress={handleManageSubscription}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={Headphones}
              title="Contact Support"
              onPress={handleContactSupport}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={Shield}
              title="Privacy Policy"
              onPress={handlePrivacyPolicy}
              showExternal={true}
              showChevron={false}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={FileText}
              title="Terms of Use"
              onPress={handleTermsOfUse}
              showExternal={true}
              showChevron={false}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={Trash2}
              title="Delete Account"
              onPress={handleDeleteAccount}
              textColor="#EF4444"
              iconColor="#EF4444"
            />
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfoSection}>
          <View style={styles.appInfoCard}>
            <Text style={styles.appName}>LockFit</Text>
            <Text style={styles.appVersion}>Version 2.1.0</Text>
            <Text style={styles.appBuild}>Build 2024.01.15</Text>
            <TouchableOpacity onPress={handleOpenSourceLicenses}>
              <Text style={styles.licensesButton}>Open Source Licenses</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom spacing for tab navigation */}
        <View style={styles.bottomSpacing} />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  profileSummary: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  profileSummaryContent: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  membershipBadge: {
    backgroundColor: '#6366F120',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  membershipText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#6366F1',
  },
  section: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionCard: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#374151',
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  settingSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    marginLeft: 16,
    flex: 1,
  },
  menuItemTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  menuItemSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#374151',
    marginLeft: 56,
  },
  appInfoSection: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  appInfoCard: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  appName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  appVersion: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  appBuild: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
  },
  licensesButton: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6366F1',
  },
  bottomSpacing: {
    height: 100,
  },
});