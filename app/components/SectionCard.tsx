import React, { PropsWithChildren } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Theme, useTheme } from "../theme";

type SectionCardProps = PropsWithChildren<{
  title: string;
  titleColor?: string;
}>;

export default function SectionCard({ title, titleColor, children }: SectionCardProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.card}>
      <Text style={[styles.title, { color: titleColor ?? theme.primaryDark }]}>{title}</Text>
      {children}
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.surface,
      padding: 16,
      borderRadius: 16,
      marginBottom: 12,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 12,
    },
  });
