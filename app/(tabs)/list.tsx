import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";

export default function LoginHistory() {
  const [search, setSearch] = useState("");

  type LoginStatus = "Online" | "Logout" | "Disconnected";

  type HistoryItem = {
    id: string;
    user: string;
    ip: string;
    city: string;
    device: string;
    login: string;
    logout: string;
    duration: string;
    status: LoginStatus;
  };

  const data: HistoryItem[] = [
    {
      id: "1",
      user: "Ahmed Khan",
      ip: "192.168.1.110", 
      city: "Karachi",
      device: "Android",
      login: "08:30 AM",
      logout: "-",
      duration: "Active",
      status: "Online",
    },
    {
      id: "2",
      user: "Ali Raza",
      ip: "192.168.1.105",
      city: "Hyderabad",
      device: "Android",
      login: "09:10 AM",
      logout: "10:25 AM",
      duration: "1h 15m",
      status: "Logout",
    },
    {
      id: "3",
      user: "Bilal Hussain",
      ip: "192.168.1.115",
      city: "Larkana",
      device: "Android",
      login: "05:10 PM",
      logout: "05:20 PM",
      duration: "10m",
      status: "Disconnected",
    },
  ];

  const filteredData = useMemo(() => {
    const text = search.toLowerCase();

    return data.filter((item) => {
      return (
        item.user.toLowerCase().includes(text) ||
        item.city.toLowerCase().includes(text) ||
        item.ip.toLowerCase().includes(text) ||
        item.status.toLowerCase().includes(text) ||
        item.duration.toLowerCase().includes(text)
      );
    });
  }, [search]);

  const getStatusStyle = (status: LoginStatus) => {
    switch (status) {
      case "Online":
        return styles.online;
      case "Logout":
        return styles.logout;
      default:
        return styles.disconnected;
    }
  };

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <View style={styles.card}>
      <Text style={styles.user}>{item.user}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>IP:</Text>
        <Text>{item.ip}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>City:</Text>
        <Text>{item.city}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Device:</Text>
        <Text>{item.device}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Login:</Text>
        <Text>{item.login}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Logout:</Text>
        <Text>{item.logout}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Duration:</Text>
        <Text>{item.duration}</Text>
      </View>

      <View style={[styles.badge, getStatusStyle(item.status)]}>
        <Text style={styles.badgeText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* 💚 FULL WIDTH DARK GREEN HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>CANDIDANTE DATA</Text>
        <Text style={styles.subtitle}>Login History Records</Text>
      </View>

      <TextInput
        placeholder="Search user, city, IP, status..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
        style={styles.searchBox}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F8F4",
  },

  /* 💚 FULL WIDTH PERFECT HEADER */
  header: {
    width: "100%",
    backgroundColor: "#14532d", // dark green
    paddingTop: 45,
    paddingBottom: 25,

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 1,
  },

  subtitle: {
    fontSize: 12,
    color: "#d1fae5",
    marginTop: 3,
  },

  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    margin: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 15,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 3,
  },

  user: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  label: {
    fontWeight: "600",
    color: "#555",
  },

  badge: {
    marginTop: 10,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },

  badgeText: {
    fontWeight: "bold",
    fontSize: 12,
  },

  online: {
    backgroundColor: "#D1FAE5",
  },

  logout: {
    backgroundColor: "#FEE2E2",
  },

  disconnected: {
    backgroundColor: "#FEF3C7",
  },
});