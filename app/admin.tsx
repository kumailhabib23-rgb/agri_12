import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import { getUsers, deleteUser, updateUser, initDB, type User } from "./utils/db";
import { Ionicons } from "@expo/vector-icons";

export default function Admin() {

  const [users, setUsers] = useState<User[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    initDB();
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    Alert.alert("Deleted");
    loadUsers();
  };

  const startEdit = (item: User) => {
    setEditId(item.id);
    setName(item.name);
    setPhone(item.phone);
    setDistrict(item.district);
  };

  const saveEdit = async () => {
    if (editId === null) return;
    await updateUser(editId, name, phone, district);
    setEditId(null);
    setName("");
    setPhone("");
    setDistrict("");
    loadUsers();
  };

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.card}>

      <Ionicons name="person-circle" size={32} color="#2e7d32" />

      <View style={{ flex: 1, marginLeft: 10 }}>

        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.text}>@{item.username}</Text>
        <Text style={styles.text}>📍 {item.location}</Text>

        <View style={styles.row}>

          <TouchableOpacity style={styles.edit} onPress={() => startEdit(item)}>
            <Text style={styles.btn}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.del} onPress={() => handleDelete(item.id)}>
            <Text style={styles.btn}>Delete</Text>
          </TouchableOpacity>

        </View>

      </View>

    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Admin Panel</Text>

      {editId && (
        <View style={styles.editBox}>
          <TextInput value={name} onChangeText={setName} style={styles.input} />
          <TextInput value={phone} onChangeText={setPhone} style={styles.input} />
          <TextInput value={district} onChangeText={setDistrict} style={styles.input} />

          <TouchableOpacity style={styles.save} onPress={saveEdit}>
            <Text style={{ color: "#fff" }}>Save</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList data={users} renderItem={renderItem} keyExtractor={(i) => i.id.toString()} />

    </View>
  );
}

const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: "#eef7ee" },

  header: {
    backgroundColor: "#2e7d32",
    color: "#fff",
    padding: 15,
    fontSize: 18,
    fontWeight: "bold",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 10,
    padding: 12,
    borderRadius: 10,
  },

  name: { fontWeight: "bold" },
  text: { fontSize: 12, color: "#555" },

  row: { flexDirection: "row", marginTop: 8 },

  edit: { backgroundColor: "#1976d2", padding: 5, marginRight: 5, borderRadius: 5 },
  del: { backgroundColor: "#d32f2f", padding: 5, borderRadius: 5 },

  btn: { color: "#fff", fontSize: 12 },

  editBox: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },

  input: {
    backgroundColor: "#f2f2f2",
    padding: 8,
    marginBottom: 6,
    borderRadius: 6,
  },

  save: {
    backgroundColor: "#2e7d32",
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
  },

});