// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage, ref } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FIREBASE_API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "caramel-clock-397009.firebaseapp.com",
  databaseURL: "<https://caramel-clock-397009.firebaseio.com>",
  projectId: "caramel-clock-397009",
  storageBucket: "caramel-clock-397009.appspot.com",
  messagingSenderId: "sender-id",
  appId: "1:1025482848026:web:8bdd0c0a3c32af91c7dea3",
  measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
