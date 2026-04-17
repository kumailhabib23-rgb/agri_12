import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Network from "expo-network";

const STORAGE_KEY = "login_logs";

export const saveLoginLog = async (district: string) => {
  try {
    const logs = await getLogs();

    const log = {
      id: Date.now().toString(),
      deviceName: Device.modelName || "Unknown Device",
      os: Device.osName || "Unknown OS",
      ipAddress: (await Network.getIpAddressAsync()) || "Unknown IP",
      district,
      loginTime: new Date().toLocaleString(),
      logoutTime: null,
    };

    const updatedLogs = [...logs, log];

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedLogs)
    );

    return log.id;
  } catch (error) {
    console.log("Login save error:", error);
  }
};

export const saveLogoutTime = async (id: string) => {
  try {
    const logs = await getLogs();

    const updatedLogs = logs.map((item: any) =>
      item.id === id
        ? {
            ...item,
            logoutTime: new Date().toLocaleString(),
          }
        : item
    );

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedLogs)
    );
  } catch (error) {
    console.log("Logout save error:", error);
  }
};

export const getLogs = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};