import React, {Component} from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  FlatList} from "react-native";
  const axios = require('axios');


export default class Costos extends Component {
  constructor() {
    super();
    this.state = {
       isLoading: true,
       datos: []
    };
  }
  componentDidMount() {
    axios.get('http://api.ienergybook.com/api/DesignatedMeters/5c50d959b369e23b0feb6edc')
    .then(function (response) {
    console.log(response);

  })
    .catch(function (error) {
    console.log(error);
  })
  }
render() {
    return (
      <View>
      <FlatList
          data={this.state.datos}

        />
      </View>
    )
  }
}
