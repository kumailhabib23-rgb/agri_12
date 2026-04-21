import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme, useTheme } from "../theme";

type MetricCardProps = {
  label: string;
  value: string;
  sub: string;
  timeLeft: string;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
};

export default function MetricCard({ label, value, sub, timeLeft, icon }: MetricCardProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {icon && <Ionicons name={icon} size={24} color={theme.primary} style={styles.icon} />}
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.sub}>{sub}</Text>
      <Text style={styles.timer}>⏳ {timeLeft}</Text>
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: "48%",
      backgroundColor: theme.surface,
      padding: 12,
      borderRadius: 16,
      marginBottom: 10,
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderWidth: 1,
      borderColor: theme.surfaceSoft,
    },
    icon: {
      alignSelf: "center",
      marginBottom: 8,
    },
    label: {
      fontSize: 12,
      color: theme.textMuted,
      textAlign: "center",
    },
    value: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.primaryDark,
      textAlign: "center",
    },
    sub: {
      fontSize: 11,
      color: theme.success,
      textAlign: "center",
    },
    timer: {
      fontSize: 10,
      marginTop: 5,
      color: theme.textMuted,
      textAlign: "center",
    },
  });
