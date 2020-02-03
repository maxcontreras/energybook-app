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
            yAxisValueFontSize: "9",
            theme: Platform.OS == "ios" ? "ocean" : "fusion",
            labelDisplay: "rotate",
            labelStep: this.props.numSteps,
            plottooltext:
              this.props.screen == "Costs"
                ? "<div id='divTable'><table id='dataTable' width='200px'><tr class=''><th>Costo total:</th><td>$seriesname</td></tr><tr><th>Base:</th><td>$ydataValue</td></tr><tr><th>Media:</th><td>$xdataValue</td></tr><tr><th>Punta:</th><td>$ydataValue</td></tr></table></div>"
                : null,
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
