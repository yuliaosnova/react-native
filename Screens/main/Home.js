import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import PostsScreen from "../../Screens/nested/PostsScreen";
// import CommentsScreen from "../nested/CommentsScreen";
import MapScreen from "../nested/MapScreen";
import CommentsScreen from "../nested/CommentsScreen";

import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign,  Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";


const NestedStack = createStackNavigator();

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <NestedStack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "#FF6C00",
      }}
    >
      <NestedStack.Screen
        options={{
          headerStyle: {
            height: 88,
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
          },
          title: "Публікації",
          headerTitleAlign: "center",
          headerRight: () => (
				<TouchableOpacity onPress={signOut}>
                          <MaterialIcons
              name="logout"
              size={24}
              color="#BDBDBD"
              style={{ marginRight: 10 }}
            />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons name="grid-outline" size={24} color={focused && "#fff"} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />

      <NestedStack.Screen
        options={{
          headerStyle: {
            height: 88,
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
          },
		
          title: "Коментарі",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="arrowleft"
                size={24}
                color="#BDBDBD"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
          tabBarStyle: { display: "none" },
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <NestedStack.Screen
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
        name="Map"
        component={MapScreen}
      />
    </NestedStack.Navigator>
  );
};

export default Home;
