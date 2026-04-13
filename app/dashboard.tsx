import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Header from "../components/header";

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* 🏛 HEADER */}
      <Header />

      <Text style={styles.title}>🌾 Farmer Dashboard</Text>

      <View style={styles.grid}>

        {/* ➕ FORM BUTTON */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("../farmer-form")}
        >
          <Text style={styles.cardText}>➕ Add Farmer Form</Text>
        </TouchableOpacity>

        {/* 📊 ADMIN DATA */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#1565c0" }]}
          onPress={() => router.push("../admin")}
        >
          <Text style={styles.cardText}>📊 View Data</Text>
        </TouchableOpacity>

        {/* 📍 LOCATION */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#ef6c00" }]}
          onPress={() => alert("Location feature inside form")}
        >
          <Text style={styles.cardText}>📍 Location</Text>
        </TouchableOpacity>

        {/* 📸 CAMERA */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#6a1b9a" }]}
          onPress={() => router.push("../farmer-form")}
        >
          <Text style={styles.cardText}>📸 Camera</Text>
        </TouchableOpacity>

        {/* ⚙ SETTINGS */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#424242" }]}
          onPress={() => alert("Settings coming soon")}
        >
          <Text style={styles.cardText}>⚙ Settings</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef7ee",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },

  card: {
    width: "40%",
    backgroundColor: "#2e7d32",
    padding: 20,
    margin: 10,
    borderRadius: 12,
    elevation: 3,
  },

  cardText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});