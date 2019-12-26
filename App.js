/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  StackActions,
  NavigationActions
} from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { StyleSheet } from "react-native";
import Info from "./app/Screens/Info";
import Notifications from "./app/Screens/Notifications";
import Profile from "./app/Screens/Profile";
import Home from "./app/Screens/Home";
import Register from "./app/Screens/Register";
import FirstScreen from "./app/Screens/FirstScreen";
import PasswordChange from "./app/Screens/PasswordChange";

import Charts from "./app/Screens/Charts";
import Costs from "./app/Screens/Costs";
import NetworkC from "./app/Screens/NetworkC";
import Record from "./app/Screens/Record";
import CarbonF from "./app/Screens/CarbonF";
import Generation from "./app/Screens/Generation";
import PrincipalScreen from "./app/Screens/PrincipalScreen";
import SADashboard from "./app/Screens/SADashboard";

import InfoSvg from "./app/Assets/Svg/Info.svg";
import ProfileSvg from "./app/Assets/Svg/Perfil.svg";
import NotificationSvg from "./app/Assets/Svg/Noti.svg";
import DashSvg from "./app/Assets/Svg/Dash.svg";

import DashSelect from "./app/Assets/Svg/dashS.svg";
import ProfileSelect from "./app/Assets/Svg/perfilS.svg";
import NotiSelect from "./app/Assets/Svg/notiS.svg";
import InfoSelect from "./app/Assets/Svg/infoS.svg";

import { Provider } from "react-redux";
import store from "./Store";

console.disableYellowBox = true;

const navigateAction = NavigationActions.navigate({
  routeName: "Dashboard",

  params: {},

  action: NavigationActions.navigate({ routeName: "Dashboard" })
});

export default class App extends Component {
  render() {
    const BottomNavigation = createMaterialBottomTabNavigator(
      {
        Dashboard: {
          screen: PrincipalScreen,
          navigationOptions: {
            tabBarLabel: "Dashboard",
            tabBarIcon: ({ focused, tintColor }) => {
              const iconName = focused ? (
                <DashSelect style={styles.icon} />
              ) : (
                <DashSvg style={styles.icon} />
              );
              return iconName;
            },
            tabBarOnPress: ({ navigation }) => {
              navigation.dispatch(navigateAction);
            }
          }
        },
        Notifications: {
          screen: Notifications,
          navigationOptions: {
            tabBarLabel: "Notificaciones",
            tabBarIcon: ({ focused, tintColor }) => {
              const iconName = focused ? (
                <NotiSelect style={styles.icon} />
              ) : (
                <NotificationSvg style={styles.icon} />
              );
              return iconName;
            }
          }
        },
        Information: {
          screen: Info,
          navigationOptions: {
            tabBarLabel: "Informacion",
            tabBarIcon: ({ focused, tintColor }) => {
              const iconName = focused ? (
                <InfoSelect style={styles.icon} />
              ) : (
                <InfoSvg style={styles.icon} />
              );
              return iconName;
            }
          }
        },
        Profile: {
          screen: Profile,
          navigationOptions: {
            tabBarLabel: "Perfil",
            tabBarIcon: ({ focused, tintColor }) => {
              const iconName = focused ? (
                <ProfileSelect style={styles.icon} />
              ) : (
                <ProfileSvg style={styles.icon} />
              );
              return iconName;
            }
          }
        }
      },
      {
        initialRouteName: "Dashboard",
        // backBehavior: "order",
        shifting: true,
        showIcon: true,
        headerMode: "none",
        activeColor: "#B8BABF",
        inactiveColor: "#000000",
        barStyle: { backgroundColor: "white" }
      }
    );
    const AppNavigator = createAppContainer(
      createStackNavigator(
        {
          FirstScreen: FirstScreen,
          Home: Home,
          Register: Register,
          PasswordChange: PasswordChange,
          BottomTab: BottomNavigation
        },
        {
          header: null,
          headerMode: "none"
        }
      )
    );

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24
  }
});
