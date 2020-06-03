import React, {Component} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {StyleSheet, SafeAreaView} from 'react-native';
import Info from './Info';
import Notifications from './Notifications';
import Profile from './Profile';
import PrincipalScreen1 from './PrincipalScreen';

import {
  Dash,
  InfoIcon,
  Noti,
  ProfileIcon,
  DarkDash,
  DarkInfo,
  DarkNoti,
  DarkProfile,
} from '../Assets/Svg/BottomMenu/index';
const Tab = createMaterialBottomTabNavigator();

export default class BottomTabNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Tab.Navigator
          initialRouteName="Dashboard"
          shifting={true}
          showIcon={true}
          headerMode="none"
          activeColor="#B8BABF"
          inactiveColor="#000000"
          barStyle={{backgroundColor: 'white', height: 60}}>
          <Tab.Screen
            moreOptions={this.props}
            name="Dashboard"
            component={PrincipalScreen1}
            listeners={({navigation, route}) => ({
              tabPress: e => {
                e.preventDefault();
                navigation.navigate('Dashboard');
              },
            })}
            options={{
              tabBarLabel: 'Dashboard',
              tabBarIcon: ({focused, tintColor}) => {
                const iconName = focused ? (
                  <DarkDash style={styles.icon} />
                ) : (
                  <Dash style={styles.icon} />
                );
                return iconName;
              },
            }}
          />
          <Tab.Screen
            name="Notifications"
            component={Notifications}
            options={{
              tabBarLabel: 'Notificaciones',
              tabBarIcon: ({focused, tintColor}) => {
                const iconName = focused ? (
                  <DarkNoti style={styles.icon} />
                ) : (
                  <Noti style={styles.icon} />
                );
                return iconName;
              },
            }}
          />
          <Tab.Screen
            name="Information"
            component={Info}
            options={{
              tabBarLabel: 'Informacion',
              tabBarIcon: ({focused, tintColor}) => {
                const iconName = focused ? (
                  <DarkInfo style={styles.icon} />
                ) : (
                  <InfoIcon style={styles.icon} />
                );
                return iconName;
              },
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Perfil',
              tabBarIcon: ({focused, tintColor}) => {
                const iconName = focused ? (
                  <DarkProfile style={styles.icon} />
                ) : (
                  <ProfileIcon style={styles.icon} />
                );
                return iconName;
              },
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
});
