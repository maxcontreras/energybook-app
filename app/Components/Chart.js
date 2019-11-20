import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView
} from "react-native";
import FusionCharts from "react-native-fusioncharts";
const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);
export default class Chart extends Component {
  constructor(props) {
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    super(props);
    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape"
    };
    this.libraryPath = Platform.select({
      ios: require("../../assets/fusioncharts.html"),
      android: { uri: "file:///android_asset/fusioncharts.html" }
    });
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
      <FusionCharts
        type={this.props.type}
        width={
          this.state.orientation == "portrait"
            ? Math.min(screenWidth, screenHeight) - 20
            : Math.max(screenWidth, screenHeight) - 100
        }
        height={this.state.orientation == "portrait" ? 500 : 400}
        dataFormat={"json"}
        dataSource={{
          chart: {
            caption: this.props.caption,
            numberprefix: " ",
            theme: Platform.OS == "ios" ? "ocean" : "fusion",
            rotatelabels: "1",
            showValues: "0",
            labelFontSize: "9"
          },
          data: this.props.data
        }}
        libraryPath={this.libraryPath}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center"
  }
});
