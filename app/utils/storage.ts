import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveFarmer = async (data: any) => {
  const old = await AsyncStorage.getItem("farmers");
  let list = old ? JSON.parse(old) : [];

  const index = list.findIndex((f: any) => f.username === data.username);

  if (index !== -1) {
    list[index] = {
      ...data,
      updatedAt: new Date().toLocaleString(),
      createdAt: list[index].createdAt,
    };
  } else {
    list.push({
      ...data,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    });
  }

  await AsyncStorage.setItem("farmers", JSON.stringify(list));
};

export const getFarmers = async () => {
  const data = await AsyncStorage.getItem("farmers");
  return data ? JSON.parse(data) : [];
};

export const getFarmerByUsername = async (username: string) => {
  const farmers = await getFarmers();
  return farmers.find((f: any) => f.username === username);
};