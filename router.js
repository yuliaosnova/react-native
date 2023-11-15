import "react-native-gesture-handler";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import CreatePostsScreen from "./Screens/main/CreatePostsScreen";
import ProfileScreen from "./Screens/main/ProfileScreen";
import Home from "./Screens/main/Home";
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";


const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator screenOptions={{
		tabBarShowLabel: false,
		tabBarActiveBackgroundColor: "#FF6C00",
	 }}>
      <MainTab.Screen options={{
		headerShown: false,
		tabBarIcon: ({focused}) => (<Ionicons name="grid-outline" size={24} color={focused && "#fff"} />),
	 }} name="Home" component={Home}/>
      <MainTab.Screen options={{
			headerStyle: { 
				height: 88,
				borderBottomWidth: 1,
				borderBottomColor: "rgba(0, 0, 0, 0.3)"
			},
			title: "Створити публікацію",
			headerTitleAlign: 'center',
			headerLeft: () => (
				<TouchableOpacity><AntDesign name="arrowleft" size={24} color="#BDBDBD" style={{marginLeft: 10}} /></TouchableOpacity>
			 ),	
		tabBarIcon: ({focused}) => <AntDesign name="pluscircleo" size={24} color={focused && "#fff"} />
	 }} name="Create"  component={CreatePostsScreen}/>
      <MainTab.Screen options={{	
		headerShown: false,
		tabBarIcon: ({focused}) => <Ionicons name="ios-person-outline" size={24} color={focused && "#fff"} />
	 }} name="Profile" component={ProfileScreen}/>
    </MainTab.Navigator>
  );
};
