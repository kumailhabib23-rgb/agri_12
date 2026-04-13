import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function AdminLogin() {
  const router = useRouter();

  const [password, setPassword] = useState("");

  // 🔐 ADMIN PASSWORD (CHANGE THIS ANY TIME)
  const ADMIN_PASSWORD = "swat@123";

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      router.replace("./admin");
    } else {
      Alert.alert("Error", "Wrong Admin Password");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Admin Login</Text>

      <TextInput
        placeholder="Enter Admin Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#eef7ee",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2e7d32",
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  btn: {
    backgroundColor: "#2e7d32",
    padding: 14,
    borderRadius: 10,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

});