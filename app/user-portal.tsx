import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Animated,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Footer from "./components/footer";

export default function Portal() {

  const router = useRouter();

  // 👤 USER
  const user = {
    name: "Ali Khan",
    location: "Sindh, Pakistan",
  };

  const isOnline = true; // 🟢 ONLINE STATUS

  type CategoryItem = {
    name: string;
    icon: React.ComponentProps<typeof Ionicons>["name"];
  };

  // 🟩 CATEGORIES
  const categories: CategoryItem[] = [
    { name: "Vegetables", icon: "leaf" },
    { name: "Fruits", icon: "nutrition" },
    { name: "Meat", icon: "restaurant" },
    { name: "Grains", icon: "leaf-outline" },
    { name: "Dairy", icon: "water" },
    { name: "Poultry", icon: "egg" },
  ];

  const [search, setSearch] = useState("");

  // ⏳ TIMER
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const targetTime = Date.now() + 24 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const diff = targetTime - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ✅ SAFE FORMAT
  const formatTime = (ms = 0) => {
    const total = Math.floor(ms / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;

    return `${h}h ${m}m ${s}s`;
  };

  // 🔍 SEARCH FILTER
  const filtered = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🎬 HEADER ANIMATION
  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = headerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <View style={styles.root}>

      <StatusBar barStyle="light-content" backgroundColor="#1b5e20" />

      {/* 🌿 HEADER */}
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY }], opacity: headerAnim },
        ]}
      >
        <View style={styles.headerRow}>

          <View>
            <Text style={styles.name}>Hello, {user.name} 👋</Text>
            <Text style={styles.location}>📍 {user.location}</Text>
          </View>

          {/* 👤 PROFILE + ONLINE DOT */}
          <TouchableOpacity
            style={styles.profileBox}
            onPress={() => router.push("./profile")}
          >
            <Ionicons name="person" size={24} color="#1b5e20" />

            {isOnline && <View style={styles.onlineDot} />}
          </TouchableOpacity>

        </View>

        <Text style={styles.headerSub}>
          Agriculture Portal • Smart Farming 🌾
        </Text>
      </Animated.View>

      <ScrollView>

        {/* 🔍 SEARCH */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            placeholder="Search categories..."
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
        </View>

        {/* 📊 CARDS */}
        <View style={styles.cardRow}>

          <View style={styles.card}>
            <Ionicons name="apps" size={22} color="#2e7d32" />
            <Text style={styles.cardNum}>{categories.length}</Text>
            <Text style={styles.cardText}>Items</Text>
          </View>

          <View style={styles.card}>
            <Ionicons name="pulse" size={22} color="#2e7d32" />
            <Text style={styles.cardNum}>Live</Text>
            <Text style={styles.cardText}>Status</Text>
          </View>

          <View style={styles.card}>
            <Ionicons name="timer" size={22} color="#2e7d32" />
            <Text style={styles.cardNum}>{formatTime(timeLeft)}</Text>
            <Text style={styles.cardText}>Timer</Text>
          </View>

        </View>

        {/* 🟩 GRID */}
        <Text style={styles.section}>Categories</Text>

        <View style={styles.grid}>
          {filtered.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.gridCard}
              onPress={() =>
                router.push({
                  pathname: "./category",
                  params: { name: item.name },
                })
              }
            >
              <Ionicons name={item.icon} size={26} color="#2e7d32" />
              <Text style={styles.gridText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      <Footer />

    </View>
  );
}

/* 🎨 STYLES */
const styles = StyleSheet.create({

  root: { flex: 1, backgroundColor: "#f4fbf4" },

  header: {
    backgroundColor: "#1b5e20",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  location: { color: "#c8e6c9", fontSize: 12 },

  headerSub: { marginTop: 8, color: "#e8f5e9", fontSize: 12 },

  profileBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    position: "relative",
  },

  onlineDot: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00e676",
    borderWidth: 2,
    borderColor: "#fff",
  },

  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 15,
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  input: { marginLeft: 10, flex: 1 },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },

  card: {
    backgroundColor: "#fff",
    width: "30%",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  cardNum: { fontWeight: "bold", color: "#1b5e20" },
  cardText: { fontSize: 10, color: "#666" },

  section: {
    marginLeft: 15,
    marginTop: 18,
    fontWeight: "bold",
    color: "#1b5e20",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 10,
  },

  gridCard: {
    width: "30%",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 14,
    alignItems: "center",
  },

  gridText: { marginTop: 6 },

});