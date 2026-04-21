import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔥 CHANGE THIS IP
  const API_URL = "http://172.16.14.18/agri_api/signup.php";

  const handleSignup = async () => {
    try {
      setLoading(true);

      console.log("Sending:", form);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const text = await res.text();
      console.log("RAW RESPONSE:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error("Invalid server response");
      }

      setLoading(false);

      if (data.status) {
        Alert.alert("Success", data.message);
        router.replace("/login");
      } else {
        Alert.alert("Error", data.message);
      }

    } catch (error) {
      setLoading(false);
      console.log("ERROR:", error);
      Alert.alert("Server Error", "Check IP / XAMPP / WiFi");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Signup</Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        onChangeText={(v) => setForm({ ...form, full_name: v })}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={(v) => setForm({ ...form, email: v })}
      />

      <TextInput
        placeholder="Phone"
        style={styles.input}
        onChangeText={(v) => setForm({ ...form, phone: v })}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={(v) => setForm({ ...form, password: v })}
      />

      <TextInput
        placeholder="Location"
        style={styles.input}
        onChangeText={(v) => setForm({ ...form, location: v })}
      />

      <TouchableOpacity style={styles.btn} onPress={handleSignup}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Create Account</Text>
        )}
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f4fbf4",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1b5e20",
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },

  btn: {
    backgroundColor: "#2e7d32",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});