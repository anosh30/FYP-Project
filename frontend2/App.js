import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import DashboardScreen from "./screens/DashboardScreen";
import LectureManagementScreen from "./components/LectureManagementScreen";
import AdminScreen from "./screens/AdminScreen";
import StudentScreen from "./screens/StudentScreen";
import StudentTimetableForm from "./components/StudentTimetableForm";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen
          name="LectureManagement"
          component={LectureManagementScreen}
        />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
        <Stack.Screen name="StudentScreen" component={StudentScreen} />
        <Stack.Screen
          name="StudentTimetableForm"
          component={StudentTimetableForm}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
