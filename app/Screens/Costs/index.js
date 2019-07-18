/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Costs extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>COSTOS</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
