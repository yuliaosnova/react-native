import "react-native-gesture-handler";

import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import { Provider } from "react-redux";

import { useRoute } from "./router";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Text } from "react-native";
import { Maine } from "./components/Maine";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store.store}>
      <PersistGate
        loading={<Text>Loading...</Text>}
        persistor={store.persistor}
      >
        <Maine />
      </PersistGate>
    </Provider>
  );
}
