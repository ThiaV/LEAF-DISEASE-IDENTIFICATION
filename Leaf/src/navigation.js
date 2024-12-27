import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Pressable, Text, StyleSheet, View } from "react-native";

import {
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";

import HomeScreen from "./screen/home";
import GenScreen from "./screen/gen";
import DetailGenScreen from "./screen/detailgen";
import Search from "./screen/search";
import GenFilterScreen from "./screen/genfilter";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Bottom() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Navigation = () => {
  // const navigation = useNavigation();
  return (
    <NavigationContainer style={{ backgroundColor: "white" }}>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: "white" } }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Gen"
          component={GenScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GenFilter"
          component={GenFilterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailGen"
          component={DetailGenScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
  },
  navigationButton: {
    alignItems: "center",
  },
  buttonText: {
    fontSize: 12,
  },
});
export default Navigation;
