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
import { useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Picker } from "@react-native-picker/picker";

export default function FarmerForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    cropType: "Wheat",
    irrigationType: "Canal",
    fertilizerType: "Organic",
    latitude: 0,
    longitude: 0,
    image: "",
  });

  const [cameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  // 📍 LOCATION
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    setForm({
      ...form,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  // 📁 GALLERY PICK
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, image: result.assets[0].uri });
    }
  };

  // 📸 CAMERA CAPTURE
  const takePhoto = async () => {
    if (!permission?.granted) {
      await requestPermission();
    }

    setCameraVisible(true);
  };

  const capturePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setForm({ ...form, image: photo.uri });
      setCameraVisible(false);
    }
  };

  // SUBMIT
  const submitForm = () => {
    Alert.alert("Success", "Farmer Data Saved ✅");
    console.log(form);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 15, backgroundColor: "#eef7ee" }}>
      
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        🌾 Farmer Form (Gov Level)
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
        style={styles.input}
        keyboardType="phone-pad"
        onChangeText={(t) => setForm({ ...form, phone: t })}
      />

      {/* DROPDOWNS */}
      <Text style={styles.label}>🌾 Crop Type</Text>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={form.cropType}
          onValueChange={(value) =>
            setForm({ ...form, cropType: value })
          }
        >
          <Picker.Item label="Wheat" value="Wheat" />
          <Picker.Item label="Rice" value="Rice" />
          <Picker.Item label="Cotton" value="Cotton" />
          <Picker.Item label="Sugarcane" value="Sugarcane" />
        </Picker>
      </View>

      <Text style={styles.label}>💧 Irrigation Type</Text>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={form.irrigationType}
          onValueChange={(value) =>
            setForm({ ...form, irrigationType: value })
          }
        >
          <Picker.Item label="Canal" value="Canal" />
          <Picker.Item label="Tube Well" value="Tube Well" />
          <Picker.Item label="Rainfed" value="Rainfed" />
        </Picker>
      </View>

      <Text style={styles.label}>🌱 Fertilizer Type</Text>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={form.fertilizerType}
          onValueChange={(value) =>
            setForm({ ...form, fertilizerType: value })
          }
        >
          <Picker.Item label="Organic" value="Organic" />
          <Picker.Item label="Chemical" value="Chemical" />
          <Picker.Item label="Mixed" value="Mixed" />
        </Picker>
      </View>

      {/* LOCATION */}
      <TouchableOpacity style={styles.button} onPress={getLocation}>
        <Text style={styles.btnText}>📍 Get Location</Text>
      </TouchableOpacity>

      {/* MAP */}
      {form.latitude !== 0 && (
        <MapView
          style={{ width: "100%", height: 200, marginTop: 10 }}
          region={{
            latitude: form.latitude,
            longitude: form.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={form} />
        </MapView>
      )}

      {/* IMAGE BUTTONS */}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.btnText}>📁 Upload from Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.btnText}>📸 Open Camera</Text>
      </TouchableOpacity>

      {/* IMAGE PREVIEW */}
      {form.image ? (
        <Image
          source={{ uri: form.image }}
          style={{ width: "100%", height: 200, borderRadius: 10, marginTop: 10 }}
        />
      ) : null}

      {/* SUBMIT */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#1b5e20" }]}
        onPress={submitForm}
      >
        <Text style={styles.btnText}>✅ Submit Farmer Data</Text>
      </TouchableOpacity>

      {/* CAMERA MODAL */}
      {cameraVisible && (
        <View style={{ height: 400, marginTop: 10 }}>
          <CameraView
            style={{ flex: 1 }}
            ref={cameraRef}
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "black" }]}
            onPress={capturePhoto}
          >
            <Text style={styles.btnText}>📸 Capture Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={() => setCameraVisible(false)}
          >
            <Text style={styles.btnText}>❌ Close Camera</Text>
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
    padding: 13,
    borderRadius: 10,
    marginTop: 10,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  label: {
    marginTop: 15,
    fontWeight: "bold",
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 5,
  },
});