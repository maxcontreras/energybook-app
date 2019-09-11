import React, {Component,PropTypes} from "react";
import { Animated, View, StyleSheet, ViewPropTypes,Text } from 'react-native'
import HeaderMenu from "../../Components/HeaderMenu.js";

export default class Codes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={styles.header}>
          <HeaderMenu selected="codigo"/>
        </View>
      )
    };
  };

render() {
    return (
      <Text>C O D I G O</Text>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "center"
  },
});
