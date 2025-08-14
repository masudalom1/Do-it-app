import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "./store/auth.js";

export default function Index() {
  const router = useRouter();
  const { token, user, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await checkAuth(); 
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (token && user) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    }
  }, [loading, token, user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return null;
}
