import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Animated,
  StatusBar,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Footer from "./components/footer";

export default function Portal() {

  const user = {
    name: "Ali Khan",
    location: "Sindh, Pakistan",
  };

  const categories = [
    "Vegetables",
    "Fruits",
    "Meat",
    "Grains",
    "Dairy",
    "Poultry",
  ];

  const [search, setSearch] = useState("");

  const [timeLeft, setTimeLeft] = useState(0);

  // ⏳ COUNTDOWN
  useEffect(() => {
    const target = Date.now() + 24 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const diff = target - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const total = Math.floor(ms / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const filtered = categories.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= HEADER ANIMATION ================= */
  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, []);

  const headerTranslate = headerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-120, 0],
  });

  const headerOpacity = headerAnim;

  return (
    <View style={styles.root}>

      <StatusBar barStyle="light-content" backgroundColor="#1b5e20" />

      {/* 🌿 ANIMATED HEADER */}
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateY: headerTranslate }],
            opacity: headerOpacity,
          },
        ]}
      >
        <View style={styles.headerRow}>

          <View style={styles.iconBox}>
            <Ionicons name="leaf" size={26} color="#1b5e20" />
          </View>

          <View>
            <Text style={styles.name}>Hello, {user.name} </Text>
            <Text style={styles.location}>📍 {user.location}</Text>
          </View>

        </View>

        <Text style={styles.headerSub}>
          Agriculture Portal • Smart Farming 🌾
        </Text>

      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 🔍 SEARCH */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            placeholder="Search vegetables, fruits..."
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
        </View>

        {/* 🌾 SLIDER */}
        <AgriSlider />

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
            <View key={i} style={styles.gridCard}>
              <Ionicons name="leaf" size={24} color="#2e7d32" />
              <Text style={styles.gridText}>{item}</Text>
            </View>
          ))}
        </View>

      </ScrollView>

      <Footer />

    </View>
  );
}

/* ================= SLIDER ================= */
const AgriSlider = () => {
  const images = [
    require("../assets/images/1.jpg"),
    require("../assets/images/2.jpg"),
    require("../assets/images/3.jpg"),
  ];

  const titles = [
    "Green Agriculture 🌿",
    "Smart Farming 🚜",
    "Sustainable Growth 🌱",
  ];

  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setIndex((prev) => (prev + 1) % images.length);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.slider}>

      <Animated.Image
        source={images[index]}
        style={[styles.sliderImage, { opacity: fadeAnim }]}
        resizeMode="cover"
      />

      <View style={styles.sliderOverlay}>
        <Text style={styles.sliderTitle}>{titles[index]}</Text>

        <Text style={styles.sliderText}>
          Swat Sindh Agriculture Organization promoting modern farming techniques and rural development.
        </Text>
      </View>

    </View>
  );
};

/* ================= STYLES ================= */
const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: "#f4fbf4",
  },

  header: {
    backgroundColor: "#1b5e20",
    paddingTop: 45,
    paddingBottom: 20,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    elevation: 10,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    marginRight: 10,
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  location: {
    color: "#c8e6c9",
    fontSize: 12,
  },

  headerSub: {
    marginTop: 8,
    color: "#e8f5e9",
    fontSize: 12,
  },

  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 15,
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
    elevation: 3,
  },

  input: {
    marginLeft: 10,
    flex: 1,
  },

  slider: {
    marginHorizontal: 15,
    borderRadius: 18,
    overflow: "hidden",
    height: 210,
    elevation: 5,
  },

  sliderImage: {
    width: "100%",
    height: 210,
    position: "absolute",
  },

  sliderOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  sliderTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  sliderText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 5,
  },

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
    elevation: 4,
  },

  cardNum: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1b5e20",
  },

  cardText: {
    fontSize: 10,
    color: "#666",
  },

  section: {
    marginLeft: 15,
    marginTop: 18,
    fontSize: 16,
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
    elevation: 3,
  },

  gridText: {
    fontSize: 12,
    marginTop: 6, 
    fontWeight: "500",
  },

});