import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useState, useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

export default function Index() {
  const date = new Date();
  const formattedDate = date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const router = useRouter();
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const res = await fetch("https://do-it-rogd.onrender.com/api/todo");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch tasks whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  // Delete task instantly in UI, then from API
  const deleteTask = async (id) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
    try {
      await fetch(`https://do-it-rogd.onrender.com/api/todo/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Do it Today</Text>
      <View style={styles.line} />
      <Text style={styles.date}>{formattedDate}</Text>

      {/* Task List */}
      <ScrollView style={{ marginTop: 15, width: "100%" }}>
        {tasks.map((task) => (
          <View key={task._id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Checkbox
                value={false}
                onValueChange={() => deleteTask(task._id)}
              />
              <Text style={styles.cardTitle}>{task.title}</Text>
            </View>
            <Text style={styles.cardDesc}>{task.description}</Text>
            <Text style={styles.cardTime}>
              {task.startTime} - {task.endTime}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add-task")}
      >
        <AntDesign name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 18,
    color: "#555",
    marginTop: 5,
  },
  line: {
    height: 1,
    backgroundColor: "#ccc",
    width: "80%",
    marginVertical: 5,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  cardDesc: {
    fontSize: 15,
    color: "#666",
    marginBottom: 5,
  },
  cardTime: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007BFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
});
