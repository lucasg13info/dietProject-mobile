import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="step/index"
        options={{
          headerShown: false, 
        }}
      />

      <Stack.Screen
        name="create/index"
        options={{
          headerShown: false, 
        }}
      />
    </Stack>
  );
}
