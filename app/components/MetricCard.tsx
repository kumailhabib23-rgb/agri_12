import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Theme, useTheme } from "../theme";

type MetricCardProps = {
  label: string;
  value: string;
  sub: string;
  timeLeft: string;
};

export default function MetricCard({ label, value, sub, timeLeft }: MetricCardProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
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
      borderRadius: 12,
      marginBottom: 10,
    },
    label: {
      fontSize: 12,
      color: theme.textMuted,
    },
    value: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.primaryDark,
    },
    sub: {
      fontSize: 11,
      color: theme.success,
    },
    timer: {
      fontSize: 10,
      marginTop: 5,
      color: theme.textMuted,
    },
  });
