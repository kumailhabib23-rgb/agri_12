import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Animated,
  ImageBackground,
  ScrollView,
} from "react-native";

import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Header from "./components/header";
import Footer from "./components/footer";
import { initDB, loginUser } from "./utils/db";

export default function Index() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const initializeDB = async () => {
      try {
        await initDB();
      } catch (error) {
        console.error("Failed to initialize database:", error);
        Alert.alert("Database Error", "Failed to initialize database");
      }
    };
    initializeDB();
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Enter username & password");
      return;
    }

    const user = await loginUser(username, password);

    if (user.length > 0) {
      router.push({
        pathname: "../user-portal",
        params: { username },
      });
    } else {
      Alert.alert("Error", "Invalid credentials");
    }
  };

  // ⏳ COUNTDOWN
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date("2026-12-31T23:59:59").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) return;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🌾 SLIDER
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30",
      title: "SWAT Agriculture",
      desc: "Smart farming system",
    },
    {
      image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf",
      title: "Smart Irrigation",
      desc: "Save water",
    },
    {
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
      title: "Digital Farming",
      desc: "Manage easily",
    },
  ];

  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      fadeAnim.setValue(0);
      setIndex((prev) => (prev + 1) % slides.length);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#eef7ee" }}>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>

        <Header />

        {/* 🌾 SLIDER */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <ImageBackground source={{ uri: slides[index].image }} style={styles.image}>
            <View style={styles.overlay} />
            <View style={styles.textBox}>
              <Text style={styles.title}>{slides[index].title}</Text>
              <Text style={styles.desc}>{slides[index].desc}</Text>
            </View>
          </ImageBackground>
        </Animated.View>

        {/* 🔥 CARDS (FIXED POSITION) */}
        <View style={styles.cardContainer}>

          <View style={styles.card}>
            <Ionicons name="person-add" size={26} color="#2e7d32" />
            <Text style={styles.cardText}>Register</Text>
            <Text style={styles.timer}>
              {timeLeft.days}d {timeLeft.hours}h
            </Text>
          </View>

          <View style={styles.card}>
            <Ionicons name="list" size={26} color="#2e7d32" />
            <Text style={styles.cardText}>Records</Text>
            <Text style={styles.timer}>
              {timeLeft.hours}h {timeLeft.minutes}m
            </Text>
          </View>

          <View style={styles.card}>
            <Ionicons name="analytics" size={26} color="#2e7d32" />
            <Text style={styles.cardText}>Reports</Text>
            <Text style={styles.timer}>
              {timeLeft.minutes}m {timeLeft.seconds}s
            </Text>
          </View>

        </View>

        {/* 🌱 FEATURES */}
        <View style={styles.featuresBox}>
          <Text style={styles.sectionTitle}>App Features</Text>

          <View style={styles.featureItem}>
            <Ionicons name="leaf-outline" size={20} color="#2e7d32" />
            <Text style={styles.featureText}>Crop Monitoring</Text>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="water-outline" size={20} color="#2e7d32" />
            <Text style={styles.featureText}>Smart Irrigation</Text>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="phone-portrait-outline" size={20} color="#2e7d32" />
            <Text style={styles.featureText}>Mobile Data Entry</Text>
          </View>

        </View>

        {/* 🔐 LOGIN */}
        <View style={styles.loginBox}>
          <Text style={styles.loginTitle}>Login</Text>

          <View style={styles.inputBox}>
            <Ionicons name="person-outline" size={20} color="#2e7d32" />
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={20} color="#2e7d32" />
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("../signup")}> 
            <Text style={styles.signupLink}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("../admin-login")}> 
            <Text style={styles.adminLink}>Admin Mode</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

      <Footer />

    </View>
  );
}

const styles = StyleSheet.create({

  image: { height: 220, justifyContent: "flex-end" },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  textBox: { padding: 15 },

  title: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  desc: { color: "#ddd", fontSize: 12 },

  // ✅ FIXED CARD POSITION
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15, // FIXED (no overlap)
  },

  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    elevation: 4,
  },

  cardText: { fontSize: 11, marginTop: 8, textAlign: "center", fontWeight: "500" },

  timer: {
    fontSize: 10,
    color: "#2e7d32",
    marginTop: 4,
    fontWeight: "bold",
  },

  featuresBox: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e7d32",
  },

  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 6,
  },

  featureText: {
    marginLeft: 12,
    fontSize: 13,
    fontWeight: "500",
  },

  loginBox: { padding: 15 },

  loginTitle: {
    fontSize: 20,
    textAlign: "center",
    color: "#2e7d32",
    fontWeight: "bold",
  },

  inputBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },

  input: { marginLeft: 8, flex: 1 },

  btn: {
    backgroundColor: "#2e7d32",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  signupLink: {
    textAlign: "center",
    marginTop: 15,
    color: "#1565c0",
    fontWeight: "600",
    fontSize: 14,
  },

  adminLink: {
    textAlign: "center",
    marginTop: 10,
    color: "#2e7d32",
    fontWeight: "bold",
    fontSize: 14,
  },

});