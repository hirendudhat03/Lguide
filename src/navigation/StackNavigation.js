import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {authRoute, AppRoute} from './Routes';

export const Auth = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {authRoute.map((routes) => {
        return (
          <Stack.Screen
            name={routes.name}
            component={routes.component}
            key={routes.name}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export const AppStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator 
    initialRouteName = 'Home'
    >
      {AppRoute.map((routes) => {
        let headerShow = false;
        let headerTitle = '';
        switch (routes.name) {
          case 'AddReport':
            headerShow = true;
            headerTitle = 'Add a new Report';
            break;
          case 'Direction':
            headerShow = true;
            headerTitle = 'Directions';
            break;
          case 'Notification':
            headerShow = true;
            headerTitle = 'Notifications';
            break;
          case 'LocationAutoComplete':
            headerShow = true;
            headerTitle = 'Select Location';
            break;
          default:
            break;
        }

        return (
          <Stack.Screen
            name={routes.name}
            component={routes.component}
            options={{
              
              headerShown: headerShow,
              title: headerTitle,
              headerTitleAlign: 'center',
              headerStyle: {
                elevation: 0,
                backgroundColor: '#fff',
              },
            }}
            key={routes.name}
          />
        );
      })}
    </Stack.Navigator>
  );
};
