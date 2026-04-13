import { View, Text, Image, StatusBar, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.wrapper}>
      
      {/* STATUS BAR FIX */}
      <StatusBar barStyle="light-content" backgroundColor="#1b5e20" />

      {/* HEADER CONTAINER */}
      <View style={styles.container}>

        {/* LOGO */}
        <Image
          source={require("../../assets/images/swat-logo.png")}
          style={styles.logo}
        />

        {/* TEXT AREA */}
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>SWAT</Text>
          <Text style={styles.subtitle}>
            Sindh Water & Agriculture Transformation Department
          </Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#1b5e20",
    paddingTop: 30, // for status bar
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },

  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "white",
  },

  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#c8e6c9",
    fontSize: 11,
  },
});