import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function Profile() {

  // 👤 DUMMY USER DATA
  const user = {
    name: "Ali Khan",
    location: "Sindh, Pakistan",
    email: "alikhan@gmail.com",
    phone: "+92 300 1234567",
  };

  return (
    <View style={styles.root}>

      <StatusBar barStyle="light-content" backgroundColor="#1b5e20" />

      {/* 🌿 HEADER */}
      <View style={styles.header}>

        <View style={styles.profileCircle}>
          <Ionicons name="person" size={40} color="#1b5e20" />
        </View>

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.location}>📍 {user.location}</Text>

      </View>

      {/* 📦 INFO CARDS */}
      <View style={styles.container}>

        <View style={styles.card}>
          <Ionicons name="mail" size={22} color="#2e7d32" />
          <View style={styles.cardTextBox}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="call" size={22} color="#2e7d32" />
          <View style={styles.cardTextBox}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{user.phone}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="location" size={22} color="#2e7d32" />
          <View style={styles.cardTextBox}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{user.location}</Text>
          </View>
        </View>

      </View>

      {/* 🔘 BUTTONS */}
      <View style={styles.btnContainer}>

        <TouchableOpacity style={styles.btn}>
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.btnText}> Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={18} color="#fff" />
          <Text style={styles.btnText}> Logout</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: "#f4fbf4",
  },

  header: {
    backgroundColor: "#1b5e20",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  profileCircle: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 100,
    marginBottom: 10,
  },

  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  location: {
    color: "#c8e6c9",
    fontSize: 13,
    marginTop: 4,
  },

  container: {
    marginTop: 20,
    paddingHorizontal: 15,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: "center",
    elevation: 3,
  },

  cardTextBox: {
    marginLeft: 10,
  },

  label: {
    fontSize: 12,
    color: "#666",
  },

  value: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1b5e20",
  },

  btnContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  btn: {
    backgroundColor: "#2e7d32",
    padding: 14,    
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },

  logoutBtn: {
    backgroundColor: "#c62828",
    padding: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },

});