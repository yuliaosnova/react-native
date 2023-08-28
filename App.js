import "react-native-gesture-handler";

import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import { Provider } from "react-redux";

import { useRoute } from "./router";
import store from "./redux/store";
import { useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Text } from "react-native";

export default function App() {
//   const [isReady, setIsReady] = useState(false);
  const routing = useRoute(false);

  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

//   if (!isReady) {
//     return (
//       <AppLoading
//         startAsync={loadApplication}
//         onFinish={() => setIsReady(true)}
//         onError={console.warn}
//       />
//     );
//   }

  return (
    <Provider store={store.store}>
      <PersistGate
        loading={<Text>Loading...</Text>}
        persistor={store.persistor}
      >
        <NavigationContainer>{routing}</NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
