// RootLayout.jsx
import { Stack } from "expo-router";
import SafeScreen from "./components/SafeScreen";

export default function RootLayout() {
  return (
    <SafeScreen>
      <Stack screenOptions={{ headerShown: false }}>
        {/* index will be the first screen that decides where to go */}
        <Stack.Screen name="index" options={{ headerShown: false }} />     
        <Stack.Screen name="home" options={{ headerShown: false }} />     
        <Stack.Screen name="login" options={{ headerShown: false }} />     
      </Stack>
    </SafeScreen>
  );
}
