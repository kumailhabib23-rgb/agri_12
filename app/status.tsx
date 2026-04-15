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
import Footer from "./components/footer";

const screenWidth = Dimensions.get("window").width;

export default function App() {

  /* ---------------- LIVE GRAPH ---------------- */
  const [chartData, setChartData] = useState([72, 74, 73, 78, 80, 77, 85]);

  /* ---------------- COUNTDOWN ---------------- */
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* 🌿 HEADER */}
      <Animated.View style={[styles.header, { opacity: headerAnim }]}>
        <Text style={styles.title}>AMIS Dashboard</Text>
        <Text style={styles.sub}>Agriculture Marketing System</Text>

        <View style={styles.timerBox}>
          <Text style={styles.timerLabel}>Next Update</Text>
          <Text style={styles.timerValue}>{formatTime(timeLeft)}</Text>
        </View>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* METRICS */}
        <View style={styles.metrics}>
          {metrics.map((item, i) => (
            <View key={i} style={styles.metricBox}>
              <Text style={styles.metricLabel}>{item.label}</Text>
              <Text style={styles.metricValue}>{item.value}</Text>
              <Text style={styles.metricSub}>{item.sub}</Text>

              <Text style={styles.smallTimer}>
                ⏳ {formatTime(timeLeft)}
              </Text>
            </View>
          ))}
        </View>

        {/* 🥦 NEW CARD - VEGETABLE PRICES */}
        <View style={styles.card}>
          <Text style={styles.cardTitleGreen}>Today Vegetables</Text>

          {vegetables.map((item, i) => (
            <View key={i} style={styles.priceRow}>
              <Text style={styles.name}>{item.name}</Text>

              <View style={styles.priceRight}>
                <Text style={styles.price}>{item.price}</Text>

                <View style={styles.changeTag}>
                  <View
                    style={[
                      styles.dot,
                      item.change >= 0 ? styles.upDot : styles.downDot,
                    ]}
                  />
                  <Text
                    style={[
                      styles.percent,
                      item.change >= 0 ? styles.upText : styles.downText,
                    ]}
                  >
                    {item.change >= 0 ? "+" : ""}
                    {item.change}%
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* 🍎 NEW CARD - FRUITS PRICES */}
        <View style={styles.card}>
          <Text style={styles.cardTitleGreen}>Today Fruits</Text>

          {fruits.map((item, i) => (
            <View key={i} style={styles.priceRow}>
              <Text style={styles.name}>{item.name}</Text>

              <View style={styles.priceRight}>
                <Text style={styles.price}>{item.price}</Text>

                <View style={styles.changeTag}>
                  <View
                    style={[
                      styles.dot,
                      item.change >= 0 ? styles.upDot : styles.downDot,
                    ]}
                  />
                  <Text
                    style={[
                      styles.percent,
                      item.change >= 0 ? styles.upText : styles.downText,
                    ]}
                  >
                    {item.change >= 0 ? "+" : ""}
                    {item.change}%
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>


    

        {/* VOLUME */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Volume (tonnes)</Text>
          {volume.map((item, i) => (
            <View key={i} style={{ marginBottom: 8 }}>
              <View style={styles.row}>
                <Text>{item.name}</Text>
                <Text style={styles.bold}>{item.value}</Text>
              </View>
              <View style={styles.barBg}>
                <View style={[styles.barFill, { width: item.width as any }]} />
              </View>
            </View>
          ))}
        </View>

        {/* LIVE GRAPH */}
        <View style={styles.card}>
          <Text style={styles.cardTitleGreen}>Live Tomato Price Trend</Text>

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
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 1,
              color: (o = 1) => `rgba(22,163,74,${o})`,
              labelColor: (o = 1) => `rgba(0,0,0,${o})`,
            }}
            style={{ borderRadius: 16 }}
          />
        </View>

        {/* FIELD TABLE */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Field Submissions</Text>
          {submissions.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={{ flex: 1 }}>{item.agent}</Text>
              <Text style={{ flex: 1 }}>{item.market}</Text>
              <Text style={{ flex: 1, fontWeight: "bold", color: "#16a34a" }}>
                {item.price}
              </Text>
            </View>
          ))}
        </View>

        {/* 🚨 ALERTS (LAST) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Alerts</Text>

          {alerts.map((item, i) => (
            <View key={i} style={styles.alertRow}>
              <View style={styles.alertDot} />
              <Text style={styles.alertText}>{item}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
      <Footer />
    </View>
  );
}

/* ---------------- DATA ---------------- */

const metrics = [
  { label: "Markets", value: "24", sub: "+3 this week" },
  { label: "Entries", value: "186", sub: "87% synced" },
  { label: "Commodities", value: "42", sub: "Veg + Fruit" },
  { label: "Avg Change", value: "+4.2%", sub: "vs yesterday" },
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },

  header: {
    backgroundColor: "#166534",
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
    color: "#fff",
  },

  sub: {
    fontSize: 12,
    color: "#d1fae5",
  },

  timerBox: {
    marginTop: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  timerLabel: {
    fontSize: 11,
    color: "#d1fae5",
  },

  timerValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
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
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  metricLabel: {
    fontSize: 12,
    color: "#6b7280",
  },

  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#14532d",
  },

  metricSub: {
    fontSize: 11,
    color: "#16a34a",
  },

  smallTimer: {
    fontSize: 10,
    marginTop: 5,
    color: "#6b7280",
  },

  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },

  cardTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#14532d",
  },

  cardTitleGreen: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#16a34a",
  },

  percent: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
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
    backgroundColor: "#16a34a",
  },

  downDot: {
    backgroundColor: "#dc2626",
  },

  upText: {
    color: "#16a34a",
  },

  downText: {
    color: "#dc2626",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },

  bold: {
    fontWeight: "bold",
    color: "#14532d",
  },

  barBg: {
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 5,
  },

  barFill: {
    height: 6,
    backgroundColor: "#16a34a",
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
    backgroundColor: "#16a34a",
    marginRight: 8,
  },

  alertText: {
    fontSize: 12,
    color: "#374151",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },

  name: {
    fontSize: 13,
    color: "#111",
  },

  priceRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  price: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#14532d",
  },

});