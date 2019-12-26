import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  TouchableOpacity
} from "react-native";
import Daily from "../../Components/PrincipalScreenC/Daily.js";
import SemiCircleProgress from "../../Components/PrincipalScreenC/DashboardChart.js";
import Data from "../../Components/PrincipalScreenC/Monthly.js";
import Menu from "../../Components/PrincipalScreenC/Menu.js";
import PrecioCFE from "../../Components/PrincipalScreenC/PrecioCFEPeriodo.js";
import Orientation from "react-native-orientation";
import AsyncStorage from "@react-native-community/async-storage";

import StaticSafeAreaInsets from "react-native-static-safe-area-insets";
import { connect } from "react-redux";

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

import Charts from "../Charts";
import Costs from "../Costs";
import NetworkC from "../NetworkC";
import Record from "../Record";
import CarbonF from "../CarbonF";
import Generation from "../Generation";
import Role2Dashboard from "../Role2Dashboard";
import SADashboard from "../SADashboard";
import AdminDashboard from "../AdminDashboard";

const mapStateToProps = state => ({
  readings: state.dailyReducer
});

export default class PrincipalScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      values: []
    };
  }
  static navigationOptions = {
    header: null
  };
  componentWillMount() {
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:key");
      if (value !== null) {
        this.setState(
          {
            values: JSON.parse(value)
          },
          () => {
            console.log(this.state.values);
          }
        );
      }
    } catch (error) {}
  };

  render() {
    console.log(this.state.values.role_id);
    console.log(this.state.values.administrando);
    const superAdmin = createStackNavigator({
      PrincipalScreen: SADashboard
    });
    const admin = createStackNavigator(
      {
        PrincipalScreen: AdminDashboard,
        Role2Dashboard: Role2Dashboard,
        Charts: Charts,
        Costs: Costs,
        NetworkC: NetworkC,
        Record: Record,
        CarbonF: CarbonF,
        Generation: Generation
      },
      {
        initialRouteName: "PrincipalScreen"
      }
    );
    const normalUsr = createStackNavigator(
      {
        PrincipalScreen: Role2Dashboard,
        Charts: Charts,
        Costs: Costs,
        NetworkC: NetworkC,
        Record: Record,
        CarbonF: CarbonF,
        Generation: Generation
      },
      {
        initialRouteName: "PrincipalScreen"
      }
    );
    const PrincipalScreen =
      this.state.values.role_id == 1 && this.state.values.administrando == null
        ? superAdmin
        : this.state.values.role_id == 1 &&
          this.state.values.administrando != null
        ? admin
        : normalUsr;
    const AppNavigator = createAppContainer(PrincipalScreen);

    return <AppNavigator />;
  }
}

const styles = StyleSheet.create({});
