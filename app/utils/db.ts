import { openDatabaseAsync } from "expo-sqlite";
import type { SQLiteDatabase } from "expo-sqlite";

export interface User {
  id: number;
  name: string;
  cnic: string;
  phone: string;
  district: string;
  username: string;
  password?: string;
  location?: string;
  avatar?: string;
  last_login?: string | null;
}

let db: SQLiteDatabase | null = null;

export const initDB = async (): Promise<void> => {
  if (db) return;

  db = await openDatabaseAsync("farmers.db");

  await db.execAsync(`
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

export const insertUser = async (
  name: string,
  cnic: string,
  phone: string,
  district: string,
  username: string,
  password: string,
  location: string,
  avatar: string
): Promise<boolean> => {
  if (!db) throw new Error("Database not initialized");

  await db.runAsync(
    `INSERT INTO users (name, cnic, phone, district, username, password, location, avatar)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, cnic, phone, district, username, password, location, avatar]
  );
  return true;
};

export const getUsers = async (): Promise<User[]> => {
  if (!db) throw new Error("Database not initialized");
  return await db.getAllAsync<User>(`SELECT * FROM users`);
};

export const loginUser = async (
  username: string,
  password: string
): Promise<User[]> => {
  if (!db) throw new Error("Database not initialized");
  return await db.getAllAsync<User>(
    `SELECT * FROM users WHERE username = ? AND password = ?`,
    [username, password]
  );
};

export const deleteUser = async (id: number) => {
  if (!db) throw new Error("Database not initialized");
  await db.runAsync(`DELETE FROM users WHERE id = ?`, [id]);
};

export const updateUser = async (
  id: number,
  name: string,
  phone: string,
  district: string
): Promise<void> => {
  if (!db) throw new Error("Database not initialized");
  await db.runAsync(
    `UPDATE users SET name = ?, phone = ?, district = ? WHERE id = ?`,
    [name, phone, district, id]
  );
};

export const searchUser = async (text: string) => {
  if (!db) throw new Error("Database not initialized");
  return await db.getAllAsync<Partial<User>>(
    `SELECT * FROM users WHERE name LIKE ? OR username LIKE ?`,
    [`%${text}%`, `%${text}%`]
  );
};

export const getUser = async (
  username: string | string[] | undefined
): Promise<User[]> => {
  if (!db) throw new Error("Database not initialized");
  const normalizedUsername = Array.isArray(username) ? username[0] : username;
  if (!normalizedUsername) return [];
  return await db.getAllAsync<User>(
    `SELECT * FROM users WHERE username = ?`,
    [normalizedUsername]
  );
};