import { View, Text, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { getFarmers } from "./utils/storage";

export default function MapScreen() {
  const [farmers, setFarmers] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getFarmers();
    setFarmers(data || []);
  };

  return (
    <View style={{ flex: 1 }}>
      
      {/* HEADER */}
      <View style={{ padding: 10, backgroundColor: "#2e7d32" }}>
        <Text style={{ color: "white", fontSize: 18 }}>
          🗺 Farmers Map View
        </Text>
      </View>

      {/* MAP */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 25.396,
          longitude: 68.357,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {farmers.map((item, index) => {
          if (!item.latitude || !item.longitude) return null;

          return (
            <Marker
              key={index}
              coordinate={{
                latitude: Number(item.latitude),
                longitude: Number(item.longitude),
              }}
              title={item.name || "Farmer"}
              description={item.crop || "Crop"}
            />
          );
        })}
      </MapView>
    </View>
  );
}