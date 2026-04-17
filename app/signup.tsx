import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

// import * as Location from "expo-location";
import { useRouter } from "expo-router";


export default function Signup() {
  const router = useRouter();

  // const [name, setName] = useState("");
  // const [cnic, setCnic] = useState("");
  // const [phone, setPhone] = useState("");
  // const [district, setDistrict] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const [location, setLocation] = useState("");

  // useEffect(() => {
  //   initDB();
  //   getLocation();
  // }, []);

  // 📍 AUTO LOCATION
  // const getLocation = async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();

  //   if (status !== "granted") {
  //     Alert.alert("Permission denied");
  //     return;
  //   }

  //   let loc = await Location.getCurrentPositionAsync({});
  //   setLocation(`${loc.coords.latitude}, ${loc.coords.longitude}`);
  // };

  // // 🧑 CARTOON AVATAR
  // const avatar = `https://api.dicebear.com/7.x/adventurer/png?seed=${username || "user"}`;

  // ✅ REGISTER USER
  // const register = async () => {
  //   if (!name || !cnic || !phone || !district || !username || !password) {
  //     Alert.alert("Error", "Fill all fields");
  //     return;
  //   }

  //   await insertUser(
  //     name,
  //     cnic,
  //     phone,
  //     district,
  //     username,
  //     password,
  //     location,
  //     avatar
  //   );

    Alert.alert("Success", "User Registered");

  //   router.replace({
  //     pathname: "./user-portal",
  //     params: { username },
  //   });
  // };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Sign Up</Text>

      <TextInput placeholder="Name" style={styles.input} />
      <TextInput placeholder="CNIC" style={styles.input} />
      <TextInput placeholder="Phone" style={styles.input}  />
      <TextInput placeholder="District" style={styles.input} />
      <TextInput placeholder="Username" style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} />

      <Text style={styles.loc}>📍</Text>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('./user-portal')}>
        <Text style={styles.btnText}>Create Account</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2e7d32",
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },

  btn: {
    backgroundColor: "#2e7d32",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  loc: {
    textAlign: "center",
    marginVertical: 10,
    color: "#555",
  },

});