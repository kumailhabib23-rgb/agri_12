import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

export default function MarketForm() {
  type Entry = { item: string; min: string; max: string };

  const params = useLocalSearchParams<{ name?: string }>();
  const selectedCategoryFromRoute = params.name || "Vegetables";

  const categoryItems: Record<string, string[]> = {
    Vegetables: ["Onion", "Tomato", "Potato", "Carrot", "Ladyfinger", "Chili"],
    Fruits: ["Apple", "Banana", "Mango", "Grapes", "Orange", "Pomegranate"],
    Meat: ["Cow", "Lamb", "Chicken", "Goat", "Buffalo", "Mutton"],
    Grains: ["Rice", "Wheat", "Corn", "Barley", "Millet"],
    Dairy: ["Milk", "Yogurt", "Cheese", "Butter", "Ghee"],
    Poultry: ["Chicken", "Egg", "Duck", "Turkey"],
  };

  // 📍 FULL SINDH DATA
  const marketsData: Record<string, string[]> = {
    "Karachi East": ["Super Highway Sabzi Mandi"],
    "Karachi West": ["Mauripur Cattle & Vegetable Market"],
    "Hyderabad": ["Hyderabad Fruit & Vegetable Market"],
    "Tando Allahyar": ["Tando Allahyar Mandi"],
    "Mirpurkhas": ["Mirpurkhas Fruit & Vegetable Market"],
    "Umerkot": ["Umerkot Grain Market"],
    "Tharparkar (Mithi)": ["Mithi Mandi"],
    "Sanghar": ["Sanghar Grain Market"],
    "Shaheed Benazirabad (Nawabshah)": ["Nawabshah Mandi"],
    "Naushahro Feroze": ["Moro Mandi"],
    "Sukkur": ["Sukkur Grain Market"],
    "Khairpur": ["Khairpur Fruit Market"],
    "Larkana": ["Larkana Vegetable Market"],
    "Shikarpur": ["Shikarpur Grain Market"],
    "Jacobabad": ["Jacobabad Mandi"],
    "Kashmore (Kandhkot)": ["Kandhkot Grain Market"],
    "Ghotki": ["Ghotki Mandi"],
    "Dadu": ["Dadu Grain Market"],
    "Jamshoro": ["Kotri Market"],
    "Badin": ["Badin Mandi"],
    "Thatta": ["Thatta Market"],
    "Sujawal": ["Sujawal Mandi"],
    // "Hyderabad (Additional)": ["Latifabad Vegetable Market"],
    // "Karachi (Additional)": ["Lea Market"],
    // "Sukkur (Additional)": ["Rohri Market"],
    // "Larkana (Additional)": ["Ratodero Mandi"],
    // "Mirpurkhas (Additional)": ["Digri Mandi"],
  };

  const [date, setDate] = useState("");
  const [category, setCategory] = useState<string>(selectedCategoryFromRoute);
  const [district, setDistrict] = useState("Select District");
  const [market, setMarket] = useState("Select Market");

  const [districtOpen, setDistrictOpen] = useState(false);
  const [marketOpen, setMarketOpen] = useState(false);

  useEffect(() => {
    setCategory(selectedCategoryFromRoute);
  }, [selectedCategoryFromRoute]);

  const [entries, setEntries] = useState<Entry[]>([
    { item: "Select Item", min: "", max: "" }
  ]);

  const [modalIndex, setModalIndex] = useState<number | null>(null);

  // 📅 AUTO DATE
  useEffect(() => {
    const d = new Date();
    setDate(`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`);
  }, []);

  // ➕ ADD
  const addEntry = () => {
    setEntries(prev => [...prev, { item: "Select Item", min: "", max: "" }]);
  };

  // ❌ DELETE
  const deleteEntry = (index: number) => {
    setEntries(prev => prev.filter((_, i) => i !== index));
  };

  // ✏️ UPDATE
  const updateEntry = (index: number, key: keyof Entry, value: string) => {
    setEntries(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      )
    );
  };

  // 🧠 UNIQUE ITEMS
  const getAvailableItems = (currentIndex: number) => {
    if (category === "Select Category") return [];

    const selected = entries
      .map((e, i) => (i !== currentIndex ? e.item : null))
      .filter((item): item is string => item !== null && item !== "Select Item");

    const available = categoryItems[category] || [];
    return available.filter(item => !selected.includes(item));
  };

  // 💾 SAVE
  const saveData = () => {

    if (district === "Select District") {
      Alert.alert("Error", "Select district");
      return;
    }

    if (market === "Select Market") {
      Alert.alert("Error", "Select market");
      return;
    }

    const valid = entries.filter(
      e => e.item !== "Select Item" && e.min && e.max
    );

    if (valid.length === 0) {
      Alert.alert("Error", "Fill at least one entry");
      return;
    }

    console.log({ date, district, market, entries: valid });
    Alert.alert("Success", "Data Saved Successfully!");
  };

  return (
    <View style={styles.container}>
      <ScrollView>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Agriculture Market System</Text>
        </View>

        <View style={styles.card}>

          <Text style={styles.date}>Date: {date}</Text>

          <Text style={styles.label}>Category</Text>
          <View style={styles.dropdown}>
            <Text>{category}</Text>
          </View>

          {/* DISTRICT */}
          <Text style={styles.label}>District</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => setDistrictOpen(true)}>
            <Text>{district}</Text>
            <Ionicons name="chevron-down" size={16} />
          </TouchableOpacity>

          {/* MARKET */}
          <Text style={styles.label}>Market</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => {
              if (district === "Select District") {
                Alert.alert("Select district first");
              } else {
                setMarketOpen(true);
              }
            }}
          >
            <Text>{market}</Text>
            <Ionicons name="chevron-down" size={16} />
          </TouchableOpacity>

          {/* ENTRIES */}
          <Text style={styles.section}>Entries</Text>

          {entries.map((entry, index) => (
            <View key={index} style={styles.row}>

              <TouchableOpacity
                style={styles.itemDropdown}
                onPress={() => setModalIndex(index)}
              >
                <Text>{entry.item}</Text>
                <Ionicons name="chevron-down" size={14} />
              </TouchableOpacity>

              <TextInput
                placeholder="Min"
                value={entry.min}
                onChangeText={(v) => updateEntry(index, "min", v)}
                keyboardType="numeric"
                style={styles.box}
              />

              <TextInput
                placeholder="Max"
                value={entry.max}
                onChangeText={(v) => updateEntry(index, "max", v)}
                keyboardType="numeric"
                style={styles.box}
              />

              <TouchableOpacity onPress={() => deleteEntry(index)}>
                <Ionicons name="trash" size={18} color="red" />
              </TouchableOpacity>

            </View>
          ))}

          <TouchableOpacity style={styles.addBtn} onPress={addEntry}>
            <Text style={styles.btnText}>+ Add Entry</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn} onPress={saveData}>
            <Text style={styles.saveText}>Save Data</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* DISTRICT MODAL */}
      <Modal visible={districtOpen} transparent>
        <TouchableOpacity style={styles.modalBg} onPress={() => setDistrictOpen(false)}>
          <View style={styles.modalBox}>
            <ScrollView style={styles.modalScroll} nestedScrollEnabled>
              {Object.keys(marketsData).map((d, i) => (
                <TouchableOpacity key={i} style={styles.option}
                  onPress={() => {
                    setDistrict(d);
                    setMarket("Select Market");
                    setDistrictOpen(false);
                  }}>
                  <Text>{d}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* MARKET MODAL */}
      <Modal visible={marketOpen} transparent>
        <TouchableOpacity style={styles.modalBg} onPress={() => setMarketOpen(false)}>
          <View style={styles.modalBox}>
            <ScrollView style={styles.modalScroll} nestedScrollEnabled>
              {(marketsData[district] || []).map((m, i) => (
                <TouchableOpacity key={i} style={styles.option}
                  onPress={() => {
                    setMarket(m);
                    setMarketOpen(false);
                  }}>
                  <Text>{m}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ITEM MODAL */}
      <Modal visible={modalIndex !== null} transparent>
        <TouchableOpacity style={styles.modalBg} onPress={() => setModalIndex(null)}>
          <View style={styles.modalBox}>
            <ScrollView style={styles.modalScroll} nestedScrollEnabled>
              {modalIndex !== null &&
                getAvailableItems(modalIndex).map((item, i) => (
                  <TouchableOpacity key={i} style={styles.option}
                    onPress={() => {
                      updateEntry(modalIndex, "item", item);
                      setModalIndex(null);
                    }}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef6ee",
  },
  header: {
    backgroundColor: "#1b5e20",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    margin: 15,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
  },
  date: {
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginTop: 5,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e8f5e9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  section: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemDropdown: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e8f5e9",
    padding: 8,
    borderRadius: 8,
    marginRight: 5,
  },
  box: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginRight: 5,
    padding: 8,
    borderRadius: 8,
  },
  addBtn: {
    backgroundColor: "#2e7d32",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
  },
  saveBtn: {
    backgroundColor: "#1b5e20",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 15,
    padding: 10,
    maxHeight: "70%",
  },
  modalScroll: {
    maxHeight: 320,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});