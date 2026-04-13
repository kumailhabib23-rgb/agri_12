import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Header from "../components/header";

export default function FarmerLogin() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const login = () => {
    if (user === "farmer" && pass === "1234") {
      router.push("./dashboard");
    } else {
      alert("Wrong Farmer Credentials ❌");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#eef7ee" }}>
      <Header />

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20 }}>👨‍🌾 Farmer Login</Text>

        <TextInput placeholder="Username" style={input} onChangeText={setUser} />
        <TextInput placeholder="Password" secureTextEntry style={input} onChangeText={setPass} />

        <TouchableOpacity style={btn} onPress={login}>
          <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const input = {
  backgroundColor: "white",
  padding: 12,
  marginTop: 10,
  borderRadius: 8,
};

const btn = {
  backgroundColor: "#2e7d32",
  padding: 14,
  marginTop: 15,
  borderRadius: 8,
};