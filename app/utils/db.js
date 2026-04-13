import * as SQLite from "expo-sqlite";

// ✅ MODERN EXPO FIX
const db = SQLite.openDatabaseSync("swat.db");

// -------------------- INIT DB --------------------
export const initDB = () => {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      cnic TEXT,
      phone TEXT,
      district TEXT,
      username TEXT,
      password TEXT,
      location TEXT,
      avatar TEXT,
      last_login TEXT
    );
  `);
};

// -------------------- INSERT USER --------------------
export const insertUser = async (
  name,
  cnic,
  phone,
  district,
  username,
  password,
  location,
  avatar
) => {
  await db.runAsync(
    `INSERT INTO users 
    (name, cnic, phone, district, username, password, location, avatar, last_login)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
    [name, cnic, phone, district, username, password, location, avatar]
  );
};

// -------------------- LOGIN --------------------
export const loginUser = async (username, password) => {
  const result = await db.getAllAsync(
    `SELECT * FROM users WHERE username=? AND password=?`,
    [username, password]
  );
  return result;
};

// -------------------- GET USERS --------------------
export const getAllUsers = async () => {
  return await db.getAllAsync(`SELECT * FROM users ORDER BY id DESC`);
};

// -------------------- DELETE --------------------
export const deleteUser = async (id) => {
  await db.runAsync(`DELETE FROM users WHERE id=?`, [id]);
};

// -------------------- UPDATE --------------------
export const updateUser = async (id, name, phone, district) => {
  await db.runAsync(
    `UPDATE users SET name=?, phone=?, district=? WHERE id=?`,
    [name, phone, district, id]
  );
};