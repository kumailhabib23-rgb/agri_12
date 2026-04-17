import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import MetricCard from "../components/MetricCard";
import SectionCard from "../components/SectionCard";
import { Theme, useTheme } from "../theme";
const screenWidth = Dimensions.get("window").width;
export default function App() {
  const theme = useTheme();
  const styles = createStyles(theme);

  /* ---------------- LIVE GRAPH --------------- */
  const [chartData, setChartData] = useState([72, 74, 73, 78, 80, 77, 85]);

  /* ---------------- COUNTDOWN ------------------ */
  const [timeLeft, setTimeLeft] = useState(300);

  /* ---------------- HEADER ANIMATION ---------------- */
  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  /* ---------------- LIVE GRAPH UPDATE ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const arr = [...prev];
        arr.shift();
        
        const last = arr[arr.length - 1];
        let next = last + (Math.random() * 3 - 1.5);

        next = Math.max(60, Math.min(100, next));

        arr.push(Number(next.toFixed(1)));
        return arr;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  /* ---------------- COUNTDOWN ---------------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 300));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surfaceMuted }] }>
      <StatusBar barStyle="light-content" />

      {/* 🌿 HEADER */}
      <Animated.View style={[styles.header, { opacity: headerAnim, backgroundColor: theme.primary }]}>
        <Text style={[styles.title, { color: theme.textOnPrimary }]}>AMIS Dashboard</Text>
        <Text style={[styles.sub, { color: theme.primaryLight }]}>Agriculture Marketing System</Text>

        <View style={[styles.timerBox, { backgroundColor: theme.surfaceSoft }] }>
          <Text style={[styles.timerLabel, { color: theme.primaryLight }]}>Next Update</Text>
          <Text style={[styles.timerValue, { color: theme.textOnPrimary }]}>{formatTime(timeLeft)}</Text>
        </View>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* METRICS */}
        <View style={styles.metrics}>
          {metrics.map((item, i) => (
            <MetricCard
              key={i}
              label={item.label}
              value={item.value}
              sub={item.sub}
              timeLeft={formatTime(timeLeft)}
            />
          ))}
        </View>

        {/* VOLUME */}
        <SectionCard title="Volume (tonnes)" titleColor={theme.primaryDark}>
          {volume.map((item, i) => (
            <View key={i} style={{ marginBottom: 8 }}>
              <View style={styles.row}>
                <Text>{item.name}</Text>
                <Text style={[styles.bold, { color: theme.primaryDark }]}>{item.value}</Text>
              </View>
              <View style={styles.barBg}>
                <View style={[styles.barFill, { width: item.width as any }]} />
              </View>
            </View>
          ))}
        </SectionCard>

        {/* LIVE GRAPH */}
        <SectionCard title="Live Tomato Volume Trend" titleColor={theme.success}>
          <LineChart
            data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [{ data: chartData }],
            }}
            width={screenWidth - 40}
            height={220}
            bezier
            withDots
            withShadow
            withInnerLines={false}
            withOuterLines={false}
            chartConfig={{
              backgroundGradientFrom: theme.surface,
              backgroundGradientTo: theme.surface,
              decimalPlaces: 1,
              color: () => theme.primary,
              labelColor: () => theme.textMuted,
              fillShadowGradient: theme.primary,
              fillShadowGradientOpacity: 0.1,
            }}
            style={{ borderRadius: 16 }}
          />
        </SectionCard>

        {/* FIELD TABLE */}
        <SectionCard title="Field Submissions" titleColor={theme.primaryDark}>
          {submissions.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={{ flex: 1 }}>{item.agent}</Text>
              <Text style={{ flex: 1 }}>{item.market}</Text>
              <Text style={{ flex: 1, fontWeight: "bold", color: theme.success }}>
                {item.price}
              </Text>
            </View>
          ))}
        </SectionCard>

        {/* 🚨 ALERTS (LAST) */}
        <SectionCard title="Alerts" titleColor={theme.primaryDark}>
          {alerts.map((item, i) => (
            <View key={i} style={styles.alertRow}>
              <View style={[styles.alertDot, { backgroundColor: theme.success }]} />
              <Text style={styles.alertText}>{item}</Text>
            </View>
          ))}
        </SectionCard>

      </ScrollView>
    </View>
  );
}

/* ---------------- DATA ---------------- */

const metrics = [
  { label: "Markets", value: "24", sub: "+3 this week" },
  // { label: "Entries", value: "186", sub: "87% synced" },
  { label: "Commodities", value: "42", sub: "Veg + Fruit" },
  // { label: "Avg Change", value: "+4.2%", sub: "vs yesterday" },
];

const vegetables = [
  {
    name: "Tomato",
    price: "Rs 85/kg",
    lastPrice: "Rs 80/kg",
    change: 3,
  },
  {
    name: "Onion",
    price: "Rs 60/kg",
    lastPrice: "Rs 62/kg",
    change: -1,
  },
];

const fruits = [
  {
    name: "Mango",
    price: "Rs 200/kg",
    lastPrice: "Rs 190/kg",
    change: 5,
  },
  {
    name: "Banana",
    price: "Rs 50/dozen",
    lastPrice: "Rs 52/dozen",
    change: -2,
  },
];

const volume = [
  { name: "Tomato", value: "14.2 t", width: "70%" },
  { name: "Onion", value: "20 t", width: "100%" },
];

const submissions = [
  { agent: "Zafar", market: "Hyderabad", price: "85/kg" },
  { agent: "Nadia", market: "Sukkur", price: "60/kg" },
];

const alerts = [
  "Tomato price increased +12%",
  "Mango sync pending",
  "New market added",
  "Onion prices dropped in Karachi",
];

/* ---------------- STYLES ---------------- */

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceMuted,
    },

    header: {
      backgroundColor: theme.primary,
      paddingTop: 50,
      paddingBottom: 20,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 22,
      borderBottomRightRadius: 22,
      elevation: 5,
    },

    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.textOnPrimary,
    },

    sub: {
      fontSize: 12,
      color: theme.primaryLight,
    },

    timerBox: {
      marginTop: 10,
      backgroundColor: theme.surfaceSoft,
      padding: 10,
      borderRadius: 10,
      alignSelf: "flex-start",
    },

    timerLabel: {
      fontSize: 11,
      color: theme.primaryLight,
    },

    timerValue: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.textOnPrimary,
    },

    scroll: {
      padding: 12,
    },

    metrics: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 12,
    },

    metricBox: {
      width: "48%",
      backgroundColor: theme.surface,
      padding: 12,
      borderRadius: 12,
      marginBottom: 10,
    },

    metricLabel: {
      fontSize: 12,
      color: theme.textMuted,
    },

    metricValue: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.primaryDark,
    },

    metricSub: {
      fontSize: 11,
      color: theme.success,
    },

    smallTimer: {
      fontSize: 10,
      marginTop: 5,
      color: theme.textMuted,
    },

    card: {
      backgroundColor: theme.surface,
      padding: 12,
      borderRadius: 12,
      marginBottom: 12,
    },

    cardTitle: {
      fontWeight: "bold",
      marginBottom: 8,
      color: theme.primaryDark,
    },

    cardTitleGreen: {
      fontWeight: "bold",
      marginBottom: 8,
      color: theme.success,
    },

    percent: {
      fontSize: 12,
      fontWeight: "bold",
      marginLeft: 4,
      color: theme.text,
    },

    changeTag: {
      flexDirection: "row",
      alignItems: "center",
    },

    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },

    upDot: {
      backgroundColor: theme.success,
    },

    downDot: {
      backgroundColor: theme.error,
    },

    upText: {
      color: theme.success,
    },

    downText: {
      color: theme.error,
    },

    nameTag: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 5,
    },

    bold: {
      fontWeight: "bold",
      color: theme.primaryDark,
    },

    barBg: {
      height: 6,
      backgroundColor: theme.border,
      borderRadius: 5,
    },

    barFill: {
      height: 6,
      backgroundColor: theme.success,
      borderRadius: 5,
    },

    tableRow: {
      flexDirection: "row",
      marginBottom: 5,
    },

    /* 🚨 ALERTS */
    alertRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },

    alertDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.success,
      marginRight: 8,
    },

    alertText: {
      fontSize: 12,
      color: theme.text,
    },
    priceRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 8,
      borderBottomWidth: 0.5,
      borderColor: theme.border,
    },

    name: {
      fontSize: 13,
      color: theme.text,
    },

    priceRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },

    price: {
      fontSize: 13,
      fontWeight: "bold",
      color: theme.primaryDark,
    },
  });