import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

export default class Colors extends Component {
  constructor(props) {
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    super(props);
    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape"
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
  }
  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          this.state.orientation == "portrait"
            ? { width: Math.min(screenWidth, screenHeight) }
            : { width: Math.max(screenWidth, screenHeight) },
          this.state.orientation == "landscape"
            ? { marginBottom: 20 }
            : { marginBottom: null }
        ]}
      >
        <View
          style={{
            backgroundColor: "#EDDC44",
            width: 20,
            height: 20,
            margin: 5
          }}
        ></View>
        <Text> Punta </Text>
        <View
          style={{
            backgroundColor: "#25CEBC",
            width: 20,
            height: 20,
            margin: 5
          }}
        ></View>
        <Text> Intermedia </Text>
        <View
          style={{
            backgroundColor: "#DE3E10",
            width: 20,
            height: 20,
            margin: 5
          }}
        ></View>
        <Text> Punta </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: "auto",
    backgroundColor: "white"
  }
});
