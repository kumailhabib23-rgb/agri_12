import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Image } from "react-native";
import { useRouter } from "expo-router";

export default function Splash() {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // 🔥 ANIMATION START
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // ⏳ REDIRECT AFTER 3 SEC
    setTimeout(() => {
      router.replace("./");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>

      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >

        {/* 🌾 LOGO */}
        <Image
          source={require("../assets/images/swat-logo.png")}
          style={styles.logo}
        />

        {/* 🔥 TITLE */}
        <Text style={styles.title}>SWAT</Text>

        {/* 🌱 FULL FORM */}
        <Text style={styles.fullForm}>
          Sindh Water & Agriculture Transformation
        </Text>

      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#2e7d32",
    justifyContent: "center",
    alignItems: "center",
  },

  logoContainer: {
    alignItems: "center",
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },

  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 2,
  },

  fullForm: {
    marginTop: 8,
    color: "#c8e6c9",
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 20,
  },

});