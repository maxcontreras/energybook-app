import React, {Component, PropTypes} from "react";
import {View,Text, StyleSheet} from "react-native";
import Swiper from "react-native-web-swiper";
import HeaderMenu from "../../Components/HeaderMenu.js";

export default class Carbon extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={styles.header}>
          <HeaderMenu selected="carbon"/>
        </View>
      )
    };
  };

render() {
    return (
      <Text>HUELLA</Text>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "center"
  },
});
