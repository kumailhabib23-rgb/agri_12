import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getUser, initDB } from "./utils/db";

export default function Profile() {
  const { username } = useLocalSearchParams();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    initDB();
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await getUser(username);

    if (res && res.length > 0) {
      setUser(res[0]);
    }
  };

  return (
    <View style={styles.container}>

      {/* 🔥 HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* 🧑 AVATAR + NAME */}
      <View style={styles.avatarBox}>

        <Image
          source={{
            uri:
              user?.avatar ||
              "https://i.pravatar.cc/150?img=12",
          }}
          style={styles.avatar}
        />

        {/* 🔥 DYNAMIC NAME */}
        <Text style={styles.name}>
          {user?.name || "Loading..."}
        </Text>

        {/* 🔥 USERNAME */}
        <Text style={styles.username}>
          @{user?.username || username}
        </Text>

      </View>

      {/* 📍 INFO CARD */}
      <View style={styles.card}>

        <View style={styles.row}>
          <Ionicons name="person-outline" size={20} color="#2e7d32" />
          <Text style={styles.text}>
            Name: {user?.name || "Not found"}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="location-outline" size={20} color="#2e7d32" />
          <Text style={styles.text}>
            Location: {user?.location || "Not set"}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="home-outline" size={20} color="#2e7d32" />
          <Text style={styles.text}>
            District: {user?.district || "Not set"}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="time-outline" size={20} color="#2e7d32" />
          <Text style={styles.text}>
            Last Active: {user?.last_login || "Never"}
          </Text>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#eef7ee",
  },

  header: {
    backgroundColor: "#2e7d32",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  avatarBox: {
    alignItems: "center",
    marginTop: -40,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#fff",
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    color: "#2e7d32",
  },

  username: {
    color: "#666",
    fontSize: 13,
  },

  card: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 15,
    borderRadius: 15,
    elevation: 5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  text: {
    marginLeft: 10,
    fontSize: 13,
    color: "#333",
  },

});