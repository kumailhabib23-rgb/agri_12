import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../components/footer";

function TabItem({
  focused,
  icon,
  label,
}: {
  focused: boolean;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
}) {
  return (
    <View style={styles.item}>
      <Ionicons
        name={icon}
        size={24}
        color={focused ? "#16a34a" : "#9ca3af"}
      />
      <Text style={[styles.text, focused && styles.textActive]}>
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tabs.Screen
          name="user-portal"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabItem focused={focused} icon="home" label="Home" />
            ),
          }}
        />

        <Tabs.Screen
          name="list"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabItem focused={focused} icon="list" label="List" />
            ),
          }}
        />

        <Tabs.Screen
          name="status"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabItem focused={focused} icon="stats-chart" label="Status" />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabItem focused={focused} icon="settings" label="More" />
            ),
          }}
        />
      </Tabs>
      <Footer />
    </View>
    );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 18,
    left: 18,
    right: 18,
    height: 72,

    backgroundColor: "#fff",
    borderRadius: 28,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },

  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },

  text: {
    fontSize: 11,
    marginTop: 2,
    color: "#9ca3af",
  },

  textActive: {
    color: "#16a34a",
    fontWeight: "700",
  },
});