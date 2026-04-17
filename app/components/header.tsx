import React from "react";
import { View, Text, Image, StatusBar, StyleSheet } from "react-native";
import { useTheme } from "../theme";

export default function Header() {
  const theme = useTheme();

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.primaryDark }] }>
      
      {/* STATUS BAR FIX */}
      <StatusBar barStyle="light-content" backgroundColor={theme.primaryDark} />

      {/* HEADER CONTAINER */}
      <View style={styles.container}>

        {/* LOGO */}
        <Image
          source={require("../../assets/images/swat-logo.png")}
          style={styles.logo}
        />

        {/* TEXT AREA */}
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: theme.textOnPrimary } ]}>SWAT</Text>
          <Text style={[styles.subtitle, { color: theme.primaryLight } ]}>
            Sindh Water & Agriculture Transformation Department
          </Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 30, // for status bar
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },

  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "white",
  },

  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#c8e6c9",
    fontSize: 11,
  },
});