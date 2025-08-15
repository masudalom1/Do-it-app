// 🚨 Import gesture-handler FIRST — very important for Android release builds
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "./store/auth.js";

export default function Index() {
  const router = useRouter();
  const { token, user, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  // Initialize auth safely
  useEffect(() => {
    const init = async () => {
      try {
        if (checkAuth && typeof checkAuth === "function") {
          await checkAuth();
        }
      } catch (error) {
        console.log("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [checkAuth]);

  // Redirect after loading
  useEffect(() => {
    if (!loading) {
      try {
        if (token && user) {
          router.replace("/home");
        } else {
          router.replace("/login");
        }
      } catch (error) {
        console.log("Routing failed:", error);
      }
    }
  }, [loading, token, user, router]);

  // Loading screen
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return null;
}
