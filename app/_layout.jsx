

import { Stack } from "expo-router";
import SafeScreen from "./components/SafeScreen";

export default function Layout() {
  return (
    <SafeScreen>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />     
        <Stack.Screen name="home" options={{ headerShown: false }} />     
        <Stack.Screen name="login" options={{ headerShown: false }} />     
      </Stack>
    </SafeScreen>
  );
}
