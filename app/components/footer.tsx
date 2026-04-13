import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Footer() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <View style={styles.footerNav}>

      <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("home")}>
        <Ionicons name="home" size={22} color={activeTab === "home" ? "#2e7d32" : "#777"} />
        <Text style={[styles.navText, activeTab === "home" && styles.active]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("list")}>
        <Ionicons name="list" size={22} color={activeTab === "list" ? "#2e7d32" : "#777"} />
        <Text style={[styles.navText, activeTab === "list" && styles.active]}>List</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("stats")}>
        <Ionicons name="stats-chart" size={22} color={activeTab === "stats" ? "#2e7d32" : "#777"} />
        <Text style={[styles.navText, activeTab === "stats" && styles.active]}>Stats</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("settings")}>
        <Ionicons name="settings" size={22} color={activeTab === "settings" ? "#2e7d32" : "#777"} />
        <Text style={[styles.navText, activeTab === "settings" && styles.active]}>More</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  footerNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 11, color: "#777" },
  active: { color: "#2e7d32", fontWeight: "bold" },
});