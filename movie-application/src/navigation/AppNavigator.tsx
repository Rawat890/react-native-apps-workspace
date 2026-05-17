import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DetailView from '../screens/DetailView';
import { SCREENS } from '../utils/routes';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
 return (
   <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={SCREENS.BottomTabs} component={BottomTabNavigator} />
    <Stack.Screen name={SCREENS.DetailView} component={DetailView} />
   </Stack.Navigator>
 )
}

export default AppNavigator