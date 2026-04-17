import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    // Empty fields check
    if (!cnic || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    // CNIC length check
    if (cnic.length < 13) {
      Alert.alert("Error", "CNIC must be 13 digits");
      return;
    }

    setLoading(true);

    // Dummy login condition
    setTimeout(() => {
      if (cnic === "4210112345678" && password === "12345") {
        Alert.alert("Success", "Login Successful");
        router.push("/user-portal");
      } else {
        Alert.alert("Error", "Invalid CNIC or Password");
      }

      setLoading(false);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <TextInput
        placeholder="CNIC"
        value={cnic}
        onChangeText={setCnic}
        keyboardType="numeric"
        maxLength={13}
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : "Login"}
        </Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don&apos;t have an account?
        </Text>

        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.link}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F8F4",
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1B5E20",
  },

  subtitle: {
    fontSize: 14,
    color: "#4CAF50",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#C8E6C9",
  },

  button: {
    backgroundColor: "#2E7D32",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  disabledButton: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  footerText: {
    color: "#4CAF50",
  },

  link: {
    color: "#1B5E20",
    fontWeight: "bold",
  },
});