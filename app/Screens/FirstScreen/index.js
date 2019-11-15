/* @flow */

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Dimensions
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { connect } from "react-redux";
const mapStateToProps = state => ({
  userData: state[0],
  idCompañia: state[1],
  companyData: state[2],
  readings: state[3],
  prices: state[5],
  dailyCP: state[4]
});

class FirstScreen extends Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("@MySuperStore:key");
    this.props.navigation.navigate(userToken ? "PrincipalScreen" : "Home");
  };
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default connect(mapStateToProps)(FirstScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
