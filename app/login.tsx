import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ⚠️ PUT YOUR REAL IP HERE
  const API_URL = "http://172.16.14.18/agri_api/login.php";

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const text = await res.text();
      console.log("RAW RESPONSE:", text);

      const data = JSON.parse(text);

      setLoading(false);

      if (data.status) {
        Alert.alert("Success", "Login successful");
        router.replace("./user-portal");
      } else {
        Alert.alert("Error", data.message);
      }

    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert("Error", "Server not responding or IP wrong");
    }
  };

  return (
    <View style={styles.container}>

      {/* 🌿 LOGO SECTION */}
      <View style={styles.logoBox}>
        <View style={styles}>
          {/* You can replace this with your image */}
           <Image
                    source={require("../assets/images/swat-logo.png")}
                    style={styles.logo}
                  />
          
        </View>
        <Text style={styles.appName}>Agri Market System</Text>
        <Text style={styles.subText}>Login to continue</Text>
      </View>

      {/* INPUTS */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* BUTTON */}
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* SIGNUP */}
      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.link}>Create new account</Text>
      </TouchableOpacity>

    </View>
  );
}

/* 🎨 STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f4fbf4",
  },

  /* 🌿 LOGO DESIGN */
  logoBox: {
    alignItems: "center",
    marginBottom: 30,
  },

  // logoCircle: {
  //   width: 90,
  //   height: 90,
  //   borderRadius: 50,
  //   backgroundColor: "#2e7d32",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginBottom: 10,
  //   elevation: 5,
  // },

  logoText: {
    fontSize: 40,
  },

  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1b5e20",
  },

  
  logoContainer: {
    alignItems: "center",
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  subText: {
    fontSize: 12,
    color: "#666",
    marginTop: 3,
  },

  /* INPUT */
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },

  /* BUTTON */
  btn: {
    backgroundColor: "#2e7d32",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#2e7d32",
  },
});