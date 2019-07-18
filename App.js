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
  createBottomTabNavigator
} from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { StyleSheet } from "react-native";
import Info from "./app/Screens/Info";
import Notifications from "./app/Screens/Notifications";
import Profile from "./app/Screens/Profile";
import Home from "./app/Screens/Home";
import Register from "./app/Screens/Register";

import Charts from "./app/Screens/Charts";
import Costs from "./app/Screens/Costs";
import NetworkC from "./app/Screens/NetworkC";
import Record from "./app/Screens/Record";
import CarbonF from "./app/Screens/CarbonF";
import Generation from "./app/Screens/Generation";
import PrincipalScreen from "./app/Screens/PrincipalScreen";

import InfoSvg from "./app/Assets/Svg/Info.svg";
import ProfileSvg from "./app/Assets/Svg/Perfil.svg";
import NotificationSvg from "./app/Assets/Svg/Noti.svg";
import DashSvg from "./app/Assets/Svg/Dash.svg";

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24
  }
});

const PrincipalScreen1 = createStackNavigator({
  PrincipalScreen: PrincipalScreen,
  Charts: Charts,
  Costs: Costs,
  NetworkC: NetworkC,
  Record: Record,
  CarbonF: CarbonF,
  Generation: Generation
});

const BottomNavigation = createMaterialBottomTabNavigator(
  {
    Dashboard: {
      screen: PrincipalScreen1,
      navigationOptions: {
        tabBarLabel: "Dashboard",
        tabBarIcon: ({ tintColor }) => <DashSvg style={styles.icon} />
      }
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: {
        tabBarLabel: "Notificaciones",
        tabBarIcon: ({ tintColor }) => <NotificationSvg style={styles.icon} />
      }
    },
    Information: {
      screen: Info,
      navigationOptions: {
        tabBarLabel: "Informacion",
        tabBarIcon: ({ tintColor }) => <InfoSvg style={styles.icon} />
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Perfil",
        tabBarIcon: ({ tintColor }) => <ProfileSvg style={styles.icon} />
      }
    }
  },
  {
    initialRouteName: "Dashboard",
    shifting: true,
    showIcon: true,
    headerMode: "none",
    activeColor: "#B8BABF",
    inactiveColor: "#000000",
    barStyle: { backgroundColor: "white" },
    lazy: false
  }
);
const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Register: Register,
    BottomTab: BottomNavigation
  },
  {
    header: null,
    headerMode: "none"
  }
);

export default createAppContainer(AppNavigator);
