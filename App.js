/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './app/Screens/Home';
import Register from './app/Screens/Register';
import FirstScreen from './app/Screens/FirstScreen';
import PasswordChange from './app/Screens/PasswordChange';
import BottomTabNavigator from './app/Screens/BottomTabNavigator';
import TopTabNavigator from './app/Screens/TopTabNavigator';

import {Provider} from 'react-redux';
import store from './Store';

console.disableYellowBox = true;

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator header={null} headerMode="none">
            <Stack.Screen name="FirstScreen" component={FirstScreen} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="PasswordChange" component={PasswordChange} />
            <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
            <Stack.Screen name="TopTabNavigator" component={TopTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
