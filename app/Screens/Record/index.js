import React, {Component,PropTypes} from "react";
import {View,Text, StyleSheet} from "react-native";
import HeaderMenu from "../../Components/HeaderMenu.js";

export default class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={styles.header}>
          <HeaderMenu selected="record"/>
        </View>
      )
    };
  };

render() {
    return (
  <Text>H I S T O R I A L</Text>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "center"
  },
});
