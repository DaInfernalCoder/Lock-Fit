import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="insight" />
      <Stack.Screen name="solution" />
      <Stack.Screen name="location" />
      <Stack.Screen name="gender" />
      <Stack.Screen name="goals" />
    </Stack>
  );
}
