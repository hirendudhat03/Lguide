import React from 'react';
import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AppRoute} from './Routes';
import SideBar from './SideBar';
import {AppStack} from './StackNavigation';

export default function DrawerNavigation() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator  screenOptions={{
      headerShown: false
    }} openByDefault = {false} drawerContent = {props => <SideBar {...props} />} initialRouteName="Home">
      {/* <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
      {/* {AppRoute.map((routes) => { */}
        {/* return ( */}
          <Drawer.Screen
            name={"AppStack"}
            component={AppStack}
            // key={routes.name}
          />
        {/* ); */}
      {/* })} */}
    </Drawer.Navigator>
  );
}
