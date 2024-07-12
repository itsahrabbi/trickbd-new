import { Stack } from 'expo-router';
export default function PostsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="single/[id]" />
    </Stack>
  );
}