import "react-native-gesture-handler";

import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";

export default function App() {
  // const [isReady, setIsReady] = useState(false);

  // if (!isReady) {
  // 	return (
  // 		<AppLoading startAsync={loadApplication}
  // 		onFinish={() => setIsReady(true)}
  // 		onError={console.warn}
  // 		/>
  // 	);
  // }

  // return <NavigationContainer>{routing}</NavigationContainer>

  const routing = useRoute({});

  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}