import React, { Component, PropTypes } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import HeaderMenu from "../../Components/HeaderMenu.js";
import Orientation from "react-native-orientation";

export default class Info extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape"
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
  }
  componentWillMount() {
    Orientation.unlockAllOrientations();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={styles.header}>
          <HeaderMenu selected="record" />
        </View>
      )
    };
  };

  render() {
    return <Text>I N F O R M A C I O N</Text>;
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "center"
  }
});
