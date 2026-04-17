import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

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
  const categoryList: CategoryItem[] = [
    { name: "Vegetables", icon: "leaf" },
    { name: "Fruits", icon: "nutrition" },
    { name: "Grains", icon: "leaf-outline" },
  ];

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [offlinePending, setOfflinePending] = useState(3);
  const [totalDataCount, setTotalDataCount] = useState(128);
  const [syncedDataCount, setSyncedDataCount] = useState(92);
  const remainingDataCount = totalDataCount - syncedDataCount;

  useEffect(() => {
    let active = true;
    const loadCategories = async () => {
      await new Promise((resolve) => setTimeout(resolve, 150));
      if (!active) return;
      setCategories(categoryList);
      setLoadingCategories(false);
    };
    loadCategories();
    return () => {
      active = false;
    };
  }, []);

  // 🔍 SEARCH FILTER
  const filtered = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.root}>

      <StatusBar barStyle="light-content" backgroundColor="#1b5e20" />

      {/* 🌿 HEADER */}
      <View style={styles.header}>
        <View style={styles.headerRow}>

          <View>
            <Text style={styles.name}>Hello, {user.name} </Text>
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
          Agriculture Portal • Smart Farming 
        </Text>
      </View>

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

          {/* <View style={styles.card}>
            <Ionicons name="cloud-offline-outline" size={22} color="#2e7d32" />
            <Text style={styles.cardNum}>{offlinePending}</Text>
            <Text style={styles.cardText}>Offline Pending</Text>
          </View> */}

          <View style={styles.card}>
            <Ionicons name="timer" size={22} color="#2e7d32"/>
            <Text style={styles.cardNum}>Live</Text>
            <Text style={styles.cardText}>Status</Text>
          </View>

        </View>

        {/* 🟩 GRID */}
        <Text style={styles.section}>Categories</Text>

        {loadingCategories ? (
          <View style={styles.loadingBox}>
            <Text style={styles.loadingText}>Loading categories...</Text>
          </View>
        ) : (
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
        )}

        <View style={styles.fullDataCard}>
          <View style={styles.fullDataHeader}>
            <Ionicons name="layers" size={24} color="#2e7d32" />
            <Text style={styles.fullDataTitle}>Sync Progress</Text>
          </View>
          <Text style={styles.fullDataValue}>{syncedDataCount}/{totalDataCount}</Text>
          <Text style={styles.fullDataSubtitle}>Records synced out of total available data</Text>

          <View style={styles.syncRow}>
            <Text style={styles.syncLabel}>Done</Text>
            <Text style={styles.syncValue}>{syncedDataCount}</Text>
          </View>
          <View style={styles.syncRow}>
            <Text style={styles.syncLabel}>Remaining</Text>
            <Text style={styles.syncValue}>{remainingDataCount}</Text>
          </View>
        </View>

      </ScrollView>

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
  loadingBox: {
    margin: 15,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  loadingText: {
    color: "#2e7d32",
    fontWeight: "bold",
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

  fullDataCard: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  fullDataHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },

  fullDataTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e7d32",
  },

  fullDataValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1b5e20",
    marginBottom: 6,
  },

  fullDataSubtitle: {
    color: "#4b5563",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 14,
  },

  syncRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },

  syncLabel: {
    color: "#4b5563",
  },

  syncValue: {
    fontWeight: "bold",
    color: "#111",
  },

});