import React, { Component } from "react";
import {
  View,
  Dimensions,
  Text,
  ActivityIndicator,
  StyleSheet
} from "react-native";

const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

export default class ActivityI extends Component {
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
          styles.ActivityIndicator,
          this.state.orientation == "portrait"
            ? { width: Math.min(screenWidth, screenHeight) }
            : { width: Math.max(screenWidth, screenHeight) }
        ]}
      >
        <ActivityIndicator size="small" color="#586365" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ActivityIndicator: {
    justifyContent: "center",
    height: 50
  }
});
