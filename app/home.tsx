import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveFarmer = async (data: any) => {
  const old = await AsyncStorage.getItem("farmers");
  let list = old ? JSON.parse(old) : [];

  list.push(data);

  await AsyncStorage.setItem("farmers", JSON.stringify(list));
};

export const getFarmers = async () => {
  const data = await AsyncStorage.getItem("farmers");
  return data ? JSON.parse(data) : [];
};