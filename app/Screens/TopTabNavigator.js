import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

import Charts from './Charts';
import Costs from './Costs';
import NetworkC from './NetworkC';
import Record from './Record';
import CarbonF from './CarbonF';
import Generation from './Generation';
import Efficiency from './Efficiency';
import Role2Dashboard from './Role2Dashboard';

import {
  ChartIcon,
  PriceIcon,
  CodeIcon,
  ClockIcon,
  CO2Icon,
  PanelIcon,
  EffIcon,
  Dash,
  DarkChart,
  DarkClock,
  DarkCO2,
  DarkPanel,
  DarkPrice,
  DarkEff,
  DarkCode,
  DarkDash,
} from '../Assets/Svg/Menu/index';

export default class TopTabNavigator extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
  }
  static navigationOptions = {
    header: null,
  };
  UNSAFE_componentWillMount() {
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      if (value !== null) {
        this.setState(
          {
            values: JSON.parse(value),
          },
          () => {
            console.log(this.state.values);
          },
        );
      }
    } catch (error) {}
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Tab.Navigator
          initialRouteName={this.props.route.params.screen}
          swipeEnabled={false}
          lazy={true}
          tabBarOptions={{
            activeColor: '#B8BABF',
            inactiveColor: '#000000',
            showIcon: true,
            showLabel: false,
            labelStyle: {fontSize: 9, textTransform: 'capitalize'},
            style: {
              backgroundColor: 'white',
              justifyContent: 'center',
            },
            indicatorStyle: {backgroundColor: 'white'},
          }}>
          <Tab.Screen
            name="Back"
            component={Role2Dashboard}
            listeners={({navigation, route}) => ({
              tabPress: e => {
                // Prevent default action
                e.preventDefault();

                // Do something with the `navigation` object
                navigation.navigate(
                  this.state.values.role_id == 1
                    ? 'Role2Dashboard'
                    : 'PrincipalScreen',
                );
              },
            })}
            options={{
              tabBarLabel: 'Back',
              tabBarIcon: ({focused, tintColor}) => {
                const iconName = focused ? <DarkDash /> : <Dash />;
                return iconName;
              },
            }}
          />
          <Tab.Screen
            name="Charts"
            component={Charts}
            options={{
              tabBarLabel: 'Gráficas',
              tabBarIcon: ({focused, tintColor}) => {
                const iconName = focused ? <DarkChart /> : <ChartIcon />;
                return iconName;
              },
            }}
          />
          <Tab.Screen
            name="Costs"
            component={Costs}
            options={{
              tabBarLabel: 'Costos',
              tabBarIcon: ({focused, tintColor}) => {
                const iconName = focused ? <DarkPrice /> : <PriceIcon />;
                return iconName;
              },
            }}
          />
          <Tab.Screen
            name="NetworkC"
            component={NetworkC}
            options={{
              tabBarLabel: 'Código de red',
              tabBarIcon: ({focused, tintColor}) => {
                const iconName = focused ? <DarkCode /> : <CodeIcon />;
                return iconName;
              },
            }}
          />
          <Tab.Screen
            name="Efficiency"
            component={Efficiency}
            options={{
              tabBarLabel: 'Eficiencia',
              tabBarIcon: ({focused, tintColor}) => {
                const iconName = focused ? <DarkEff /> : <EffIcon />;
                return iconName;
              },
            }}
          />
          <Tab.Screen
            name="Record"
            component={Record}
            options={{
              tabBarLabel: 'Historial',
              tabBarIcon: ({focused, tintColor}) => {
                const iconName = focused ? <DarkClock /> : <ClockIcon />;
                return iconName;
              },
            }}
          />
          <Tab.Screen
            name="CarbonF"
            component={CarbonF}
            options={{
              tabBarLabel: 'Huella de Carbono',
              tabBarIcon: ({focused, tintColor}) => {
                const iconName = focused ? <DarkCO2 /> : <CO2Icon />;
                return iconName;
              },
            }}
          />
          <Tab.Screen
            name="Generation"
            component={Generation}
            options={{
              tabBarLabel: 'Generación',
              tabBarIcon: ({focused, tintColor}) => {
                const iconName = focused ? <DarkPanel /> : <PanelIcon />;
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
    width: 24,
    height: 24,
  },
});
