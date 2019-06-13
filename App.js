/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createStackNavigator,
        createAppContainer,
        createBottomTabNavigator } from "react-navigation";
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {StyleSheet} from 'react-native';
import {Image} from "react-native";
import Home from './app/Screens/Home';
import Register from './app/Screens/Register';
import Gráficas from './app/Screens/Gráficas';
import Costos from './app/Screens/Costos';
import Codigos from './app/Screens/Codigos';
import Historial from './app/Screens/Historial';
import Huella from './app/Screens/Huella';
import Generación from './app/Screens/Generación';
import Icon from 'react-native-vector-icons/Ionicons';
import Graph from './app/Assets/Images/grafica.png';
import HuellaC from './app/Assets/Images/huella.png';
import Hist from './app/Assets/Images/hist.png';
import Gene from './app/Assets/Images/gene.png';
import Codi from './app/Assets/Images/codigo.png';
import Cost from './app/Assets/Images/costo.png';


const styles=StyleSheet.create({
icon: {
    height: 24,
    width: 24
  }
  });

const BottomNavigation =  createMaterialBottomTabNavigator({
  Gráficas:{screen: Gráficas,
  navigationOptions:{
  tabBarIcon: ({tintColor})=>(
    <Image source={Graph} style={styles.icon}/>
    )
    }
    },
  Costos:{screen:Costos,
    navigationOptions:{
    tabBarIcon: ({tintColor})=>(
    <Image source={Cost} style={styles.icon}/>
      ),
      }
    },
  Codigos:{screen: Codigos,
    navigationOptions:{
      tabBarLabel: 'Codigo de red',
    tabBarIcon: ({tintColor})=>(
      <Image source={Codi} style={styles.icon}/>
      )
      }
    },
  Historial:{screen:Historial,
    navigationOptions:{
    tabBarIcon: ({tintColor})=>(
    <Image source={Hist} style={styles.icon}/>
      )
      }
    },
  Huella:{screen: Huella,
    navigationOptions:{
    tabBarLabel: 'Huella de carbono',
    tabBarIcon: ({tintColor})=>(
      <Image source={HuellaC} style={styles.icon}/>
      )
      }
    },
  Generación:{screen: Generación,
    navigationOptions:{
    tabBarIcon: ({tintColor})=>(
        <Image source={Gene} style={styles.icon}/>
      )
      }
    },
  },{
    initialRouteIcon: 'Gráficas',
    shifting: false,
    showIcon: true,
    headerMode: 'none',
    activeColor: '#B8BABF',
    inactiveColor: '#000000',
    barStyle:{ backgroundColor: 'white'},
    })
const AppNavigator = createStackNavigator({
  Home: Home,
  Register: Register,
  Dashboard: BottomNavigation,
},{
  header: null,
  headerMode: 'none',
  }
);
export default createAppContainer(AppNavigator);
