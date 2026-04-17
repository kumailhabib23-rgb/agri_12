import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { useTheme } from "../theme";

const getActiveTab = (pathname: string | null) => {
  if (!pathname) return "home";
  if (pathname.startsWith("/user-portal")) return "home";
  if (pathname.startsWith("/list")) return "list";
  if (pathname.startsWith("/status")) return "stats";
  if (pathname.startsWith("/profile")) return "settings";
  return "home";
};

function Footer() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = useMemo(() => getActiveTab(pathname), [pathname]);

  const handleNav = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={[styles.footerNav, { backgroundColor: theme.surface }] }>
      <TouchableOpacity style={[styles.navItem, activeTab === "home" && styles.navItemActive]} onPress={() => handleNav("/user-portal")}> 
        <View style={[styles.iconCircle, activeTab === "home" && styles.iconCircleActive, activeTab === "home" && { backgroundColor: theme.primary }] }>
          <Ionicons name="home" size={22} color={activeTab === "home" ? theme.textOnPrimary : theme.success} />
        </View>
        <Text style={[styles.navText, activeTab === "home" && styles.active, activeTab === "home" && { color: theme.primaryDark } ]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.navItem, activeTab === "list" && styles.navItemActive]} onPress={() => handleNav("/list")}> 
        <View style={[styles.iconCircle, activeTab === "list" && styles.iconCircleActive, activeTab === "list" && { backgroundColor: theme.primary }] }>
          <Ionicons name="list" size={22} color={activeTab === "list" ? theme.textOnPrimary : theme.success} />
        </View>
        <Text style={[styles.navText, activeTab === "list" && styles.active, activeTab === "list" && { color: theme.primaryDark } ]}>List</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem, activeTab === "stats" && styles.navItemActive]}
        onPress={() => handleNav("/status")}
      >
        <View style={[styles.iconCircle, activeTab === "stats" && styles.iconCircleActive, activeTab === "stats" && { backgroundColor: theme.primary }] }>
          <Ionicons
            name="stats-chart"
            size={22}
            color={activeTab === "stats" ? theme.textOnPrimary : theme.success}
          />
        </View>
        <Text style={[styles.navText, activeTab === "stats" && styles.active, activeTab === "stats" && { color: theme.primaryDark } ]}>Status</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.navItem, activeTab === "settings" && styles.navItemActive]} onPress={() => handleNav("/profile") }>
        <View style={[styles.iconCircle, activeTab === "settings" && styles.iconCircleActive, activeTab === "settings" && { backgroundColor: theme.primary }] }>
          <Ionicons name="settings" size={22} color={activeTab === "settings" ? theme.textOnPrimary : theme.success} />
        </View>
        <Text style={[styles.navText, activeTab === "settings" && styles.active, activeTab === "settings" && { color: theme.primaryDark } ]}>More</Text>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(Footer);

const styles = StyleSheet.create({
  footerNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 6,
    borderTopWidth: 0,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 16,
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  navItem: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 2,
  },
  navItemActive: {
    backgroundColor: "rgba(22,163,74,0.14)",
    borderRadius: 24,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
    backgroundColor: "#fff",
  },
  iconCircleActive: {
    backgroundColor: "#16a34a",
  },
  navText: { fontSize: 11, color: "#6b7280" },
  active: { color: "#166534", fontWeight: "bold" },
});