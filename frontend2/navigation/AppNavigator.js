import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import DashboardScreen from './screens/DashboardScreen';
import AdminScreen from './screens/AdminScreen';
import StudentScreen from './screens/StudentScreen';
import LectureManagementScreen from './components/LectureManagementScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Dashboard">
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="AdminScreen" component={AdminScreen} />
                <Stack.Screen name="StudentScreen" component={StudentScreen} />
                <Stack.Screen name="LectureManagement" component={LectureManagementScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
