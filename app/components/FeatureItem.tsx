import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme, useTheme } from "../theme";

type FeatureItemProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
};

export default function FeatureItem({ icon, label }: FeatureItemProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={20} color={theme.success} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      paddingVertical: 6,
    },
    label: {
      marginLeft: 12,
      fontSize: 13,
      fontWeight: "500",
      color: theme.text,
    },
  });
