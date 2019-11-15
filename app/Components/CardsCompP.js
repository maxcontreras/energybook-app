import React, { Component } from "react";
import { View, Text, Dimensions, ScrollView, StyleSheet } from "react-native";
import GenerationCard from "./GenerationCard.js";

export default class CardsCompP extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={[
          styles.daily,
          screenWidth < screenHeight ? styles.width : styles.height
        ]}
      >
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}
        >
          <View
            style={[
              styles.VCstyle,
              screenWidth < screenHeight ? styles.width : styles.height
            ]}
          >
            <GenerationCard
              value={"kwh"}
              numero={"3"}
              pantalla={this.props.screen}
              values={this.props.response}
            />
          </View>
          <View
            style={[
              styles.VCstyle,
              screenWidth < screenHeight ? styles.width : styles.height
            ]}
          >
            <GenerationCard
              value={this.props.screen == "generacion" ? "$" : "t"}
              numero={this.props.screen == "generacion" ? "3" : "1"}
              pantalla={this.props.screen}
              values={this.props.response}
            />
          </View>
          <View
            style={[
              styles.VCstyle,
              screenWidth < screenHeight ? styles.width : styles.height
            ]}
          >
            <GenerationCard
              value={this.props.screen == "generacion" ? "$" : " "}
              numero={"2"}
              pantalla={this.props.screen}
              values={this.props.response}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

var screenHeight = Math.round(Dimensions.get("window").height);
var screenWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  width: {
    width: screenWidth
  },
  height: {
    width: screenHeight
  },

  VCstyle: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: screenWidth,
    height: 220,
    paddingTop: 10,
    backgroundColor: "white",
    paddingBottom: 10
  },
  daily: {
    justifyContent: "center"
  }
});
