import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Download from '../screens/Download';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Upcoming from '../screens/Upcoming';
import { SCREENS } from '../utils/routes';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
 return (
  <Tab.Navigator screenOptions={({ route }) => ({
   tabBarActiveTintColor: 'black',
   tabBarInactiveTintColor: 'gray',
   tabBarStyle: styles.tabBar,

   tabBarIcon: ({ color, size }) => {

    let name = 'home'
    if (route.name === 'Home') {

     name = 'home-outline'
    } if (route.name === 'Upcoming') {
     name = 'calendar-outline'
    } if (route.name === 'Search') {
     name = 'search-outline'
    } if (route.name === 'Downloads') {
     name = 'download-outline'
    }

    return <Ionicons name={name as any} size={size} color={color} />;;
   },



   headerShown: false,
  })}>
   <Tab.Screen name={SCREENS.Home} component={Home} />
   <Tab.Screen name={SCREENS.Upcoming} component={Upcoming} />
   <Tab.Screen name={SCREENS.Search} component={Search} />
   <Tab.Screen name={SCREENS.Download} component={Download} />
  </Tab.Navigator>
 );
}

const styles = StyleSheet.create({
 tabBar: {
  backgroundColor: 'white',
  borderTopWidth: 0,
 },
});

export default BottomTabNavigator