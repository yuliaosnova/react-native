import "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { Text } from "react-native";

import store from "./redux/store";
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
