import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

export default function FarmerForm() {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    cropType: "Wheat",
    irrigationType: "Canal",
    fertilizerType: "Organic",
  });

  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  // 📍 LOCATION
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission denied");
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});

    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  };

  // 💾 SAVE DATA (IMPORTANT FIX FOR ADMIN)
  const saveData = async (newData: Record<string, unknown>) => {
    try {
      const existing = await AsyncStorage.getItem("farmers");
      let farmers = existing ? JSON.parse(existing) : [];

      farmers.push(newData);

      await AsyncStorage.setItem("farmers", JSON.stringify(farmers));
    } catch (e) {
      console.log(e);
    }
  };

  // 📸 IMAGE
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.6,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 📸 CAMERA
  const openCamera = async () => {
    if (!permission?.granted) {
      await requestPermission();
    }
    setCameraOpen(true);
  };

  const takePhoto = async () => {
    if (!cameraRef.current) {
      return;
    }

    const photo = await cameraRef.current.takePictureAsync();
    setImage(photo.uri);
    setCameraOpen(false);
  };

  // ✅ SUBMIT (FIXED)
  const submitForm = async () => {
    const newFarmer = {
      ...form,
      location,
      image,
      createdAt: new Date().toLocaleString(),
    };

    await saveData(newFarmer);

    Alert.alert("Success", "Farmer Data Saved ✅", [
      {
        text: "OK",
        onPress: () => navigation.goBack(), // 👈 GO BACK AFTER DONE
      },
    ]);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#eef7ee" }}
      contentContainerStyle={{ padding: 15, paddingBottom: 50 }}
    >

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        🌾 Farmer Registration Form
      </Text>

      {/* NAME */}
      <TextInput
        placeholder="Farmer Name"
        style={styles.input}
        onChangeText={(t) => setForm({ ...form, name: t })}
      />

      {/* PHONE */}
      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        style={styles.input}
        onChangeText={(t) => setForm({ ...form, phone: t })}
      />

      {/* DROPDOWNS */}
      <Text style={styles.label}>Crop Type</Text>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={form.cropType}
          onValueChange={(v) => setForm({ ...form, cropType: v })}
        >
          <Picker.Item label="Wheat" value="Wheat" />
          <Picker.Item label="Rice" value="Rice" />
          <Picker.Item label="Cotton" value="Cotton" />
        </Picker>
      </View>

      <Text style={styles.label}>Irrigation</Text>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={form.irrigationType}
          onValueChange={(v) => setForm({ ...form, irrigationType: v })}
        >
          <Picker.Item label="Canal" value="Canal" />
          <Picker.Item label="Tube Well" value="Tube Well" />
          <Picker.Item label="Rainfed" value="Rainfed" />
        </Picker>
      </View>

      <Text style={styles.label}>Fertilizer</Text>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={form.fertilizerType}
          onValueChange={(v) => setForm({ ...form, fertilizerType: v })}
        >
          <Picker.Item label="Organic" value="Organic" />
          <Picker.Item label="Chemical" value="Chemical" />
        </Picker>
      </View>

      {/* LOCATION */}
      <TouchableOpacity style={styles.button} onPress={getLocation}>
        <Text style={styles.btnText}>📍 Get Location</Text>
      </TouchableOpacity>

      {/* IMAGE */}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.btnText}>📁 Upload Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.btnText}>📸 Open Camera</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: 200, marginTop: 10 }}
        />
      )}

      {/* SUBMIT */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#1b5e20" }]}
        onPress={submitForm}
      >
        <Text style={styles.btnText}>✅ Submit</Text>
      </TouchableOpacity>

      {/* CAMERA */}
      {cameraOpen && (
        <View style={{ height: 400, marginTop: 10 }}>
          <CameraView style={{ flex: 1 }} ref={cameraRef} />

          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.btnText}>📸 Capture</Text>
          </TouchableOpacity>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#2e7d32",
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  label: {
    marginTop: 10,
    fontWeight: "bold",
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 5,
  },
});